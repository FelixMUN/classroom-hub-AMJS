/** Subject accent mapping — keeps every subject badge on the four-colour palette. */
export type SubjectTone = "blue" | "yellow" | "red" | "green";

const SUBJECT_TONES: Record<string, SubjectTone> = {
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
  ict: "blue",
};

export function subjectTone(subject: string): SubjectTone {
  return SUBJECT_TONES[subject.trim().toLowerCase()] ?? "blue";
}

export const SUBJECT_TONE_CLASSES: Record<SubjectTone, string> = {
  blue: "bg-secondary text-secondary-foreground",
  yellow: "bg-accent text-accent-foreground",
  red: "bg-primary text-primary-foreground",
  green: "bg-[oklch(0.72_0.16_150)] text-[oklch(0.14_0.02_150)]",
};

export const SUBJECT_TONE_SOFT: Record<SubjectTone, string> = {
  blue: "border-secondary/50 bg-secondary/15 text-secondary",
  yellow: "border-accent/50 bg-accent/15 text-accent",
  red: "border-primary/50 bg-primary/15 text-primary",
  green:
    "border-[oklch(0.72_0.16_150)]/50 bg-[oklch(0.72_0.16_150)]/15 text-[oklch(0.72_0.16_150)]",
};
