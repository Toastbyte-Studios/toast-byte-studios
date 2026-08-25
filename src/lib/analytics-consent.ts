import type { AnalyticsEventName } from './analytics-events';

/**
 * Shared consent vocabulary for the browser and for server-side code.
 *
 * Ported from GitAll, where consent originally lived in localStorage and so
 * was invisible to any server-side delivery path — a visitor could decline and
 * still have every server-sent event reach GA4. A cookie is readable from both
 * sides, which is the whole point.
 *
 * This module must stay importable from both the Vite client bundle and from
 * Cloudflare Workers / Pages Functions, so it depends on nothing but types.
 */

export const ANALYTICS_CONSENT_COOKIE = 'analytics-consent';

/** One year, the usual ceiling for a consent record before re-prompting. */
export const ANALYTICS_CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export type ConsentValue = 'granted' | 'denied';

/**
 * `null` means the visitor has not chosen yet, which is distinct from
 * 'denied'. Absent is treated as denied for tracking purposes but as
 * unanswered for banner purposes — the banner shows on null, not on 'denied'.
 */
export type ConsentState = ConsentValue | 'not-required' | null;

/**
 * Vite inlines `import.meta.env.*` at build time, so this resolves to a
 * literal in the browser bundle. Worker code does not see import.meta.env and
 * reads its own environment binding instead, which is why the server-side
 * helper takes the flag as an argument rather than calling this.
 */
export function isAnalyticsConsentRequired(): boolean {
  return import.meta.env.VITE_ANALYTICS_REQUIRE_CONSENT === '1';
}

export function parseConsentValue(
  raw: string | null | undefined,
): ConsentValue | null {
  return raw === 'granted' || raw === 'denied' ? raw : null;
}

/**
 * Events delivered even when consent is absent or denied.
 *
 * EMPTY, AND IT SHOULD STAY EMPTY.
 *
 * GitAll exempts exactly one event, `embed_served`, because its embed images
 * are requested by third-party pages through GitHub's camo proxy, which sends
 * no cookies — there is literally no consent cookie to read for those
 * requests. Nothing on this site has that property. Every event here
 * originates from a browser on our own origin, where the cookie is available,
 * so every event can and must be gated.
 *
 * If you find yourself wanting to add something here, the honest question is
 * whether the event should fire at all.
 */
export const CONSENT_EXEMPT_EVENTS: ReadonlySet<AnalyticsEventName> = new Set();
