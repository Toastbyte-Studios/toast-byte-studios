import { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/catalog';

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

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
};

export { useHashRoute, parseHash };
export type { Route, View };
