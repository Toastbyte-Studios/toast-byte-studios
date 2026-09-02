import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { useHashRoute } from './routing/useHashRoute';
import { useLinkNavigation } from './routing/useLinkNavigation';
import { PRODUCTS } from './data/catalog';
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

const DEFAULT_META = {
  title: 'Toastbyte Studios — independent software development',
  description:
    'Toastbyte Studios is an independent development studio in Las Vegas building GitAll, TOAST and Alley Admin — software that works offline, loads fast, and is maintained after launch.',
};

const STATIC_META: Record<string, { title: string; description: string }> = {
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
 * Applies the given title and description to the document head, keeping the
 * Open Graph and Twitter card tags in step with the canonical ones.
 */
const applyMeta = (title: string, description: string) => {
  document.title = title;

  const set = (selector: string, attribute: string, value: string) =>
    document.querySelector(selector)?.setAttribute(attribute, value);

  set('meta[name="description"]', 'content', description);
  set('meta[property="og:title"]', 'content', title);
  set('meta[property="og:description"]', 'content', description);
  set('meta[name="twitter:title"]', 'content', title);
  set('meta[name="twitter:description"]', 'content', description);
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
    if (view === 'product') {
      const current =
        PRODUCTS.find((entry) => entry.key === product) ?? PRODUCTS[0];
      applyMeta(
        `${current.name} — ${current.kind} | Toastbyte Studios`,
        current.blurb,
      );
      return;
    }

    const meta = STATIC_META[view] ?? DEFAULT_META;
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
