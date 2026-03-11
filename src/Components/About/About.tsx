import { useEffect, useRef } from 'react';
import {
  AboutBackground,
  Bold,
  Container,
  FadeInParagraph,
  InlineLink,
} from './styles';

/**
 * Renders the About section for Toastbyte Studios.
 *
 * This component displays information about the studio's mission,
 * inspiration, and its first app—an offline emergency and survival toolkit.
 * It highlights the studio's offline-first philosophy and invites visitors
 * to join the waitlist for early access.
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
            entry.target.classList.add('fade-in-visible');
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
        <Bold>TOAST (Trusted Outdoor and Survival Toolkit)</Bold> — Built on a
        simple philosophy: technology should still work even when the world
        doesn&apos;t. An offline-first emergency and survival toolkit packed
        with maps, guides, references, and utilities you can rely on even
        without a signal.
      </FadeInParagraph>
      {/* <FadeInParagraph
        ref={(el) => {
          paragraphsRef.current[2] = el;
        }}
      >
        <Bold>Strike Coach</Bold> — A bowling score tracker with a built-in
        bowling coach designed to analyze your game and help you improve. Track
        your scores, identify patterns, and get personalized tips to take your
        bowling to the next level.
      </FadeInParagraph> */}
      <FadeInParagraph
        ref={(el) => {
          paragraphsRef.current[3] = el;
        }}
      >
        We&apos;re deep in development and targeting a summer launch. Follow
        along at{' '}
        <InlineLink
          href="https://x.com/ToastByteStudio"
          target="_blank"
          rel="noopener noreferrer"
        >
          @ToastByteStudio
        </InlineLink>{' '}
        or drop your email above — founding users get early access and a
        locked-in price.
      </FadeInParagraph>
    </Container>
  );
};

export default About;
