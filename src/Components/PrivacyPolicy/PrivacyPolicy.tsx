import type { JSX } from 'react';
import {
  PageContainer,
  PageContent,
  PageHeader,
  SectionTitle,
  Paragraph,
  ContactLink,
  LastUpdated,
} from './styles';

/**
 * PrivacyPolicy component renders the privacy policy page for Toastbyte Studios.
 *
 * Covers BOTH the TOAST mobile application and this website. The two collect
 * very different things, and the sections below are split accordingly — the
 * app is offline-first and stores nothing server-side, while the website runs
 * analytics and keeps email signups in a database.
 *
 * MAINTENANCE: every factual claim here was written against what the site and
 * worker actually do. If you change any of the following, re-read this file
 * and update it in the same PR:
 *
 *   worker/src/index.ts            what the signup endpoint stores and sends
 *   worker/schema.sql              the columns described under "Email signups"
 *   src/lib/analytics-events.ts    which events are sent to GA4
 *   src/lib/analytics-client.ts    how events reach GA4
 *   index.html                     third-party scripts loaded on the page
 *
 * The Zaraz cookie names and lifetimes below come from the Cloudflare
 * dashboard's Zaraz > Google Analytics 4 > Cookies panel, not from this repo.
 * Re-check them there if the tool configuration changes.
 *
 * A privacy policy that has drifted from the code is worse than no policy.
 *
 * @component
 * @returns {JSX.Element} The rendered privacy policy page.
 */
