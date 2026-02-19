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
    135deg,
    ${COLORS.GRADIENT_START} 0%,
    ${COLORS.GRADIENT_END} 100%
  );
  color: ${COLORS.PRIMARY_LIGHT};
`;

export default App;
