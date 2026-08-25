import { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/catalog';
import { ANALYTICS_EVENTS, trackClientEvent } from '../lib/analytics-client';

type View = 'home' | 'product' | 'studio' | 'changelog' | 'support' | 'privacy';

interface Route {
  view: View;
  /** Product key, only meaningful when view is 'product'. */
  product: string;
}

/**
 * Parses a raw location hash into a route.
 *
 * Accepts both the new slash-prefixed forms (`#/studio`, `#/product/gitall`)
 * and the legacy bare forms (`#support`, `#privacy`) that older links and the
 * app store listings still point at, so existing URLs keep resolving.
 *
 * @param raw - The location hash, including the leading '#'.
 * @returns {Route} The resolved view and product key.
 */
const parseHash = (raw: string): Route => {
  const path = raw.replace(/^#\/?/, '').replace(/\/$/, '');
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
 * Tracks the current hash route and keeps it in sync with browser navigation.
 *
 * Scrolls to the top whenever the route changes, matching the behaviour of the
 * design comp without losing back/forward support or deep links.
 *
 * @returns {Route} The active route.
 */
const useHashRoute = (): Route => {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(window.location.hash),
  );

  // Zaraz's automated Pageviews action already sent a page_view for whatever
  // route the document loaded on. Firing again here would double-count every
  // landing page, so the first run is deliberately skipped and only real
  // navigation is reported.
  const hasTrackedInitialRoute = useRef(false);

  useEffect(() => {
    const handleHashChange = () => {
      const next = parseHash(window.location.hash);
      setRoute(next);
      window.scrollTo(0, 0);
      trackRouteView(next);
    };

    if (!hasTrackedInitialRoute.current) {
      hasTrackedInitialRoute.current = true;
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
};

export { useHashRoute, parseHash };
export type { Route, View };
