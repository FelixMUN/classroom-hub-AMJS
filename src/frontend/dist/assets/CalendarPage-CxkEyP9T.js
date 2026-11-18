import { a as SelectValue, c as Check, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CwX7hyRW.js";
import { t as ListChecks } from "./list-checks-BxwzAYpZ.js";
import { B as cn, J as __toESM, K as require_jsx_runtime, O as useSetCompletion, b as useListHomework, c as CalendarDays, i as X, l as BookOpenCheck, n as Label, q as require_react, r as Input, s as Clock, u as createLucideIcon, x as useListMyCompletions, z as Button } from "./index-ow0ctTom.js";
import { _ as EmptyState, b as PageHeader, c as timestampToDate, d as isSameDay, f as startOfWeek, g as toDate, h as constructFrom, i as formatDueLabel, m as addDays, n as formatDate, p as getDefaultOptions, s as isOverdue, u as format, v as ErrorState, y as LoadingState } from "./format-Dk65RGef.js";
import { t as SubjectBadge } from "./SubjectBadge-GMXmhXc-.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CalendarCheck = createLucideIcon("calendar-check", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}],
	["path", {
		d: "m9 16 2 2 4-4",
		key: "19s6y9"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronLeft = createLucideIcon("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronRight = createLucideIcon("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Circle = createLucideIcon("circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LayoutGrid = createLucideIcon("layout-grid", [
	["rect", {
		width: "7",
		height: "7",
		x: "3",
		y: "3",
		rx: "1",
		key: "1g98yp"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "14",
		y: "3",
		rx: "1",
		key: "6d4xhi"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "14",
		y: "14",
		rx: "1",
		key: "nxv5o0"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "3",
		y: "14",
		rx: "1",
		key: "1bb6yr"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Search = createLucideIcon("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]);
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addMonths.mjs
/**
* @name addMonths
* @category Month Helpers
* @summary Add the specified number of months to the given date.
*
* @description
* Add the specified number of months to the given date.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
*
* @param date - The date to be changed
* @param amount - The amount of months to be added.
*
* @returns The new date with the months added
*
* @example
* // Add 5 months to 1 September 2014:
* const result = addMonths(new Date(2014, 8, 1), 5)
* //=> Sun Feb 01 2015 00:00:00
*
* // Add one month to 30 January 2023:
* const result = addMonths(new Date(2023, 0, 30), 1)
* //=> Tue Feb 28 2023 00:00:00
*/
function addMonths(date, amount) {
	const _date = toDate(date);
	if (isNaN(amount)) return constructFrom(date, NaN);
	if (!amount) return _date;
	const dayOfMonth = _date.getDate();
	const endOfDesiredMonth = constructFrom(date, _date.getTime());
	endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
	if (dayOfMonth >= endOfDesiredMonth.getDate()) return endOfDesiredMonth;
	else {
		_date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
		return _date;
	}
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addWeeks.mjs
/**
* @name addWeeks
* @category Week Helpers
* @summary Add the specified number of weeks to the given date.
*
* @description
* Add the specified number of week to the given date.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
*
* @param date - The date to be changed
* @param amount - The amount of weeks to be added.
*
* @returns The new date with the weeks added
*
* @example
* // Add 4 weeks to 1 September 2014:
* const result = addWeeks(new Date(2014, 8, 1), 4)
* //=> Mon Sep 29 2014 00:00:00
*/
function addWeeks(date, amount) {
	const days = amount * 7;
	return addDays(date, days);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/endOfMonth.mjs
/**
* @name endOfMonth
* @category Month Helpers
* @summary Return the end of a month for the given date.
*
* @description
* Return the end of a month for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
*
* @param date - The original date
*
* @returns The end of a month
*
* @example
* // The end of a month for 2 September 2014 11:55:00:
* const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
* //=> Tue Sep 30 2014 23:59:59.999
*/
function endOfMonth(date) {
	const _date = toDate(date);
	const month = _date.getMonth();
	_date.setFullYear(_date.getFullYear(), month + 1, 0);
	_date.setHours(23, 59, 59, 999);
	return _date;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfMonth.mjs
/**
* @name startOfMonth
* @category Month Helpers
* @summary Return the start of a month for the given date.
*
* @description
* Return the start of a month for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
*
* @param date - The original date
*
* @returns The start of a month
*
* @example
* // The start of a month for 2 September 2014 11:55:00:
* const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
* //=> Mon Sep 01 2014 00:00:00
*/
function startOfMonth(date) {
	const _date = toDate(date);
	_date.setDate(1);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/endOfWeek.mjs
/**
* The {@link endOfWeek} function options.
*/
/**
* @name endOfWeek
* @category Week Helpers
* @summary Return the end of a week for the given date.
*
* @description
* Return the end of a week for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
*
* @param date - The original date
* @param options - An object with options
*
* @returns The end of a week
*
* @example
* // The end of a week for 2 September 2014 11:55:00:
* const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
* //=> Sat Sep 06 2014 23:59:59.999
*
* @example
* // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
* const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
* //=> Sun Sep 07 2014 23:59:59.999
*/
function endOfWeek(date, options) {
	const defaultOptions = getDefaultOptions();
	const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;
	const _date = toDate(date);
	const day = _date.getDay();
	const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
	_date.setDate(_date.getDate() + diff);
	_date.setHours(23, 59, 59, 999);
	return _date;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/isSameMonth.mjs
/**
* @name isSameMonth
* @category Month Helpers
* @summary Are the given dates in the same month (and year)?
*
* @description
* Are the given dates in the same month (and year)?
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
*
* @param dateLeft - The first date to check
* @param dateRight - The second date to check
*
* @returns The dates are in the same month (and year)
*
* @example
* // Are 2 September 2014 and 25 September 2014 in the same month?
* const result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
* //=> true
*
* @example
* // Are 2 September 2014 and 25 September 2015 in the same month?
* const result = isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
* //=> false
*/
function isSameMonth(dateLeft, dateRight) {
	const _dateLeft = toDate(dateLeft);
	const _dateRight = toDate(dateRight);
	return _dateLeft.getFullYear() === _dateRight.getFullYear() && _dateLeft.getMonth() === _dateRight.getMonth();
}
//#endregion
//#region src/components/calendar/CalendarFilters.tsx
var import_jsx_runtime = require_jsx_runtime();
var STATUS_OPTIONS = [
	{
		value: "all",
		label: "All statuses"
	},
	{
		value: "pending",
		label: "Pending"
	},
	{
		value: "completed",
		label: "Completed"
	}
];
/** Search by title/subject plus subject, status and date-range filters. */
function CalendarFiltersBar({ filters, subjects, onChange, onReset }) {
	const active = filters.query !== "" || filters.subject !== "all" || filters.status !== "all" || filters.from !== "" || filters.to !== "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Search and filters",
		"data-ocid": "calendar.filters",
		className: "grid grid-cols-1 gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5 sm:col-span-2 lg:col-span-1 xl:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "calendar-search",
					children: "Search"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "calendar-search",
						"data-ocid": "calendar.search_input",
						value: filters.query,
						onChange: (event) => onChange({ query: event.target.value }),
						placeholder: "Title or subject",
						className: "pl-9"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "calendar-subject",
					children: "Subject"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: filters.subject,
					onValueChange: (value) => onChange({ subject: value }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						id: "calendar-subject",
						"data-ocid": "calendar.subject_select",
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All subjects" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "all",
						children: "All subjects"
					}), subjects.map((subject) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: subject,
						children: subject
					}, subject))] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "calendar-status",
					children: "Status"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: filters.status,
					onValueChange: (value) => onChange({ status: value }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						id: "calendar-status",
						"data-ocid": "calendar.status_select",
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All statuses" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: STATUS_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: option.value,
						children: option.label
					}, option.value)) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "calendar-from",
					children: "From"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "calendar-from",
					type: "date",
					"data-ocid": "calendar.from_input",
					value: filters.from,
					onChange: (event) => onChange({ from: event.target.value })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "calendar-to",
					children: "To"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "calendar-to",
					type: "date",
					"data-ocid": "calendar.to_input",
					value: filters.to,
					onChange: (event) => onChange({ to: event.target.value })
				})]
			}),
			active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-end sm:col-span-2 lg:col-span-3 xl:col-span-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: onReset,
					"data-ocid": "calendar.reset_button",
					className: "rounded-full text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "size-4",
						"aria-hidden": "true"
					}), "Clear filters"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/calendar/calendar-utils.ts
var EMPTY_FILTERS = {
	query: "",
	subject: "all",
	status: "all",
	from: "",
	to: ""
};
/** Stable `yyyy-MM-dd` key for a Date in local time. */
function dayKey(date) {
	return format(date, "yyyy-MM-dd");
}
/** Build the caller's completion lookup keyed by homework id string. */
function completionMap(completions) {
	const map = /* @__PURE__ */ new Map();
	for (const entry of completions ?? []) map.set(entry.homeworkId.toString(), entry.completed);
	return map;
}
/** Pair homework with completion state and parsed dates. */
function toCalendarItems(homework, completions) {
	return (homework ?? []).map((item) => ({
		homework: item,
		completed: completions.get(item.id.toString()) ?? false,
		dueDate: timestampToDate(item.dueDate),
		assignedDate: timestampToDate(item.assignedDate)
	}));
}
/** Apply search, subject, status and date-range filters. */
function applyFilters(items, filters) {
	const query = filters.query.trim().toLowerCase();
	const from = filters.from ? /* @__PURE__ */ new Date(`${filters.from}T00:00:00`) : null;
	const to = filters.to ? /* @__PURE__ */ new Date(`${filters.to}T23:59:59`) : null;
	return items.filter((item) => {
		if (query) {
			if (!`${item.homework.title} ${item.homework.subject}`.toLowerCase().includes(query)) return false;
		}
		if (filters.subject !== "all" && item.homework.subject !== filters.subject) return false;
		if (filters.status === "completed" && !item.completed) return false;
		if (filters.status === "pending" && item.completed) return false;
		if (from && item.dueDate && item.dueDate < from) return false;
		if (to && item.dueDate && item.dueDate > to) return false;
		return true;
	});
}
/** Group items by their due-date key, sorted ascending by due date. */
function groupByDay(items) {
	const groups = /* @__PURE__ */ new Map();
	for (const item of items) {
		if (!item.dueDate) continue;
		const key = dayKey(item.dueDate);
		const bucket = groups.get(key);
		if (bucket) bucket.push(item);
		else groups.set(key, [item]);
	}
	for (const bucket of groups.values()) bucket.sort((a, b) => (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0));
	return groups;
}
/** Group items by subject, sorted alphabetically. */
function groupBySubject(items) {
	const groups = /* @__PURE__ */ new Map();
	for (const item of items) {
		const key = item.homework.subject || "General";
		const bucket = groups.get(key);
		if (bucket) bucket.push(item);
		else groups.set(key, [item]);
	}
	return [...groups.entries()].map(([subject, groupItems]) => ({
		subject,
		items: groupItems.sort((a, b) => (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0))
	})).sort((a, b) => a.subject.localeCompare(b.subject));
}
/** Distinct subject names present in the data, sorted. */
function subjectOptions(items) {
	return [...new Set(items.map((item) => item.homework.subject).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}
/** The 6x7 grid of days covering a month, including leading/trailing days. */
function monthGrid(anchor) {
	const start = startOfWeek(startOfMonth(anchor), { weekStartsOn: 1 });
	const end = endOfWeek(endOfMonth(anchor), { weekStartsOn: 1 });
	const days = [];
	let cursor = start;
	while (cursor <= end) {
		days.push(cursor);
		cursor = addDays(cursor, 1);
	}
	return days;
}
/** The seven days of the week containing the anchor. */
function weekDays(anchor) {
	const start = startOfWeek(anchor, { weekStartsOn: 1 });
	return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}
/** Move the anchor date by one period in the given direction. */
function shiftPeriod(anchor, view, direction) {
	if (view === "month") return addMonths(anchor, direction);
	if (view === "week") return addWeeks(anchor, direction);
	return addDays(anchor, direction);
}
/** Human label for the current period. */
function periodLabel(anchor, view) {
	if (view === "month") return format(anchor, "MMMM yyyy");
	if (view === "week") {
		const days = weekDays(anchor);
		const first = days[0];
		const last = days[days.length - 1];
		if (isSameMonth(first, last)) return `${format(first, "d")}–${format(last, "d MMM yyyy")}`;
		return `${format(first, "d MMM")} – ${format(last, "d MMM yyyy")}`;
	}
	return format(anchor, "EEEE d MMMM yyyy");
}
//#endregion
//#region src/components/calendar/CalendarToolbar.tsx
var VIEWS = [
	{
		value: "month",
		label: "Month"
	},
	{
		value: "week",
		label: "Week"
	},
	{
		value: "day",
		label: "Day"
	}
];
/** Period navigation plus the month/week/day view switcher. */
function CalendarToolbar({ anchor, view, onViewChange, onShift, onToday }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 sm:flex-row sm:items-center sm:justify-between",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "icon",
						onClick: () => onShift(-1),
						"data-ocid": "calendar.pagination_prev",
						"aria-label": "Previous period",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							className: "size-4",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "icon",
						onClick: () => onShift(1),
						"data-ocid": "calendar.pagination_next",
						"aria-label": "Next period",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
							className: "size-4",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: onToday,
						"data-ocid": "calendar.today_button",
						className: "rounded-full font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
							className: "size-4",
							"aria-hidden": "true"
						}), "Today"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ocid": "calendar.period_label",
				className: "font-display text-lg font-bold text-foreground sm:text-center",
				children: periodLabel(anchor, view)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "tablist",
				"aria-label": "Calendar view",
				className: "flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1",
				children: VIEWS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": view === option.value,
					"data-ocid": `calendar.view.${option.value}`,
					onClick: () => onViewChange(option.value),
					className: cn("rounded-full px-3 py-1.5 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", view === option.value ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
					children: option.label
				}, option.value))
			})
		]
	});
}
//#endregion
//#region src/components/calendar/HomeworkCard.tsx
/**
* Interactive assignment card: subject badge, title, due date and a
* complete/incomplete toggle that persists per student.
*/
function HomeworkCard({ item, index, onToggle, isToggling, compact = false }) {
	const { homework, completed, dueDate } = item;
	const overdue = !completed && isOverdue(homework.dueDate);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"data-ocid": `calendar.item.${index}`,
		className: cn("card-hover group relative flex flex-col gap-3 rounded-2xl border bg-card p-4", completed ? "border-[oklch(0.72_0.16_150)]/40" : overdue ? "border-destructive/50" : "border-border"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectBadge, {
					subject: homework.subject,
					variant: "soft"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", completed ? "bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)]" : overdue ? "bg-destructive/15 text-destructive" : "bg-accent/15 text-accent"),
					children: [completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-3",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
						className: "size-3",
						"aria-hidden": "true"
					}), completed ? "Completed" : overdue ? "Overdue" : "Pending"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: cn("font-display text-base font-bold leading-snug text-foreground", completed && "text-muted-foreground line-through"),
					children: homework.title
				}), !compact && homework.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-2 text-sm text-muted-foreground",
					children: homework.description
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-foreground",
						children: dueDate ? formatDueLabel(homework.dueDate) : "No due date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Due ", formatDate(homework.dueDate)] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: completed ? "outline" : "default",
					disabled: isToggling,
					onClick: () => onToggle(item),
					"data-ocid": `calendar.toggle.${index}`,
					"aria-pressed": completed,
					className: cn("rounded-full transition-smooth", completed ? "border-[oklch(0.72_0.16_150)]/50 text-[oklch(0.72_0.16_150)] hover:bg-[oklch(0.72_0.16_150)]/10" : "bg-gradient-primary text-primary-foreground hover:brightness-110"),
					children: [completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
						className: "size-3.5",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), completed ? "Mark incomplete" : "Mark complete"]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/calendar/DayView.tsx
