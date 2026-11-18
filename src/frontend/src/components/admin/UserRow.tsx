import type { Role, UserView } from "@/backend";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Loader2, ShieldCheck, UserX } from "lucide-react";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function UserRow({
  user,
  index,
  isPending,
  onRoleChange,
  onRevoke,
  className,
}: {
  user: UserView;
  index: number;
  isPending: boolean;
  onRoleChange: (role: Role) => void;
  onRevoke: () => void;
  className?: string;
}) {
  const name = user.displayName.trim() || "Unnamed classmate";

  return (
    <li
      data-ocid={`admin.user_row.${index + 1}`}
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-ink text-sm font-bold text-secondary-foreground">
          {initials(name)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium text-foreground">{name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {user.className.trim() || "No class set"} · joined{" "}
            {formatDate(user.requestedAt)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={user.approval} />
        <Select
          value={user.role}
          disabled={isPending}
          onValueChange={(value) => onRoleChange(value as Role)}
        >
          <SelectTrigger
            data-ocid={`admin.role_select.${index + 1}`}
            aria-label={`Role for ${name}`}
            className="w-[8.5rem] rounded-xl"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          size="sm"
          data-ocid={`admin.revoke_button.${index + 1}`}
          disabled={isPending}
          aria-label={`Revoke access for ${name}`}
          className="rounded-xl border-destructive/50 text-destructive transition-smooth hover:bg-destructive/10 hover:text-destructive"
          onClick={onRevoke}
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <UserX className="size-4" aria-hidden="true" />
          )}
          Revoke
        </Button>
      </div>
    </li>
  );
}

export function RoleLegend() {
  return (
    <p className="flex items-center gap-2 text-xs text-muted-foreground">
      <ShieldCheck className="size-4 text-accent" aria-hidden="true" />
      Admins can approve requests and manage the class.
    </p>
  );
}
