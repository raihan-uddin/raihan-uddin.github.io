# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal engineering portfolio for **Raihan Uddin** — Tech Team Lead / System Architect.
Deployed to GitHub Pages at `https://raihan-uddin.github.io/` from the `raihan-uddin/raihan-uddin.github.io` repo.

## Development

No build tools, no package manager, no compilation step. Pure static HTML/CSS/JS.

**To preview locally:**
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

**To deploy:** just push to `main` — GitHub Pages auto-deploys.
```bash
git add <files>
git commit -m "..."
git push
```

## Architecture

Single page (`index.html`) with two supporting files:

| File | Role |
|---|---|
| `index.html` | All markup and content — one file, all sections |
| `css/style.css` | Full design system — no Tailwind, no frameworks |
| `js/main.js` | Vanilla JS only — no libraries |

### CSS design system

All colours are CSS custom properties on `:root` (dark) and `body.light` (light theme override):

- `--bg`, `--surface`, `--surface-2` — background layers
- `--border`, `--border-h` — border at rest / on hover
- `--accent` (#4f7df3), `--accent-2` (#9166f8), `--accent-3` (#23d9b7) — the only colours used for interactive elements and gradients
- `--text-1`, `--text-2`, `--text-3` — text hierarchy

When adding a new element, use these variables — never hardcode colours. If you need a new `rgba()` with a specific colour, derive it from an existing accent (e.g. `rgba(79,125,243,0.10)`).

### Responsive breakpoints

```
≤1024px  tablet landscape
≤768px   tablet portrait / large mobile
≤480px   mobile
≤360px   very small phones
```

All breakpoints are at the bottom of `style.css` in a single block. Add new responsive rules there — do not scatter `@media` blocks throughout the file.

### JS modules (all IIFEs in `main.js`)

- `initTheme` — dark/light toggle, reads/writes `localStorage('theme')`, respects `prefers-color-scheme` on first visit
- `initTyping` — typewriter effect in the hero, cycles through `phrases[]` array
- `initNav` — adds `.scrolled` class to nav after 20px scroll
- `initMobileMenu` — hamburger open/close
- `initScrollReveal` — `IntersectionObserver` triggers `.reveal.visible` and `.stagger-children.visible`
- `initCounters` — animates `[data-count]` elements when they enter the viewport
- `initTilt` — subtle 3D card tilt on hover (desktop only, skipped if `hover: none`)
- `initCopyEmail` — clipboard copy for the email button in the contact section

### Scroll reveal pattern

Add `.reveal` to any element to fade+slide it in on scroll. Add `.reveal-delay-1` through `.reveal-delay-5` for staggered timing. For a group of children, add `.stagger-children` to the parent instead.

### Light theme

All light-mode overrides live in a `body.light { }` block near the top of `style.css`, directly after the dark `:root` variables. When adding a new component that uses hardcoded `rgba(255,255,255,...)` borders or backgrounds, add a `body.light` override for it.

## Content — key facts

- **GitHub:** `raihan-uddin` — contribution chart embedded via `https://ghchart.rshah.org/4f7df3/raihan-uddin`
- **Email:** `raihanuddin2@yahoo.com`
- **7 systems:** MedBox (featured, 2-col span), Medipos, Pharma ERP, MediCart, Lion Cinemas, Lion Parking, Workshop ERP
- **3 employers:** PulseTech Ltd (current), Multibrand Infotech, SBIT
