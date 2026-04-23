# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server on port 4323 (HMR enabled)
npm run build     # Production build → /dist
npm run preview   # Preview production build locally
```

No linting or test tooling is configured.

## Architecture

**Astro 5 SSG** — bilingual corporate marketing site for DGD Enterprise (official Codeplex partner in Peru). No server-side logic; pure static output.

### i18n

- Default locale: `es` (es-PE). Second locale: `en` (en-US).
- All routes are prefix-based: `/es/...` and `/en/...`. Root `/` redirects to `/es/`.
- Content is stored in `src/datos/{es,en}/*.json` and loaded with `cargarDatos(idioma, archivo)` from `src/helpers/idiomas.ts`, which uses `import.meta.glob`.
- UI labels (buttons, aria strings) live in `src/idiomas/{es,en}.json`, loaded via `cargarTextosUi(idioma)`.

### Path aliases (tsconfig.json)

| Alias | Resolves to |
|---|---|
| `@componentes/*` | `src/componentes/*` |
| `@datos/*` | `src/datos/*` |
| `@estilos/*` | `src/estilos/*` |
| `@helpers/*` | `src/helpers/*` |
| `@idiomas/*` | `src/idiomas/*` |
| `@layout/*` | `src/layout/*` |

### Layout & animations

`src/layout/Principal.astro` is the single master layout. It injects:
- Astro `<ClientRouter />` for view transitions between pages.
- Lenis smooth scroll (CDN via esm.sh).
- Dark/light mode toggle + `localStorage` persistence.
- Scroll-reveal system: elements with `[data-reveal]` or `[data-anim]` animate in via `IntersectionObserver`.
- GSAP + ScrollTrigger are loaded from CDN; detailed scroll animations live in `public/scripts/animations.js`.

All animations respect `prefers-reduced-motion: reduce`.

### Styling

- **Tailwind CSS 4** (utility-first, no custom class conventions).
- Design tokens in `src/estilos/global.css`: navy/gold color palette, border radii, shadows, glass effect (`.glass`), gradient border (`.gradient-border`), marquee (`.marquee`), button shine (`.btn-shine`).
- Dark mode: automatic via `prefers-color-scheme`; user override persisted to `localStorage`.

### Third-party libraries

All JS libraries are CDN-loaded — **not npm packages**:
- GSAP 3 + ScrollTrigger, SplitType, CountUp.js, Vanilla Tilt, Lenis, Fraunces (Google Fonts).

### Content data

All editable content lives in `src/datos/{idioma}/`:
`blog.json`, `casos.json`, `contacto.json`, `footer.json`, `inicio.json`, `navegacion.json`, `nosotros.json`, `planes.json`, `productos.json`, `seo.json`.

Product data (prices, features, contact info) should always be sourced from `codeplex.pe` — do not fabricate metrics, testimonials, or company details.

### Dynamic routes

- `src/pages/[idioma]/productos/[slug].astro` — individual product pages.
- `src/pages/[idioma]/blog/[slug].astro` — individual blog posts.
- Slugs are derived from the JSON data files.

### Binary assets (not tracked in repo)

- `public/logo.png` — official DGD logo (PNG, transparent background, ≥400px tall).
- `public/favicon.png` — 512×512 brand icon.
- `public/videos/hero.mp4` — optional hero video (falls back to Pexels CDN video).
