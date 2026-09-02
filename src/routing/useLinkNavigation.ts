import { useEffect } from 'react';
import { navigate } from './navigate';

/**
 * True when the browser should be left to handle the click itself — a
 * middle/right button, a modifier held to open a new tab or window, or a
 * handler that has already claimed the event.
 */
const isModifiedClick = (event: MouseEvent): boolean =>
  event.defaultPrevented ||
  event.button !== 0 ||
  event.metaKey ||
  event.ctrlKey ||
  event.shiftKey ||
  event.altKey;

/**
 * Resolves an anchor to the internal route it points at, or null when the
 * anchor should be left alone.
 *
 * Legacy hash routes (`#/studio`) resolve to their path equivalent. That is
 * what makes a partial migration safe: a link that still uses the hash form
 * navigates to the same place as one that has been converted, instead of
 * appending a hash to the current pathname and going nowhere. Bare in-page
 * anchors (`#form`) are not routes and are handed back to the browser, as are
 * external links, downloads, mailto/tel, and anything with a target.
 *
 * @param anchor - The anchor that was clicked.
 * @returns {string | null} The internal route, or null to skip.
 */
const routeFor = (anchor: HTMLAnchorElement): string | null => {
  if (anchor.target && anchor.target !== '_self') return null;
  if (anchor.hasAttribute('download')) return null;

  const href = anchor.getAttribute('href');
  if (!href) return null;

  if (href.startsWith('#')) {
    return href.startsWith('#/') ? `/${href.slice(2)}` : null;
  }

  if (anchor.origin !== window.location.origin) return null;

  return `${anchor.pathname}${anchor.search}${anchor.hash}`;
};

/**
 * Intercepts clicks on internal links and routes them client-side.
 *
 * A single delegated listener rather than a Link component, so that every
 * anchor in the app keeps working as a real `<a href>` — crawlable, and still
 * openable in a new tab — without each call site having to opt in.
 */
const useLinkNavigation = (): void => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (isModifiedClick(event)) return;

      const target = event.target as Element | null;
      const anchor = target?.closest?.('a') ?? null;
      if (!anchor) return;

      const to = routeFor(anchor);
      if (!to) return;

      event.preventDefault();
      navigate(to);
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);
};

export { useLinkNavigation, routeFor };
