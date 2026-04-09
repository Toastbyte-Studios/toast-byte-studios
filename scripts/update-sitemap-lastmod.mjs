/**
 * Updates the <lastmod> date in public/sitemap.xml to today's date (YYYY-MM-DD).
 * Run this script as part of the build pipeline to keep lastmod fresh on every deploy.
 *
 * Usage: node scripts/update-sitemap-lastmod.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const sitemapPath = path.resolve('public/sitemap.xml');
const today = new Date().toISOString().slice(0, 10);

const content = fs.readFileSync(sitemapPath, 'utf-8');
const updated = content.replace(
  /<lastmod>[^<]*<\/lastmod>/g,
  `<lastmod>${today}</lastmod>`,
);

fs.writeFileSync(sitemapPath, updated, 'utf-8');
console.log(`sitemap.xml lastmod updated to ${today}`);
