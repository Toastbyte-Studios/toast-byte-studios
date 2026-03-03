import { useState, useEffect, useRef } from 'react';
import About from '../About/About';
import FounderStory from '../FounderStory/FounderStory';
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import type { JSX } from 'react';
import {
  Container,
  HeroSection,
  HorizontalRule,
  LogoContainer,
  LogoImage,
  HeroContent,
  HeroText,
  ComingSoonBadge,
  HeroHeadline,
  HeroSubheadline,
  AppStoreRow,
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

  const WORKER_URL = import.meta.env.VITE_EMAIL_WORKER_URL as
    | string
    | undefined;

  // if (import.meta.env.DEV && !WORKER_URL) {
  //   console.warn(
  //     '[LandingPage] VITE_EMAIL_WORKER_URL is not set. Copy .env.example to .env.local and fill in the value.',
  //   );
  // }

  const resolvedWorkerURL =
    WORKER_URL ?? 'https://toast-email-worker.jshprintz.workers.dev';

  const TURNSTILE_SITE_KEY =
    import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA';

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) return;
    const container = turnstileContainerRef.current;
    if (!container) return;

    let widgetId: string | undefined;
    let interval: ReturnType<typeof setInterval> | undefined;

    const tryRender = () => {
      const t = window.turnstile;
      if (!t) return;
      clearInterval(interval);
      widgetId = t.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'light',
        callback: (token: string) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(null),
        'error-callback': () => setTurnstileToken(null),
      });
    };

    tryRender();
    if (widgetId === undefined) {
      interval = setInterval(tryRender, 100);
    }

    return () => {
      clearInterval(interval);
      if (widgetId !== undefined) window.turnstile?.remove(widgetId);
    };
  }, [submitted, TURNSTILE_SITE_KEY]);

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
      const res = await fetch(resolvedWorkerURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), turnstileToken }),
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
              <a href="#" aria-label="App Store — coming soon" tabIndex={-1}>
                <img
                  src="https://img.shields.io/badge/App_Store-0D96F6?logo=app-store&logoColor=white"
                  alt="App Store"
                  height={28}
                />
              </a>
              <a href="#" aria-label="Google Play — coming soon" tabIndex={-1}>
                <img
                  src="https://img.shields.io/badge/Google_Play-414141?logo=google-play&logoColor=white"
                  alt="Google Play"
                  height={28}
                />
              </a>
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
                    <EmailSubmitButton type="submit" disabled={!turnstileToken}>
                      Notify Me
                    </EmailSubmitButton>
                  </EmailForm>
                  <div
                    ref={turnstileContainerRef}
                    style={{ margin: '8px 0' }}
                  />
                  {emailError && (
                    <EmailErrorMessage>{emailError}</EmailErrorMessage>
                  )}
                </>
              )}
            </EmailSection>
          </HeroText>
          <LogoContainer>
            <LogoImage
              src="/assets/images/NewLogo.webp"
              alt="TOAST app logo"
              width={240}
              height={240}
            />
          </LogoContainer>
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
