import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './App';
import { ROUTE_META } from './data/routeMeta';

/** The prerendered output for a single route. */
interface RenderedRoute {
  /** Inner HTML for the #root container. */
  body: string;
  /** styled-components <style> tags for the rules this route actually used. */
  styles: string;
}

/**
 * Renders one route to static HTML for the build-time prerender.
 *
 * Only the pathname is passed: a prerendered file is only ever served from
 * its own path, and `useHashRoute` makes the same assumption on its first
 * client render, which is what keeps hydration from mismatching.
 *
 * @param path - Absolute route path, e.g. '/product/gitall'.
 * @returns {RenderedRoute} The markup and the styles it depends on.
 */
const renderRoute = (path: string): RenderedRoute => {
  const sheet = new ServerStyleSheet();

  try {
    const body = renderToString(
      sheet.collectStyles(<App initialPath={path} />),
    );

    return { body, styles: sheet.getStyleTags() };
  } finally {
    // Frees the sheet's interleaved state so the next route starts clean.
    sheet.seal();
  }
};

export { renderRoute, ROUTE_META };
export type { RenderedRoute };
