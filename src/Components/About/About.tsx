import { Bold, Container } from "./styles";

/**
 * Renders the About section for Toastbyte Studios.
 *
 * This component displays information about the studio's mission,
 * inspiration, and its first app—an offline emergency and survival toolkit.
 * It highlights the studio's offline-first philosophy and encourages users
 * to check back for updates.
 *
 * @component
 */
const About: React.FC = () => {
  return (
    <Container>
      <h3>About Toastbyte Studios</h3>
      <p>
        Toastbyte Studios is a tiny creative studio inspired by a big
        idea:&nbsp;
        <Bold>technology should still work when nothing else does.</Bold> Born
        in Las Vegas and named after a very curious dog, Toastbyte focuses on
        building practical, offline-first tools that help people stay prepared,
        informed, and confident wherever they are.
      </p>
      <p>
        Our first app is currently in development — an offline emergency and
        survival toolkit packed with maps, guides, references, and helpful
        utilities you can rely on even without a signal.
      </p>
      <p>
        We&apos;re building everything on a simple philosophy:{" "}
        <Bold>Tech Offline And Survival Tools — TOAST.</Bold>
      </p>
      <p>Check back soon for updates as the project continues to grow.</p>
    </Container>
  );
};

export default About;
