import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FlexCol } from './styles/core';
import { COLORS } from './constants';
import Nav from './Components/Nav/Nav';
import LandingPage from './Components/LandingPage/LandingPage';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy';
import Support from './Components/Support/Support';
import Footer from './Components/Footer/Footer';

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1));

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash.slice(1));
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
}

function App() {
  const route = useHashRoute();

  useEffect(() => {
    const meta: Record<string, { title: string; description: string }> = {
      privacy: {
        title: 'Privacy Policy | Toastbyte Studios',
        description:
          'Privacy policy for TOAST — Trusted Outdoor and Survival Toolkit — by Toastbyte Studios.',
      },
      support: {
        title: 'Support | Toastbyte Studios',
        description:
          'Get help with TOAST — Trusted Outdoor and Survival Toolkit. Contact support or browse FAQs.',
      },
    };

    const defaults = {
      title: 'TOAST — Trusted Outdoor and Survival Toolkit | Toastbyte Studios',
      description:
        'TOAST is an offline-first emergency preparedness app with maps, guides, references, and utilities — built by Toastbyte Studios for hikers, preppers, and anyone who wants to be ready.',
    };

    const { title, description } = meta[route] ?? defaults;

    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', description);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute('content', description);
  }, [route]);

  const renderPage = () => {
    switch (route) {
      case 'privacy':
        return <PrivacyPolicy />;
      case 'support':
        return <Support />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <Container>
      <Nav />
      {renderPage()}
      <Footer />
    </Container>
  );
}

const Container = styled(FlexCol)`
  min-height: 100vh;
  width: 100%;
  justify-content: flex-start;
  background: linear-gradient(
    160deg,
    ${COLORS.GRADIENT_START} 0%,
    ${COLORS.GRADIENT_END} 100%
  );
  color: ${COLORS.PRIMARY_DARK};
  user-select: none;
`;

export default App;
