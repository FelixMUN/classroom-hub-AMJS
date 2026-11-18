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
  red: "bg-destructive text-destructive-foreground",
  green: "bg-[oklch(0.5991_0.0901_128)] text-[oklch(0.9357_0.0476_17)]",
};

export const SUBJECT_TONE_SOFT: Record<SubjectTone, string> = {
  blue: "border-secondary/50 bg-secondary/15 text-secondary",
  yellow: "border-accent/50 bg-accent/15 text-accent",
  red: "border-destructive/50 bg-destructive/15 text-destructive",
  green:
    "border-[oklch(0.5991_0.0901_128)]/50 bg-[oklch(0.5991_0.0901_128)]/15 text-[oklch(0.5991_0.0901_128)]",
};
