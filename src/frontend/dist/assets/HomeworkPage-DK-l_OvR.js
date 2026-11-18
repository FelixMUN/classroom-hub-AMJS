import { t as CalendarClock } from "./calendar-clock-BZx0sBtX.js";
import { n as CirclePlus, r as CircleCheck, t as Sparkles } from "./sparkles-WDKQoq40.js";
import { n as Inbox, t as Plus } from "./plus-D-w76zUj.js";
import { a as DialogHeader, c as Pencil, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as Textarea, t as Dialog } from "./dialog-DhhuHx8e.js";
import { n as Trash2 } from "./dist-vHr3zkt8.js";
import { B as cn, I as RequestStatus, J as __toESM, K as require_jsx_runtime, M as useSubmitHomework, P as useUpdateHomework, R as SubmissionKind, S as useListMySubmissions, _ as useIsCallerAdmin, b as useListHomework, d as useAddHomework, h as useDeleteHomework, l as BookOpenCheck, n as Label, q as require_react, r as Input, s as Clock, u as createLucideIcon, z as Button } from "./index-ow0ctTom.js";
import { _ as EmptyState, b as PageHeader, i as formatDueLabel, l as toDateInputValue, n as formatDate, o as fromDateInputValue, s as isOverdue, t as dateToTimestamp, v as ErrorState, y as LoadingState } from "./format-Dk65RGef.js";
import { t as SubjectBadge } from "./SubjectBadge-GMXmhXc-.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleX = createLucideIcon("circle-x", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "m15 9-6 6",
		key: "1uzhvr"
	}],
	["path", {
		d: "m9 9 6 6",
		key: "z0biqf"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Lightbulb = createLucideIcon("lightbulb", [
	["path", {
		d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
		key: "1gvzjb"
	}],
	["path", {
		d: "M9 18h6",
		key: "x1upvd"
	}],
	["path", {
		d: "M10 22h4",
		key: "ceow96"
	}]
]);
//#endregion
//#region src/components/homework/HomeworkCard.tsx
var import_jsx_runtime = require_jsx_runtime();
function HomeworkCard({ homework, isAdmin, onEdit, onDelete, onSuggestEdit, index }) {
	const overdue = isOverdue(homework.dueDate);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"data-ocid": `homework.item.${index}`,
		className: "card-hover group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectBadge, { subject: homework.subject }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", overdue ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), formatDueLabel(homework.dueDate)]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-bold leading-snug text-foreground",
					children: homework.title
				}), homework.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whitespace-pre-line break-words text-sm text-muted-foreground",
					children: homework.description
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-semibold uppercase tracking-wider",
						children: "Assigned"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatDate(homework.assignedDate) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-semibold uppercase tracking-wider",
						children: "Due"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatDate(homework.dueDate) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-4",
				children: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					"data-ocid": `homework.edit_button.${index}`,
					onClick: () => onEdit(homework),
					className: "rounded-full border-secondary/50 text-secondary transition-smooth hover:bg-secondary/15 hover:text-secondary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), "Edit"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					"data-ocid": `homework.delete_button.${index}`,
					onClick: () => onDelete(homework),
					className: "rounded-full border-destructive/50 text-destructive transition-smooth hover:bg-destructive/15 hover:text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), "Delete"]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					"data-ocid": `homework.suggest_button.${index}`,
					onClick: () => onSuggestEdit(homework),
					className: "rounded-full border-accent/50 text-accent transition-smooth hover:bg-accent/15 hover:text-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), "Suggest an edit"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/homework/HomeworkForm.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function emptyHomeworkForm() {
	const today = toDateInputValue(/* @__PURE__ */ new Date());
	return {
		subject: "",
		title: "",
		description: "",
		assignedDate: today,
		dueDate: today
	};
}
function homeworkFormFrom(input) {
	const assigned = new Date(Number(input.assignedDate / 1000000n));
	const due = new Date(Number(input.dueDate / 1000000n));
	return {
		subject: input.subject,
		title: input.title,
		description: input.description,
		assignedDate: Number.isNaN(assigned.getTime()) ? toDateInputValue(/* @__PURE__ */ new Date()) : toDateInputValue(assigned),
		dueDate: Number.isNaN(due.getTime()) ? toDateInputValue(/* @__PURE__ */ new Date()) : toDateInputValue(due)
	};
}
/** Convert validated form values into the backend timestamp payload. */
function toHomeworkPayload(values) {
	const assigned = fromDateInputValue(values.assignedDate);
	const due = fromDateInputValue(values.dueDate);
	if (!assigned || !due) return null;
	return {
		subject: values.subject.trim(),
		title: values.title.trim(),
		description: values.description.trim(),
		assignedDate: dateToTimestamp(assigned),
		dueDate: dateToTimestamp(due)
	};
}
function HomeworkForm({ values, onChange, onSubmit, onCancel, submitLabel, pending, error, idPrefix }) {
	const [touched, setTouched] = (0, import_react.useState)(false);
	const subjectError = touched && !values.subject.trim();
	const titleError = touched && !values.title.trim();
	const dateError = touched && (!values.assignedDate || !values.dueDate || values.dueDate < values.assignedDate);
	function handleSubmit(event) {
		event.preventDefault();
		setTouched(true);
		if (!values.subject.trim() || !values.title.trim() || !values.assignedDate || !values.dueDate || values.dueDate < values.assignedDate) return;
		onSubmit();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "space-y-5",
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: `${idPrefix}-subject`,
							children: "Subject"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: `${idPrefix}-subject`,
							"data-ocid": "homework.subject.input",
							value: values.subject,
							onChange: (e) => onChange({
								...values,
								subject: e.target.value
							}),
							placeholder: "e.g. Biology",
							"aria-invalid": subjectError,
							autoComplete: "off"
						}),
						subjectError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-ocid": "homework.subject.error",
							className: "text-xs font-medium text-destructive",
							children: "Add a subject."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: `${idPrefix}-title`,
							children: "Title"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: `${idPrefix}-title`,
							"data-ocid": "homework.title.input",
							value: values.title,
							onChange: (e) => onChange({
								...values,
								title: e.target.value
							}),
							placeholder: "e.g. Cell structure worksheet",
							"aria-invalid": titleError,
							autoComplete: "off"
						}),
						titleError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-ocid": "homework.title.error",
							className: "text-xs font-medium text-destructive",
							children: "Add a title."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: `${idPrefix}-description`,
					children: "Description"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: `${idPrefix}-description`,
					"data-ocid": "homework.description.textarea",
					value: values.description,
					onChange: (e) => onChange({
						...values,
						description: e.target.value
					}),
					placeholder: "What should students do? Include page numbers, questions or links.",
					rows: 4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: `${idPrefix}-assigned`,
						children: "Assigned date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: `${idPrefix}-assigned`,
						"data-ocid": "homework.assigned_date.input",
						type: "date",
						value: values.assignedDate,
						onChange: (e) => onChange({
							...values,
							assignedDate: e.target.value
						}),
						"aria-invalid": dateError
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: `${idPrefix}-due`,
						children: "Due date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: `${idPrefix}-due`,
						"data-ocid": "homework.due_date.input",
						type: "date",
						value: values.dueDate,
						onChange: (e) => onChange({
							...values,
							dueDate: e.target.value
						}),
						"aria-invalid": dateError
					})]
				})]
			}),
			dateError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ocid": "homework.date.error",
				className: "text-xs font-medium text-destructive",
				children: "Pick both dates, with the due date on or after the assigned date."
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ocid": "homework.form.error",
				role: "alert",
				className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-foreground",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					"data-ocid": "homework.submit_button",
					disabled: pending,
					className: "rounded-full bg-gradient-primary font-semibold text-primary-foreground shadow-none transition-smooth hover:brightness-110",
					children: pending ? "Saving…" : submitLabel
				}), onCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					"data-ocid": "homework.cancel_button",
					onClick: onCancel,
					disabled: pending,
					className: "rounded-full",
					children: "Cancel"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/homework/StatusBadge.tsx
