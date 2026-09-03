import { PRODUCTS } from './catalog';
import type { Product } from '../types/catalog';

/**
 * Origin used to build absolute canonical and og:url values.
 *
 * Hard-coded rather than read from window.location for two reasons: a preview
 * deployment must never advertise itself as the canonical home of production
 * content, and the build-time prerender step has to produce the same values
 * with no DOM available at all.
 */
const SITE_ORIGIN = 'https://toastbyte.studio';

/** The head metadata for a single page. */
interface PageMeta {
  title: string;
  description: string;
}

/** A page's metadata together with the path it is served from. */
interface RouteMeta extends PageMeta {
  /** Absolute path, e.g. '/product/gitall'. */
  path: string;
}

const DEFAULT_META: PageMeta = {
  title: 'Toastbyte Studios — independent software development',
  description:
    'Toastbyte Studios is an independent development studio in Las Vegas building GitAll, TOAST and Alley Admin — software that works offline, loads fast, and is maintained after launch.',
};

/** Metadata for the views whose copy does not come from the catalog. */
const STATIC_META: Record<string, PageMeta> = {
  notFound: {
    title: 'Page not found | Toastbyte Studios',
    description:
      'The page you requested could not be found. Return to the Toastbyte Studios home page.',
  },
  studio: {
    title: 'The studio | Toastbyte Studios',
    description:
      'How Toastbyte Studios works: an independent development studio in Las Vegas that ships products and keeps maintaining them.',
  },
  changelog: {
    title: 'Changelog | Toastbyte Studios',
    description:
      'Release notes across the Toastbyte Studios portfolio — GitAll, TOAST, Alley Admin and this site — newest first.',
  },
  support: {
    title: 'Support | Toastbyte Studios',
    description:
      'Get help with a Toastbyte Studios product. Contact routes for general enquiries, product support and GitAll issues.',
  },
  privacy: {
    title: 'Privacy Policy | Toastbyte Studios',
    description:
      'Privacy policy for TOAST — Trusted Outdoor and Survival Toolkit — by Toastbyte Studios.',
  },
};

/**
 * Derives a product page's metadata from its catalog entry, so product copy
 * has exactly one source and the prerendered head cannot drift from what the
 * app renders at runtime.
 */
const productMeta = (product: Product): PageMeta => ({
  title: `${product.name} — ${product.kind} | Toastbyte Studios`,
  description: product.blurb,
});

/**
 * Resolves the metadata for an active route at runtime.
 *
 * @param view - The resolved view name.
 * @param productKey - The catalog key, only consulted for the product view.
 * @returns {PageMeta} Title and description for the route.
 */
const metaForView = (view: string, productKey: string): PageMeta => {
  if (view === 'product') {
    const current =
      PRODUCTS.find((entry) => entry.key === productKey) ?? PRODUCTS[0];
    return productMeta(current);
  }

  return STATIC_META[view] ?? DEFAULT_META;
};

/**
 * Every route the build can prerender a head for, in sitemap order.
 *
 * Product routes are generated from the catalog, so adding a product adds its
 * prerendered page too.
 */
const ROUTE_META: RouteMeta[] = [
  { path: '/', ...DEFAULT_META },
  ...PRODUCTS.map((product) => ({
    path: `/product/${product.key}`,
    ...productMeta(product),
  })),
  ...Object.entries(STATIC_META)
    .filter(([view]) => view !== 'notFound')
    .map(([view, meta]) => ({
      path: `/${view}`,
      ...meta,
    })),
];

export { SITE_ORIGIN, DEFAULT_META, STATIC_META, ROUTE_META, metaForView };
export type { PageMeta, RouteMeta };
