import { renderPageWithActor } from "@/__tests__/render-page";
import type { AnnouncementView, backendInterface } from "@/backend";
import AnnouncementsPage from "@/pages/AnnouncementsPage";
import { Principal } from "@icp-sdk/core/principal";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const principal = Principal.fromText("aaaaa-aa");

function makeAnnouncement(
  overrides: Partial<AnnouncementView> = {},
): AnnouncementView {
  return {
    id: 1n,
    title: "Field trip",
    body: "Permission slips due Friday.",
    publishedAt: 1_700_000_000_000_000_000n,
    publishedBy: principal,
    ...overrides,
  };
}

function makeActor(
  overrides: Partial<
    Pick<
      backendInterface,
      | "isCallerAdmin"
      | "listAnnouncements"
      | "publishAnnouncement"
      | "updateAnnouncement"
      | "deleteAnnouncement"
    >
  > = {},
) {
  return {
    isCallerAdmin: vi.fn<backendInterface["isCallerAdmin"]>(async () => false),
    listAnnouncements: vi.fn<backendInterface["listAnnouncements"]>(
      async () => [],
    ),
    publishAnnouncement: vi.fn<backendInterface["publishAnnouncement"]>(
      async (title, body) => makeAnnouncement({ title, body }),
    ),
    updateAnnouncement: vi.fn<backendInterface["updateAnnouncement"]>(
      async (id, title, body) => makeAnnouncement({ id, title, body }),
    ),
    deleteAnnouncement: vi.fn<backendInterface["deleteAnnouncement"]>(
      async () => false,
    ),
    ...overrides,
  } satisfies Pick<
    backendInterface,
    | "isCallerAdmin"
    | "listAnnouncements"
    | "publishAnnouncement"
    | "updateAnnouncement"
    | "deleteAnnouncement"
  >;
}

describe("AnnouncementsPage", () => {
  it("lists announcements for an approved student", async () => {
    renderPageWithActor(
      <AnnouncementsPage />,
      makeActor({
        listAnnouncements: vi.fn<backendInterface["listAnnouncements"]>(
          async () => [
            makeAnnouncement({ id: 1n, title: "Field trip" }),
            makeAnnouncement({ id: 2n, title: "Exam schedule" }),
          ],
        ),
      }),
    );

    expect(await screen.findByText("Field trip")).toBeInTheDocument();
    expect(screen.getByText("Exam schedule")).toBeInTheDocument();
    // A student cannot manage announcements.
    expect(
      screen.queryByTestId("announcements.composer"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("announcements.delete_button.1"),
    ).not.toBeInTheDocument();
  });

  it("shows an empty state when there are no announcements", async () => {
    renderPageWithActor(<AnnouncementsPage />, makeActor());

    expect(await screen.findByText("No announcements yet")).toBeInTheDocument();
  });

  it("lets an admin publish an announcement", async () => {
    const publishAnnouncement = vi.fn<backendInterface["publishAnnouncement"]>(
      async (title, body) => makeAnnouncement({ title, body }),
    );
    renderPageWithActor(
      <AnnouncementsPage />,
      makeActor({
        isCallerAdmin: vi.fn<backendInterface["isCallerAdmin"]>(
          async () => true,
        ),
        publishAnnouncement,
      }),
    );

    const composer = await screen.findByTestId("announcements.composer");
    fireEvent.change(
      within(composer).getByTestId("announcements.title_input"),
      { target: { value: "Sports day" } },
    );
    fireEvent.change(
      within(composer).getByTestId("announcements.body_textarea"),
      { target: { value: "Wear house colours on Friday." } },
    );
    fireEvent.submit(composer);

    await waitFor(() => expect(publishAnnouncement).toHaveBeenCalledTimes(1));
    expect(publishAnnouncement).toHaveBeenCalledWith(
      "Sports day",
      "Wear house colours on Friday.",
    );
  });

  it("lets an admin delete an announcement", async () => {
    const deleteAnnouncement = vi.fn<backendInterface["deleteAnnouncement"]>(
      async () => false,
    );
    renderPageWithActor(
      <AnnouncementsPage />,
      makeActor({
        isCallerAdmin: vi.fn<backendInterface["isCallerAdmin"]>(
          async () => true,
        ),
        listAnnouncements: vi.fn<backendInterface["listAnnouncements"]>(
          async () => [makeAnnouncement({ id: 5n, title: "Field trip" })],
        ),
        deleteAnnouncement,
      }),
    );

    fireEvent.click(await screen.findByTestId("announcements.delete_button.1"));

    await waitFor(() => expect(deleteAnnouncement).toHaveBeenCalledTimes(1));
    expect(deleteAnnouncement).toHaveBeenCalledWith(5n);
  });
});
