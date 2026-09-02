import { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/catalog';
import { ANALYTICS_EVENTS, trackClientEvent } from '../lib/analytics-client';

type View = 'home' | 'product' | 'studio' | 'changelog' | 'support' | 'privacy';

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
  const [head, tail] = path.split('/');

  switch (head) {
    case 'product': {
      const known = PRODUCTS.some((p) => p.key === tail);
      return { view: 'product', product: known ? tail : PRODUCTS[0].key };
    }
    case 'studio':
      return { view: 'studio', product: PRODUCTS[0].key };
    case 'changelog':
      return { view: 'changelog', product: PRODUCTS[0].key };
    case 'support':
      return { view: 'support', product: PRODUCTS[0].key };
    case 'privacy':
      return { view: 'privacy', product: PRODUCTS[0].key };
    default:
      return { view: 'home', product: PRODUCTS[0].key };
  }
};

/** Strips the leading '#', optional '/' and any trailing slash from a hash. */
const normaliseHash = (raw: string): string =>
  raw.replace(/^#\/?/, '').replace(/\/$/, '');

/** Strips the leading and trailing slashes from a pathname. */
const normalisePath = (raw: string): string =>
  raw.replace(/^\//, '').replace(/\/$/, '');

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

/**
 * Tracks the current route and keeps it in sync with browser navigation.
 *
 * Listens for `popstate` as well as `hashchange` so back/forward works for
 * both URL forms. Scrolls to the top whenever the route changes, matching the
 * behaviour of the design comp without losing deep links.
 *
 * @returns {Route} The active route.
 */
const useHashRoute = (): Route => {
  const [route, setRoute] = useState<Route>(() =>
    parseLocation(window.location.pathname, window.location.hash),
  );

  useEffect(() => {
    const handleLocationChange = () => {
      const next = parseLocation(
        window.location.pathname,
        window.location.hash,
      );
      setRoute(next);
      window.scrollTo(0, 0);
      trackRouteView(next);
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return route;
};

export { useHashRoute, parseHash, parseLocation };
export type { Route, View };
