import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AnnouncementView {
    id: bigint;
    title: string;
    body: string;
    publishedAt: Timestamp;
    publishedBy: UserId;
}
export interface Cell {
    value: Value;
    name: string;
}
export interface CompletionView {
    homeworkId: bigint;
    completed: boolean;
    updatedAt: Timestamp;
    student: UserId;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface HomeworkView {
    id: bigint;
    title: string;
    subject: string;
    createdAt: Timestamp;
    createdBy: UserId;
    dueDate: Timestamp;
    description: string;
    assignedDate: Timestamp;
}
export interface InviteInfo {
    expiresAt?: Time;
    revoked: boolean;
    code: string;
    name: string;
    createdAt: Time;
    createdBy: Principal;
    redemptions: Array<Redemption>;
    maxUses?: bigint;
}
export interface Redemption {
    at: Time;
    user: Principal;
}
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export type Result__1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface SubmissionView {
    id: bigint;
    status: RequestStatus;
    title: string;
    subject: string;
    kind: SubmissionKind;
    adminReason?: string;
    dueDate: Timestamp;
    submittedAt: Timestamp;
    submittedBy: UserId;
    description: string;
    assignedDate: Timestamp;
    targetHomeworkId?: bigint;
}
export type Time = bigint;
export type Timestamp = bigint;
export interface TimetableView {
    id: bigint;
    startTime: Timestamp;
    subject: string;
    endTime: Timestamp;
    room: string;
    notes: string;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export type UserId = Principal;
export interface UserView {
    principal: UserId;
    displayName: string;
    role: Role;
    approval: ApprovalStatus;
    className: string;
    requestedAt: Timestamp;
}
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum InviteStatus {
    revoked = "revoked",
    expired = "expired",
    valid = "valid",
    invalid = "invalid",
    usedUp = "usedUp"
}
export enum RedeemResult {
    revoked = "revoked",
    expired = "expired",
    invalid = "invalid",
    usedUp = "usedUp",
    blocked = "blocked",
    joined = "joined",
    alreadyMember = "alreadyMember"
}
export enum RequestStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum Role {
    admin = "admin",
    student = "student"
}
export enum SubmissionKind {
    newHomework = "newHomework",
    editSuggestion = "editSuggestion"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addHomework(subject: string, title: string, description: string, assignedDate: Timestamp, dueDate: Timestamp): Promise<HomeworkView>;
    addTimetableEvent(subject: string, startTime: Timestamp, endTime: Timestamp, room: string, notes: string): Promise<TimetableView>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkInvite(code: string): Promise<InviteStatus>;
    createInvite(name: string, maxUses: bigint | null, expiresAt: Time | null): Promise<string>;
    deleteAnnouncement(id: bigint): Promise<boolean>;
    deleteHomework(id: bigint): Promise<boolean>;
    deleteTimetableEvent(id: bigint): Promise<boolean>;
    execute(qJson: string): Promise<Result>;
    getApiDoc(): Promise<string>;
    getCallerProfile(): Promise<UserView | null>;
    getCallerUserRole(): Promise<UserRole>;
    getHomework(id: bigint): Promise<HomeworkView | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listAnnouncements(): Promise<Array<AnnouncementView>>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    listHomework(): Promise<Array<HomeworkView>>;
    listInvites(): Promise<Array<InviteInfo>>;
    listMyCompletions(): Promise<Array<CompletionView>>;
    listMySubmissions(): Promise<Array<SubmissionView>>;
    listSubmissions(): Promise<Array<SubmissionView>>;
    listTimetableEvents(): Promise<Array<TimetableView>>;
    listUsers(): Promise<Array<UserView>>;
    publishAnnouncement(title: string, body: string): Promise<AnnouncementView>;
    redeemInvite(code: string): Promise<RedeemResult>;
    registerProfile(displayName: string, className: string): Promise<UserView>;
    removeApproval(user: Principal): Promise<void>;
    requestApproval(): Promise<void>;
    revokeInvite(code: string): Promise<void>;
    revokeUserAccess(user: UserId): Promise<void>;
    schema(): Promise<string>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    setCompletion(homeworkId: bigint, completed: boolean): Promise<CompletionView>;
    setSubmissionStatus(id: bigint, status: RequestStatus, adminReason: string | null): Promise<SubmissionView | null>;
    setUserApproval(user: UserId, approval: ApprovalStatus): Promise<void>;
    setUserRole(user: UserId, role: Role): Promise<void>;
    submitHomework(kind: SubmissionKind, targetHomeworkId: bigint | null, subject: string, title: string, description: string, assignedDate: Timestamp, dueDate: Timestamp): Promise<SubmissionView>;
    updateAnnouncement(id: bigint, title: string, body: string): Promise<AnnouncementView | null>;
    updateHomework(id: bigint, subject: string, title: string, description: string, assignedDate: Timestamp, dueDate: Timestamp): Promise<HomeworkView | null>;
    updateTimetableEvent(id: bigint, subject: string, startTime: Timestamp, endTime: Timestamp, room: string, notes: string): Promise<TimetableView | null>;
}
