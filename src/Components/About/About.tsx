import { useEffect, useRef } from "react";
import { Bold, Container, FadeInParagraph } from "./styles";

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
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    paragraphsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Container>
      <h3>About Toastbyte Studios</h3>
      <FadeInParagraph
        ref={(el) => {
          paragraphsRef.current[0] = el;
        }}
      >
        Toastbyte Studios is a tiny creative studio inspired by a big
        idea:&nbsp;
        <Bold>technology should still work when nothing else does.</Bold> Born
        in Las Vegas and named after a very curious dog, Toastbyte focuses on
        building practical, offline-first tools that help people stay prepared,
        informed, and confident wherever they are.
      </FadeInParagraph>
      <FadeInParagraph
        ref={(el) => {
          paragraphsRef.current[1] = el;
        }}
      >
        Our first app is currently in development — an offline emergency and
        survival toolkit packed with maps, guides, references, and helpful
        utilities you can rely on even without a signal.
      </FadeInParagraph>
      <FadeInParagraph
        ref={(el) => {
          paragraphsRef.current[2] = el;
        }}
      >
        We&apos;re building everything on a simple philosophy:{" "}
        <Bold>Tech Offline And Survival Tools — TOAST.</Bold>
      </FadeInParagraph>
      <FadeInParagraph
        ref={(el) => {
          paragraphsRef.current[3] = el;
        }}
      >
        Check back soon for updates as the project continues to grow.
      </FadeInParagraph>
    </Container>
  );
};

export default About;
