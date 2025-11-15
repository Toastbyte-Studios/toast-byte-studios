import styled from "styled-components";
import { FlexCol } from "../../styles/core";

const About: React.FC = () => {
  return (
    <Container>
      <h3>About TOASTbyte Studios</h3>
      <p>
        Toastbyte Studios is a tiny creative studio inspired by a big idea:
        technology should still work when nothing else does. Born in Las Vegas
        and named after a very curious dog, Toastbyte focuses on building
        practical, offline-first tools that help people stay prepared, informed,
        and confident wherever they are.
      </p>
      <p>
        Our first app is currently in development — an offline emergency and
        survival toolkit packed with maps, guides, references, and helpful
        utilities you can rely on even without a signal.
      </p>
      <p>
        We're building everything on a simple philosophy: Tech Offline And
        Survival Tools — TOAST.
      </p>
      <p>Check back soon for updates as the project continues to grow.</p>
    </Container>
  );
};

const Container = styled(FlexCol)`
  height: 100%;
  width: 100%;
  justify-content: flex-start;

  padding: 40px;
  gap: 10px;

  font-family: "Inter", Arial, sans-serif;
`;

export default About;
