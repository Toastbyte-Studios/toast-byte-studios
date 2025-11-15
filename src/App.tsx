import styled from "styled-components";
import { FlexCol } from "./styles/core";
import { COLORS } from "./constants";
import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <Container>
      <Nav />
      <h2>Tech Offline And Survival Tools</h2>
    </Container>
  );
}

const Container = styled(FlexCol)`
  height: 100vh;
  width: 100vw;
  justify-content: flex-start;
  background-color: ${COLORS.BACKGROUND};
`;

export default App;
