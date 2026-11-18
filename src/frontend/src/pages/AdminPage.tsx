import {
  ApprovalStatus,
  RequestStatus,
  type Role,
  SubmissionKind,
  type UserView,
} from "@/backend";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { SubjectBadge } from "@/components/SubjectBadge";
import { ApprovalQueueItem } from "@/components/admin/ApprovalQueueItem";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  TimetableEventForm,
  TimetableEventRow,
} from "@/components/admin/TimetableManager";
import { RoleLegend, UserRow } from "@/components/admin/UserRow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAddTimetableEvent,
  useDeleteTimetableEvent,
  useIsCallerAdmin,
  useListApprovals,
  useListSubmissions,
  useListTimetableEvents,
  useListUsers,
  useRevokeUserAccess,
  useSetSubmissionStatus,
  useSetUserApproval,
  useSetUserRole,
} from "@/hooks/useQueries";
import { formatDate, formatDateTime } from "@/lib/format";
import { CalendarClock, Inbox, ShieldAlert, Users } from "lucide-react";
import { useMemo } from "react";

function AdminDenied() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Teacher tools"
        title="Admin console"
        description="Approve members and manage the class."
      />
      <EmptyState
        icon={ShieldAlert}
        title="Admins only"
        description="This console is available to class admins. Ask your teacher if you need access."
      />
    </div>
  );
}

function AccessQueue() {
  const approvalsQuery = useListApprovals();
  const usersQuery = useListUsers();
  const setApproval = useSetUserApproval();

  const nameByPrincipal = useMemo(() => {
    const map = new Map<string, UserView>();
    for (const user of usersQuery.data ?? []) {
      map.set(user.principal.toText(), user);
    }
    return map;
  }, [usersQuery.data]);

  const pending = useMemo(
    () =>
      (approvalsQuery.data ?? []).filter((entry) => entry.status === "pending"),
    [approvalsQuery.data],
  );

  if (approvalsQuery.isLoading)
    return <LoadingState label="Loading requests…" />;
  if (approvalsQuery.isError)
    return (
      <ErrorState
        message="We couldn't load access requests."
        onRetry={() => void approvalsQuery.refetch()}
      />
    );
  if (pending.length === 0)
    return (
      <EmptyState
        icon={Inbox}
        title="No pending requests"
        description="New classmates waiting for approval will appear here."
      />
    );

  return (
    <ul data-ocid="admin.access_queue" className="grid gap-4 lg:grid-cols-2">
      {pending.map((entry, index) => {
        const user = nameByPrincipal.get(entry.principal.toText());
        const name = user?.displayName.trim() || "New classmate";
        return (
          <li key={entry.principal.toText()} className="flex">
            <ApprovalQueueItem
              index={index}
              ocidPrefix="admin.access"
              title={name}
              subtitle={user?.className.trim() || "No class set"}
              meta={
                <>
                  <StatusBadge status={entry.status} />
                  <span className="font-mono text-xs text-muted-foreground">
                    {user
                      ? `Requested ${formatDate(user.requestedAt)}`
                      : "Awaiting profile"}
                  </span>
                </>
              }
              isPending={setApproval.isPending}
              onApprove={() =>
                setApproval.mutate({
                  user: entry.principal,
                  approval: ApprovalStatus.approved,
                })
              }
              onReject={() =>
                setApproval.mutate({
                  user: entry.principal,
                  approval: ApprovalStatus.rejected,
                })
              }
              className="w-full"
            />
          </li>
        );
      })}
    </ul>
  );
}

function SubmissionQueue({
  kind,
  ocidPrefix,
  emptyTitle,
  emptyDescription,
}: {
  kind: SubmissionKind;
  ocidPrefix: string;
  emptyTitle: string;
  emptyDescription: string;
}) {
  const submissionsQuery = useListSubmissions();
  const setStatus = useSetSubmissionStatus();

  const pending = useMemo(
    () =>
      (submissionsQuery.data ?? []).filter(
        (item) => item.kind === kind && item.status === "pending",
      ),
    [submissionsQuery.data, kind],
  );

  if (submissionsQuery.isLoading)
    return <LoadingState label="Loading submissions…" />;
  if (submissionsQuery.isError)
    return (
      <ErrorState
        message="We couldn't load submissions."
        onRetry={() => void submissionsQuery.refetch()}
      />
    );
  if (pending.length === 0)
    return (
      <EmptyState
        icon={Inbox}
        title={emptyTitle}
        description={emptyDescription}
      />
    );

  return (
    <ul data-ocid={`${ocidPrefix}.queue`} className="grid gap-4 lg:grid-cols-2">
      {pending.map((item, index) => (
        <li key={item.id.toString()} className="flex">
          <ApprovalQueueItem
            index={index}
            ocidPrefix={ocidPrefix}
            title={item.title}
            subtitle={`${item.subject} · submitted ${formatDateTime(item.submittedAt)}`}
            meta={
              <>
                <SubjectBadge subject={item.subject} variant="soft" />
                <StatusBadge status={item.status} />
              </>
            }
            body={item.description}
            isPending={setStatus.isPending}
            onApprove={(reason) =>
              setStatus.mutate({
                id: item.id,
                status: RequestStatus.approved,
                adminReason: reason,
              })
            }
            onReject={(reason) =>
              setStatus.mutate({
                id: item.id,
                status: RequestStatus.rejected,
                adminReason: reason,
              })
            }
            className="w-full"
          />
        </li>
      ))}
    </ul>
  );
}

