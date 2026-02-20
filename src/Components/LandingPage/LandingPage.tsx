import { useState } from 'react';
import About from '../About/About';
import FounderStory from '../FounderStory/FounderStory';
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import type { JSX } from 'react';
import {
  Container,
  HeroSection,
  HorizontalRule,
  VideoContainer,
  ToastVideo,
  HeroContent,
  HeroText,
  ComingSoonBadge,
  HeroHeadline,
  HeroSubheadline,
  AppStoreRow,
  AppStoreButton,
  EmailSection,
  EmailLabel,
  EmailForm,
  EmailInput,
  EmailSubmitButton,
  EmailSuccessMessage,
  EmailErrorMessage,
} from './styles';

/**
 * LandingPage component renders the product-first landing page for TOAST.
 *
 * Leads with the TOAST app hero section — headline, mascot, coming-soon
 * CTAs, and email capture — followed by feature highlights, the founder
 * story, and studio information.
 *
 * @component
 * @returns {JSX.Element} The rendered landing page content.
 */
const LandingPage: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(() => {
    try {
      return localStorage.getItem('toast_notify_submitted') === 'true';
    } catch {
      return false;
    }
  });

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const WORKER_URL =
    import.meta.env.VITE_EMAIL_WORKER_URL ??
    'https://toast-email-worker.jshprintz.workers.dev';

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error('Request failed');
      try {
        localStorage.setItem('toast_notify_submitted', 'true');
      } catch {
        // localStorage unavailable — proceed without persisting
      }
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit email:', error);
      setEmailError(
        'Could not reach our server — please check your connection and try again.',
      );
    }
  };

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <ComingSoonBadge>Coming Soon</ComingSoonBadge>
            <HeroHeadline>
              Meet <span>Toast.</span> Your pocket companion for when things get
              serious.
            </HeroHeadline>
            <HeroSubheadline>
              TOAST — Tactical Operations and Survival Toolkit — is an
              offline-first emergency app packed with maps, guides, references,
              and utilities. Ready when the network isn&apos;t.
            </HeroSubheadline>
            <AppStoreRow>
              <AppStoreButton
                aria-label="App Store — coming soon"
                tabIndex={-1}
              >
                <span
                  style={{ fontSize: '24px' }}
                  role="img"
                  aria-hidden="true"
                >
                  🍎
                </span>
                <div>
                  <span className="store-label">Available soon on</span>
                  <span className="store-name">App Store</span>
                </div>
              </AppStoreButton>
              <AppStoreButton
                aria-label="Google Play — coming soon"
                tabIndex={-1}
              >
                <span
                  style={{ fontSize: '24px' }}
                  role="img"
                  aria-hidden="true"
                >
                  ▶️
                </span>
                <div>
                  <span className="store-label">Available soon on</span>
                  <span className="store-name">Google Play</span>
                </div>
              </AppStoreButton>
            </AppStoreRow>
            <EmailSection>
              <EmailLabel>Get notified when we launch</EmailLabel>
              {submitted ? (
                <EmailSuccessMessage>
                  ✓ You&apos;re on the list! We&apos;ll let you know when TOAST
                  launches.
                </EmailSuccessMessage>
              ) : (
                <>
                  <EmailForm onSubmit={handleEmailSubmit}>
                    <EmailInput
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      aria-label="Email address for launch notification"
                    />
                    <EmailSubmitButton type="submit">
                      Notify Me
                    </EmailSubmitButton>
                  </EmailForm>
                  {emailError && (
                    <EmailErrorMessage>{emailError}</EmailErrorMessage>
                  )}
                </>
              )}
            </EmailSection>
          </HeroText>
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
        </HeroContent>
        <HorizontalRule />
      </HeroSection>
      <FeaturesSection />
      <About />
      <FounderStory />
    </Container>
  );
};

export default LandingPage;
