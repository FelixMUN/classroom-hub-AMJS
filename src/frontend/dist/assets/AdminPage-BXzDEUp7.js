import { t as CalendarClock } from "./calendar-clock-BZx0sBtX.js";
import { a as SelectValue, c as Check, i as SelectTrigger, n as SelectContent, o as useDirection, r as SelectItem, s as createCollection, t as Select } from "./select-CwX7hyRW.js";
import { n as Inbox, t as Plus } from "./plus-D-w76zUj.js";
import { t as LoaderCircle } from "./loader-circle-KX_Vjph3.js";
import { n as Trash2, t as Presence } from "./dist-vHr3zkt8.js";
import { A as useSetUserApproval, B as cn, C as useListSubmissions, D as useRevokeUserAccess, F as ApprovalStatus, I as RequestStatus, J as __toESM, K as require_jsx_runtime, R as SubmissionKind, T as useListUsers, W as useComposedRefs, _ as useIsCallerAdmin, a as ShieldCheck, f as useAddTimetableEvent, g as useDeleteTimetableEvent, i as X, j as useSetUserRole, k as useSetSubmissionStatus, n as Label, q as require_react, r as Input, u as createLucideIcon, w as useListTimetableEvents, y as useListApprovals, z as Button } from "./index-ow0ctTom.js";
import { _ as EmptyState, a as formatTime, b as PageHeader, n as formatDate, r as formatDateTime, v as ErrorState, y as LoadingState } from "./format-Dk65RGef.js";
import { t as SubjectBadge } from "./SubjectBadge-GMXmhXc-.js";
import { a as useId, d as Primitive, h as composeEventHandlers, m as createContextScope, r as useControllableState, u as useCallbackRef } from "./Combination-C5SdRwZg.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldAlert = createLucideIcon("shield-alert", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "M12 8v4",
		key: "1got3b"
	}],
	["path", {
		d: "M12 16h.01",
		key: "1drbdi"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UserX = createLucideIcon("user-x", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}],
	["line", {
		x1: "17",
		x2: "22",
		y1: "8",
		y2: "13",
		key: "3nzzx3"
	}],
	["line", {
		x1: "22",
		x2: "17",
		y1: "8",
		y2: "13",
		key: "1swrse"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Users = createLucideIcon("users", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["path", {
		d: "M16 3.128a4 4 0 0 1 0 7.744",
		key: "16gr8j"
	}],
	["path", {
		d: "M22 21v-2a4 4 0 0 0-3-3.87",
		key: "kshegd"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]);
//#endregion
//#region src/components/admin/ApprovalQueueItem.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* One approval queue row: a summary block plus approve/reject actions with an
* optional reason. The reason input is shared by both actions.
*/
function ApprovalQueueItem({ index, ocidPrefix, title, subtitle, meta, body, isPending, onApprove, onReject, className }) {
	const [reason, setReason] = (0, import_react.useState)("");
	function withReason() {
		const trimmed = reason.trim();
		return trimmed.length > 0 ? trimmed : null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"data-ocid": `${ocidPrefix}.item.${index + 1}`,
		className: cn("card-hover flex flex-col gap-4 rounded-2xl border border-border bg-card p-5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 space-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-bold leading-snug text-foreground",
						children: title
					}),
					subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: subtitle
					}),
					meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center gap-2 pt-1",
						children: meta
					})
				]
			}),
			body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap break-words rounded-xl bg-muted/40 p-3 text-sm leading-relaxed text-muted-foreground",
				children: body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: `${ocidPrefix}-reason-${index}`,
					className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
					children: "Reason (optional)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: `${ocidPrefix}-reason-${index}`,
					"data-ocid": `${ocidPrefix}.reason_input.${index + 1}`,
					value: reason,
					maxLength: 280,
					placeholder: "Add a note for the student",
					onChange: (event) => setReason(event.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					"data-ocid": `${ocidPrefix}.approve_button.${index + 1}`,
					disabled: isPending,
					className: "rounded-xl bg-gradient-primary font-semibold text-primary-foreground transition-smooth hover:brightness-110",
					onClick: () => onApprove(withReason()),
					children: [isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "size-4 animate-spin",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-4",
						"aria-hidden": "true"
					}), "Approve"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					"data-ocid": `${ocidPrefix}.reject_button.${index + 1}`,
					disabled: isPending,
					className: "rounded-xl border-destructive/50 text-destructive transition-smooth hover:bg-destructive/10 hover:text-destructive",
					onClick: () => onReject(withReason()),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "size-4",
						"aria-hidden": "true"
					}), "Reject"]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/admin/StatusBadge.tsx