function UsersPanel() {
  const usersQuery = useListUsers();
  const setRole = useSetUserRole();
  const revoke = useRevokeUserAccess();

  const users = useMemo(
    () =>
      [...(usersQuery.data ?? [])].sort((a, b) =>
        a.displayName.localeCompare(b.displayName),
      ),
    [usersQuery.data],
  );

  if (usersQuery.isLoading) return <LoadingState label="Loading members…" />;
  if (usersQuery.isError)
    return (
      <ErrorState
        message="We couldn't load the class list."
        onRetry={() => void usersQuery.refetch()}
      />
    );
  if (users.length === 0)
    return (
      <EmptyState
        icon={Users}
        title="No members yet"
        description="Approved classmates will appear here once they join."
      />
    );

  return (
    <div className="space-y-4">
      <RoleLegend />
      <ul data-ocid="admin.user_list" className="space-y-3">
        {users.map((user, index) => (
          <UserRow
            key={user.principal.toText()}
            user={user}
            index={index}
            isPending={setRole.isPending || revoke.isPending}
            onRoleChange={(role: Role) =>
              setRole.mutate({ user: user.principal, role })
            }
            onRevoke={() => revoke.mutate(user.principal)}
          />
        ))}
      </ul>
    </div>
  );
}

function TimetablePanel() {
  const eventsQuery = useListTimetableEvents();
  const addEvent = useAddTimetableEvent();
  const deleteEvent = useDeleteTimetableEvent();

  const events = useMemo(
    () =>
      [...(eventsQuery.data ?? [])].sort((a, b) =>
        a.startTime === b.startTime
          ? Number(a.id - b.id)
          : Number(a.startTime - b.startTime),
      ),
    [eventsQuery.data],
  );

  return (
    <div className="space-y-6">
      <TimetableEventForm
        isPending={addEvent.isPending}
        error={
          addEvent.isError ? "Could not add the event. Please try again." : null
        }
        onSubmit={(draft) => addEvent.mutate(draft)}
      />

      {eventsQuery.isLoading ? (
        <LoadingState label="Loading timetable…" />
      ) : eventsQuery.isError ? (
        <ErrorState
          message="We couldn't load the timetable."
          onRetry={() => void eventsQuery.refetch()}
        />
      ) : events.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="No timetable events"
          description="Add lessons and activities so the class knows the schedule."
        />
      ) : (
        <ul data-ocid="admin.timetable_list" className="space-y-3">
          {events.map((event, index) => (
            <TimetableEventRow
              key={event.id.toString()}
              event={event}
              index={index}
              isPending={deleteEvent.isPending}
              onDelete={() => deleteEvent.mutate(event.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { data: isAdmin, isLoading } = useIsCallerAdmin();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <PageHeader
          eyebrow="Teacher tools"
          title="Admin console"
          description="Approve members and manage the class."
        />
        <LoadingState label="Checking your access…" />
      </div>
    );
  }

  if (!isAdmin) return <AdminDenied />;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Teacher tools"
        title="Admin console"
        description="Approve requests, manage members and keep the timetable current."
      />

      <Tabs defaultValue="access" className="space-y-6">
        <TabsList
          data-ocid="admin.tabs"
          className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl border border-border bg-card p-1"
        >
          <TabsTrigger
            value="access"
            data-ocid="admin.tab.access"
            className="rounded-xl"
          >
            Access
          </TabsTrigger>
          <TabsTrigger
            value="homework"
            data-ocid="admin.tab.homework"
            className="rounded-xl"
          >
            Homework
          </TabsTrigger>
          <TabsTrigger
            value="suggestions"
            data-ocid="admin.tab.suggestions"
            className="rounded-xl"
          >
            Edit suggestions
          </TabsTrigger>
          <TabsTrigger
            value="users"
            data-ocid="admin.tab.users"
            className="rounded-xl"
          >
            Members
          </TabsTrigger>
          <TabsTrigger
            value="timetable"
            data-ocid="admin.tab.timetable"
            className="rounded-xl"
          >
            Timetable
          </TabsTrigger>
        </TabsList>

        <TabsContent value="access" data-ocid="admin.panel.access">
          <AccessQueue />
        </TabsContent>
        <TabsContent value="homework" data-ocid="admin.panel.homework">
          <SubmissionQueue
            kind={SubmissionKind.newHomework}
            ocidPrefix="admin.homework"
            emptyTitle="No homework to review"
            emptyDescription="New homework submissions waiting for approval will appear here."
          />
        </TabsContent>
        <TabsContent value="suggestions" data-ocid="admin.panel.suggestions">
          <SubmissionQueue
            kind={SubmissionKind.editSuggestion}
            ocidPrefix="admin.suggestion"
            emptyTitle="No edit suggestions"
            emptyDescription="Suggested changes to existing homework will appear here."
          />
        </TabsContent>
        <TabsContent value="users" data-ocid="admin.panel.users">
          <UsersPanel />
        </TabsContent>
        <TabsContent value="timetable" data-ocid="admin.panel.timetable">
          <TimetablePanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
