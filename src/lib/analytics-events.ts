/**
 * The analytics event vocabulary for toastbyte.studio.
 *
 * Deliberately NOT a copy of GitAll's list. This is a marketing site with a
 * hash-routed SPA and one conversion (the email signup), so the questions it
 * has to answer are different: which product pages get read, how many people
 * start a signup versus finish one, and where the outbound clicks go.
 *
 * Keep this small. Every name here is a commitment to fire it from somewhere
 * and to see it in reports; GitAll accumulated four event names for routes
 * that were never built, and they are still sitting in its vocabulary.
 */
export const ANALYTICS_EVENTS = {
  /**
   * GA4's native page view, fired manually on hash-route changes.
   *
   * Two things make this necessary. Hash navigation never reaches the server
   * and never reloads the document, so Zaraz's automatic Pageviews action
   * fires exactly once — on initial load — and the rest of the session looks
   * like the visitor never moved.
   *
   * The name is `page_view` rather than something custom on purpose: GA4's
   * built-in Pages reports only understand this event, so a custom name would
   * leave every route report to be rebuilt by hand as an exploration.
   *
   * The listener MUST skip the initial route. Zaraz has already sent one for
   * it, and firing again would double-count every landing page.
   */
  pageView: 'page_view',

  /** The signup form was submitted and passed client-side validation. */
  emailSignupStarted: 'email_signup_started',

  /** The worker accepted a new address (HTTP 201). */
  emailSignupSucceeded: 'email_signup_succeeded',

  /**
   * The address was already registered. The worker returns 200 with
   * `duplicate: true` rather than an error, and the distinction matters:
   * folding it into 'succeeded' would overstate list growth, and folding it
   * into 'failed' would look like a bug that isn't there.
   */
  emailSignupDuplicate: 'email_signup_duplicate',

  /**
   * Anything else: Turnstile verification failed (403), invalid address (400),
   * or a server error (500). The `reason` param carries which.
   */
  emailSignupFailed: 'email_signup_failed',

  /**
   * An outbound click to a product or external destination.
   *
   * Explicit rather than inherited: GA4's enhanced-measurement outbound-click
   * tracking ships with the gtag.js snippet, and Zaraz does not provide those
   * automatic events. Nothing captures this unless we fire it ourselves.
   */
  productLinkClicked: 'product_link_clicked',
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
