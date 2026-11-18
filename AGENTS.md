# Project Guidance

## User Preferences

- Black background with deep red, bright yellow, blue and white colour palette
- Decorative headings with readable body text
- Interactive cards, hover effects and smooth transitions
- Modern, colourful and slightly playful appearance
- Fully responsive on desktop, tablet and mobile

## Accepted Requirements

- Internet Identity sign-in with access requests and admin approval
- Admin and Student roles enforced server-side
- Dashboard with welcome message, task statistics and interactive daily timetable
- Interactive month/week/day homework calendar with Daily and Subject views, search and filter
- Permanent homework history across previous months and academic years
- Add/manage homework form with student submissions and edit suggestions
- Pending/Approved/Rejected approval workflow with approved changes visible to everyone
- Announcements page with admin publish/manage
- Admin console for approving registrations, homework and edit suggestions
- Persistent backend database with server-side permissions and cross-user sync
- Black/deep-red/bright-yellow/blue responsive design with hover effects and transitions

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- Backend commands from src/backend/: mops install, mops check --fix, mops build. Frontend commands from src/frontend/: pnpm install --prefer-offline, pnpm typecheck, pnpm fix, pnpm build. Bindings from the repo root: pnpm bindgen.
- Private mixin functions share the actor block scope: same-named helpers in two included mixins collide with M0051, so name each mixin's guards uniquely.
- getCallerProfile must not be approved-guarded: it returns null for an unregistered caller so the frontend can route a first-time user to the registration form, while the app's data endpoints keep their own approved-member guards.
- React Query v5 isPending is false on error, so a gate must order its error branch before the loading branch to avoid a permanent loading state.
- A student's Submit homework action must call submitHomework with SubmissionKind.newHomework, not the admin-only addHomework endpoint.
- String enums from @/backend are not assignable from string literals; pass the enum member rather than a plain string.
- The frontend uses TanStack Router with an AccessGate that blocks unapproved users and an admin-gated Admin route; page bodies live in src/frontend/src/pages/.
