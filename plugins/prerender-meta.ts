import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Plugin } from 'vite';
import { ROUTE_META, SITE_ORIGIN } from '../src/data/routeMeta';

/**
 * Escapes a value for use inside a double-quoted HTML attribute.
 */
const escapeAttribute = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

/**
 * Rewrites the `content` of the single <meta> tag identified by
 * `attribute="name"`, leaving every other tag untouched.
 *
 * The tag is matched as a whole before its `content` is replaced, rather than
 * matching a fixed attribute order, because index.html is Prettier-formatted
 * and splits attributes across lines. `[^>]*` spans those newlines safely
 * since it stops at the first `>`.
 */
const setMetaContent = (
  html: string,
  attribute: string,
  name: string,
  content: string,
): string => {
  const tag = new RegExp(`<meta\\b[^>]*\\b${attribute}="${name}"[^>]*>`, 'i');

  if (!tag.test(html)) {
    throw new Error(`prerender-meta: <meta ${attribute}="${name}"> not found`);
  }

  return html.replace(tag, (match) => {
    if (!/content="[^"]*"/i.test(match)) {
      throw new Error(
        `prerender-meta: <meta ${attribute}="${name}"> has no content attribute`,
      );
    }

    return match.replace(
      /content="[^"]*"/i,
      `content="${escapeAttribute(content)}"`,
    );
  });
};

/** Rewrites the href of the canonical link tag. */
const setCanonical = (html: string, href: string): string =>
  html.replace(/<link\b[^>]*\brel="canonical"[^>]*>/i, (match) =>
    match.replace(/href="[^"]*"/i, `href="${escapeAttribute(href)}"`),
  );

/** Replaces the document title. */
const setTitle = (html: string, title: string): string =>
  html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeAttribute(title)}</title>`,
  );

/**
 * Emits one HTML file per route, each a copy of the built shell with its own
 * title, description, canonical and share tags baked in.
 *
 * Why this exists: the site is client-rendered, so a crawler that does not
 * execute JavaScript sees only the shell's default metadata no matter which
 * URL it asked for. Google renders and is unaffected, but social crawlers
 * never do and the AI crawlers welcomed in robots.txt mostly do not either.
 * Baking the head in fixes those without touching how the app runs.
 *
 * Files are written flat — dist/studio.html, dist/product/gitall.html — not as
 * directory indexes. Cloudflare Pages serves /studio from studio.html with no
 * trailing-slash negotiation, which keeps the served URL identical to the one
 * in sitemap.xml and in each page's own canonical.
 *
 * The body is filled in afterwards by scripts/prerender.mjs, which renders
 * each route through the SSR bundle and writes the markup into #root.
 */
const prerenderMeta = (): Plugin => {
  let outDir = 'dist';
  let isSsrBuild = false;

  return {
    name: 'toastbyte:prerender-meta',
    apply: 'build',

    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
      // The SSR pass emits a JS bundle and no index.html, so there is no
      // shell for this plugin to copy. It only has work to do on the client
      // build.
      isSsrBuild = Boolean(config.build.ssr);
    },

    async closeBundle() {
      if (isSsrBuild) return;

      const shell = await readFile(path.join(outDir, 'index.html'), 'utf-8');

      // '/' is served by index.html itself, which already carries the
      // default metadata, so it needs no second copy.
      const routes = ROUTE_META.filter((route) => route.path !== '/');

      for (const route of routes) {
        const url = `${SITE_ORIGIN}${route.path}`;

        let html = setTitle(shell, route.title);
        html = setMetaContent(html, 'name', 'description', route.description);
        html = setMetaContent(html, 'property', 'og:title', route.title);
        html = setMetaContent(
          html,
          'property',
          'og:description',
          route.description,
        );
        html = setMetaContent(html, 'property', 'og:url', url);
        html = setMetaContent(html, 'name', 'twitter:title', route.title);
        html = setMetaContent(
          html,
          'name',
          'twitter:description',
          route.description,
        );
        html = setCanonical(html, url);

        const file = path.join(outDir, `${route.path.slice(1)}.html`);
        await mkdir(path.dirname(file), { recursive: true });
        await writeFile(file, html, 'utf-8');
      }

      console.log(`prerendered head for ${routes.length} routes`);
    },
  };
};

export { prerenderMeta };
