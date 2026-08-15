---
version: project-2.0
name: notAntey-design-system
description: >
  Design system for Сервисный центр КомпьютерщикЪ.
  Vintage/retro aesthetic with warm sepia tones, soft rounded corners,
  vignette edges, and aged-paper card effects. Designed to complement
  a vintage ephemera texture background. All tokens are CSS custom properties
  for easy palette swapping.
---

## Philosophy

- **Vintage canvas** — warm cream base (`#f5f0e6`) with a subtle vintage texture background and vignette edges. Creates the feel of old paper or a photograph.
- **Semi-transparent surfaces** — page backgrounds are 75-82% opaque, allowing the vintage texture to show through. The nav bar remains fully opaque to prevent content bleed on scroll.
- **Soft, generous rounding** — cards use 16px radius, buttons 22px (pill-like), creating a friendly, approachable feel that matches the warm aesthetic.
- **Sepia-toned shadows** — all shadows use warm brown tones (`rgb(60 40 20 / ...)`) instead of neutral gray, reinforcing the vintage palette.
- **Aged-paper cards** — subtle gradient from white to cream, with inset highlights that mimic worn paper edges.
- **Vignette overlay** — dark edges (radial gradient) create an old-photograph frame effect across the entire viewport.
- **Warm image filter** — subtle sepia tint (8%) on all images, removed on hover for interaction feedback.
- **Light vintage footer** — warm cream background (`rgba(236, 229, 216, 0.90)`) with purple accent links, maintaining the vintage palette without heavy contrast.

---

## Token → CSS Custom Property map

### Retro theme overrides (inside `.retro-theme`)

| Token | CSS variable | Value |
|---|---|---|
| `primary` | `--color-primary` | `#5e2d79` (deep purple) |
| `primary-active` | `--color-primary-active` | `#4a1d61` |
| `canvas` | `--color-canvas` | `rgba(245, 240, 230, 0.75)` |
| `surface-soft` | `--color-surface-soft` | `rgba(236, 229, 216, 0.78)` |
| `surface-card` | `--color-surface-card` | `rgba(253, 251, 247, 0.82)` |
| `surface-strong` | `--color-surface-strong` | `rgba(227, 219, 208, 0.78)` |
| `hairline` | `--color-hairline` | `#c9bfb0` |
| `ink` | `--color-ink` | `#1c120b` (warm black) |
| `body` | `--color-body` | `#3d3028` |
| `muted` | `--color-muted` | `#6b5e52` |
| `nav-bg` | `--nav-bg` | `#f5f0e6` (opaque) |
| `footer-bg` | `--footer-bg` | `rgba(236, 229, 216, 0.90)` |

---

## Radius tokens

| Token | CSS variable | Value | Usage |
|---|---|---|---|
| `xs` | `--radius-xs` | `2px` | Small badges |
| `sm` | `--radius-sm` | `6px` | Inputs, small elements |
| `md` | `--radius-md` | `9px` | Cards, content blocks, tables |
| `lg` | `--radius-lg` | `12px` | Buttons (primary/secondary) |
| `xl` | `--radius-xl` | `16px` | Large containers |
| `full` | `--radius-full` | `9999px` | Pills, avatars |

---

## Shadow system

All shadows use warm sepia tones instead of neutral gray:

```css
--shadow-sm: 0 1px 3px 0 rgb(60 40 20 / 0.08), 0 1px 2px -1px rgb(60 40 20 / 0.06);
--shadow-md: 0 4px 12px -2px rgb(60 40 20 / 0.10), 0 2px 4px -2px rgb(60 40 20 / 0.06);
--shadow-lg: 0 10px 24px -4px rgb(60 40 20 / 0.12), 0 4px 8px -4px rgb(60 40 20 / 0.06);
--shadow-float: 0 0 0 1px rgba(60, 40, 20, 0.04),
                0 4px 16px -2px rgba(60, 40, 20, 0.12),
                0 8px 24px -4px rgba(60, 40, 20, 0.08);
```

---

## Visual effects

### Vignette
Fixed radial gradient overlay on `body::after` — transparent center, dark edges. Creates an old-photograph frame:
```css
background: radial-gradient(ellipse at center, transparent 50%, rgba(28, 18, 11, 0.15) 100%);
```

### Vintage texture
Fixed background image at 40% opacity on `body::before`. Semi-transparent section backgrounds allow it to show through.

### Aged paper cards
Cards use `.ornate-border` class with:
- Gradient from white to cream
- Inset highlight (top) + shadow (bottom)
- Warm box-shadow

### Image sepia tint
All images get `filter: sepia(0.08) saturate(0.95)` — removed on hover.

### Section dividers
Adjacent `<section>` elements get a subtle warm border-top via `section + section` selector.

---

## Admin panel

The admin panel does NOT use `.retro-theme` class, so it retains the base design tokens from `design-tokens.css` (white backgrounds, neutral shadows, smaller radius). This ensures a clean, functional admin experience separate from the vintage public site.

---

## Swapping the palette

1. Edit `src/styles/retro-theme.css` — change hex/rgba values, never variable names.
2. The vintage texture background is in `public/vintage-texture.webp`.
3. Vignette intensity: adjust the `0.15` alpha in `body::after` radial-gradient.
4. Texture intensity: adjust the `0.4` opacity on `body::before`.
5. Surface transparency: adjust the alpha channel in `--color-canvas`, `--color-surface-card`, etc.

### Quick revert to pre-vintage state
```bash
cd /root/projects/notAntey && git checkout HEAD~1 -- src/styles/retro-theme.css src/app/globals.css DESIGN.md
```

---

## Responsive breakpoints

| Name | Width | Key layout changes |
|---|---|---|
| Mobile | < 744px | Single-column, stacked sections, hamburger nav |
| Tablet | 744–1128px | 2-column grids, side-rail appears |
| Desktop | 1128–1440px | Full nav, 3–4 column grids |
| Wide | > 1440px | Max-width container centered |

---

## File structure

```
src/
├── app/globals.css           # Tailwind + font + texture + vignette
├── styles/retro-theme.css    # All vintage overrides (colors, shadows, radius, effects)
├── components/
│   ├── Header.tsx            # Nav (opaque --nav-bg)
│   ├── Footer.tsx            # Dark vintage footer
│   └── OrnamentalDivider.tsx # Decorative section dividers
└── ...
```
