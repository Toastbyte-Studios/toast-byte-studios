import { useEffect, useRef } from "react";
import { AboutBackground, Bold, Container, FadeInParagraph } from "./styles";

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
      { threshold: 0.2 },
    );
    paragraphsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Container>
      <AboutBackground>
        <h2>About Toastbyte Studios</h2>
      </AboutBackground>

      <FadeInParagraph
        ref={(el) => {
          paragraphsRef.current[0] = el;
        }}
      >
        Toastbyte Studios is a small app studio based in Las Vegas, building
        practical tools that make a real difference.&nbsp;
        <Bold>
          We believe technology should work for you — anytime, anywhere.
        </Bold>
      </FadeInParagraph>
      <FadeInParagraph
        ref={(el) => {
          paragraphsRef.current[1] = el;
        }}
      >
        <Bold>TOAST (Tactical Operations and Survival Toolkit)</Bold> — Built on
        a simple philosophy: technology should still work even when the world
        doesn&apos;t. An offline-first emergency and survival toolkit packed
        with maps, guides, references, and utilities you can rely on even
        without a signal.
      </FadeInParagraph>
      <FadeInParagraph
        ref={(el) => {
          paragraphsRef.current[2] = el;
        }}
      >
        <Bold>Strike Coach</Bold> — A bowling score tracker with a built-in
        bowling coach designed to analyze your game and help you improve. Track
        your scores, identify patterns, and get personalized tips to take your
        bowling to the next level.
      </FadeInParagraph>
      <FadeInParagraph
        ref={(el) => {
          paragraphsRef.current[3] = el;
        }}
      >
        Both apps are currently in development. Check back soon for updates as
        we continue to build!
      </FadeInParagraph>
    </Container>
  );
};

export default About;
