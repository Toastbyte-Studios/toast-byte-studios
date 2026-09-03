import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import { PRODUCTS } from '../data/catalog';
import { ANALYTICS_EVENTS, trackClientEvent } from '../lib/analytics-client';

type View =
  | 'home'
  | 'product'
  | 'studio'
  | 'changelog'
  | 'support'
  | 'privacy'
  | 'notFound';

interface Route {
  view: View;
  /** Product key, only meaningful when view is 'product'. */
  product: string;
}

/**
 * Resolves a bare route path — no leading '#' or '/', no trailing slash — into
 * a route. Shared by the hash and pathname parsers so both forms of URL agree
 * on what a given set of segments means.
 *
 * @param path - The normalised path, e.g. 'product/gitall' or 'studio'.
 * @returns {Route} The resolved view and product key.
 */
const parseSegments = (path: string): Route => {
  if (!path) return { view: 'home', product: PRODUCTS[0].key };

  const [head, tail, ...remaining] = path.split('/');
  const notFound = { view: 'notFound' as const, product: PRODUCTS[0].key };

  switch (head) {
    case 'product': {
      const known = !remaining.length && PRODUCTS.some((p) => p.key === tail);
      return known ? { view: 'product', product: tail } : notFound;
    }
    case 'studio':
      return !tail ? { view: 'studio', product: PRODUCTS[0].key } : notFound;
    case 'changelog':
      return !tail ? { view: 'changelog', product: PRODUCTS[0].key } : notFound;
    case 'support':
      return !tail ? { view: 'support', product: PRODUCTS[0].key } : notFound;
    case 'privacy':
      return !tail ? { view: 'privacy', product: PRODUCTS[0].key } : notFound;
    default:
      return notFound;
  }
};

const ROUTE_HASHES = new Set(['studio', 'changelog', 'support', 'privacy']);

/** Strips the leading '#', optional '/' and any trailing slash from a hash. */
const normaliseHash = (raw: string): string => {
  const normalised = raw.replace(/^#\/*/, '').replace(/\/+$/, '');

  if (!normalised) return '';

  const [head] = normalised.split('/');
  return head === 'product' || ROUTE_HASHES.has(head) ? normalised : '';
};

/** Strips the leading and trailing slashes from a pathname. */
const normalisePath = (raw: string): string =>
  raw.replace(/^\/+/, '').replace(/\/+$/, '');

/**
 * Parses a raw location hash into a route.
 *
 * Accepts both the slash-prefixed forms (`#/studio`, `#/product/gitall`) and
 * the legacy bare forms (`#support`, `#privacy`) that older links and the app
 * store listings still point at, so existing URLs keep resolving.
 *
 * @param raw - The location hash, including the leading '#'.
 * @returns {Route} The resolved view and product key.
 */
const parseHash = (raw: string): Route => parseSegments(normaliseHash(raw));

/**
 * Resolves the active route from a full location.
 *
 * The pathname wins when it is non-empty, so `/support#form` is read as the
 * support view with an in-page anchor rather than as an unknown hash route.
 * A bare pathname of '/' falls through to the hash, which is what every
 * existing `https://toastbyte.studio/#/studio` style link looks like — those
 * keep working untouched.
 *
 * @param pathname - The location pathname, including the leading '/'.
 * @param hash - The location hash, including the leading '#'.
 * @returns {Route} The resolved view and product key.
 */
const parseLocation = (pathname: string, hash: string): Route => {
  const path = normalisePath(pathname);

  return path ? parseSegments(path) : parseSegments(normaliseHash(hash));
};

/**
 * Sends a GA4 page_view for a route change.
 *
 * `page_location` and `page_title` are the field names GA4's built-in Pages
 * reports read, so they have to be spelled exactly this way — a custom name
 * would leave the route reports empty. `view` and `product` come along as
 * extra params because they are far more useful for segmentation than parsing
 * a hash fragment after the fact.
 */
const trackRouteView = (route: Route) => {
  const label =
    route.view === 'product' ? `${route.view}/${route.product}` : route.view;

  trackClientEvent(ANALYTICS_EVENTS.pageView, {
    page_location: window.location.href,
    page_title: `${document.title} \u2014 ${label}`,
    view: route.view,
    ...(route.view === 'product' ? { product: route.product } : {}),
  });
};

/** Separator that cannot occur in a pathname or hash. */
const KEY_SEPARATOR = '\u0000';

/** Serialises the parts of the location this hook cares about. */
const readLocationKey = (): string =>
  `${window.location.pathname}${KEY_SEPARATOR}${window.location.hash}`;

/** Subscribes to both forms of history navigation. */
const subscribeToLocation = (onChange: () => void): (() => void) => {
  window.addEventListener('hashchange', onChange);
  window.addEventListener('popstate', onChange);

  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener('popstate', onChange);
  };
};

/**
 * Tracks the current route and keeps it in sync with browser navigation.
 *
 * Reads the location through useSyncExternalStore so the first render can be
 * served from a snapshot that exists without a DOM. That snapshot is the
 * pathname alone, with no hash: the prerender only knows the pathname, so
 * including the hash would have a legacy '/#/studio' link render Home on the
 * server and Studio on the client. React swaps to the live snapshot straight
 * after hydration, which resolves the hash without ever mismatching.
 *
 * @param initialPath - Pathname for the first render, supplied by the build.
 *   Omitted in the browser, where the live location is read instead.
 * @returns {Route} The active route.
 */
const useHashRoute = (initialPath?: string): Route => {
  const key = useSyncExternalStore(
    subscribeToLocation,
    readLocationKey,
    () => `${initialPath ?? window.location.pathname}${KEY_SEPARATOR}`,
  );

  const route = useMemo(() => {
    const [pathname, hash] = key.split(KEY_SEPARATOR);
    return parseLocation(pathname, hash);
  }, [key]);

  const previous = useRef<Route | null>(null);

  useEffect(() => {
    const last = previous.current;
    previous.current = route;

    // Nothing to report on the first pass; Zaraz already logs the initial
    // document load on its own.
    if (!last) return;
    if (last.view === route.view && last.product === route.product) return;

    window.scrollTo(0, 0);
    trackRouteView(route);
  }, [route]);

  return route;
};

export { useHashRoute, parseHash, parseLocation };
export type { Route, View };
