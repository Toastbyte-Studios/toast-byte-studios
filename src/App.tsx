import styled from "styled-components";
import { FlexCol } from "./styles/core";
import { COLORS } from "./constants";
import Nav from "./Components/Nav/Nav";
import LandingPage from "./Components/LandingPage/LandingPage";
import Footer from "./Components/Footer/Footer";

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
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  background-color: ${COLORS.BACKGROUND};
`;

export default App;
