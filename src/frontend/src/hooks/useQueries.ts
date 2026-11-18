import { createActor } from "@/backend";
import type {
  AnnouncementView,
  ApprovalStatus,
  CompletionView,
  HomeworkView,
  InviteInfo,
  RequestStatus,
  Role,
  SubmissionKind,
  SubmissionView,
  TimetableView,
  UserView,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* ------------------------------------------------------------------ */
/* Query keys                                                          */
/* ------------------------------------------------------------------ */

export const queryKeys = {
  callerProfile: ["callerProfile"] as const,
  callerApproved: ["callerApproved"] as const,
  callerAdmin: ["callerAdmin"] as const,
  users: ["users"] as const,
  approvals: ["approvals"] as const,
  invites: ["invites"] as const,
  homework: ["homework"] as const,
  homeworkItem: (id: bigint) => ["homework", id] as const,
  myCompletions: ["myCompletions"] as const,
  mySubmissions: ["mySubmissions"] as const,
  submissions: ["submissions"] as const,
  announcements: ["announcements"] as const,
  timetable: ["timetable"] as const,
};

/* ------------------------------------------------------------------ */
/* Profile + access                                                    */
/* ------------------------------------------------------------------ */

export function useCallerProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserView | null>({
    queryKey: queryKeys.callerProfile,
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerProfile();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useIsCallerApproved() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: queryKeys.callerApproved,
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerApproved();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: queryKeys.callerAdmin,
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useRegisterProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { displayName: string; className: string }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.registerProfile(input.displayName, input.className);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.callerProfile });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.callerApproved,
      });
      void queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}

export function useRequestApproval() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.requestApproval();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.callerApproved,
      });
      void queryClient.invalidateQueries({ queryKey: queryKeys.callerProfile });
      void queryClient.invalidateQueries({ queryKey: queryKeys.approvals });
    },
  });
}

/* ------------------------------------------------------------------ */
/* Admin: users, approvals, invites                                    */
/* ------------------------------------------------------------------ */

export function useListUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserView[]>({
    queryKey: queryKeys.users,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListApprovals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.approvals,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listApprovals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetUserApproval() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      user: Principal;
      approval: ApprovalStatus;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.setUserApproval(input.user, input.approval);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.users });
      void queryClient.invalidateQueries({ queryKey: queryKeys.approvals });
    },
  });
}

export function useSetUserRole() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { user: Principal; role: Role }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.setUserRole(input.user, input.role);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}

export function useRevokeUserAccess() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Principal) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.revokeUserAccess(user);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.users });
      void queryClient.invalidateQueries({ queryKey: queryKeys.approvals });
    },
  });
}

export function useListInvites() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<InviteInfo[]>({
    queryKey: queryKeys.invites,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listInvites();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateInvite() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      name: string;
      maxUses: bigint | null;
      expiresAt: bigint | null;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.createInvite(input.name, input.maxUses, input.expiresAt);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.invites });
    },
  });
}

export function useRevokeInvite() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.revokeInvite(code);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.invites });
    },
  });
}

/* ------------------------------------------------------------------ */
/* Homework                                                            */
/* ------------------------------------------------------------------ */

export function useListHomework() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<HomeworkView[]>({
    queryKey: queryKeys.homework,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listHomework();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetHomework(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<HomeworkView | null>({
    queryKey: queryKeys.homeworkItem(id ?? 0n),
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getHomework(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useAddHomework() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      subject: string;
      title: string;
      description: string;
      assignedDate: bigint;
      dueDate: bigint;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.addHomework(
        input.subject,
        input.title,
        input.description,
        input.assignedDate,
        input.dueDate,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.homework });
    },
  });
}

export function useUpdateHomework() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      id: bigint;
      subject: string;
      title: string;
      description: string;
      assignedDate: bigint;
      dueDate: bigint;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.updateHomework(
        input.id,
        input.subject,
        input.title,
        input.description,
        input.assignedDate,
        input.dueDate,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.homework });
    },
  });
}

export function useDeleteHomework() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.deleteHomework(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.homework });
    },
  });
}

export function useSetCompletion() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { homeworkId: bigint; completed: boolean }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.setCompletion(input.homeworkId, input.completed);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.myCompletions });
    },
  });
}

export function useListMyCompletions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CompletionView[]>({
    queryKey: queryKeys.myCompletions,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyCompletions();
    },
    enabled: !!actor && !isFetching,
  });
}

/* ------------------------------------------------------------------ */
/* Submissions                                                         */
/* ------------------------------------------------------------------ */

export function useSubmitHomework() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      kind: SubmissionKind;
      targetHomeworkId: bigint | null;
      subject: string;
      title: string;
      description: string;
      assignedDate: bigint;
      dueDate: bigint;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.submitHomework(
        input.kind,
        input.targetHomeworkId,
        input.subject,
        input.title,
        input.description,
        input.assignedDate,
        input.dueDate,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.mySubmissions });
      void queryClient.invalidateQueries({ queryKey: queryKeys.submissions });
    },
  });
}

export function useListMySubmissions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SubmissionView[]>({
    queryKey: queryKeys.mySubmissions,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMySubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListSubmissions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SubmissionView[]>({
    queryKey: queryKeys.submissions,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetSubmissionStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      id: bigint;
      status: RequestStatus;
      adminReason: string | null;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.setSubmissionStatus(
        input.id,
        input.status,
        input.adminReason,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.submissions });
      void queryClient.invalidateQueries({ queryKey: queryKeys.mySubmissions });
      void queryClient.invalidateQueries({ queryKey: queryKeys.homework });
    },
  });
}

/* ------------------------------------------------------------------ */
/* Announcements                                                       */
/* ------------------------------------------------------------------ */

export function useListAnnouncements() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AnnouncementView[]>({
    queryKey: queryKeys.announcements,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAnnouncements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePublishAnnouncement() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { title: string; body: string }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.publishAnnouncement(input.title, input.body);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.announcements });
    },
  });
}

export function useUpdateAnnouncement() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { id: bigint; title: string; body: string }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.updateAnnouncement(input.id, input.title, input.body);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.announcements });
    },
  });
}

export function useDeleteAnnouncement() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.deleteAnnouncement(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.announcements });
    },
  });
}

/* ------------------------------------------------------------------ */
/* Timetable                                                           */
/* ------------------------------------------------------------------ */

export function useListTimetableEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TimetableView[]>({
    queryKey: queryKeys.timetable,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTimetableEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTimetableEvent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      subject: string;
      startTime: bigint;
      endTime: bigint;
      room: string;
      notes: string;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.addTimetableEvent(
        input.subject,
        input.startTime,
        input.endTime,
        input.room,
        input.notes,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.timetable });
    },
  });
}

export function useUpdateTimetableEvent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      id: bigint;
      subject: string;
      startTime: bigint;
      endTime: bigint;
      room: string;
      notes: string;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.updateTimetableEvent(
        input.id,
        input.subject,
        input.startTime,
        input.endTime,
        input.room,
        input.notes,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.timetable });
    },
  });
}

export function useDeleteTimetableEvent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.deleteTimetableEvent(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.timetable });
    },
  });
}
