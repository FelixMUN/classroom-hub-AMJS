import { AccessGate } from "@/components/AccessGate";
import { Layout } from "@/components/Layout";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const HomeworkPage = lazy(() => import("@/pages/HomeworkPage"));
const CalendarPage = lazy(() => import("@/pages/CalendarPage"));
const AnnouncementsPage = lazy(() => import("@/pages/AnnouncementsPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));

function PageFallback() {
  return (
    <output
      data-ocid="loading_state"
      className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-card/50 px-6 py-14 text-sm text-muted-foreground"
    >
      <span className="size-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      Loading…
    </output>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <AccessGate>
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </Layout>
    </AccessGate>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});

const homeworkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/homework",
  component: HomeworkPage,
});

const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calendar",
  component: CalendarPage,
});

const announcementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/announcements",
  component: AnnouncementsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  homeworkRoute,
  calendarRoute,
  announcementsRoute,
  adminRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
