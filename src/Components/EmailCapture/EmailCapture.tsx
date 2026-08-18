import { useState, useEffect, useRef } from 'react';
import type { JSX } from 'react';
import { useTheme } from '../../theme/useTheme';
import {
  Section,
  Label,
  Blurb,
  Form,
  Input,
  SubmitButton,
  TurnstileSlot,
  SuccessMessage,
  ErrorMessage,
} from './styles';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = 'toast_notify_submitted';

/**
 * EmailCapture renders the launch-notification signup.
 *
 * Carried over from the previous landing page: submissions post to the
 * Cloudflare email worker and are gated behind a Turnstile challenge. A
 * successful submission is remembered in localStorage so returning visitors
 * see the confirmation rather than an empty form.
 *
 * @component
 * @returns {JSX.Element} The rendered signup section.
 */
const EmailCapture: React.FC = (): JSX.Element => {
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const workerURL = import.meta.env.VITE_EMAIL_WORKER_URL as string | undefined;
  const resolvedWorkerURL =
    workerURL ?? 'https://toast-email-worker.jshprintz.workers.dev';

  const turnstileSiteKey =
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
        sitekey: turnstileSiteKey,
        theme: theme === 'dark' ? 'dark' : 'light',
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
  }, [submitted, turnstileSiteKey, theme]);

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
        localStorage.setItem(STORAGE_KEY, 'true');
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
    <Section aria-labelledby="notify-heading">
      <Label id="notify-heading">Get notified</Label>
      {submitted ? (
        <SuccessMessage>
          ✓ You&apos;re on the list. We&apos;ll be in touch when there&apos;s
          something to launch.
        </SuccessMessage>
      ) : (
        <>
          <Blurb>
            One email when a product ships. No newsletter, no drip campaign.
          </Blurb>
          <Form onSubmit={handleEmailSubmit}>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              aria-label="Email address for launch notification"
            />
            <SubmitButton type="submit" disabled={!turnstileToken}>
              Notify Me
            </SubmitButton>
          </Form>
          <TurnstileSlot
            ref={turnstileContainerRef}
            $hidden={!!turnstileToken}
          />
          {emailError && <ErrorMessage role="alert">{emailError}</ErrorMessage>}
        </>
      )}
    </Section>
  );
};

export default EmailCapture;
