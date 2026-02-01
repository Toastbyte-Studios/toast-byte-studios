import About from "../About/About";
import type { JSX } from "react";
import {
  Container,
  HeroSection,
  UnderDevelopmentBanner,
  HorizontalRule,
  SubTitle,
  Title,
  ToastVideo,
  VideoContainer,
} from "./styles";

/**
 * LandingPage component renders the main landing page for the application.
 *
 * It displays the title, a promotional video, and an about section, all wrapped within a container.
 * The video is set to autoplay, loop, and remain muted for a seamless user experience.
 *
 * @component
 * @returns {JSX.Element} The rendered landing page content.
 */
const LandingPage: React.FC = (): JSX.Element => {
  return (
    <Container>
      <HeroSection>
        <UnderDevelopmentBanner>
          🚧 Apps Currently Under Development 🚧
        </UnderDevelopmentBanner>
        <Title>Toastbyte Studios</Title>
        <SubTitle>
          A small app studio based in Las Vegas, building practical tools that
          make a real difference.
        </SubTitle>
        <HorizontalRule />
        <VideoContainer>
          <ToastVideo
            src="/assets/videos/ToastbyteVideo.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            width={200}
            height={200}
            poster="/assets/images/Logo.png"
          />
        </VideoContainer>
        <HorizontalRule />
      </HeroSection>
      <About />
    </Container>
  );
};

export default LandingPage;