var STATUS_META = {
	[RequestStatus.pending]: {
		label: "Pending",
		icon: Clock,
		className: "border-accent/50 bg-accent/15 text-accent"
	},
	[RequestStatus.approved]: {
		label: "Approved",
		icon: CircleCheck,
		className: "border-[oklch(0.72_0.16_150)]/50 bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)]"
	},
	[RequestStatus.rejected]: {
		label: "Rejected",
		icon: CircleX,
		className: "border-destructive/50 bg-destructive/15 text-destructive"
	}
};
function StatusBadge({ status, className }) {
	const meta = STATUS_META[status];
	const Icon = meta.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ocid": "submission.status",
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider", meta.className, className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-3.5",
			"aria-hidden": "true"
		}), meta.label]
	});
}
//#endregion
//#region src/components/homework/SubmissionCard.tsx
function SubmissionCard({ submission, index }) {
	const isSuggestion = submission.kind === SubmissionKind.editSuggestion;
	const KindIcon = isSuggestion ? Lightbulb : CirclePlus;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"data-ocid": `submission.item.${index}`,
		className: "card-hover flex flex-col gap-3 rounded-2xl border border-border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindIcon, {
						className: "size-4 text-accent",
						"aria-hidden": "true"
					}), isSuggestion ? "Edit suggestion" : "New homework"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: submission.status })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectBadge, {
						subject: submission.subject,
						variant: "soft"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "min-w-0 break-words font-display text-base font-bold text-foreground",
						children: submission.title
					})]
				}), submission.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whitespace-pre-line break-words text-sm text-muted-foreground",
					children: submission.description
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-semibold uppercase tracking-wider",
							children: "Assigned"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatDate(submission.assignedDate) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-semibold uppercase tracking-wider",
							children: "Due"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatDate(submission.dueDate) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-semibold uppercase tracking-wider",
							children: "Sent"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatDate(submission.submittedAt) })]
					})
				]
			}),
			submission.status === "rejected" && submission.adminReason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-ocid": `submission.reason.${index}`,
				className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-destructive",
					children: "Reason: "
				}), submission.adminReason]
			})
		]
	});
}
//#endregion
//#region src/pages/HomeworkPage.tsx
function HomeworkPage() {
	const { data: isAdmin } = useIsCallerAdmin();
	const homeworkQuery = useListHomework();
	const submissionsQuery = useListMySubmissions();
	const addHomework = useAddHomework();
	const updateHomework = useUpdateHomework();
	const deleteHomework = useDeleteHomework();
	const submitHomework = useSubmitHomework();
	const [mode, setMode] = (0, import_react.useState)({ kind: "closed" });
	const [values, setValues] = (0, import_react.useState)(emptyHomeworkForm);
	const [formError, setFormError] = (0, import_react.useState)(null);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const homework = homeworkQuery.data ?? [];
	const submissions = submissionsQuery.data ?? [];
	function openCreate() {
		setValues(emptyHomeworkForm());
		setFormError(null);
		setMode({ kind: "create" });
	}
	function openSubmit() {
		setValues(emptyHomeworkForm());
		setFormError(null);
		setMode({ kind: "submit" });
	}
	function openEdit(item) {
		setValues(homeworkFormFrom(item));
		setFormError(null);
		setMode({
			kind: "edit",
			homework: item
		});
	}
	function openSuggest(item) {
		setValues(homeworkFormFrom(item));
		setFormError(null);
		setMode({
			kind: "suggest",
			homework: item
		});
	}
	function closeForm() {
		setMode({ kind: "closed" });
		setFormError(null);
	}
	function handleSubmit() {
		const payload = toHomeworkPayload(values);
		if (!payload) {
			setFormError("Pick both dates before saving.");
			return;
		}
		setFormError(null);
		if (mode.kind === "create") {
			addHomework.mutate(payload, {
				onSuccess: closeForm,
				onError: () => setFormError("Could not save this homework. Try again.")
			});
			return;
		}
		if (mode.kind === "submit") {
			submitHomework.mutate({
				kind: SubmissionKind.newHomework,
				targetHomeworkId: null,
				...payload
			}, {
				onSuccess: closeForm,
				onError: () => setFormError("Could not submit your homework. Try again.")
			});
			return;
		}
		if (mode.kind === "edit") {
			updateHomework.mutate({
				id: mode.homework.id,
				...payload
			}, {
				onSuccess: closeForm,
				onError: () => setFormError("Could not update this homework. Try again.")
			});
			return;
		}
		if (mode.kind === "suggest") submitHomework.mutate({
			kind: SubmissionKind.editSuggestion,
			targetHomeworkId: mode.homework.id,
			...payload
		}, {
			onSuccess: closeForm,
			onError: () => setFormError("Could not send your suggestion. Try again.")
		});
	}
	function confirmDelete() {
		if (!deleteTarget) return;
		deleteHomework.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
	}
	const formPending = addHomework.isPending || updateHomework.isPending || submitHomework.isPending;
	const formTitle = mode.kind === "create" ? "Add homework" : mode.kind === "submit" ? "Submit homework" : mode.kind === "edit" ? "Edit homework" : "Suggest an edit";
	const formDescription = mode.kind === "create" ? "Publish a new assignment for the whole class." : mode.kind === "submit" ? "Send your homework to the teacher for approval." : mode.kind === "edit" ? "Update the details. Changes appear for everyone immediately." : "Send your proposed changes to the teacher for approval.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Assignments",
				title: "Homework",
				description: "Add, manage and track every assignment — approved work is visible to the whole class.",
				action: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					"data-ocid": "homework.open_modal_button",
					onClick: openCreate,
					className: "rounded-full bg-gradient-primary font-semibold text-primary-foreground shadow-none transition-smooth hover:brightness-110",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						className: "size-4",
						"aria-hidden": "true"
					}), "Add homework"]
				}) : void 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "approved-heading",
				className: "space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 items-center justify-center rounded-xl bg-accent/15 text-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenCheck, {
							className: "size-5",
							"aria-hidden": "true"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "approved-heading",
						className: "font-display text-xl font-bold text-foreground",
						children: "Class homework"
					})]
				}), homeworkQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: "Loading homework…" }) : homeworkQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					message: "We couldn't load the homework list.",
					onRetry: () => void homeworkQuery.refetch()
				}) : homework.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: BookOpenCheck,
					title: "No homework yet",
					description: isAdmin ? "Add the first assignment and it will appear here for the whole class." : "When your teacher publishes homework, it will show up here.",
					action: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						"data-ocid": "homework.empty_add_button",
						onClick: openCreate,
						className: "rounded-full bg-gradient-primary font-semibold text-primary-foreground shadow-none transition-smooth hover:brightness-110",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							className: "size-4",
							"aria-hidden": "true"
						}), "Add homework"]
					}) : void 0
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ocid": "homework.list",
					className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
					children: homework.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeworkCard, {
						homework: item,
						index: index + 1,
						isAdmin: !!isAdmin,
						onEdit: openEdit,
						onDelete: setDeleteTarget,
						onSuggestEdit: openSuggest
					}, item.id.toString()))
				})]
			}),
			!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "submissions-heading",
				className: "space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 items-center justify-center rounded-xl bg-secondary/15 text-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {
								className: "size-5",
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "submissions-heading",
							className: "font-display text-xl font-bold text-foreground",
							children: "My submissions"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						"data-ocid": "homework.submit_homework_button",
						onClick: openSubmit,
						className: "rounded-full bg-gradient-primary font-semibold text-primary-foreground shadow-none transition-smooth hover:brightness-110",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							className: "size-4",
							"aria-hidden": "true"
						}), "Submit homework"]
					})]
				}), submissionsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: "Loading your submissions…" }) : submissionsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					message: "We couldn't load your submissions.",
					onRetry: () => void submissionsQuery.refetch()
				}) : submissions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Sparkles,
					title: "Nothing submitted yet",
					description: "Submit new homework or suggest an edit — you'll track its approval status here."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ocid": "submission.list",
					className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
					children: submissions.map((submission, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmissionCard, {
						submission,
						index: index + 1
					}, submission.id.toString()))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: mode.kind !== "closed",
				onOpenChange: (open) => {
					if (!open) closeForm();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-ocid": "homework.modal",
					className: "max-h-[90dvh] overflow-y-auto rounded-2xl border-border bg-card sm:max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-2xl font-bold",
						children: formTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: formDescription })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeworkForm, {
						idPrefix: "homework-form",
						values,
						onChange: setValues,
						onSubmit: handleSubmit,
						onCancel: closeForm,
						submitLabel: mode.kind === "create" ? isAdmin ? "Publish homework" : "Submit homework" : mode.kind === "submit" ? "Submit homework" : mode.kind === "edit" ? "Save changes" : "Send suggestion",
						pending: formPending,
						error: formError
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: deleteTarget !== null,
				onOpenChange: (open) => {
					if (!open) setDeleteTarget(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-ocid": "homework.delete_dialog",
					className: "rounded-2xl border-border bg-card sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-xl font-bold",
						children: "Delete homework?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
						"“",
						deleteTarget?.title,
						"” will be removed for everyone. This cannot be undone."
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						"data-ocid": "homework.cancel_button",
						onClick: () => setDeleteTarget(null),
						className: "rounded-full",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						"data-ocid": "homework.confirm_button",
						onClick: confirmDelete,
						disabled: deleteHomework.isPending,
						className: "rounded-full bg-destructive font-semibold text-destructive-foreground shadow-none transition-smooth hover:bg-destructive/90",
						children: deleteHomework.isPending ? "Deleting…" : "Delete"
					})] })]
				})
			})
		]
	});
}
//#endregion
export { HomeworkPage as default };
