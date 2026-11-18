import { setIdentityForTest } from "@/__tests__/setup";
import { renderWithActor } from "@/__tests__/test-utils";
import type { UserView, backendInterface } from "@/backend";
import { ApprovalStatus, Role } from "@/backend";
import { AccessGate } from "@/components/AccessGate";
import { Principal } from "@icp-sdk/core/principal";
import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const principal = Principal.fromText("aaaaa-aa");

function makeProfile(overrides: Partial<UserView> = {}): UserView {
  return {
    principal,
    displayName: "Alex Morgan",
    role: Role.student,
    approval: ApprovalStatus.pending,
    className: "Year 10",
    requestedAt: 0n,
    ...overrides,
  };
}

function makeActor(
  overrides: Partial<
    Pick<backendInterface, "getCallerProfile" | "isCallerApproved">
  > = {},
) {
  return {
    getCallerProfile: vi.fn<backendInterface["getCallerProfile"]>(
      async () => null,
    ),
    isCallerApproved: vi.fn<backendInterface["isCallerApproved"]>(
      async () => false,
    ),
    ...overrides,
  } satisfies Pick<backendInterface, "getCallerProfile" | "isCallerApproved">;
}

describe("AccessGate", () => {
  it("prompts a signed-out visitor to sign in and hides app content", async () => {
    setIdentityForTest();
    const actor = makeActor();
    renderWithActor(
      <AccessGate>
        <p>Secret app content</p>
      </AccessGate>,
      actor,
    );

    expect(
      await screen.findByRole("button", {
        name: /sign in with internet identity/i,
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Secret app content")).not.toBeInTheDocument();
  });

  it("shows the pending-approval screen to a signed-in unapproved user", async () => {
    setIdentityForTest({
      identity: { getPrincipal: () => principal } as never,
    });
    const actor = makeActor({
      getCallerProfile: vi.fn<backendInterface["getCallerProfile"]>(async () =>
        makeProfile({ approval: ApprovalStatus.pending }),
      ),
      isCallerApproved: vi.fn<backendInterface["isCallerApproved"]>(
        async () => false,
      ),
    });
    renderWithActor(
      <AccessGate>
        <p>Secret app content</p>
      </AccessGate>,
      actor,
    );

    expect(
      await screen.findByText(/waiting for approval/i),
    ).toBeInTheDocument();
    expect(screen.queryByText("Secret app content")).not.toBeInTheDocument();
  });

  it("renders app content once the caller is approved", async () => {
    setIdentityForTest({
      identity: { getPrincipal: () => principal } as never,
    });
    const actor = makeActor({
      getCallerProfile: vi.fn<backendInterface["getCallerProfile"]>(async () =>
        makeProfile({ approval: ApprovalStatus.approved }),
      ),
      isCallerApproved: vi.fn<backendInterface["isCallerApproved"]>(
        async () => true,
      ),
    });
    renderWithActor(
      <AccessGate>
        <p>Secret app content</p>
      </AccessGate>,
      actor,
    );

    expect(await screen.findByText("Secret app content")).toBeInTheDocument();
  });

  it("shows profile setup to a signed-in user with no profile", async () => {
    setIdentityForTest({
      identity: { getPrincipal: () => principal } as never,
    });
    const actor = makeActor({
      getCallerProfile: vi.fn<backendInterface["getCallerProfile"]>(
        async () => null,
      ),
    });
    renderWithActor(
      <AccessGate>
        <p>Secret app content</p>
      </AccessGate>,
      actor,
    );

    expect(await screen.findByText(/set up your profile/i)).toBeInTheDocument();
    expect(screen.queryByText("Secret app content")).not.toBeInTheDocument();
  });

  it("shows the rejected state when access was declined", async () => {
    setIdentityForTest({
      identity: { getPrincipal: () => principal } as never,
    });
    const actor = makeActor({
      getCallerProfile: vi.fn<backendInterface["getCallerProfile"]>(async () =>
        makeProfile({ approval: ApprovalStatus.rejected }),
      ),
      isCallerApproved: vi.fn<backendInterface["isCallerApproved"]>(
        async () => false,
      ),
    });
    renderWithActor(
      <AccessGate>
        <p>Secret app content</p>
      </AccessGate>,
      actor,
    );

    await waitFor(() =>
      expect(screen.getByText(/access not granted/i)).toBeInTheDocument(),
    );
  });
});
