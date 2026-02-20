import { useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';
import {
  Container,
  SectionHeader,
  ContentLayout,
  TextBlock,
  FadeInParagraph,
  ImageColumn,
  HikingPhoto,
  ToastCloseupWrapper,
  ToastCloseupPhoto,
  PhotoCaption,
} from './styles';

/**
 * FounderStory component renders the founder/about-the-builder section.
 *
 * Tells the origin story of TOAST in the builder's own voice — why the app
 * was created, the inspiration behind the name, and the solo-builder ethos
 * behind Toastbyte Studios.
 *
 * @component
 * @returns {JSX.Element} The rendered founder story section.
 */
const FounderStory: React.FC = (): JSX.Element => {
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const [hikingPhotoLoaded, setHikingPhotoLoaded] = useState(true);

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
      <SectionHeader>
        <h2>About the Builder</h2>
      </SectionHeader>

      <ContentLayout>
        <ImageColumn>
          {hikingPhotoLoaded && (
            <HikingPhoto
              src="/assets/images/ToastMeReal.webp"
              alt="Jason and Toast at Red Rock Canyon, Las Vegas — backpack on, desert scrub and canyon walls in the background"
              onError={() => setHikingPhotoLoaded(false)}
            />
          )}
          <ToastCloseupWrapper>
            <ToastCloseupPhoto
              src="/assets/images/ToastReal.webp"
              alt="Toast the Jack Russell Terrier — the face that inspired the app icon"
            />
            <PhotoCaption>
              This face. This is where the app icon came from.
            </PhotoCaption>
          </ToastCloseupWrapper>
        </ImageColumn>

        <TextBlock>
          <FadeInParagraph
            ref={(el) => {
              paragraphsRef.current[0] = el;
            }}
          >
            Her name is Toast. She&apos;s a Jack Russell Terrier, afraid of
            nothing, curious about everything, and the reason this app exists.
          </FadeInParagraph>

          <FadeInParagraph
            ref={(el) => {
              paragraphsRef.current[1] = el;
            }}
          >
            I&apos;m a developer based in Las Vegas. I hike and explore the
            desert a lot (usually with Toast alongside me) and I kept running
            into the same problem: I&apos;d have three or four different apps
            open trying to cover navigation, emergency reference, and basic
            survival tools, none of them working well together, and all of them
            useless the moment I lost signal (which is often in the desert).
          </FadeInParagraph>

          <FadeInParagraph
            ref={(el) => {
              paragraphsRef.current[2] = el;
            }}
          >
            So I built one.
          </FadeInParagraph>

          <FadeInParagraph
            ref={(el) => {
              paragraphsRef.current[3] = el;
            }}
          >
            <strong>TOAST — Tactical Operations and Survival Toolkit</strong> —
            is named after her because she&apos;s the companion who&apos;s
            always with me out there. The app is meant to be the same: something
            you trust, something that&apos;s always ready, something that
            doesn&apos;t let you down when things get serious.
          </FadeInParagraph>

          <FadeInParagraph
            ref={(el) => {
              paragraphsRef.current[4] = el;
            }}
          >
            It&apos;s been a solo project built in the margins of a full-time
            job. I&apos;m a developer, not an influencer. I just wanted a tool
            that worked, and when I couldn&apos;t find it, I built it.
          </FadeInParagraph>
        </TextBlock>
      </ContentLayout>
    </Container>
  );
};

export default FounderStory;
