import { renderPageWithActor } from "@/__tests__/render-page";
import type { HomeworkView, backendInterface } from "@/backend";
import CalendarPage from "@/pages/CalendarPage";
import { Principal } from "@icp-sdk/core/principal";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const principal = Principal.fromText("aaaaa-aa");

function atNoon(daysFromToday: number): bigint {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + daysFromToday);
  return BigInt(date.getTime()) * 1_000_000n;
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
      "listHomework" | "listMyCompletions" | "setCompletion"
    >
  > = {},
) {
  return {
    listHomework: vi.fn<backendInterface["listHomework"]>(async () => []),
    listMyCompletions: vi.fn<backendInterface["listMyCompletions"]>(
      async () => [],
    ),
    setCompletion: vi.fn<backendInterface["setCompletion"]>(async () => ({
      homeworkId: 1n,
      completed: true,
      updatedAt: 0n,
      student: principal,
    })),
    ...overrides,
  } satisfies Pick<
    backendInterface,
    "listHomework" | "listMyCompletions" | "setCompletion"
  >;
}

describe("CalendarPage", () => {
  it("switches between Month, Week and Day views", async () => {
    const user = userEvent.setup();
    renderPageWithActor(<CalendarPage />, makeActor());

    const monthTab = await screen.findByRole("tab", { name: "Month" });
    expect(monthTab).toHaveAttribute("aria-selected", "true");

    await user.click(screen.getByRole("tab", { name: "Week" }));
    expect(screen.getByRole("tab", { name: "Week" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await user.click(screen.getByRole("tab", { name: "Day" }));
    expect(screen.getByRole("tab", { name: "Day" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("navigates to the previous and next period", async () => {
    const user = userEvent.setup();
    renderPageWithActor(<CalendarPage />, makeActor());

    const label = await screen.findByTestId("calendar.period_label");
    const initial = label.textContent;

    await user.click(screen.getByRole("button", { name: /next period/i }));
    expect(screen.getByTestId("calendar.period_label").textContent).not.toBe(
      initial,
    );

    await user.click(screen.getByRole("button", { name: /previous period/i }));
    expect(screen.getByTestId("calendar.period_label").textContent).toBe(
      initial,
    );
  });

  it("shows homework on the selected day and toggles completion", async () => {
    const user = userEvent.setup();
    const homework = makeHomework({ id: 7n, title: "Photosynthesis lab" });
    const setCompletion = vi.fn<backendInterface["setCompletion"]>(
      async () => ({
        homeworkId: 7n,
        completed: true,
        updatedAt: 0n,
        student: principal,
      }),
    );
    renderPageWithActor(
      <CalendarPage />,
      makeActor({
        listHomework: vi.fn<backendInterface["listHomework"]>(async () => [
          homework,
        ]),
        setCompletion,
      }),
    );

    const detail = await screen.findByTestId("calendar.detail_panel");
    expect(within(detail).getByText("Photosynthesis lab")).toBeInTheDocument();

    await user.click(
      within(detail).getByRole("button", { name: /mark complete/i }),
    );
    expect(setCompletion).toHaveBeenCalledWith(7n, true);
  });

  it("filters homework by search query", async () => {
    const user = userEvent.setup();
    renderPageWithActor(
      <CalendarPage />,
      makeActor({
        listHomework: vi.fn<backendInterface["listHomework"]>(async () => [
          makeHomework({ id: 1n, title: "Algebra set", subject: "Maths" }),
          makeHomework({ id: 2n, title: "Essay draft", subject: "English" }),
        ]),
      }),
    );

    const detail = await screen.findByTestId("calendar.detail_panel");
    expect(within(detail).getByText("Algebra set")).toBeInTheDocument();
    expect(within(detail).getByText("Essay draft")).toBeInTheDocument();

    await user.type(screen.getByTestId("calendar.search_input"), "algebra");
    expect(within(detail).getByText("Algebra set")).toBeInTheDocument();
    expect(within(detail).queryByText("Essay draft")).not.toBeInTheDocument();
  });
});