/** Day view: the selected day's assignments as full interactive cards. */
function DayView({ date, items, onToggle, togglingId }) {
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: CalendarCheck,
		title: "Nothing due this day",
		description: `No homework is scheduled for ${format(date, "EEEE d MMMM yyyy")}. Pick another date or clear your filters.`
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
		children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeworkCard, {
			item,
			index,
			onToggle,
			isToggling: togglingId === item.homework.id.toString()
		}, item.homework.id.toString()))
	});
}
//#endregion
//#region src/components/calendar/DetailPanel.tsx
/** Detail panel for the selected date: that day's homework as cards. */
function DetailPanel({ date, items, onToggle, togglingId }) {
	const pending = items.filter((item) => !item.completed).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Selected date homework",
		"data-ocid": "calendar.detail_panel",
		className: "flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-4 sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-accent",
				children: "Selected date"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-bold text-foreground",
				children: format(date, "EEEE d MMMM yyyy")
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					items.length,
					" assignment",
					items.length === 1 ? "" : "s",
					" · ",
					pending,
					" ",
					"pending"
				]
			})]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: CalendarCheck,
			title: "No homework on this date",
			description: "Select another day on the calendar, or adjust your search and filters to find assignments."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-4 md:grid-cols-2",
			children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeworkCard, {
				item,
				index,
				onToggle,
				isToggling: togglingId === item.homework.id.toString()
			}, item.homework.id.toString()))
		})]
	});
}
//#endregion
//#region src/components/calendar/MonthView.tsx
var WEEKDAY_LABELS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
];
/** Month grid: 6 weeks of day cells with subject chips and completion dots. */
function MonthView({ anchor, selected, itemsByDay, onSelectDate }) {
	const days = monthGrid(anchor);
	const today = /* @__PURE__ */ new Date();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-2xl border border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-7 border-b border-border bg-muted/40",
			children: WEEKDAY_LABELS.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: label
			}, label))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-7",
			children: days.map((day) => {
				const key = dayKey(day);
				const dayItems = itemsByDay.get(key) ?? [];
				const inMonth = isSameMonth(day, anchor);
				const isSelected = isSameDay(day, selected);
				const isToday = isSameDay(day, today);
				const pending = dayItems.filter((item) => !item.completed).length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"data-ocid": `calendar.day.${key}`,
					onClick: () => onSelectDate(day),
					"aria-pressed": isSelected,
					"aria-label": `${format(day, "d MMMM yyyy")}, ${dayItems.length} assignments`,
					className: cn("group relative flex min-h-[5.5rem] flex-col gap-1 border-b border-r border-border p-2 text-left transition-smooth last:border-r-0 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-[7rem]", !inMonth && "bg-background/40 opacity-50", isSelected && "bg-accent/10 ring-1 ring-inset ring-accent/60"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex size-6 items-center justify-center rounded-full text-xs font-semibold", isToday ? "bg-gradient-primary text-primary-foreground" : "text-foreground"),
								children: format(day, "d")
							}), dayItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[0.65rem] font-semibold text-muted-foreground",
								children: dayItems.length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex flex-col gap-1",
							children: [dayItems.slice(0, 2).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("truncate rounded-md px-1.5 py-0.5 text-[0.65rem] font-medium", item.completed ? "bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)] line-through" : "bg-secondary/15 text-secondary"),
								children: item.homework.title
							}, item.homework.id.toString())), dayItems.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-1.5 text-[0.65rem] font-medium text-muted-foreground",
								children: [
									"+",
									dayItems.length - 2,
									" more"
								]
							})]
						}),
						pending > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute bottom-1.5 right-1.5 size-1.5 rounded-full bg-accent",
							"aria-hidden": "true"
						})
					]
				}, key);
			})
		})]
	});
}
//#endregion
//#region src/components/calendar/SubjectView.tsx
/** Subject view: assignments grouped by subject across the whole history. */
function SubjectView({ items, onToggle, togglingId }) {
	const groups = groupBySubject(items);
	if (groups.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: BookOpenCheck,
		title: "No homework matches",
		description: "No assignments match your current search and filters. Try clearing them to see the full history."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-8",
		children: groups.map((group) => {
			const pending = group.items.filter((item) => !item.completed).length;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-ocid": `calendar.subject_group.${group.subject}`,
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectBadge, { subject: group.subject }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted-foreground",
						children: [
							group.items.length,
							" assignment",
							group.items.length === 1 ? "" : "s",
							" · ",
							pending,
							" pending"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
					children: group.items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeworkCard, {
						item,
						index,
						onToggle,
						isToggling: togglingId === item.homework.id.toString()
					}, item.homework.id.toString()))
				})]
			}, group.subject);
		})
	});
}
//#endregion
//#region src/components/calendar/WeekView.tsx
/** Week view: seven day columns, each listing that day's assignments. */
function WeekView({ anchor, selected, itemsByDay, onSelectDate }) {
	const days = weekDays(anchor);
	const today = /* @__PURE__ */ new Date();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7",
		children: days.map((day) => {
			const key = dayKey(day);
			const dayItems = itemsByDay.get(key) ?? [];
			const isSelected = isSameDay(day, selected);
			const isToday = isSameDay(day, today);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"data-ocid": `calendar.weekday.${key}`,
				onClick: () => onSelectDate(day),
				"aria-pressed": isSelected,
				className: cn("flex min-h-[9rem] flex-col gap-2 rounded-2xl border bg-card p-3 text-left transition-smooth hover:border-accent/50 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", isSelected ? "border-accent/70 ring-1 ring-accent/40" : "border-border"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: format(day, "EEE")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("flex size-7 items-center justify-center rounded-full text-sm font-bold", isToday ? "bg-gradient-primary text-primary-foreground" : "text-foreground"),
						children: format(day, "d")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex flex-1 flex-col gap-1.5",
					children: dayItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: "No homework"
					}) : dayItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("truncate rounded-lg px-2 py-1 text-xs font-medium", item.completed ? "bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)] line-through" : "bg-secondary/15 text-secondary"),
						children: item.homework.title
					}, item.homework.id.toString()))
				})]
			}, key);
		})
	});
}
//#endregion
//#region src/pages/CalendarPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function CalendarPage() {
	const homeworkQuery = useListHomework();
	const completionsQuery = useListMyCompletions();
	const setCompletion = useSetCompletion();
	const [view, setView] = (0, import_react.useState)("month");
	const [grouping, setGrouping] = (0, import_react.useState)("daily");
	const [anchor, setAnchor] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [selected, setSelected] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [filters, setFilters] = (0, import_react.useState)(EMPTY_FILTERS);
	const [togglingId, setTogglingId] = (0, import_react.useState)(null);
	const allItems = (0, import_react.useMemo)(() => toCalendarItems(homeworkQuery.data, completionMap(completionsQuery.data)), [homeworkQuery.data, completionsQuery.data]);
	const filtered = (0, import_react.useMemo)(() => applyFilters(allItems, filters), [allItems, filters]);
	const itemsByDay = (0, import_react.useMemo)(() => groupByDay(filtered), [filtered]);
	const subjects = (0, import_react.useMemo)(() => subjectOptions(allItems), [allItems]);
	const selectedItems = (0, import_react.useMemo)(() => itemsByDay.get(dayKey(selected)) ?? [], [itemsByDay, selected]);
	const isLoading = homeworkQuery.isLoading || completionsQuery.isLoading || !homeworkQuery.isFetched;
	function handleToggle(item) {
		const id = item.homework.id.toString();
		setTogglingId(id);
		setCompletion.mutate({
			homeworkId: item.homework.id,
			completed: !item.completed
		}, { onSettled: () => setTogglingId(null) });
	}
	function handleSelectDate(date) {
		setSelected(date);
		setAnchor(date);
	}
	function handleShift(direction) {
		const next = shiftPeriod(anchor, view, direction);
		setAnchor(next);
		setSelected(next);
	}
	function handleToday() {
		const now = /* @__PURE__ */ new Date();
		setAnchor(now);
		setSelected(now);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Schedule",
				title: "Calendar",
				description: "Browse every assignment by month, week or day — and keep the whole year's history at your fingertips."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarToolbar, {
				anchor,
				view,
				onViewChange: setView,
				onShift: handleShift,
				onToday: handleToday
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarFiltersBar, {
				filters,
				subjects,
				onChange: (patch) => setFilters((prev) => ({
					...prev,
					...patch
				})),
				onReset: () => setFilters(EMPTY_FILTERS)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium text-muted-foreground",
					children: "Group by"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "tablist",
					"aria-label": "Grouping",
					className: "flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "tab",
						"aria-selected": grouping === "daily",
						"data-ocid": "calendar.grouping.daily",
						onClick: () => setGrouping("daily"),
						className: cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", grouping === "daily" ? "bg-gradient-ink text-secondary-foreground" : "text-muted-foreground hover:text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {
							className: "size-4",
							"aria-hidden": "true"
						}), "Daily View"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "tab",
						"aria-selected": grouping === "subject",
						"data-ocid": "calendar.grouping.subject",
						onClick: () => setGrouping("subject"),
						className: cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", grouping === "subject" ? "bg-gradient-ink text-secondary-foreground" : "text-muted-foreground hover:text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, {
							className: "size-4",
							"aria-hidden": "true"
						}), "Subject View"]
					})]
				})]
			}),
			homeworkQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				message: "We couldn't load the homework calendar.",
				onRetry: () => void homeworkQuery.refetch()
			}) : isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: "Loading your calendar…" }) : grouping === "subject" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectView, {
				items: filtered,
				onToggle: handleToggle,
				togglingId
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					view === "month" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthView, {
						anchor,
						selected,
						itemsByDay,
						onSelectDate: handleSelectDate
					}),
					view === "week" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekView, {
						anchor,
						selected,
						itemsByDay,
						onSelectDate: handleSelectDate
					}),
					view === "day" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayView, {
						date: selected,
						items: selectedItems,
						onToggle: handleToggle,
						togglingId
					}),
					view !== "day" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailPanel, {
						date: selected,
						items: selectedItems,
						onToggle: handleToggle,
						togglingId
					})
				]
			})
		]
	});
}
//#endregion
export { CalendarPage as default };
