import { useState, useEffect, useRef } from 'react';
import type { JSX } from 'react';
import {
  ANALYTICS_EVENTS,
  consentForRequestBody,
  trackClientEvent,
} from '../../lib/analytics-client';
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
 * ANALYTICS: the outcome events are fired from HERE rather than from the
 * worker, even though the worker can also send them. The browser is the only
 * place that knows the outcome AND has the visitor's GA4 session, so events
 * fired here join the same session as their page views and the funnel is
 * readable end to end. Worker-side events use a server-derived identifier and
 * would land on a different user, breaking the funnel and double-counting.
 * Leave the worker's GA4 variables unset unless you deliberately want
 * server-side truth instead of this.
 *
 * No event carries the email address, a hash of it, or its length.
 *
 * @component
 * @returns {JSX.Element} The rendered signup section.
 */
const EmailCapture: React.FC = (): JSX.Element => {
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  // Read on mount rather than during render: localStorage does not exist at
  // prerender time, and a returning visitor reading it during the first
  // client render would hydrate a different form than the one prerendered.
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === 'true') setSubmitted(true);
    } catch {
      // localStorage unavailable — the form simply shows again
    }
  }, []);

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
      // Client-side rejections are their own thing: they never reach the
      // worker, so counting them as a server failure would misattribute the
      // cause of a drop-off.
      trackClientEvent(ANALYTICS_EVENTS.emailSignupFailed, {
        reason: 'invalid_email_client',
      });
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');

    trackClientEvent(ANALYTICS_EVENTS.emailSignupStarted);

    try {
      const res = await fetch(resolvedWorkerURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          turnstileToken,
          // The worker is cross-origin and the consent cookie is host-only for
          // toastbyte.studio, so it never arrives there on its own. Passing it
          // explicitly is what lets the worker's own gate mean anything.
          analyticsConsent: consentForRequestBody(),
        }),
      });

      if (!res.ok) {
        trackClientEvent(ANALYTICS_EVENTS.emailSignupFailed, {
          reason: 'worker_rejected',
          status: res.status,
        });
        throw new Error('Request failed');
      }

      // The worker returns 200 with `duplicate: true` for an address already
      // on the list, and 201 for a new one. Both are `res.ok`, so the body has
      // to be read to tell them apart — collapsing them would overstate list
      // growth.
      const payload = (await res.json().catch(() => null)) as {
        duplicate?: boolean;
      } | null;

      trackClientEvent(
        payload?.duplicate
          ? ANALYTICS_EVENTS.emailSignupDuplicate
          : ANALYTICS_EVENTS.emailSignupSucceeded,
      );

      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // localStorage unavailable — proceed without persisting
      }
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit email:', error);
      // Only reached for a network-level failure; the non-ok case above has
      // already reported its own reason before throwing.
      if (error instanceof TypeError) {
        trackClientEvent(ANALYTICS_EVENTS.emailSignupFailed, {
          reason: 'network_error',
        });
      }
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
