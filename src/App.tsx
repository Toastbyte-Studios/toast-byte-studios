import styled from 'styled-components';
import { FlexCol } from './styles/core';
import { COLORS } from './constants';
import Nav from './Components/Nav/Nav';
import LandingPage from './Components/LandingPage/LandingPage';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <Container>
      <Nav />
      <LandingPage />
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
