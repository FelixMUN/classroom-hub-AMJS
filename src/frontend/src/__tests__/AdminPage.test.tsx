import { renderPageWithActor } from "@/__tests__/render-page";
import type {
  SubmissionView,
  UserApprovalInfo,
  UserView,
  backendInterface,
} from "@/backend";
import { ApprovalStatus, RequestStatus, Role, SubmissionKind } from "@/backend";
import AdminPage from "@/pages/AdminPage";
import { Principal } from "@icp-sdk/core/principal";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const other = Principal.fromText("2vxsx-fae");

function makeUser(overrides: Partial<UserView> = {}): UserView {
  return {
    principal: other,
    displayName: "Ada Lovelace",
    role: Role.student,
    approval: ApprovalStatus.pending,
    className: "Year 10",
    requestedAt: 1_700_000_000_000_000_000n,
    ...overrides,
  };
}

function makeApproval(
  overrides: Partial<UserApprovalInfo> = {},
): UserApprovalInfo {
  return {
    principal: other,
    status: ApprovalStatus.pending,
    ...overrides,
  };
}

function makeSubmission(
  overrides: Partial<SubmissionView> = {},
): SubmissionView {
  return {
    id: 1n,
    status: RequestStatus.pending,
    title: "Trigonometry practice",
    subject: "Maths",
    kind: SubmissionKind.newHomework,
    dueDate: 1_700_000_000_000_000_000n,
    submittedAt: 1_700_000_000_000_000_000n,
    submittedBy: other,
    description: "Questions 1-10",
    assignedDate: 1_700_000_000_000_000_000n,
    ...overrides,
  };
}

function makeActor(
  overrides: Partial<
    Pick<
      backendInterface,
      | "isCallerAdmin"
      | "listApprovals"
      | "listUsers"
      | "listSubmissions"
      | "setUserApproval"
      | "setSubmissionStatus"
      | "listTimetableEvents"
    >
  > = {},
) {
  return {
    isCallerAdmin: vi.fn<backendInterface["isCallerAdmin"]>(async () => true),
    listApprovals: vi.fn<backendInterface["listApprovals"]>(async () => []),
    listUsers: vi.fn<backendInterface["listUsers"]>(async () => []),
    listSubmissions: vi.fn<backendInterface["listSubmissions"]>(async () => []),
    setUserApproval: vi.fn<backendInterface["setUserApproval"]>(
      async () => undefined,
    ),
    setSubmissionStatus: vi.fn<backendInterface["setSubmissionStatus"]>(
      async () => null,
    ),
    listTimetableEvents: vi.fn<backendInterface["listTimetableEvents"]>(
      async () => [],
    ),
    ...overrides,
  } satisfies Pick<
    backendInterface,
    | "isCallerAdmin"
    | "listApprovals"
    | "listUsers"
    | "listSubmissions"
    | "setUserApproval"
    | "setSubmissionStatus"
    | "listTimetableEvents"
  >;
}

describe("AdminPage", () => {
  it("denies a signed-in student the admin console", async () => {
    renderPageWithActor(
      <AdminPage />,
      makeActor({
        isCallerAdmin: vi.fn<backendInterface["isCallerAdmin"]>(
          async () => false,
        ),
      }),
    );

    expect(await screen.findByText("Admins only")).toBeInTheDocument();
    expect(screen.queryByTestId("admin.tabs")).not.toBeInTheDocument();
  });

  it("shows the admin tabs to an admin", async () => {
    renderPageWithActor(<AdminPage />, makeActor());

    expect(await screen.findByTestId("admin.tabs")).toBeInTheDocument();
    expect(screen.getByTestId("admin.tab.access")).toBeInTheDocument();
    expect(screen.getByTestId("admin.tab.homework")).toBeInTheDocument();
    expect(screen.getByTestId("admin.tab.suggestions")).toBeInTheDocument();
    expect(screen.getByTestId("admin.tab.users")).toBeInTheDocument();
    expect(screen.getByTestId("admin.tab.timetable")).toBeInTheDocument();
  });

  it("approves a pending access request", async () => {
    const setUserApproval = vi.fn<backendInterface["setUserApproval"]>(
      async () => undefined,
    );
    renderPageWithActor(
      <AdminPage />,
      makeActor({
        listApprovals: vi.fn<backendInterface["listApprovals"]>(async () => [
          makeApproval(),
        ]),
        listUsers: vi.fn<backendInterface["listUsers"]>(async () => [
          makeUser(),
        ]),
        setUserApproval,
      }),
    );

    fireEvent.click(await screen.findByTestId("admin.access.approve_button.1"));

    await waitFor(() => expect(setUserApproval).toHaveBeenCalledTimes(1));
    expect(setUserApproval).toHaveBeenCalledWith(
      other,
      ApprovalStatus.approved,
    );
  });

  it("approves a pending homework submission with a reason", async () => {
    const setSubmissionStatus = vi.fn<backendInterface["setSubmissionStatus"]>(
      async () => null,
    );
    renderPageWithActor(
      <AdminPage />,
      makeActor({
        listSubmissions: vi.fn<backendInterface["listSubmissions"]>(
          async () => [makeSubmission({ id: 9n })],
        ),
        setSubmissionStatus,
      }),
    );

    const user = userEvent.setup({ pointerEventsCheck: 0 });
    await user.click(await screen.findByTestId("admin.tab.homework"));
    const reason = await screen.findByTestId("admin.homework.reason_input.1");
    fireEvent.change(reason, { target: { value: "Great work" } });
    fireEvent.click(screen.getByTestId("admin.homework.approve_button.1"));

    await waitFor(() => expect(setSubmissionStatus).toHaveBeenCalledTimes(1));
    expect(setSubmissionStatus).toHaveBeenCalledWith(
      9n,
      RequestStatus.approved,
      "Great work",
    );
  });

  it("rejects a pending homework submission", async () => {
    const setSubmissionStatus = vi.fn<backendInterface["setSubmissionStatus"]>(
      async () => null,
    );
    renderPageWithActor(
      <AdminPage />,
      makeActor({
        listSubmissions: vi.fn<backendInterface["listSubmissions"]>(
          async () => [makeSubmission({ id: 9n })],
        ),
        setSubmissionStatus,
      }),
    );

    const user = userEvent.setup({ pointerEventsCheck: 0 });
    await user.click(await screen.findByTestId("admin.tab.homework"));
    fireEvent.click(
      await screen.findByTestId("admin.homework.reject_button.1"),
    );

    await waitFor(() => expect(setSubmissionStatus).toHaveBeenCalledTimes(1));
    expect(setSubmissionStatus).toHaveBeenCalledWith(
      9n,
      RequestStatus.rejected,
      null,
    );
  });
});