var STATUS_STYLES = {
	pending: "border-accent/50 bg-accent/15 text-accent",
	approved: "border-[oklch(0.72_0.16_150)]/50 bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)]",
	rejected: "border-destructive/50 bg-destructive/15 text-destructive"
};
var STATUS_LABELS = {
	pending: "Pending",
	approved: "Approved",
	rejected: "Rejected"
};
function StatusBadge({ status, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider", STATUS_STYLES[status], className),
		children: STATUS_LABELS[status]
	});
}
//#endregion
//#region src/components/admin/TimetableManager.tsx
/** Convert a `datetime-local` value into a nanosecond bigint. */
function localInputToTimestamp(value) {
	if (!value) return null;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return BigInt(date.getTime()) * 1000000n;
}
function TimetableEventForm({ isPending, error, onSubmit, className }) {
	const [subject, setSubject] = (0, import_react.useState)("");
	const [start, setStart] = (0, import_react.useState)("");
	const [end, setEnd] = (0, import_react.useState)("");
	const [room, setRoom] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [validation, setValidation] = (0, import_react.useState)(null);
	function handleSubmit(event) {
		event.preventDefault();
		if (isPending) return;
		const startTime = localInputToTimestamp(start);
		const endTime = localInputToTimestamp(end);
		if (!subject.trim() || startTime === null || endTime === null) {
			setValidation("Add a subject, start time and end time.");
			return;
		}
		if (endTime <= startTime) {
			setValidation("The end time must be after the start time.");
			return;
		}
		setValidation(null);
		const draft = {
			subject: subject.trim(),
			startTime,
			endTime,
			room: room.trim(),
			notes: notes.trim()
		};
		setSubject("");
		setStart("");
		setEnd("");
		setRoom("");
		setNotes("");
		onSubmit(draft);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		"data-ocid": "admin.timetable_form",
		className: cn("flex flex-col gap-4 rounded-2xl border border-border bg-card p-5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "timetable-subject",
							children: "Subject"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "timetable-subject",
							"data-ocid": "admin.timetable_subject_input",
							value: subject,
							maxLength: 80,
							placeholder: "Mathematics",
							onChange: (event) => setSubject(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "timetable-room",
							children: "Room"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "timetable-room",
							"data-ocid": "admin.timetable_room_input",
							value: room,
							maxLength: 60,
							placeholder: "Room 12",
							onChange: (event) => setRoom(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "timetable-start",
							children: "Starts"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "timetable-start",
							type: "datetime-local",
							"data-ocid": "admin.timetable_start_input",
							value: start,
							onChange: (event) => setStart(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "timetable-end",
							children: "Ends"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "timetable-end",
							type: "datetime-local",
							"data-ocid": "admin.timetable_end_input",
							value: end,
							onChange: (event) => setEnd(event.target.value)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "timetable-notes",
					children: "Notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "timetable-notes",
					"data-ocid": "admin.timetable_notes_input",
					value: notes,
					maxLength: 200,
					placeholder: "Bring the textbook and calculator",
					onChange: (event) => setNotes(event.target.value)
				})]
			}),
			(validation || error) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				"data-ocid": "admin.timetable_error_state",
				className: "text-sm text-destructive",
				children: validation ?? error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					"data-ocid": "admin.timetable_add_button",
					disabled: isPending,
					className: "rounded-xl bg-gradient-primary font-semibold text-primary-foreground transition-smooth hover:brightness-110",
					children: [isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "size-4 animate-spin",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						className: "size-4",
						"aria-hidden": "true"
					}), "Add event"]
				})
			})
		]
	});
}
function TimetableEventRow({ event, index, isPending, onDelete, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		"data-ocid": `admin.timetable_row.${index + 1}`,
		className: cn("flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectBadge, {
				subject: event.subject,
				variant: "soft"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate font-mono text-sm text-foreground",
					children: [
						formatTime(event.startTime),
						" – ",
						formatTime(event.endTime)
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: [event.room.trim() || "No room", event.notes.trim() ? ` · ${event.notes}` : ""]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			size: "icon",
			"data-ocid": `admin.timetable_delete_button.${index + 1}`,
			disabled: isPending,
			"aria-label": `Delete ${event.subject} event`,
			className: "shrink-0 text-muted-foreground transition-smooth hover:text-destructive",
			onClick: onDelete,
			children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				className: "size-4 animate-spin",
				"aria-hidden": "true"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
		})]
	});
}
//#endregion
//#region src/components/admin/UserRow.tsx
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function UserRow({ user, index, isPending, onRoleChange, onRevoke, className }) {
	const name = user.displayName.trim() || "Unnamed classmate";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		"data-ocid": `admin.user_row.${index + 1}`,
		className: cn("flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-ink text-sm font-bold text-secondary-foreground",
				children: initials(name)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate font-medium text-foreground",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: [
						user.className.trim() || "No class set",
						" · joined",
						" ",
						formatDate(user.requestedAt)
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: user.approval }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: user.role,
					disabled: isPending,
					onValueChange: (value) => onRoleChange(value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-ocid": `admin.role_select.${index + 1}`,
						"aria-label": `Role for ${name}`,
						className: "w-[8.5rem] rounded-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "student",
						children: "Student"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "admin",
						children: "Admin"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					"data-ocid": `admin.revoke_button.${index + 1}`,
					disabled: isPending,
					"aria-label": `Revoke access for ${name}`,
					className: "rounded-xl border-destructive/50 text-destructive transition-smooth hover:bg-destructive/10 hover:text-destructive",
					onClick: onRevoke,
					children: [isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "size-4 animate-spin",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, {
						className: "size-4",
						"aria-hidden": "true"
					}), "Revoke"]
				})
			]
		})]
	});
}
function RoleLegend() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "flex items-center gap-2 text-xs text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
			className: "size-4 text-accent",
			"aria-hidden": "true"
		}), "Admins can approve requests and manage the class."]
	});
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-roving-focus@1.1.11_@types+react-dom@19.1.11_@types+react@19.1.17__@typ_36cadf73f63477a2272afac63e9bee96/node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(GROUP_NAME, [createCollectionScope]);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
			scope: props.__scopeRovingFocusGroup,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusGroupImpl, {
				...props,
				ref: forwardedRef
			})
		})
	});
});
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, preventScrollOnEntryFocus = false, ...groupProps } = props;
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const direction = useDirection(dir);
	const [currentTabStopId, setCurrentTabStopId] = useControllableState({
		prop: currentTabStopIdProp,
		defaultProp: defaultCurrentTabStopId ?? null,
		onChange: onCurrentTabStopIdChange,
		caller: GROUP_NAME
	});
	const [isTabbingBackOut, setIsTabbingBackOut] = import_react.useState(false);
	const handleEntryFocus = useCallbackRef(onEntryFocus);
	const getItems = useCollection(__scopeRovingFocusGroup);
	const isClickFocusRef = import_react.useRef(false);
	const [focusableItemsCount, setFocusableItemsCount] = import_react.useState(0);
	import_react.useEffect(() => {
		const node = ref.current;
		if (node) {
			node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
			return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
		}
	}, [handleEntryFocus]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusProvider, {
		scope: __scopeRovingFocusGroup,
		orientation,
		dir: direction,
		loop,
		currentTabStopId,
		onItemFocus: import_react.useCallback((tabStopId) => setCurrentTabStopId(tabStopId), [setCurrentTabStopId]),
		onItemShiftTab: import_react.useCallback(() => setIsTabbingBackOut(true), []),
		onFocusableItemAdd: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount + 1), []),
		onFocusableItemRemove: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount - 1), []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
			"data-orientation": orientation,
			...groupProps,
			ref: composedRefs,
			style: {
				outline: "none",
				...props.style
			},
			onMouseDown: composeEventHandlers(props.onMouseDown, () => {
				isClickFocusRef.current = true;
			}),
			onFocus: composeEventHandlers(props.onFocus, (event) => {
				const isKeyboardFocus = !isClickFocusRef.current;
				if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
					const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
					event.currentTarget.dispatchEvent(entryFocusEvent);
					if (!entryFocusEvent.defaultPrevented) {
						const items = getItems().filter((item) => item.focusable);
						focusFirst([
							items.find((item) => item.active),
							items.find((item) => item.id === currentTabStopId),
							...items
						].filter(Boolean).map((item) => item.ref.current), preventScrollOnEntryFocus);
					}
				}
				isClickFocusRef.current = false;
			}),
			onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
		})
	});
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, children, ...itemProps } = props;
	const autoId = useId();
	const id = tabStopId || autoId;
	const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
	const isCurrentTabStop = context.currentTabStopId === id;
	const getItems = useCollection(__scopeRovingFocusGroup);
	const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
	import_react.useEffect(() => {
		if (focusable) {
			onFocusableItemAdd();
			return () => onFocusableItemRemove();
		}
	}, [
		focusable,
		onFocusableItemAdd,
		onFocusableItemRemove
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeRovingFocusGroup,
		id,
		focusable,
		active,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			tabIndex: isCurrentTabStop ? 0 : -1,
			"data-orientation": context.orientation,
			...itemProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!focusable) event.preventDefault();
				else context.onItemFocus(id);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if (event.key === "Tab" && event.shiftKey) {
					context.onItemShiftTab();
					return;
				}
				if (event.target !== event.currentTarget) return;
				const focusIntent = getFocusIntent(event, context.orientation, context.dir);
				if (focusIntent !== void 0) {
					if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
					event.preventDefault();
					let candidateNodes = getItems().filter((item) => item.focusable).map((item) => item.ref.current);
					if (focusIntent === "last") candidateNodes.reverse();
					else if (focusIntent === "prev" || focusIntent === "next") {
						if (focusIntent === "prev") candidateNodes.reverse();
						const currentIndex = candidateNodes.indexOf(event.currentTarget);
						candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
					}
					setTimeout(() => focusFirst(candidateNodes));
				}
			}),
			children: typeof children === "function" ? children({
				isCurrentTabStop,
				hasTabStop: currentTabStopId != null
			}) : children
		})
	});
});
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function getDirectionAwareKey(key, dir) {
	if (dir !== "rtl") return key;
	return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
	const key = getDirectionAwareKey(event.key, dir);
	if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
	if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
	return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-tabs@1.1.13_@types+react-dom@19.1.11_@types+react@19.1.17__@types+react_f21cc4b4766ef55b6ce735b87630a35d/node_modules/@radix-ui/react-tabs/dist/index.mjs
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [createRovingFocusGroupScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value: valueProp, onValueChange, defaultValue, orientation = "horizontal", dir, activationMode = "automatic", ...tabsProps } = props;
	const direction = useDirection(dir);
	const [value, setValue] = useControllableState({
		prop: valueProp,
		onChange: onValueChange,
		defaultProp: defaultValue ?? "",
		caller: TABS_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsProvider, {
		scope: __scopeTabs,
		baseId: useId(),
		value,
		onValueChange: setValue,
		orientation,
		dir: direction,
		activationMode,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			dir: direction,
			"data-orientation": orientation,
			...tabsProps,
			ref: forwardedRef
		})
	});
});
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, loop = true, ...listProps } = props;
	const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		asChild: true,
		...rovingFocusGroupScope,
		orientation: context.orientation,
		dir: context.dir,
		loop,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			role: "tablist",
			"aria-orientation": context.orientation,
			...listProps,
			ref: forwardedRef
		})
	});
});
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
	const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !disabled,
		active: isSelected,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "tab",
			"aria-selected": isSelected,
			"aria-controls": contentId,
			"data-state": isSelected ? "active" : "inactive",
			"data-disabled": disabled ? "" : void 0,
			disabled,
			id: triggerId,
			...triggerProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!disabled && event.button === 0 && event.ctrlKey === false) context.onValueChange(value);
				else event.preventDefault();
			}),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => {
				const isAutomaticActivation = context.activationMode !== "manual";
				if (!isSelected && !disabled && isAutomaticActivation) context.onValueChange(value);
			})
		})
	});
});
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
	const context = useTabsContext(CONTENT_NAME, __scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	const isMountAnimationPreventedRef = import_react.useRef(isSelected);
	import_react.useEffect(() => {
		const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
		return () => cancelAnimationFrame(rAF);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isSelected,
		children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": isSelected ? "active" : "inactive",
			"data-orientation": context.orientation,
			role: "tabpanel",
			"aria-labelledby": triggerId,
			hidden: !present,
			id: contentId,
			tabIndex: 0,
			...contentProps,
			ref: forwardedRef,
			style: {
				...props.style,
				animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
			},
			children: present && children
		})
	});
});
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
//#endregion
//#region src/components/ui/tabs.tsx
function Tabs({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-slot": "tabs",
		className: cn("flex flex-col gap-2", className),
		...props
	});
}
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		"data-slot": "tabs-list",
		className: cn("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		"data-slot": "tabs-trigger",
		className: cn("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		"data-slot": "tabs-content",
		className: cn("flex-1 outline-none", className),
		...props
	});
}
//#endregion
//#region src/pages/AdminPage.tsx
function AdminDenied() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Teacher tools",
			title: "Admin console",
			description: "Approve members and manage the class."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: ShieldAlert,
			title: "Admins only",
			description: "This console is available to class admins. Ask your teacher if you need access."
		})]
	});
}
function AccessQueue() {
	const approvalsQuery = useListApprovals();
	const usersQuery = useListUsers();
	const setApproval = useSetUserApproval();
	const nameByPrincipal = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const user of usersQuery.data ?? []) map.set(user.principal.toText(), user);
		return map;
	}, [usersQuery.data]);
	const pending = (0, import_react.useMemo)(() => (approvalsQuery.data ?? []).filter((entry) => entry.status === "pending"), [approvalsQuery.data]);
	if (approvalsQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: "Loading requests…" });
	if (approvalsQuery.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		message: "We couldn't load access requests.",
		onRetry: () => void approvalsQuery.refetch()
	});
	if (pending.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Inbox,
		title: "No pending requests",
		description: "New classmates waiting for approval will appear here."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-ocid": "admin.access_queue",
		className: "grid gap-4 lg:grid-cols-2",
		children: pending.map((entry, index) => {
			const user = nameByPrincipal.get(entry.principal.toText());
			const name = user?.displayName.trim() || "New classmate";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalQueueItem, {
					index,
					ocidPrefix: "admin.access",
					title: name,
					subtitle: user?.className.trim() || "No class set",
					meta: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: entry.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: user ? `Requested ${formatDate(user.requestedAt)}` : "Awaiting profile"
					})] }),
					isPending: setApproval.isPending,
					onApprove: () => setApproval.mutate({
						user: entry.principal,
						approval: ApprovalStatus.approved
					}),
					onReject: () => setApproval.mutate({
						user: entry.principal,
						approval: ApprovalStatus.rejected
					}),
					className: "w-full"
				})
			}, entry.principal.toText());
		})
	});
}
function SubmissionQueue({ kind, ocidPrefix, emptyTitle, emptyDescription }) {
	const submissionsQuery = useListSubmissions();
	const setStatus = useSetSubmissionStatus();
	const pending = (0, import_react.useMemo)(() => (submissionsQuery.data ?? []).filter((item) => item.kind === kind && item.status === "pending"), [submissionsQuery.data, kind]);
	if (submissionsQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: "Loading submissions…" });
	if (submissionsQuery.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		message: "We couldn't load submissions.",
		onRetry: () => void submissionsQuery.refetch()
	});
	if (pending.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Inbox,
		title: emptyTitle,
		description: emptyDescription
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-ocid": `${ocidPrefix}.queue`,
		className: "grid gap-4 lg:grid-cols-2",
		children: pending.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "flex",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalQueueItem, {
				index,
				ocidPrefix,
				title: item.title,
				subtitle: `${item.subject} · submitted ${formatDateTime(item.submittedAt)}`,
				meta: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectBadge, {
					subject: item.subject,
					variant: "soft"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status })] }),
				body: item.description,
				isPending: setStatus.isPending,
				onApprove: (reason) => setStatus.mutate({
					id: item.id,
					status: RequestStatus.approved,
					adminReason: reason
				}),
				onReject: (reason) => setStatus.mutate({
					id: item.id,
					status: RequestStatus.rejected,
					adminReason: reason
				}),
				className: "w-full"
			})
		}, item.id.toString()))
	});
}
function UsersPanel() {
	const usersQuery = useListUsers();
	const setRole = useSetUserRole();
	const revoke = useRevokeUserAccess();
	const users = (0, import_react.useMemo)(() => [...usersQuery.data ?? []].sort((a, b) => a.displayName.localeCompare(b.displayName)), [usersQuery.data]);
	if (usersQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: "Loading members…" });
	if (usersQuery.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		message: "We couldn't load the class list.",
		onRetry: () => void usersQuery.refetch()
	});
	if (users.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Users,
		title: "No members yet",
		description: "Approved classmates will appear here once they join."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleLegend, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			"data-ocid": "admin.user_list",
			className: "space-y-3",
			children: users.map((user, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRow, {
				user,
				index,
				isPending: setRole.isPending || revoke.isPending,
				onRoleChange: (role) => setRole.mutate({
					user: user.principal,
					role
				}),
				onRevoke: () => revoke.mutate(user.principal)
			}, user.principal.toText()))
		})]
	});
}
function TimetablePanel() {
	const eventsQuery = useListTimetableEvents();
	const addEvent = useAddTimetableEvent();
	const deleteEvent = useDeleteTimetableEvent();
	const events = (0, import_react.useMemo)(() => [...eventsQuery.data ?? []].sort((a, b) => a.startTime === b.startTime ? Number(a.id - b.id) : Number(a.startTime - b.startTime)), [eventsQuery.data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimetableEventForm, {
			isPending: addEvent.isPending,
			error: addEvent.isError ? "Could not add the event. Please try again." : null,
			onSubmit: (draft) => addEvent.mutate(draft)
		}), eventsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: "Loading timetable…" }) : eventsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
			message: "We couldn't load the timetable.",
			onRetry: () => void eventsQuery.refetch()
		}) : events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: CalendarClock,
			title: "No timetable events",
			description: "Add lessons and activities so the class knows the schedule."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			"data-ocid": "admin.timetable_list",
			className: "space-y-3",
			children: events.map((event, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimetableEventRow, {
				event,
				index,
				isPending: deleteEvent.isPending,
				onDelete: () => deleteEvent.mutate(event.id)
			}, event.id.toString()))
		})]
	});
}
function AdminPage() {
	const { data: isAdmin, isLoading } = useIsCallerAdmin();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Teacher tools",
			title: "Admin console",
			description: "Approve members and manage the class."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: "Checking your access…" })]
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDenied, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Teacher tools",
			title: "Admin console",
			description: "Approve requests, manage members and keep the timetable current."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "access",
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					"data-ocid": "admin.tabs",
					className: "flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl border border-border bg-card p-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "access",
							"data-ocid": "admin.tab.access",
							className: "rounded-xl",
							children: "Access"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "homework",
							"data-ocid": "admin.tab.homework",
							className: "rounded-xl",
							children: "Homework"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "suggestions",
							"data-ocid": "admin.tab.suggestions",
							className: "rounded-xl",
							children: "Edit suggestions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "users",
							"data-ocid": "admin.tab.users",
							className: "rounded-xl",
							children: "Members"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "timetable",
							"data-ocid": "admin.tab.timetable",
							className: "rounded-xl",
							children: "Timetable"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "access",
					"data-ocid": "admin.panel.access",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessQueue, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "homework",
					"data-ocid": "admin.panel.homework",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmissionQueue, {
						kind: SubmissionKind.newHomework,
						ocidPrefix: "admin.homework",
						emptyTitle: "No homework to review",
						emptyDescription: "New homework submissions waiting for approval will appear here."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "suggestions",
					"data-ocid": "admin.panel.suggestions",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmissionQueue, {
						kind: SubmissionKind.editSuggestion,
						ocidPrefix: "admin.suggestion",
						emptyTitle: "No edit suggestions",
						emptyDescription: "Suggested changes to existing homework will appear here."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "users",
					"data-ocid": "admin.panel.users",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersPanel, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "timetable",
					"data-ocid": "admin.panel.timetable",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimetablePanel, {})
				})
			]
		})]
	});
}
//#endregion
export { AdminPage as default };
