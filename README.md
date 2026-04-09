# Toastbyte Studios — Marketing Site

The official marketing website for **TOAST (Trusted Outdoor and Survival Toolkit)**, an offline-first emergency preparedness app for hikers, preppers, and anyone who wants to be ready.

Live at [toastbyte.studio](https://toastbyte.studio/)

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** for bundling and dev server
- **Styled Components** for styling
- **Cloudflare Workers** for backend (email contact form with Turnstile CAPTCHA)
- **Cloudflare D1** for database (contact form submissions)

## Project Structure

```text
src/
  Components/
    About/          — Studio & founder info section
    FeaturesSection/ — TOAST module grid (Core, Navigation, Communications, Reference, Prepper, Earth)
    Footer/         — Site footer
    FounderStory/   — Founder background
    LandingPage/    — Hero section
    Nav/            — Navigation bar
    PrivacyPolicy/  — Privacy policy page
    Support/        — Support / contact form
  constants.ts      — Shared colors and breakpoints
  types/            — Shared TypeScript types
worker/             — Cloudflare Worker for contact form API
scripts/            — Build utilities (sitemap timestamps, icon generation)
```

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

| Script                   | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `npm run dev`            | Start local dev server                               |
| `npm run build`          | Update sitemap, type-check, and build for production |
| `npm run lint`           | Run ESLint                                           |
| `npm run format`         | Run Prettier                                         |
| `npm run cleanup`        | Remove Apple Double files, format, and lint          |
| `npm run generate:icons` | Regenerate favicon/icon assets from source           |
| `npm run preview`        | Preview the production build locally                 |

## TOAST App Modules

The site showcases six core modules, all of which work fully offline:

- **Core** — Flashlight, compass, whistle timer, and survival calculations
- **Navigation** — Offline maps, coordinate tools, and terrain reference
- **Communications** — Emergency frequencies, signaling protocols, and contact tools
- **Reference** — Survival guides, first aid procedures, and field references
- **Prepper** — Checklists, gear inventory, and scenario-based planning
- **Earth** — Sun/lunar cycles, barometric pressure, and celestial events

## Deployment

The site builds to `dist/` and is deployed to Cloudflare Pages. The Worker handles the contact form API and is deployed separately via Wrangler.

---

Built by [Jason Shprintz](https://github.com/jason-shprintz) · [Toastbyte Studios](https://toastbyte.studio/)
