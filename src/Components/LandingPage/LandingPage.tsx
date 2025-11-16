import About from "../About/About";
import type { JSX } from "react";
import { Container, HorizontalRule, Title, ToastVideo } from "./styles";

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
      <Title>Tech Offline And Survival Tools</Title>
      <h3>
        A small studio building tools that work even when the world
        doesn&apos;t.
      </h3>
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

export default LandingPage;
