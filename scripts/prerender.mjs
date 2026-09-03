/**
 * Injects real markup into each prerendered HTML file.
 *
 * plugins/prerender-meta.ts has already emitted one file per route with the
 * correct head. This fills in the body: it renders each route through the SSR
 * bundle and writes the result into that file's #root container, along with
 * the styled-components rules the route used.
 *
 * Runs after both builds. Usage: node scripts/prerender.mjs
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = path.resolve('dist');
const SSR_ENTRY = path.resolve('dist-ssr/entry-server.js');

const { renderRoute, ROUTE_META } = await import(pathToFileURL(SSR_ENTRY).href);

/** Maps a route path to the file that serves it. */
const fileForRoute = (routePath) =>
  routePath === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, `${routePath.slice(1)}.html`);

const EMPTY_ROOT = '<div id="root"></div>';

let count = 0;

for (const route of ROUTE_META) {
  const file = fileForRoute(route.path);
  const html = await readFile(file, 'utf-8');

  if (!html.includes(EMPTY_ROOT)) {
    throw new Error(
      `prerender: ${path.relative(DIST, file)} has no empty ${EMPTY_ROOT} to fill`,
    );
  }

  const { body, styles } = renderRoute(route.path);

  const filled = html
    .replace(EMPTY_ROOT, `<div id="root">${body}</div>`)
    .replace('</head>', `${styles}</head>`);

  await writeFile(file, filled, 'utf-8');
  count += 1;
}

console.log(`prerendered body for ${count} routes`);
