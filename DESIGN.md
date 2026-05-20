---
version: project-1.0
name: notAntey-design-system
description: >
  Design system for Сервисный центр КомпьютерщикЪ.
  Based on Airbnb's generous, photography-led consumer marketplace patterns
  (soft shapes, modest typography, single accent voltage) but adapted for a
  local repair-service context.  **All color, spacing, radius and typography
  tokens are exposed as CSS custom properties** so the palette can be
  swapped in minutes by editing a single :root block.
---

## Philosophy

- **White canvas** (`--color-canvas`) with a single warm accent (`--color-primary` — Airbnb Rausch #ff385c by default).  90% of any page is white + near-black ink.
- **Modest type weights**: headlines sit at 500–700, not 900.  Visual weight comes from photos and generous whitespace, not typographic muscle.
- **Soft everywhere**: 8px buttons, 14px cards, 9999px pills.  No hard corners except the grid itself.
- **One shadow tier** for hover/float states; everything else is flat.
- **Palette-swappable**: every token below is a CSS custom property.  To re-brand, edit `styles/globals.css` `:root` — no Tailwind rebuild required.

---

## Token → CSS Custom Property map

| Token name (used in code) | CSS variable | Default value |
|---|---|---|
| `primary` | `--color-primary` | `#ff385c` |
| `primary-active` | `--color-primary-active` | `#e00b41` |
| `primary-disabled` | `--color-primary-disabled` | `#ffd1da` |
| `primary-error-text` | `--color-primary-error-text` | `#c13515` |
| `primary-error-text-hover` | `--color-primary-error-text-hover` | `#b32505` |
| `luxe` | `--color-luxe` | `#460479` |
| `plus` | `--color-plus` | `#92174d` |
| `ink` | `--color-ink` | `#222222` |
| `body` | `--color-body` | `#3f3f3f` |
| `muted` | `--color-muted` | `#6a6a6a` |
| `muted-soft` | `--color-muted-soft` | `#929292` |
| `hairline` | `--color-hairline` | `#dddddd` |
| `hairline-soft` | `--color-hairline-soft` | `#ebebeb` |
| `border-strong` | `--color-border-strong` | `#c1c1c1` |
| `canvas` | `--color-canvas` | `#ffffff` |
| `surface-soft` | `--color-surface-soft` | `#f7f7f7` |
| `surface-card` | `--color-surface-card` | `#ffffff` |
| `surface-strong` | `--color-surface-strong` | `#f2f2f2` |
| `on-primary` | `--color-on-primary` | `#ffffff` |
| `on-dark` | `--color-on-dark` | `#ffffff` |
| `legal-link` | `--color-legal-link` | `#428bff` |
| `star-rating` | `--color-star-rating` | `#222222` |
| `scrim` | `--color-scrim` | `#000000` |

### Derived / semantic aliases (also CSS vars)

| Alias | Variable | Default |
|---|---|---|
| `text-default` | `--text-default` | `var(--color-ink)` |
| `text-secondary` | `--text-secondary` | `var(--color-body)` |
| `text-muted` | `--text-muted` | `var(--color-muted)` |
| `bg-page` | `--bg-page` | `var(--color-canvas)` |
| `bg-card` | `--bg-card` | `var(--color-surface-card)` |
| `border-default` | `--border-default` | `var(--color-hairline)` |

---

## Typography tokens (CSS vars)

| Token | CSS variable | Default |
|---|---|---|
| Font stack | `--font-sans` | `Inter, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif` |
| Font mono | `--font-mono` | `"SF Mono", SFMono-Regular, ui-monospace, monospace` |
| Display-xl size | `--text-display-xl` | `28px` |
| Display-lg size | `--text-display-lg` | `22px` |
| Display-md size | `--text-display-md` | `21px` |
| Title-md size | `--text-title-md` | `16px` |
| Body-md size | `--text-body-md` | `16px` |
| Body-sm size | `--text-body-sm` | `14px` |
| Caption size | `--text-caption` | `14px` |
| Badge size | `--text-badge` | `11px` |
| Micro-label size | `--text-micro` | `12px` |

---

## Radius tokens (CSS vars)

| Token | CSS variable | Default |
|---|---|---|
| `none` | `--radius-none` | `0px` |
| `xs` | `--radius-xs` | `4px` |
| `sm` | `--radius-sm` | `8px` |
| `md` | `--radius-md` | `14px` |
| `lg` | `--radius-lg` | `20px` |
| `xl` | `--radius-xl` | `32px` |
| `full` | `--radius-full` | `9999px` |

---

## Spacing tokens (CSS vars)

| Token | CSS variable | Default |
|---|---|---|
| `xxs` | `--space-xxs` | `2px` |
| `xs` | `--space-xs` | `4px` |
| `sm` | `--space-sm` | `8px` |
| `md` | `--space-md` | `12px` |
| `base` | `--space-base` | `16px` |
| `lg` | `--space-lg` | `24px` |
| `xl` | `--space-xl` | `32px` |
| `xxl` | `--space-xxl` | `48px` |
| `section` | `--space-section` | `64px` |

---

## Component tokens

All component tokens reference the base variables above.  Example:

```css
:root {
  /* Buttons */
  --button-primary-bg: var(--color-primary);
  --button-primary-text: var(--color-on-primary);
  --button-primary-radius: var(--radius-sm);
  --button-primary-padding: 14px 24px;
  --button-primary-height: 48px;

  --button-secondary-bg: var(--color-canvas);
  --button-secondary-text: var(--color-ink);
  --button-secondary-border: 1px solid var(--color-ink);

  /* Search / CTA bar */
  --search-bar-bg: var(--color-canvas);
  --search-bar-radius: var(--radius-full);
  --search-bar-height: 64px;
  --search-bar-border: 1px solid var(--color-hairline);
  --search-orb-bg: var(--color-primary);
  --search-orb-text: var(--color-on-primary);

  /* Cards */
  --card-bg: var(--color-surface-card);
  --card-radius: var(--radius-md);
  --card-padding: var(--space-base);

  /* Navigation */
  --nav-height: 80px;
  --nav-bg: var(--color-canvas);
  --nav-border-bottom: 1px solid var(--color-hairline);

  /* Footer */
  --footer-bg: var(--color-canvas);
  --footer-padding: var(--space-section) var(--space-xl);
}
```

---

## Swapping the palette (instructions)

1. Open `styles/globals.css` (or `app/globals.css` in Next.js App Router).
2. Edit the `:root` block — change only the hex values, **never** the variable names.
3. Reload the browser.  Tailwind classes such as `bg-primary`, `text-ink`, `rounded-md` immediately render the new colors because they read the same CSS variables.

Example — cold tech-blue re-brand:

```css
:root {
  --color-primary: #2563eb;           /* was #ff385c */
  --color-primary-active: #1d4ed8;     /* was #e00b41 */
  --color-primary-disabled: #bfdbfe;    /* was #ffd1da */
  --color-ink: #0f172a;               /* was #222222 */
  --color-body: #334155;              /* was #3f3f3f */
  --color-muted: #64748b;             /* was #6a6a6a */
  --color-canvas: #f8fafc;            /* was #ffffff */
  --color-surface-soft: #f1f5f9;      /* was #f7f7f7 */
  --color-surface-strong: #e2e8f0;    /* was #f2f2f2 */
  --color-hairline: #cbd5e1;          /* was #dddddd */
  /* … etc … */
}
```

---

## Next.js + Tailwind wiring

In `tailwind.config.ts` extend the theme to read CSS variables:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-active": "var(--color-primary-active)",
        "primary-disabled": "var(--color-primary-disabled)",
        ink: "var(--color-ink)",
        body: "var(--color-body)",
        muted: "var(--color-muted)",
        canvas: "var(--color-canvas)",
        "surface-soft": "var(--color-surface-soft)",
        "surface-strong": "var(--color-surface-strong)",
        hairline: "var(--color-hairline)",
        scrim: "var(--color-scrim)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      spacing: {
        xxs: "var(--space-xxs)",
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        base: "var(--space-base)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        xxl: "var(--space-xxl)",
        section: "var(--space-section)",
      },
    },
  },
  plugins: [],
};

export default config;
```

Then in `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Paste the full variable block from docs/design-tokens.css */
}
```

---

## Responsive breakpoints (CSS vars or Tailwind defaults)

| Name | Width | Key layout changes |
|---|---|---|
| Mobile | < 744px | Single-column, stacked sections, hamburger nav, sticky bottom CTA bar |
| Tablet | 744–1128px | 2-column grids, side-rail appears, nav stays visible |
| Desktop | 1128–1440px | Full nav, 3–4 column grids, hero + side CTA |
| Wide | > 1440px | Max-width container centered, gutters absorb extra space |

Use Tailwind breakpoints (`sm`, `md`, `lg`, `xl`) mapped to these widths.

---

## Shadow tier (CSS variable)

```css
:root {
  --shadow-float: 0 0 0 1px rgba(0,0,0,0.02),
                  0 2px 6px rgba(0,0,0,0.04),
                  0 4px 8px rgba(0,0,0,0.10);
}
```

Apply on hover for cards, dropdowns, search-bar rest state.  95% of surfaces remain flat (no shadow).
