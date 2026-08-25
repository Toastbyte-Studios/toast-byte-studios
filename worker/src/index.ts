import { ANALYTICS_EVENTS } from '../../src/lib/analytics-events';
import type { AnalyticsEventName } from '../../src/lib/analytics-events';

interface Env {
  DB: D1Database;
  TURNSTILE_SECRET_KEY: string;
  // Optional. When either is absent every analytics call is a no-op, which is
  // the intended state until the Measurement Protocol secret is provisioned.
  ANALYTICS_GA4_MEASUREMENT_ID?: string;
  ANALYTICS_GA4_API_SECRET?: string;
  // '1' requires consent before any event is delivered. Anything else (including
  // absent) means consent is not required in this environment.
  ANALYTICS_REQUIRE_CONSENT?: string;
}

const ALLOWED_ORIGINS = [
  'https://toastbyte.studio',
  'https://www.toastbyte.studio',
  'http://localhost:5173',
];

const GA4_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

function corsHeaders(origin: string | null): HeadersInit {
  const allowed =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

/**
 * A stable pseudonymous identifier for GA4, matching GitAll's derivation:
 * SHA-256 over IP, user-agent and language, split into two dot-joined halves.
 *
 * Web Crypto rather than node:crypto deliberately — this worker's
 * wrangler.toml sets no compatibility_flags, so nodejs_compat is NOT enabled
 * here and `node:crypto` would fail to resolve at build time. GitAll can use
 * it because its wrangler.jsonc turns the flag on.
 *
 * CF-Connecting-IP is set by Cloudflare and cannot be spoofed by the caller.
 * The Turnstile verification below already relies on it for the same reason.
 */
async function toClientId(request: Request): Promise<string> {
  const clientIp = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const userAgent = request.headers.get('User-Agent') ?? '';
  const acceptLanguage = request.headers.get('Accept-Language') ?? '';
  const seed = `${clientIp}|${userAgent}|${acceptLanguage}`;

  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(seed),
  );
  const hex = [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  return `${hex.slice(0, 10)}.${hex.slice(10, 20)}`;
}

/**
 * Deliver one event to GA4 without blocking the response.
 *
 * The consent value arrives in the request BODY rather than a cookie. This
 * worker is reached cross-origin from toastbyte.studio, and the
 * `analytics-consent` cookie is host-only for that domain, so it is never sent
 * here — reading `request.headers.get('Cookie')` would always come back empty
 * and silently look like a decline. Passing it explicitly keeps the gate
 * honest and avoids depending on how the worker's hostname is arranged.
 *
 * Absent consent is treated as denied, never as permission.
 *
 * Registered with ctx.waitUntil: in Workers a pending promise is cancelled the
 * moment the response is returned, so an unawaited fetch here would usually
 * never reach Google.
 */
function trackSignupEvent(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  eventName: AnalyticsEventName,
  params: Record<string, string | number> = {},
  consent?: string,
): void {
  const measurementId = env.ANALYTICS_GA4_MEASUREMENT_ID?.trim();
  const apiSecret = env.ANALYTICS_GA4_API_SECRET?.trim();
  if (!measurementId || !apiSecret) {
    return;
  }

  if (env.ANALYTICS_REQUIRE_CONSENT === '1' && consent !== 'granted') {
    return;
  }

  const delivery = (async () => {
    try {
      await fetch(
        `${GA4_ENDPOINT}?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(5_000),
          body: JSON.stringify({
            client_id: await toClientId(request),
            non_personalized_ads: true,
            events: [
              {
                name: eventName,
                params: { ...params, engagement_time_msec: 1 },
              },
            ],
          }),
        },
      );
    } catch {
      // Analytics delivery must never affect the signup itself.
    }
  })();

  ctx.waitUntil(delivery);
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const origin = request.headers.get('Origin');
    const headers = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers });
    }

    let email: string;
    let turnstileToken: string | undefined;
    let analyticsConsent: string | undefined;
    try {
      const body = await request.json<{
        email?: string;
        turnstileToken?: string;
        analyticsConsent?: string;
      }>();
      email = (body.email ?? '').trim().toLowerCase();
      turnstileToken = body.turnstileToken;
      analyticsConsent = body.analyticsConsent;
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    if (!turnstileToken) {
      trackSignupEvent(
        request,
        env,
        ctx,
        ANALYTICS_EVENTS.emailSignupFailed,
        { reason: 'missing_turnstile_token' },
        analyticsConsent,
      );
      return new Response(JSON.stringify({ error: 'Verification required' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    const verifyRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: request.headers.get('CF-Connecting-IP') ?? '',
        }),
      },
    );
    const verifyData = (await verifyRes.json()) as { success: boolean };
    if (!verifyData.success) {
      trackSignupEvent(
        request,
        env,
        ctx,
        ANALYTICS_EVENTS.emailSignupFailed,
        { reason: 'turnstile_rejected' },
        analyticsConsent,
      );
      return new Response(JSON.stringify({ error: 'Verification failed' }), {
        status: 403,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      // Deliberately no email address, hash, or length in the params. The point
      // of the event is the failure rate, not who failed.
      trackSignupEvent(
        request,
        env,
        ctx,
        ANALYTICS_EVENTS.emailSignupFailed,
        { reason: 'invalid_email' },
        analyticsConsent,
      );
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    try {
      await env.DB.prepare('INSERT INTO email_signups (email) VALUES (?)')
        .bind(email)
        .run();
    } catch (err: unknown) {
      // D1 unique constraint — email already registered
      if (
        err instanceof Error &&
        err.message.includes('UNIQUE constraint failed')
      ) {
        // Its own event rather than a success. Counting duplicates as signups
        // would overstate list growth; counting them as failures would look
        // like a bug that isn't there.
        trackSignupEvent(
          request,
          env,
          ctx,
          ANALYTICS_EVENTS.emailSignupDuplicate,
          {},
          analyticsConsent,
        );
        return new Response(
          JSON.stringify({
            ok: true,
            duplicate: true,
            message: 'Email already registered',
          }),
          {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
          },
        );
      }
      console.error(err);
      trackSignupEvent(
        request,
        env,
        ctx,
        ANALYTICS_EVENTS.emailSignupFailed,
        { reason: 'server_error' },
        analyticsConsent,
      );
      return new Response(JSON.stringify({ error: 'Server error' }), {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    trackSignupEvent(
      request,
      env,
      ctx,
      ANALYTICS_EVENTS.emailSignupSucceeded,
      {},
      analyticsConsent,
    );

    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  },
};
