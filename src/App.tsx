import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { useHashRoute } from './routing/useHashRoute';
import { useLinkNavigation } from './routing/useLinkNavigation';
import { SITE_ORIGIN, metaForView } from './data/routeMeta';
import ThemeProvider from './theme/ThemeProvider';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import ProductPage from './Components/ProductPage/ProductPage';
import Studio from './Components/Studio/Studio';
import Changelog from './Components/Changelog/Changelog';
import Support from './Components/Support/Support';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy';
import Footer from './Components/Footer/Footer';
import AnalyticsConsentBanner from './Components/AnalyticsConsentBanner/AnalyticsConsentBanner';
import {
  initAnalyticsConsentBridge,
  readAnalyticsConsent,
} from './lib/analytics-client';
import { Shell, Wrap } from './styles/primitives';

/**
 * Applies the given title and description to the document head, keeping the
 * Open Graph and Twitter card tags in step with the canonical ones.
 *
 * The canonical link is rewritten per route as well. index.html ships a single
 * static canonical pointing at the site root, and since every path is served
 * that same document, leaving it alone would have every route declare the home
 * page as its canonical — which asks Google to drop the very URLs this
 * migration exists to get indexed.
 */
const applyMeta = (title: string, description: string) => {
  document.title = title;

  const canonical = `${SITE_ORIGIN}${window.location.pathname}`;

  const set = (selector: string, attribute: string, value: string) =>
    document.querySelector(selector)?.setAttribute(attribute, value);

  set('meta[name="description"]', 'content', description);
  set('meta[property="og:title"]', 'content', title);
  set('meta[property="og:description"]', 'content', description);
  set('meta[name="twitter:title"]', 'content', title);
  set('meta[name="twitter:description"]', 'content', description);
  set('link[rel="canonical"]', 'href', canonical);
  set('meta[property="og:url"]', 'content', canonical);
};

/**
 * App is the site shell: it resolves the active route, keeps the document
 * metadata in sync for share previews and search, and renders the header,
 * active view and footer inside the themed container.
 *
 * @returns {JSX.Element} The rendered application.
 */
function App(): JSX.Element {
  const { view, product } = useHashRoute();
  const [showAnalyticsConsent, setShowAnalyticsConsent] = useState(
    () => readAnalyticsConsent() === null,
  );

  useLinkNavigation();

  useEffect(() => {
    const updateBanner = () => {
      setShowAnalyticsConsent(readAnalyticsConsent() === null);
    };
    document.addEventListener('analyticsConsentUpdated', updateBanner);
    const cleanup = initAnalyticsConsentBridge();

    return () => {
      document.removeEventListener('analyticsConsentUpdated', updateBanner);
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    const meta = metaForView(view, product);
    applyMeta(meta.title, meta.description);
  }, [view, product]);

  const renderView = () => {
    switch (view) {
      case 'product':
        return <ProductPage productKey={product} />;
      case 'studio':
        return <Studio />;
      case 'changelog':
        return <Changelog />;
      case 'support':
        return <Support />;
      case 'privacy':
        return <PrivacyPolicy />;
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider>
      <Shell>
        <Wrap>
          <Nav view={view} />
          {renderView()}
          <Footer onCookieSettings={() => setShowAnalyticsConsent(true)} />
        </Wrap>
        <AnalyticsConsentBanner
          open={showAnalyticsConsent}
          onClose={() => setShowAnalyticsConsent(false)}
        />
      </Shell>
    </ThemeProvider>
  );
}

export default App;
