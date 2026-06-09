# kierancalavan.com

Personal site for Kieran Calavan — a single-page developer portfolio. Static, fast, and dependency-light.

Live at **[kierancalavan.com](https://kierancalavan.com)**.

## Stack

- **[Astro](https://astro.build)** — static site generator. Output is fully static HTML/CSS with a sliver of vanilla JS; no client framework, no hydration.
- **[Tailwind CSS](https://tailwindcss.com)** (v3) via `@astrojs/tailwind`, configured in [tailwind.config.mjs](tailwind.config.mjs). Base styles are applied manually (not by the integration) — see [astro.config.mjs](astro.config.mjs).
- **[Fontsource](https://fontsource.org)** — self-hosted variable fonts: Geist (sans) and Geist Mono. No external font CDN.
- **[GoatCounter](https://www.goatcounter.com)** — privacy-friendly, cookieless analytics. Loaded as an async script in the layout `<head>`.

Exact versions live in [package.json](package.json).

## Architecture

One page, rendered at build time. There is no router, no API, no server.

```
src/
├─ pages/
│  └─ index.astro       # the entire page: content, layout grid, and scoped styles
├─ layouts/
│  └─ BaseLayout.astro  # <html> shell: meta/OG tags, favicons, fonts, analytics, <slot/>
├─ styles/
│  └─ global.css        # Tailwind directives + design tokens, animations, link/caret effects
└─ env.d.ts
```

### How a build resolves

1. `index.astro` imports `BaseLayout` and defines its content as plain data arrays (`links`, `details`, `builds`) in the frontmatter.
2. It renders a masthead + a CSS-grid "ledger" (profile / details / contact) and maps over those arrays for the markup.
3. `BaseLayout` wraps it in the document shell — imports the fonts and [global.css](src/styles/global.css), injects SEO/Open Graph meta, favicons, and the GoatCounter snippet, then drops the page into `<slot/>`.
4. Tailwind scans `src/**` (per [tailwind.config.mjs](tailwind.config.mjs)) and emits only the utilities used.
5. Astro outputs static files to `dist/`.

### Design notes

The look is a "terminal / ledger" aesthetic — monospace accents, a blinking caret, a yellow accent token (`--accent`), and a faint SVG particle background. Most interaction is **CSS-only**:

- Project tooltips expand on hover (desktop) or via a hidden checkbox toggle (mobile) using `:has()` and `grid-template-rows` transitions.
- Entrance animations use staggered `animation-delay` on a `.rise` keyframe.
- All motion is gated behind `prefers-reduced-motion: reduce`.

The only JavaScript on the page is the GoatCounter beacon. (The staggered-reveal `<script>` in `Profile.astro` is part of an unused component — see below.)

## Project structure

```
.
├─ public/                # served as-is at the site root
│  ├─ CNAME               # custom domain (kierancalavan.com) for GitHub Pages
│  ├─ favicon.svg, favicon-512x512.png
│  ├─ kieran-color.jpeg   # OG image + profile photo
│  ├─ bg-pattern.svg      # background texture
│  └─ ...
├─ src/                    # see Architecture above
├─ .github/workflows/
│  └─ deploy.yml          # build + deploy to GitHub Pages
├─ astro.config.mjs
├─ tailwind.config.mjs
└─ package.json
```

## Local development

Requires a recent Node (Node 20+ is safe; check `engines` in your installed Astro version).

```bash
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # static build → dist/
npm run preview   # serve the production build locally
```

## Deployment

Pushes to `main` trigger [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to **GitHub Pages**. The custom domain is set by [public/CNAME](public/CNAME). The workflow also runs on a nightly `cron` and can be triggered manually via `workflow_dispatch`.

> Note: `.github/` is listed in [.gitignore](.gitignore). The workflow already lives in the remote repo, so deploys run — but local changes to it won't be tracked or pushed unless force-added (`git add -f`).

## Unused / legacy code

Three components are **not imported anywhere** — they're remnants of an earlier design iteration and don't ship in the build:

- `src/components/Profile.astro`
- `src/components/SocialLinks.astro`
- `src/components/GithubChart.astro` — fetched GitHub contribution data at build time via a `GH_TOKEN` secret. The nightly `cron` in the deploy workflow and the `GH_TOKEN` build env exist to feed this component and are currently dormant.

Safe to delete if the GitHub contribution graph isn't coming back.
