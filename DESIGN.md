# Alfatrees PMC — Design System

## Color Palette

### Light Theme (Default)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | #E8DFD0 | Page background (warm parchment) |
| `--bg-secondary` | #DED5C4 | Alternate sections |
| `--bg-card` | #F0EAE0 | Cards, elevated surfaces |
| `--border-default` | #CFC6B6 | Default borders |
| `--border-bright` | #C0B7A6 | Emphasized borders |
| `--heading` | #1A1A1A | Headings |
| `--text-primary` | #2C2C2C | Body text |
| `--text-secondary` | #5C5549 | Secondary text |
| `--text-muted` | #6A6254 | Muted/placeholder text |
| `--gold` | #B8922E | Primary accent, CTAs |
| `--gold-hover` | #A07E24 | Hover state |
| `--gold-dim` | rgba(184,146,46,0.10) | Subtle gold backgrounds |
| `--gold-text` | #8B6D1F | Gold-tinted text |

Light theme has a paper grain overlay (`body::before`, opacity 0.4, multiply blend).

### Dark Theme
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | #07090E | Page background (deep navy) |
| `--bg-secondary` | #0C0F16 | Alternate sections |
| `--bg-card` | #111620 | Cards |
| `--border-default` | #1B2333 | Borders |
| `--heading` | #F0F0F0 | Headings |
| `--text-primary` | #D4D4D8 | Body text |
| `--text-secondary` | #8B9AB5 | Secondary |
| `--text-muted` | #74849A | Muted |
| `--gold` | #D4A853 | Primary accent |
| `--gold-hover` | #C49A45 | Hover |

No grain overlay in dark theme.

## Typography
| Role | Font | Weight | CSS Variable |
|------|------|--------|-------------|
| Body | Inter | 300-800 | `--font-inter` |
| Code | JetBrains Mono | 400-700 | `--font-jetbrains` |
| Headings | Inter | 600-800 | `--font-inter` |

Fluid sizing via `clamp()`: e.g. `text-[clamp(32px,5vw,56px)]` for hero headings.

## Component Patterns

### Buttons
- **Primary:** `bg-gold text-primary-foreground hover:bg-gold-hover` + rounded-lg
- **Secondary:** `border border-border-default bg-bg-card hover:border-gold`
- **Ghost:** `text-text-secondary hover:text-text-primary`

### Cards
- `rounded-xl border border-border-default bg-bg-card`
- Hover: `hover:border-border-bright` or `hover:border-gold`

### Section Spacing
- `.section-padding` utility class for consistent vertical padding
- Max content width: `max-w-[1280px]` with `px-6`

## Theme Toggle
- Location: navbar, moon/sun icon
- Persistence: `localStorage.getItem('alfatrees-theme-v2')`
- Mechanism: adds/removes `.dark` class on `<html>`
- Flash prevention: inline `<script>` in `<head>` reads localStorage before paint

## CSS Architecture
- `@theme` (non-inline): custom semantic colors → real CSS custom properties
- `@theme inline`: shadcn standard tokens → resolved at build time
- `:root` block: light theme values
- `.dark` block: dark theme overrides
- `@custom-variant dark (&:is(.dark *))` for Tailwind dark mode
