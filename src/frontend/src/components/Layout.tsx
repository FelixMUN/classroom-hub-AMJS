import { SignInButton } from "@/components/InternetIdentity";
import { useCallerProfile, useIsCallerAdmin } from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpenCheck,
  CalendarDays,
  LayoutDashboard,
  Megaphone,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { type ReactNode, useState } from "react";

interface NavLink {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  adminOnly?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/homework", label: "Homework", icon: BookOpenCheck },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/announcements", label: "Announcements", icon: Megaphone },
  { to: "/admin", label: "Admin", icon: ShieldCheck, adminOnly: true },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function ProfileChip() {
  const { data: profile } = useCallerProfile();
  const name = profile?.displayName?.trim() || "Classmate";
  return (
    <span className="flex items-center gap-2 rounded-full border border-border bg-muted/60 py-1 pl-1 pr-3">
      <span className="flex size-7 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
        {initials(name)}
      </span>
      <span className="max-w-[9rem] truncate text-sm font-medium text-foreground">
        {name}
      </span>
    </span>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: isAdmin } = useIsCallerAdmin();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const links = NAV_LINKS.filter((link) => !link.adminOnly || isAdmin);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Link
            to="/"
            data-ocid="nav.link"
            className="flex shrink-0 items-center gap-2 font-display text-lg font-extrabold tracking-tight"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
              <BookOpenCheck className="size-4" aria-hidden="true" />
            </span>
            <span className="text-foreground">
              CLASSROOM <span className="text-accent">HUB</span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center gap-1 md:flex"
          >
            {links.map((link) => {
              const active =
                link.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid="nav.link"
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm font-medium transition-smooth",
                    active
                      ? "text-accent"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:block">
              <ProfileChip />
            </div>
            <div className="hidden md:block">
              <SignInButton className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:border-accent/60 hover:text-foreground" />
            </div>
            <button
              type="button"
              data-ocid="nav.toggle"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-smooth hover:border-accent/60 md:hidden"
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav
            aria-label="Mobile"
            className="border-t border-border bg-card px-4 py-3 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const active =
                  link.to === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.to);
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      data-ocid="nav.link"
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-smooth",
                        active
                          ? "bg-accent/15 text-accent"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
              <ProfileChip />
              <SignInButton className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground" />
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>

      <footer className="border-t border-border bg-muted/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p className="font-display font-semibold text-foreground">
            CLASSROOM <span className="text-accent">HUB</span>
          </p>
          <p>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
