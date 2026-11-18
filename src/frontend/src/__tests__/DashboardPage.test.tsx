import { renderPageWithActor } from "@/__tests__/render-page";
import type {
  CompletionView,
  HomeworkView,
  TimetableView,
  UserView,
  backendInterface,
} from "@/backend";
import { ApprovalStatus, Role } from "@/backend";
import DashboardPage from "@/pages/DashboardPage";
import { Principal } from "@icp-sdk/core/principal";
import { screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const principal = Principal.fromText("aaaaa-aa");

function atNoon(daysFromToday: number): bigint {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + daysFromToday);
  return BigInt(date.getTime()) * 1_000_000n;
}

function makeProfile(overrides: Partial<UserView> = {}): UserView {
  return {
    principal,
    displayName: "Alex Morgan",
    role: Role.student,
    approval: ApprovalStatus.approved,
    className: "Year 10",
    requestedAt: 0n,
    ...overrides,
  };
}

function makeHomework(overrides: Partial<HomeworkView> = {}): HomeworkView {
  return {
    id: 1n,
    title: "Cell structure worksheet",
    subject: "Biology",
    createdAt: 0n,
    createdBy: principal,
    dueDate: atNoon(0),
    description: "Read chapter 3",
    assignedDate: atNoon(-1),
    ...overrides,
  };
}

function makeActor(
  overrides: Partial<
    Pick<
      backendInterface,
      | "getCallerProfile"
      | "listHomework"
      | "listMyCompletions"
      | "listTimetableEvents"
    >
  > = {},
) {
  return {
    getCallerProfile: vi.fn<backendInterface["getCallerProfile"]>(async () =>
      makeProfile(),
    ),
    listHomework: vi.fn<backendInterface["listHomework"]>(async () => []),
    listMyCompletions: vi.fn<backendInterface["listMyCompletions"]>(
      async () => [],
    ),
    listTimetableEvents: vi.fn<backendInterface["listTimetableEvents"]>(
      async () => [],
    ),
    ...overrides,
  } satisfies Pick<
    backendInterface,
    | "getCallerProfile"
    | "listHomework"
    | "listMyCompletions"
    | "listTimetableEvents"
  >;
}

describe("DashboardPage", () => {
  it("greets the signed-in student by first name", async () => {
    renderPageWithActor(<DashboardPage />, makeActor());

    expect(
      await screen.findByRole("heading", { name: /welcome back, alex!/i }),
    ).toBeInTheDocument();
  });

  it("counts daily and long-term tasks, including completions", async () => {
    const daily = makeHomework({
      id: 1n,
      title: "Due today",
      dueDate: atNoon(0),
    });
    const longTerm = makeHomework({
      id: 2n,
      title: "Due next week",
      dueDate: atNoon(7),
    });
    const completions: CompletionView[] = [
      { homeworkId: 1n, completed: true, updatedAt: 0n, student: principal },
      { homeworkId: 2n, completed: false, updatedAt: 0n, student: principal },
    ];
    renderPageWithActor(
      <DashboardPage />,
      makeActor({
        listHomework: vi.fn<backendInterface["listHomework"]>(async () => [
          daily,
          longTerm,
        ]),
        listMyCompletions: vi.fn<backendInterface["listMyCompletions"]>(
          async () => completions,
        ),
      }),
    );

    const stats = await screen.findByRole("region", {
      name: /task statistics/i,
    });
    const dailyCard = within(stats).getByText("Daily tasks").closest("article");
    const dailyDoneCard = within(stats)
      .getByText("Daily done")
      .closest("article");
    const longTermCard = within(stats)
      .getByText("Long-term")
      .closest("article");
    const longTermDoneCard = within(stats)
      .getByText("Long-term done")
      .closest("article");

    expect(dailyCard).not.toBeNull();
    expect(within(dailyCard as HTMLElement).getByText("1")).toBeInTheDocument();
    expect(
      within(dailyDoneCard as HTMLElement).getByText("1"),
    ).toBeInTheDocument();
    expect(
      within(longTermCard as HTMLElement).getByText("1"),
    ).toBeInTheDocument();
    expect(
      within(longTermDoneCard as HTMLElement).getByText("0"),
    ).toBeInTheDocument();
  });

  it("renders today's timetable events", async () => {
    const event: TimetableView = {
      id: 1n,
      startTime: atNoon(0),
      endTime: atNoon(0) + 3_600_000_000_000n,
      subject: "Mathematics",
      room: "Room 12",
      notes: "Bring calculator",
    };
    renderPageWithActor(
      <DashboardPage />,
      makeActor({
        listTimetableEvents: vi.fn<backendInterface["listTimetableEvents"]>(
          async () => [event],
        ),
      }),
    );

    expect(await screen.findByText("Mathematics")).toBeInTheDocument();
    expect(screen.getByText("Room 12")).toBeInTheDocument();
  });

  it("shows an empty timetable message when no events are scheduled", async () => {
    renderPageWithActor(<DashboardPage />, makeActor());

    expect(await screen.findByText(/no classes today/i)).toBeInTheDocument();
  });
});
