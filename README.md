# Toastbyte Studios — Studio Site

The company site for **Toastbyte Studios**, an independent software development studio in Las Vegas, Nevada. It covers the studio and its whole product portfolio — not any single product.

Live at [toastbyte.studio](https://toastbyte.studio/)

## What the site contains

| View      | Route            | Contents                                                                 |
| --------- | ---------------- | ------------------------------------------------------------------------ |
| Home      | `/`              | Positioning hero, live product status panel, email signup, product index |
| Product   | `/product/<key>` | Per-product page: lede, numbered features, facts table, related products |
| Studio    | `/studio`        | How the studio works, its principles, and press details                  |
| Changelog | `/changelog`     | GitHub releases across the portfolio and this site, merged newest first  |
| Support   | `/support`       | Contact routes for enquiries, product support and issue trackers         |
| Privacy   | `/privacy`       | Privacy policy                                                           |

### Routing

Routing is path-based and hand-rolled, spread across three files in `src/routing/`:

- **`useHashRoute.ts`** resolves the active route from `location.pathname`, falling back to the hash when the pathname is bare. Back/forward is handled by listening for both `popstate` and `hashchange`.
- **`navigate.ts`** performs a `pushState` and dispatches `popstate` by hand, since `pushState` does not fire it.
- **`useLinkNavigation.ts`** is one delegated click listener on `document` that turns internal anchors into client-side navigations. Modified clicks, `target`, `download`, cross-origin, `mailto:`/`tel:` and bare in-page anchors like `#products` are handed back to the browser.

Because every path is served the same `index.html`, two things have to hold for a path route to work at all:

1. **`public/_redirects`** rewrites unmatched paths to `/index.html` with a 200, so a hard load of `/studio` serves the app rather than a 404. Redirects there do not apply to requests served by Pages Functions, so `/api/*` still reaches `functions/`.
2. **`applyMeta` in `App.tsx`** rewrites `link[rel=canonical]` and `og:url` per route. The static canonical in `index.html` is a starting value; left unmanaged, every route would declare the home page as its canonical and none of them would be indexed.

Legacy hash URLs (`#/studio`, and the bare `#support` and `#privacy` forms that older links and app store listings point at) still resolve. Clicking one navigates to its path equivalent, so the address bar canonicalises itself.

The site is still client-rendered, so a crawler that does not execute JavaScript sees the shell and its default metadata rather than the route's own. Google renders and is unaffected; social and AI crawlers are not. Prerendering is the fix and is not implemented yet.

## Products

The catalog lives in `src/data/catalog.ts` and is the single source of truth: the home index, the product pages, and the list of repos the changelog polls are all derived from it. Adding a product there adds it everywhere.

Each entry carries a `verified` flag indicating whether its copy and figures have been confirmed.

| Product     | Key      | Status         | `verified` |
| ----------- | -------- | -------------- | ---------- |
| GitAll      | `gitall` | Live           | ✅ yes     |
| TOAST       | `toast`  | In Development | ❌ no      |
| Alley Admin | `alley`  | In Development | ❌ no      |

**GitAll** ([gitall.app](https://gitall.app) · [repo](https://github.com/Toastbyte-Studios/git-all)) is the one confirmed entry: a free, no-login web tool that merges contribution graphs from GitHub, GitLab, Bitbucket and Gitea/Forgejo into a single heatmap.

**TOAST** and **Alley Admin** are described in the catalog, but their entries are placeholder copy carried over from the design comp and are flagged `verified: false`. Their prose reads as real, so treat every figure, version string and status line in those two entries as unconfirmed until the flag is flipped. This README deliberately does not repeat those claims.

A product whose `repo` points at the organisation root rather than a specific repository is skipped by the changelog, which is how TOAST is currently handled.

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** for bundling and the dev server
- **Styled Components 6** for styling
- **Cloudflare Pages** for hosting
- **Cloudflare Workers** for the email signup API
- **Cloudflare D1** for storing signups
- **Cloudflare Turnstile** for bot protection on the signup form

No routing, state or UI dependency beyond the above — routing, theming and data fetching are all hand-rolled hooks.

## Project Structure

```text
public/
  _redirects          — SPA fallback so path routes resolve on a hard load
src/
  Components/
    AnalyticsConsentBanner/ — Analytics cookie consent dialog
    Changelog/      — Release feed, GitHub fetching hook, note formatting
    EmailCapture/   — Email signup form with Turnstile verification
    Footer/         — Site footer
    Home/           — Hero, status panel, product index, closing columns
    Nav/            — Header, section links, theme toggle, mobile drawer
    PrivacyPolicy/  — Privacy policy view
    ProductPage/    — Per-product detail view
    Studio/         — Studio principles and press panel
    Support/        — Contact routes
  data/
    catalog.ts      — Products, principles and contacts (source of truth)
  lib/
    github.ts       — Release sources and the GitHub releases fetcher
  routing/
    useHashRoute.ts     — Route parsing from pathname, with hash fallback
    navigate.ts         — pushState navigation helper
    useLinkNavigation.ts — Delegated click interception for internal links
  styles/
    tokens.css      — Design tokens; light values on :root, dark on .tb-dark
    primitives.ts   — Shared styled primitives
    pageLayout.ts   — Layout for long-form legal pages
  theme/            — Theme context, provider and hook
  types/            — Shared TypeScript types
  constants.ts      — Colors, breakpoints, touch target size
worker/             — Cloudflare Worker for the email signup API
scripts/            — Build utilities (sitemap timestamps, icon generation)
```

Each component folder pairs a `.tsx` with its own `styles.ts`.

## Theming

Light and dark are driven entirely by CSS custom properties in `src/styles/tokens.css`. `ThemeProvider` toggles a `tb-dark` class on the document element and sets `color-scheme`, so switching themes repaints the site without React re-rendering individual components. The choice persists to `localStorage` under `tb-theme` and falls back to the operating system preference.

## Changelog

The changelog reads GitHub releases live from each source repo, merges them newest first, and reveals them a page at a time. Sources come from two places in `src/lib/github.ts`: the product repos derived from the catalog, plus a short list of non-product repos that currently holds this site.

Draft releases are filtered out, and the unauthenticated GitHub API does not return them in any case — releases have to be published to appear here.

## Email signup

The `EmailCapture` component posts to a Cloudflare Worker (`worker/`), which verifies the Turnstile token, validates the address, and inserts it into a D1 table. A duplicate address returns success rather than an error. Note that this is a signup list, not a contact form — the support page routes to email addresses and issue trackers directly.

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

Both environment variables are public, client-side values:

| Variable                  | Purpose                             |
| ------------------------- | ----------------------------------- |
| `VITE_EMAIL_WORKER_URL`   | Endpoint of the email signup Worker |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key       |

The Worker has its own config in `worker/wrangler.toml` and its own secret (`TURNSTILE_SECRET_KEY`); see `worker/.dev.vars.example`.

## Available Scripts

| Script                      | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| `npm run dev`               | Start the local dev server                                   |
| `npm run build`             | Type-check and build for production                          |
| `npm run postbuild`         | Update sitemap timestamps (runs automatically after `build`) |
| `npm run preview`           | Preview the production build locally                         |
| `npm run lint`              | Run ESLint                                                   |
| `npm run lint:fix`          | Run ESLint with autofix                                      |
| `npm run format`            | Format with Prettier                                         |
| `npm run format:check`      | Check formatting without writing                             |
| `npm run cleanup`           | Format, then lint                                            |
| `npm run clean:appledouble` | Remove AppleDouble (`._*`) files                             |
| `npm run generate:icons`    | Regenerate favicon and icon assets from source               |

## Workflows

| Workflow                   | Trigger        | What it does                                    |
| -------------------------- | -------------- | ----------------------------------------------- |
| `ci.yml`                   | PR to `main`   | Lint, format check, build                       |
| `require-version-bump.yml` | PR to `main`   | Fails if `package.json` version matches `main`  |
| `deploy.yml`               | Push to `main` | Builds and deploys to Cloudflare Pages          |
| `tag-and-release.yml`      | Push to `main` | Tags the version and publishes a GitHub release |

**Every pull request to `main` must bump the `package.json` version**, or CI fails. That version becomes the release tag, which is what the changelog then displays.

## Deployment

The site builds to `dist/` and deploys to Cloudflare Pages automatically on push to `main`. The Worker is deployed separately with Wrangler from the `worker/` directory.

---

Built by [Jason Shprintz](https://github.com/jason-shprintz) · [Toastbyte Studios](https://toastbyte.studio/)
