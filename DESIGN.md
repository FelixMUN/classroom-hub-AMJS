# Design Brief

## Direction

Chalkboard Pop — a black chalkboard homework hub where classmates track, submit and approve homework with highlighter-bright accents.

## Tone

Playful-but-organised: youthful editorial energy executed with conviction, never a timid blend of styles.

## Differentiation

A highlighter-marker underline sweeps under decorative headings, tying every title to the school-notebook metaphor.

## Color Palette

| Token      | OKLCH         | Role                              |
| ---------- | ------------- | --------------------------------- |
| background | 0.13 0.008 25 | near-black chalkboard base        |
| foreground | 0.96 0.005 90 | warm white body text              |
| card       | 0.185 0.012 25| raised content surfaces           |
| primary    | 0.52 0.21 25  | deep red — primary actions        |
| accent     | 0.86 0.17 92  | bright yellow highlighter accent  |
| muted      | 0.24 0.012 25 | subdued panels, inactive states   |

Blue secondary `0.6 0.18 250` = ink/info; success `0.72 0.16 150`; destructive `0.6 0.23 22`.

## Typography

- Display: Bricolage Grotesque — decorative headings, app name, hero greeting
- Body: DM Sans — paragraphs, UI labels, card copy
- Mono: Geist Mono — counts, dates, timestamps
- Scale: hero `text-4xl md:text-6xl font-bold tracking-tight`, h2 `text-2xl md:text-3xl font-bold`, label `text-xs font-semibold tracking-widest uppercase`, body `text-base text-muted-foreground`

## Elevation & Depth

Layered depth: near-black base with fixed red/blue radial glows, raised `bg-card` surfaces with `border-border`, and `shadow-elevated` on interactive cards.

## Structural Zones

| Zone    | Background        | Border      | Notes                                        |
| ------- | ----------------- | ----------- | -------------------------------------------- |
| Header  | `bg-card/80` blur | `border-b`  | sticky nav, app name, links, profile chip    |
| Content | `bg-background`   | —           | alternating `bg-muted/30` sections, chalk grid |
| Footer  | `bg-muted/40`     | `border-t`  | brand line + secondary links                 |

## Spacing & Rhythm

Generous 24–32px section gaps (`space-y-8`), 16–24px card padding, 8–12px micro-spacing; grid gaps 16–24px.

## Component Patterns

- Buttons: `rounded-xl`, primary = deep red gradient, accent = yellow pill; hover lift + `shadow-highlight`
- Cards: `rounded-2xl`, `bg-card`, `border-border`, `shadow-subtle` → `shadow-elevated` on hover
- Badges: full-round pills; subject = blue, status = red/yellow/green per state

## Motion

- Entrance: `animate-fade-up` 0.5s staggered on cards and sections
- Hover: `card-hover` translateY(-4px) + accent ring, 0.3s cubic-bezier
- Decorative: `animate-float` on icons, `animate-pop-in` on badges

## Constraints

- Dark-only: no light mode; black background is the identity
- 3–5 core colors only: red, yellow, blue, white on black
- Body text must keep ≥4.5:1 contrast; no raw hex or arbitrary color classes
- Fully responsive mobile-first: `sm:` `md:` `lg:` breakpoints

## Signature Detail

The rotated yellow highlighter stroke under decorative headings — a typographic treatment that reads instantly as "school notebook".
