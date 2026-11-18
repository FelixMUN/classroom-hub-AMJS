import { t as CalendarClock } from "./calendar-clock-BZx0sBtX.js";
import { n as CirclePlus, r as CircleCheck, t as Sparkles } from "./sparkles-WDKQoq40.js";
import { t as ListChecks } from "./list-checks-BxwzAYpZ.js";
import { B as cn, F as ApprovalStatus, J as __toESM, K as require_jsx_runtime, L as Role, a as ShieldCheck, b as useListHomework, c as CalendarDays, l as BookOpenCheck, o as Megaphone, p as useCallerProfile, q as require_react, s as Clock, t as Link, u as createLucideIcon, w as useListTimetableEvents, x as useListMyCompletions } from "./index-ow0ctTom.js";
import { _ as EmptyState, a as formatTime, b as PageHeader, c as timestampToDate, v as ErrorState, y as LoadingState } from "./format-Dk65RGef.js";
import { t as SubjectBadge } from "./SubjectBadge-GMXmhXc-.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var BadgeCheck = createLucideIcon("badge-check", [["path", {
	d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	key: "3c2336"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var DoorOpen = createLucideIcon("door-open", [
	["path", {
		d: "M11 20H2",
		key: "nlcfvz"
	}],
	["path", {
		d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z",
		key: "au4z13"
	}],
	["path", {
		d: "M11 4H8a2 2 0 0 0-2 2v14",
		key: "74r1mk"
	}],
	["path", {
		d: "M14 12h.01",
		key: "1jfl7z"
	}],
	["path", {
		d: "M22 20h-3",
		key: "vhrsz"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var GraduationCap = createLucideIcon("graduation-cap", [
	["path", {
		d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
		key: "j76jl0"
	}],
	["path", {
		d: "M22 10v6",
		key: "1lu8f3"
	}],
	["path", {
		d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
		key: "1r8lef"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var StickyNote = createLucideIcon("sticky-note", [["path", {
	d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z",
	key: "qazsjp"
}], ["path", {
	d: "M15 3v4a2 2 0 0 0 2 2h4",
	key: "40519r"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UserRound = createLucideIcon("user-round", [["circle", {
	cx: "12",
	cy: "8",
	r: "5",
	key: "1hypcn"
}], ["path", {
	d: "M20 21a8 8 0 0 0-16 0",
	key: "rfgkzh"
}]]);
//#endregion
//#region src/components/dashboard/DailyTimetable.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function isSameDay$1(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
/** Events whose start time falls on the given day, sorted by start time. */
function eventsForDay(events, day) {
	return events.filter((event) => {
		const start = timestampToDate(event.startTime);
		return start ? isSameDay$1(start, day) : false;
	}).sort((a, b) => Number(a.startTime - b.startTime));
}
function DailyTimetable({ events, day }) {
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const todayEvents = (0, import_react.useMemo)(() => eventsForDay(events, day), [events, day]);
	if (todayEvents.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: CalendarClock,
		title: "No classes today",
		description: "Your timetable is clear for today. Check the calendar for the rest of the week."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": "dashboard.timetable",
		className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
		children: todayEvents.map((event, index) => {
			const active = activeId === event.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"data-ocid": `dashboard.timetable.item.${index + 1}`,
				"aria-expanded": active,
				onClick: () => setActiveId(active ? null : event.id),
				onMouseEnter: () => setActiveId(event.id),
				onMouseLeave: () => setActiveId((current) => current === event.id ? null : current),
				onFocus: () => setActiveId(event.id),
				onBlur: () => setActiveId((current) => current === event.id ? null : current),
				className: cn("group flex flex-col gap-3 rounded-2xl border bg-card/70 p-4 text-left transition-smooth", active ? "-translate-y-1 border-accent/60 shadow-[0_12px_28px_-10px_oklch(0.86_0.17_92/0.45)]" : "border-border hover:border-accent/40"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectBadge, { subject: event.subject }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-xs font-semibold text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
									className: "size-3.5",
									"aria-hidden": "true"
								}),
								formatTime(event.startTime),
								"–",
								formatTime(event.endTime)
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("grid overflow-hidden transition-all duration-300", active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-h-0 space-y-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorOpen, {
									className: "size-4 shrink-0 text-accent",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: event.room.trim() || "Room to be confirmed"
								})]
							}), event.notes.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-start gap-2 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyNote, {
									className: "mt-0.5 size-4 shrink-0 text-accent",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "line-clamp-3",
									children: event.notes
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted-foreground",
						children: active ? "Tap again to hide details" : "Hover or tap for details"
					})
				]
			}, event.id.toString());
		})
	});
}
//#endregion
//#region src/components/dashboard/ProfileSummary.tsx
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
var APPROVAL_LABEL = {
	[ApprovalStatus.approved]: "Approved",
	[ApprovalStatus.pending]: "Pending approval",
	[ApprovalStatus.rejected]: "Access rejected"
};
var APPROVAL_STYLE = {
	[ApprovalStatus.approved]: "border-[oklch(0.72_0.16_150)]/50 bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)]",
	[ApprovalStatus.pending]: "border-accent/50 bg-accent/15 text-accent",
	[ApprovalStatus.rejected]: "border-primary/50 bg-primary/15 text-primary"
};
function ProfileSummary({ profile }) {
	const name = profile.displayName.trim() || "Classmate";
	const isAdmin = profile.role === Role.admin;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "dashboard.profile_summary",
		className: "flex flex-col gap-4 rounded-2xl border border-border bg-card/70 p-5 sm:flex-row sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary font-display text-2xl font-extrabold text-primary-foreground",
			children: initials(name)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1 space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "truncate font-display text-xl font-bold text-foreground",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold", isAdmin ? "border-secondary/50 bg-secondary/15 text-secondary" : "border-border bg-muted/60 text-muted-foreground"),
					children: [isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
						className: "size-3.5",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), isAdmin ? "Admin" : "Student"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {
						className: "size-4",
						"aria-hidden": "true"
					}), profile.className.trim() || "No class set"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold", APPROVAL_STYLE[profile.approval]),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), APPROVAL_LABEL[profile.approval]]
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/dashboard/QuickLinks.tsx
var TONE_STYLES$1 = {
	blue: "border-secondary/40 hover:border-secondary/70 hover:bg-secondary/10",
	yellow: "border-accent/40 hover:border-accent/70 hover:bg-accent/10",
	red: "border-primary/40 hover:border-primary/70 hover:bg-primary/10"
};
var ICON_STYLES = {
	blue: "bg-secondary/15 text-secondary",
	yellow: "bg-accent/15 text-accent",
	red: "bg-primary/15 text-primary"
};
function QuickLinks({ links }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-3",
		children: links.map((link, index) => {
			const Icon = link.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: link.to,
				"data-ocid": `dashboard.quick_link.${index + 1}`,
				className: cn("card-hover flex items-center gap-3 rounded-2xl border bg-card/70 p-4 transition-smooth", TONE_STYLES$1[link.tone]),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("flex size-11 shrink-0 items-center justify-center rounded-xl", ICON_STYLES[link.tone]),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-5",
						"aria-hidden": "true"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-display text-base font-bold text-foreground",
						children: link.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate text-sm text-muted-foreground",
						children: link.description
					})]
				})]
			}, link.to);
		})
	});
}
//#endregion
//#region src/components/dashboard/StatCard.tsx
var TONE_STYLES = {
	blue: {
		frame: "border-secondary/50 hover:shadow-[0_12px_28px_-10px_oklch(0.6_0.18_250/0.5)]",
		label: "bg-secondary text-secondary-foreground",
		value: "text-secondary",
		icon: "text-secondary"
	},
	yellow: {
		frame: "border-accent/50 hover:shadow-[0_12px_28px_-10px_oklch(0.86_0.17_92/0.5)]",
		label: "bg-accent text-accent-foreground",
		value: "text-accent",
		icon: "text-accent"
	},
	red: {
		frame: "border-primary/50 hover:shadow-[0_12px_28px_-10px_oklch(0.52_0.21_25/0.55)]",
		label: "bg-primary text-primary-foreground",
		value: "text-primary",
		icon: "text-primary"
	},
	green: {
		frame: "border-[oklch(0.72_0.16_150)]/50 hover:shadow-[0_12px_28px_-10px_oklch(0.72_0.16_150/0.5)]",
		label: "bg-[oklch(0.72_0.16_150)] text-[oklch(0.14_0.02_150)]",
		value: "text-[oklch(0.72_0.16_150)]",
		icon: "text-[oklch(0.72_0.16_150)]"
	}
};
function StatCard({ label, value, caption, icon: Icon, tone, index }) {
	const styles = TONE_STYLES[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"data-ocid": `dashboard.stat_card.${index}`,
		className: cn("card-hover flex flex-col gap-4 rounded-2xl border bg-card/70 p-5 backdrop-blur-sm", styles.frame),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider", styles.label),
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: cn("size-5", styles.icon),
					"aria-hidden": "true"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("font-display text-5xl font-extrabold leading-none tabular-nums", styles.value),
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: caption
			})
		]
	});
}
//#endregion
//#region src/pages/DashboardPage.tsx
var QUICK_LINKS = [
	{
		to: "/calendar",
		label: "Calendar",
		description: "See the month at a glance",
		icon: CalendarDays,
		tone: "blue"
	},
	{
		to: "/homework",
		label: "Add homework",
		description: "Log a new assignment",
		icon: CirclePlus,
		tone: "yellow"
	},
	{
		to: "/announcements",
		label: "Announcements",
		description: "Catch up on class news",
		icon: Megaphone,
		tone: "red"
	}
];
function isSameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
/** A task is "daily" when it is due today; everything else is long-term. */
function isDailyTask(homework, today) {
	const due = timestampToDate(homework.dueDate);
	return due ? isSameDay(due, today) : false;
}
function DashboardPage() {
	const profileQuery = useCallerProfile();
	const homeworkQuery = useListHomework();
	const completionsQuery = useListMyCompletions();
	const timetableQuery = useListTimetableEvents();
	const today = (0, import_react.useMemo)(() => /* @__PURE__ */ new Date(), []);
	const stats = (0, import_react.useMemo)(() => {
		const homework = homeworkQuery.data ?? [];
		const completedIds = new Set((completionsQuery.data ?? []).filter((completion) => completion.completed).map((completion) => completion.homeworkId.toString()));
		const daily = homework.filter((item) => isDailyTask(item, today));
		const longTerm = homework.filter((item) => !isDailyTask(item, today));
		const countCompleted = (items) => items.filter((item) => completedIds.has(item.id.toString())).length;
		return {
			dailyTotal: daily.length,
			dailyCompleted: countCompleted(daily),
			longTermTotal: longTerm.length,
			longTermCompleted: countCompleted(longTerm)
		};
	}, [
		homeworkQuery.data,
		completionsQuery.data,
		today
	]);
	const isLoading = profileQuery.isLoading || homeworkQuery.isLoading || completionsQuery.isLoading || timetableQuery.isLoading;
	const isError = profileQuery.isError || homeworkQuery.isError || completionsQuery.isError || timetableQuery.isError;
	const retry = () => {
		profileQuery.refetch();
		homeworkQuery.refetch();
		completionsQuery.refetch();
		timetableQuery.refetch();
	};
	const profile = profileQuery.data ?? null;
	const firstName = profile?.displayName?.trim().split(/\s+/)[0] || "there";
	const statCards = [
		{
			label: "Daily tasks",
			value: stats.dailyTotal,
			caption: "Assignments due today",
			icon: ListChecks,
			tone: "blue"
		},
		{
			label: "Daily done",
			value: stats.dailyCompleted,
			caption: "Completed today's work",
			icon: CircleCheck,
			tone: "yellow"
		},
		{
			label: "Long-term",
			value: stats.longTermTotal,
			caption: "Assignments due later",
			icon: BookOpenCheck,
			tone: "red"
		},
		{
			label: "Long-term done",
			value: stats.longTermCompleted,
			caption: "Completed ahead of time",
			icon: Sparkles,
			tone: "green"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Overview",
			title: `Welcome back, ${firstName}!`,
			description: "Let's smash today's goals."
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: "Loading your dashboard…" }) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
			message: "We couldn't load your dashboard right now.",
			onRetry: retry
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"data-ocid": "dashboard.stats",
				"aria-label": "Task statistics",
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: statCards.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: card.label,
					value: card.value,
					caption: card.caption,
					icon: card.icon,
					tone: card.tone,
					index: index + 1
				}, card.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				"aria-labelledby": "timetable-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "timetable-heading",
						className: "font-display text-xl font-bold text-foreground",
						children: "Today's timetable"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: today.toLocaleDateString(void 0, {
							weekday: "long",
							day: "numeric",
							month: "long"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyTimetable, {
					events: timetableQuery.data ?? [],
					day: today
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				"aria-labelledby": "quick-links-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "quick-links-heading",
					className: "font-display text-xl font-bold text-foreground",
					children: "Quick links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLinks, { links: QUICK_LINKS })]
			}),
			profile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSummary, { profile })
		] })]
	});
}
//#endregion
export { DashboardPage as default };
