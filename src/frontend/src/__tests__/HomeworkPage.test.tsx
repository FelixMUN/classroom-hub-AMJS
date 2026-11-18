import { renderPageWithActor } from "@/__tests__/render-page";
import type { HomeworkView, SubmissionView, backendInterface } from "@/backend";
import { RequestStatus, SubmissionKind } from "@/backend";
import HomeworkPage from "@/pages/HomeworkPage";
import { Principal } from "@icp-sdk/core/principal";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
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
    dueDate: atNoon(3),
    description: "Read chapter 3",
    assignedDate: atNoon(0),
    ...overrides,
  };
}

function makeSubmission(
  overrides: Partial<SubmissionView> = {},
): SubmissionView {
  return {
    id: 1n,
    status: RequestStatus.pending,
    title: "New essay",
    subject: "English",
    kind: SubmissionKind.newHomework,
    dueDate: atNoon(5),
    submittedAt: 0n,
    submittedBy: principal,
    description: "Draft",
    assignedDate: atNoon(0),
    ...overrides,
  };
}

function makeActor(
  overrides: Partial<
    Pick<
      backendInterface,
      | "isCallerAdmin"
      | "listHomework"
      | "listMySubmissions"
      | "submitHomework"
      | "addHomework"
    >
  > = {},
) {
  return {
    isCallerAdmin: vi.fn<backendInterface["isCallerAdmin"]>(async () => false),
    listHomework: vi.fn<backendInterface["listHomework"]>(async () => []),
    listMySubmissions: vi.fn<backendInterface["listMySubmissions"]>(
      async () => [],
    ),
    submitHomework: vi.fn<backendInterface["submitHomework"]>(async () =>
      makeSubmission(),
    ),
    addHomework: vi.fn<backendInterface["addHomework"]>(async () =>
      makeHomework(),
    ),
    ...overrides,
  } satisfies Pick<
    backendInterface,
    | "isCallerAdmin"
    | "listHomework"
    | "listMySubmissions"
    | "submitHomework"
    | "addHomework"
  >;
}

describe("HomeworkPage", () => {
  it("shows approved class homework to a student", async () => {
    renderPageWithActor(
      <HomeworkPage />,
      makeActor({
        listHomework: vi.fn<backendInterface["listHomework"]>(async () => [
          makeHomework({ title: "Photosynthesis lab" }),
        ]),
      }),
    );

    expect(await screen.findByText("Photosynthesis lab")).toBeInTheDocument();
  });

  it("submits an edit suggestion as a Pending submission", async () => {
    const submitHomework = vi.fn<backendInterface["submitHomework"]>(async () =>
      makeSubmission({
        kind: SubmissionKind.editSuggestion,
        title: "Trigonometry practice",
      }),
    );
    renderPageWithActor(
      <HomeworkPage />,
      makeActor({
        listHomework: vi.fn<backendInterface["listHomework"]>(async () => [
          makeHomework({ id: 7n, title: "Cell structure worksheet" }),
        ]),
        submitHomework,
      }),
    );

    fireEvent.click(await screen.findByTestId("homework.suggest_button.1"));

    const dialog = await screen.findByTestId("homework.modal");
    fireEvent.change(within(dialog).getByTestId("homework.title.input"), {
      target: { value: "Trigonometry practice" },
    });
    fireEvent.submit(
      within(dialog).getByTestId("homework.submit_button").closest("form")!,
    );

    await waitFor(() => expect(submitHomework).toHaveBeenCalledTimes(1));
    const [kind, targetId, subject, title] = submitHomework.mock.calls[0];
    expect(kind).toBe(SubmissionKind.editSuggestion);
    expect(targetId).toBe(7n);
    expect(subject).toBe("Biology");
    expect(title).toBe("Trigonometry practice");
  });

  it("submits new homework as a Pending submission, not an admin publish", async () => {
    const submitHomework = vi.fn<backendInterface["submitHomework"]>(async () =>
      makeSubmission({
        kind: SubmissionKind.newHomework,
        title: "My new essay",
      }),
    );
    const addHomework = vi.fn<backendInterface["addHomework"]>(async () =>
      makeHomework(),
    );
    renderPageWithActor(
      <HomeworkPage />,
      makeActor({ submitHomework, addHomework }),
    );

    fireEvent.click(
      await screen.findByTestId("homework.submit_homework_button"),
    );

    const dialog = await screen.findByTestId("homework.modal");
    fireEvent.change(within(dialog).getByTestId("homework.subject.input"), {
      target: { value: "English" },
    });
    fireEvent.change(within(dialog).getByTestId("homework.title.input"), {
      target: { value: "My new essay" },
    });
    fireEvent.submit(
      within(dialog).getByTestId("homework.submit_button").closest("form")!,
    );

    await waitFor(() => expect(submitHomework).toHaveBeenCalledTimes(1));
    const [kind, targetId, subject, title] = submitHomework.mock.calls[0];
    expect(kind).toBe(SubmissionKind.newHomework);
    expect(targetId).toBeNull();
    expect(subject).toBe("English");
    expect(title).toBe("My new essay");
    expect(addHomework).not.toHaveBeenCalled();
  });

  it("shows a student's submission with its Pending status", async () => {
    renderPageWithActor(
      <HomeworkPage />,
      makeActor({
        listMySubmissions: vi.fn<backendInterface["listMySubmissions"]>(
          async () => [makeSubmission({ title: "My pending essay" })],
        ),
      }),
    );

    const list = await screen.findByTestId("submission.list");
    expect(within(list).getByText("My pending essay")).toBeInTheDocument();
    expect(within(list).getByText("Pending")).toBeInTheDocument();
  });

  it("shows a Rejected status with the admin reason", async () => {
    renderPageWithActor(
      <HomeworkPage />,
      makeActor({
        listMySubmissions: vi.fn<backendInterface["listMySubmissions"]>(
          async () => [
            makeSubmission({
              title: "Rejected essay",
              status: RequestStatus.rejected,
              adminReason: "Missing sources",
            }),
          ],
        ),
      }),
    );

    const list = await screen.findByTestId("submission.list");
    expect(within(list).getByText("Rejected")).toBeInTheDocument();
    expect(within(list).getByText(/missing sources/i)).toBeInTheDocument();
  });

  it("lets an admin publish homework directly", async () => {
    const addHomework = vi.fn<backendInterface["addHomework"]>(async () =>
      makeHomework({ title: "Admin assignment" }),
    );
    renderPageWithActor(
      <HomeworkPage />,
      makeActor({
        isCallerAdmin: vi.fn<backendInterface["isCallerAdmin"]>(
          async () => true,
        ),
        addHomework,
      }),
    );

    fireEvent.click(await screen.findByTestId("homework.open_modal_button"));
    const dialog = await screen.findByTestId("homework.modal");
    fireEvent.change(within(dialog).getByTestId("homework.subject.input"), {
      target: { value: "History" },
    });
    fireEvent.change(within(dialog).getByTestId("homework.title.input"), {
      target: { value: "Admin assignment" },
    });
    fireEvent.submit(
      within(dialog).getByTestId("homework.submit_button").closest("form")!,
    );

    await waitFor(() => expect(addHomework).toHaveBeenCalledTimes(1));
    expect(addHomework.mock.calls[0][1]).toBe("Admin assignment");
  });
});
