import { t as LoaderCircle } from "./loader-circle-KX_Vjph3.js";
import { a as DialogHeader, c as Pencil, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as Textarea, t as Dialog } from "./dialog-DhhuHx8e.js";
import { n as Trash2 } from "./dist-vHr3zkt8.js";
import { B as cn, E as usePublishAnnouncement, H as Slot, J as __toESM, K as require_jsx_runtime, N as useUpdateAnnouncement, V as cva, _ as useIsCallerAdmin, m as useDeleteAnnouncement, n as Label, o as Megaphone, q as require_react, r as Input, u as createLucideIcon, v as useListAnnouncements, z as Button } from "./index-ow0ctTom.js";
import { _ as EmptyState, b as PageHeader, r as formatDateTime, v as ErrorState, y as LoadingState } from "./format-Dk65RGef.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Send = createLucideIcon("send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]);
//#endregion
//#region src/components/ui/badge.tsx
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
		secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
		destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
		outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "span", {
		"data-slot": "badge",
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
//#region src/components/announcements/AnnouncementCard.tsx
function AnnouncementCard({ announcement, index, canManage, onEdit, onDelete, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"data-ocid": `announcements.item.${index + 1}`,
		className: cn("card-hover group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "absolute inset-x-0 top-0 h-1 bg-gradient-highlight opacity-80"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {
							className: "size-5",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold leading-snug text-foreground",
							children: announcement.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-xs text-muted-foreground",
							children: formatDateTime(announcement.publishedAt)
						})]
					}),
					canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": `Edit ${announcement.title}`,
							"data-ocid": `announcements.edit_button.${index + 1}`,
							className: "text-muted-foreground transition-smooth hover:text-accent",
							onClick: () => onEdit(announcement),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": `Delete ${announcement.title}`,
							"data-ocid": `announcements.delete_button.${index + 1}`,
							className: "text-muted-foreground transition-smooth hover:text-destructive",
							onClick: () => onDelete(announcement),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground",
				children: announcement.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto flex items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: "rounded-full border-accent/40 bg-accent/10 font-mono text-[0.65rem] uppercase tracking-wider text-accent",
					children: "Class notice"
				})
			})
		]
	});
}
//#endregion
//#region src/components/announcements/AnnouncementComposer.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function AnnouncementComposer({ onSubmit, isPending, error, className }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const canSubmit = title.trim().length > 0 && body.trim().length > 0;
	function handleSubmit(event) {
		event.preventDefault();
		if (!canSubmit || isPending) return;
		const draft = {
			title: title.trim(),
			body: body.trim()
		};
		setTitle("");
		setBody("");
		onSubmit(draft);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		"data-ocid": "announcements.composer",
		className: cn("flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
						className: "size-4",
						"aria-hidden": "true"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold text-foreground",
					children: "Publish an announcement"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "announcement-title",
					children: "Title"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "announcement-title",
					"data-ocid": "announcements.title_input",
					value: title,
					maxLength: 120,
					placeholder: "Field trip permission slips due Friday",
					onChange: (event) => setTitle(event.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "announcement-body",
					children: "Message"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "announcement-body",
					"data-ocid": "announcements.body_textarea",
					value: body,
					rows: 4,
					maxLength: 2e3,
					placeholder: "Share the details your class needs to know.",
					onChange: (event) => setBody(event.target.value)
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				"data-ocid": "announcements.error_state",
				className: "text-sm text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					"data-ocid": "announcements.publish_button",
					disabled: !canSubmit || isPending,
					className: "rounded-xl bg-gradient-primary font-semibold text-primary-foreground transition-smooth hover:brightness-110",
					children: [isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "size-4 animate-spin",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
						className: "size-4",
						"aria-hidden": "true"
					}), isPending ? "Publishing…" : "Publish"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/announcements/AnnouncementEditDialog.tsx
function AnnouncementEditDialog({ announcement, open, onOpenChange, onSave, isPending, error }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (open && announcement) {
			setTitle(announcement.title);
			setBody(announcement.body);
		}
	}, [open, announcement]);
	const canSave = title.trim().length > 0 && body.trim().length > 0;
	function handleSave() {
		if (!announcement || !canSave || isPending) return;
		onSave({
			id: announcement.id,
			title: title.trim(),
			body: body.trim()
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-ocid": "announcements.edit_dialog",
			className: "sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display",
					children: "Edit announcement"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Update the wording and save to publish the change to your class." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-announcement-title",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "edit-announcement-title",
								"data-ocid": "announcements.edit_title_input",
								value: title,
								maxLength: 120,
								onChange: (event) => setTitle(event.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-announcement-body",
								children: "Message"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "edit-announcement-body",
								"data-ocid": "announcements.edit_body_textarea",
								value: body,
								rows: 5,
								maxLength: 2e3,
								onChange: (event) => setBody(event.target.value)
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							"data-ocid": "announcements.edit_error_state",
							className: "text-sm text-destructive",
							children: error
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					"data-ocid": "announcements.edit_cancel_button",
					className: "rounded-xl",
					onClick: () => onOpenChange(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					"data-ocid": "announcements.edit_save_button",
					disabled: !canSave || isPending,
					className: "rounded-xl bg-gradient-primary font-semibold text-primary-foreground",
					onClick: handleSave,
					children: [isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "size-4 animate-spin",
						"aria-hidden": "true"
					}), "Save changes"]
				})] })
			]
		})
	});
}
//#endregion
//#region src/pages/AnnouncementsPage.tsx
function AnnouncementsPage() {
	const { data: isAdmin } = useIsCallerAdmin();
	const announcementsQuery = useListAnnouncements();
	const publish = usePublishAnnouncement();
	const update = useUpdateAnnouncement();
	const remove = useDeleteAnnouncement();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const announcements = (0, import_react.useMemo)(() => {
		return [...announcementsQuery.data ?? []].sort((a, b) => a.publishedAt === b.publishedAt ? Number(b.id - a.id) : Number(b.publishedAt - a.publishedAt));
	}, [announcementsQuery.data]);
	function openEdit(announcement) {
		setEditing(announcement);
		setEditOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Class news",
				title: "Announcements",
				description: "Updates from your teacher, newest first."
			}),
			isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnnouncementComposer, {
				isPending: publish.isPending,
				error: publish.isError ? "Could not publish. Please try again." : null,
				onSubmit: (draft) => publish.mutate(draft)
			}),
			announcementsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: "Loading announcements…" }) : announcementsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				message: "We couldn't load the announcements.",
				onRetry: () => void announcementsQuery.refetch()
			}) : announcements.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Megaphone,
				title: "No announcements yet",
				description: isAdmin ? "Publish your first announcement to keep the class in the loop." : "When your teacher posts an update, it will show up here."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-ocid": "announcements.list",
				className: "grid gap-4 sm:grid-cols-2 lg:gap-6",
				children: announcements.map((announcement, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnnouncementCard, {
						announcement,
						index,
						canManage: !!isAdmin,
						onEdit: openEdit,
						onDelete: (item) => remove.mutate(item.id),
						className: "w-full"
					})
				}, announcement.id.toString()))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnnouncementEditDialog, {
				announcement: editing,
				open: editOpen,
				onOpenChange: setEditOpen,
				isPending: update.isPending,
				error: update.isError ? "Could not save changes. Please try again." : null,
				onSave: (draft) => update.mutate(draft, { onSuccess: () => setEditOpen(false) })
			})
		]
	});
}
//#endregion
export { AnnouncementsPage as default };