const PrivacyPolicy: React.FC = (): JSX.Element => {
  return (
    <PageContainer>
      <PageContent>
        <PageHeader>
          <h1>Privacy Policy</h1>
        </PageHeader>
        <LastUpdated>Last updated: August 2026</LastUpdated>

        <Paragraph>
          Toastbyte Studios (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
          operates the TOAST mobile application (the &quot;App&quot;) and this
          website at toastbyte.studio (the &quot;Site&quot;). This Privacy
          Policy explains what information we collect, how we use it, and your
          rights regarding that information.
        </Paragraph>
        <Paragraph>
          The App and the Site behave very differently, so they are described
          separately below. In short: the App is offline-first and keeps your
          data on your device, while the Site uses analytics and stores an email
          address if you choose to give us one.
        </Paragraph>

        <SectionTitle>1. The TOAST App</SectionTitle>
        <Paragraph>
          <strong>Information you provide:</strong> We do not require account
          registration. Any data you enter into TOAST (such as saved preferences
          or bookmarked guides) is stored locally on your device and is not
          transmitted to our servers.
        </Paragraph>
        <Paragraph>
          <strong>Device information:</strong> We may collect anonymized,
          non-identifiable device information (such as device type and operating
          system version) solely to improve app performance and compatibility.
        </Paragraph>
        <Paragraph>
          <strong>Location data:</strong> TOAST may request access to your
          device&apos;s location to provide location-relevant survival and
          emergency information. This data is used only on-device and is never
          transmitted to our servers.
        </Paragraph>
        <Paragraph>
          <strong>Device sensors:</strong> TOAST may access device sensors (such
          as compass, barometer, or accelerometer) to power offline navigation
          and utility features. Sensor data is processed locally and is never
          stored or transmitted.
        </Paragraph>
        <Paragraph>
          <strong>Purchase information:</strong> If you purchase the Pro unlock,
          the transaction is processed entirely by Apple App Store or Google
          Play. We do not receive or store your payment details.
        </Paragraph>
        <Paragraph>
          The App does not use analytics and does not send your activity to us
          or to anyone else.
        </Paragraph>

        <SectionTitle>2. This Website</SectionTitle>
        <Paragraph>
          <strong>Analytics.</strong> We use Google Analytics 4 to understand
          how the Site is used — which pages are read, whether an email signup
          succeeded, and which links are followed. Analytics is loaded through
          Cloudflare Zaraz, which serves the analytics script from
          toastbyte.studio rather than from a third-party domain.
        </Paragraph>
        <Paragraph>
          We do not send your email address, or anything else that identifies
          you personally, to Google Analytics. Events carry only non-identifying
          details: which page was viewed, which product a link pointed at, and
          whether a signup succeeded, was a duplicate, or failed — and for
          failures, the reason, such as an invalid address. The address itself
          is never included, in any form.
        </Paragraph>
        <Paragraph>
          <strong>Analytics cookies.</strong> Zaraz sets two first-party cookies
          on toastbyte.studio for Google Analytics:
        </Paragraph>
        <Paragraph>
          • <strong>cfz_google-analytics_v4</strong> — the identifier and
          engagement state Zaraz maintains for Google Analytics. Kept for up to
          one year.
          <br />• <strong>cfzs_google-analytics_v4</strong> — state for your
          current visit, such as a pageview count. Deleted when you close your
          browser.
        </Paragraph>
        <Paragraph>
          Both are set for toastbyte.studio alone and do not follow you to other
          sites. We also use Cloudflare Web Analytics, which counts page loads,
          sets no cookies, and uses no client-side state.
        </Paragraph>
        <Paragraph>
          <strong>Email signups.</strong> If you enter your email address to be
          notified about a product, we store that address in a database hosted
          by Cloudflare. We store the address and the time you submitted it, and
          nothing else. We use it only to contact you about the product you
          signed up for. We do not sell it, share it, or add it to any other
          list.
        </Paragraph>
        <Paragraph>
          The signup form is protected by Cloudflare Turnstile, which checks
          that a request comes from a person rather than an automated script.
          Turnstile receives your IP address in order to do that check.
        </Paragraph>
        <Paragraph>
          <strong>Hosting and security logs.</strong> Like any website, the Site
          is delivered by a host — in our case Cloudflare — which processes the
          IP address and request metadata of every request in order to serve the
          Site and to detect and block abuse. This happens for every visitor and
          is separate from the analytics described above.
        </Paragraph>

        <SectionTitle>3. How We Use Your Information</SectionTitle>
        <Paragraph>We use the information described above solely to:</Paragraph>
        <Paragraph>
          • Provide and improve the functionality of TOAST and the Site
          <br />
          • Ensure compatibility across devices and operating system versions
          <br />
          • Understand which parts of the Site are useful
          <br />
          • Contact you about a product you asked to hear about
          <br />• Respond to your support requests
        </Paragraph>
        <Paragraph>
          We do not use your data for advertising or profiling, and Google
          Analytics is configured to request non-personalized ads handling.
        </Paragraph>

        <SectionTitle>4. Data Sharing with Third Parties</SectionTitle>
        <Paragraph>
          We do not sell, trade, or rent your personal information to third
          parties.
        </Paragraph>
        <Paragraph>
          <strong>For the App:</strong> the only third parties involved are
          Apple (App Store) and Google (Google Play) for payment processing when
          you purchase the Pro unlock. These transactions are governed by their
          respective privacy policies.
        </Paragraph>
        <Paragraph>
          <strong>For the Site:</strong> Cloudflare provides our hosting, our
          database, Turnstile, Web Analytics, and Zaraz. Google receives the
          analytics events described in section 2. Google explains how it uses
          data from sites that use its services at{' '}
          <ContactLink
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            policies.google.com/technologies/partner-sites
          </ContactLink>
          .
        </Paragraph>

        <SectionTitle>5. Data Retention</SectionTitle>
        <Paragraph>
          <strong>App data:</strong> because TOAST is designed to work offline
          and store data locally on your device, we do not retain App data on
          our servers. Uninstalling TOAST will remove all locally stored app
          data.
        </Paragraph>
        <Paragraph>
          <strong>Email addresses:</strong> we keep a signup address until you
          ask us to remove it, or until the product you signed up for has
          launched and we no longer need it.
        </Paragraph>
        <Paragraph>
          <strong>Analytics data:</strong> Google retains the analytics data for
          our property according to the retention settings on that property, and
          Cloudflare retains its own logs according to its policies. Neither is
          linked to your email address or to any account.
        </Paragraph>

        <SectionTitle>6. Your Rights and Data Deletion</SectionTitle>
        <Paragraph>
          There is no account to delete. TOAST data resides on your device and
          can be removed by uninstalling the App.
        </Paragraph>
        <Paragraph>
          If you gave us an email address, you can ask us to delete it at any
          time and we will remove it from our database. You can also ask what we
          hold, ask us to correct it, or object to our processing it. Email{' '}
          <ContactLink href="mailto:info@toastbyte.studio">
            info@toastbyte.studio
          </ContactLink>{' '}
          and we will action it.
        </Paragraph>
        <Paragraph>
          One honest limitation: analytics data is not linked to your email
          address or to any account, so we cannot look up which analytics events
          were yours. Deleting the cookies listed in section 2 from your browser
          resets the identifier Google Analytics uses for you.
        </Paragraph>

        <SectionTitle>7. Children&apos;s Privacy</SectionTitle>
        <Paragraph>
          Neither TOAST nor this Site is directed at children under the age of
          13. We do not knowingly collect personal information from children. If
          you are a parent or guardian and believe your child has provided us
          with personal information, please contact us and we will promptly
          delete it.
        </Paragraph>

        <SectionTitle>8. Changes to This Policy</SectionTitle>
        <Paragraph>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated &quot;Last updated&quot; date.
          Continued use of TOAST or the Site after changes are posted
          constitutes your acceptance of the revised policy.
        </Paragraph>

        <SectionTitle>9. Contact Us</SectionTitle>
        <Paragraph>
          If you have any questions about this Privacy Policy, please contact us
          at{' '}
          <ContactLink href="mailto:info@toastbyte.studio">
            info@toastbyte.studio
          </ContactLink>
          .
        </Paragraph>
      </PageContent>
    </PageContainer>
  );
};

export default PrivacyPolicy;
