import styled from "styled-components";
import { FlexCol } from "../../styles/core";
import { COLORS } from "../../constants";
import About from "../About/About";

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Title>Tech Offline And Survival Tools</Title>
      <HorizontalRule />
      <ToastVideo
        src="/assets/videos/ToastbyteVideo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <HorizontalRule />
      <About />
    </Container>
  );
};

const Container = styled(FlexCol)`
  height: 100%;
  width: 100%;
  justify-content: flex-start;

  font-family: "Inter", Arial, sans-serif;
`;

const Title = styled.h2`
  margin-top: 20px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;

  padding: 0;
  margin: 10px 0 0 0;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  border: 1px solid ${COLORS.SECONDARY_ACCENT};
  margin: 20px 0;
`;

const ToastVideo = styled.video`
  width: 40%;
  max-width: 200px;
  border: 2px solid ${COLORS.PRIMARY_DARK};
  border-radius: 50%;
`;

export default LandingPage;
