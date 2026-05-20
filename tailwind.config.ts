import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-active": "var(--color-primary-active)",
        "primary-disabled": "var(--color-primary-disabled)",
        "primary-error": "var(--color-primary-error-text)",
        "primary-error-hover": "var(--color-primary-error-text-hover)",
        luxe: "var(--color-luxe)",
        plus: "var(--color-plus)",
        canvas: "var(--color-canvas)",
        "surface-soft": "var(--color-surface-soft)",
        "surface-card": "var(--color-surface-card)",
        "surface-strong": "var(--color-surface-strong)",
        hairline: "var(--color-hairline)",
        "hairline-soft": "var(--color-hairline-soft)",
        "border-strong": "var(--color-border-strong)",
        ink: "var(--color-ink)",
        body: "var(--color-body)",
        muted: "var(--color-muted)",
        "muted-soft": "var(--color-muted-soft)",
        "star-rating": "var(--color-star-rating)",
        "on-primary": "var(--color-on-primary)",
        "on-dark": "var(--color-on-dark)",
        scrim: "var(--color-scrim)",
        "legal-link": "var(--color-legal-link)",
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
      borderRadius: {
        none: "var(--radius-none)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "system-ui", "Roboto", "Helvetica Neue", "sans-serif"],
        mono: ["SF Mono", "SFMono-Regular", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["var(--text-display-xl)", { lineHeight: "1.2", fontWeight: "700" }],
        "display-lg": ["var(--text-display-lg)", { lineHeight: "1.25" }],
        "display-md": ["var(--text-display-md)", { lineHeight: "1.3" }],
        "display-sm": ["var(--text-display-sm)", { lineHeight: "1.35" }],
        "title-md": ["var(--text-title-md)", { lineHeight: "1.4" }],
        "body-md": ["var(--text-body-md)", { lineHeight: "1.5" }],
        "body-sm": ["var(--text-body-sm)", { lineHeight: "1.5" }],
        "caption": ["var(--text-caption)", { lineHeight: "1.4" }],
        "caption-sm": ["var(--text-caption-sm)", { lineHeight: "1.4" }],
        "badge": ["var(--text-badge)", { lineHeight: "1.2" }],
        "micro": ["var(--text-micro)", { lineHeight: "1.3" }],
        "button-md": ["var(--text-button-md)", { lineHeight: "1.2", fontWeight: "500" }],
      },
      boxShadow: {
        float: "var(--shadow-float)",
      },
      height: {
        nav: "var(--nav-height)",
      },
      maxWidth: {
        "container-lg": "1280px",
        "container-md": "1024px",
        "container-sm": "768px",
      },
    },
  },
  plugins: [],
};

export default config;
