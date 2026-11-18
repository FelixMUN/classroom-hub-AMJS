import { B as cn, K as require_jsx_runtime } from "./index-ow0ctTom.js";
//#region src/lib/subjects.ts
var SUBJECT_TONES = {
	maths: "blue",
	math: "blue",
	mathematics: "blue",
	english: "yellow",
	history: "yellow",
	science: "red",
	physics: "red",
	chemistry: "red",
	biology: "green",
	geography: "green",
	art: "yellow",
	music: "blue",
	computing: "blue",
	ict: "blue"
};
function subjectTone(subject) {
	return SUBJECT_TONES[subject.trim().toLowerCase()] ?? "blue";
}
var SUBJECT_TONE_CLASSES = {
	blue: "bg-secondary text-secondary-foreground",
	yellow: "bg-accent text-accent-foreground",
	red: "bg-primary text-primary-foreground",
	green: "bg-[oklch(0.72_0.16_150)] text-[oklch(0.14_0.02_150)]"
};
var SUBJECT_TONE_SOFT = {
	blue: "border-secondary/50 bg-secondary/15 text-secondary",
	yellow: "border-accent/50 bg-accent/15 text-accent",
	red: "border-primary/50 bg-primary/15 text-primary",
	green: "border-[oklch(0.72_0.16_150)]/50 bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)]"
};
//#endregion
//#region src/components/SubjectBadge.tsx
var import_jsx_runtime = require_jsx_runtime();
function SubjectBadge({ subject, variant = "solid", className }) {
	const tone = subjectTone(subject);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider", variant === "solid" ? SUBJECT_TONE_CLASSES[tone] : cn("border", SUBJECT_TONE_SOFT[tone]), className),
		children: subject
	});
}
//#endregion
export { SubjectBadge as t };
