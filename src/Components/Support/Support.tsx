import type { JSX } from 'react';
import {
  Container,
  PageContainer,
  Header,
  SectionTitle,
  Question,
  Paragraph,
  ContactLink,
  Divider,
} from './styles';

/**
 * Support component renders the support page for Toastbyte Studios.
 *
 * Provides a FAQ section covering common questions, a contact email,
 * and a link to submit feedback — as required for App Store submission.
 *
 * @component
 * @returns {JSX.Element} The rendered support page.
 */
const Support: React.FC = (): JSX.Element => {
  return (
    <PageContainer>
      <Container>
        <Header>
          <h1>Support</h1>
        </Header>

        <Paragraph>
          Need help with TOAST or Strike Coach? Check the FAQ below or reach out
          to us directly — we&apos;re happy to help.
        </Paragraph>

        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <Divider />

        <Question>Does the app work without an internet connection?</Question>
        <Paragraph>
          Yes. Both TOAST and Strike Coach are designed to work fully offline.
          All core features — maps, guides, references, score tracking, and
          coaching tips — are available without any network connection. No
          account or sign-in is required.
        </Paragraph>

        <Question>How do I unlock the Pro version?</Question>
        <Paragraph>
          The Pro unlock is a one-time in-app purchase available through the
          Apple App Store or Google Play Store. Once purchased, Pro features are
          unlocked permanently on your device. If you reinstall the app, tap
          &quot;Restore Purchases&quot; to re-activate your Pro unlock at no
          extra charge.
        </Paragraph>

        <Question>Which platforms are the apps available on?</Question>
        <Paragraph>
          TOAST and Strike Coach are currently in development. They are being
          built for iOS (iPhone and iPad) and Android. Check back at{' '}
          <ContactLink href="https://toastbyte.studio">
            toastbyte.studio
          </ContactLink>{' '}
          for release announcements.
        </Paragraph>

        <Question>How do I restore a previous purchase?</Question>
        <Paragraph>
          Open the app and navigate to the Pro unlock screen, then tap
          &quot;Restore Purchases&quot;. Make sure you are signed in to the same
          Apple ID or Google account used for the original purchase.
        </Paragraph>

        <Question>How do I delete my data?</Question>
        <Paragraph>
          All app data is stored locally on your device — we do not store your
          data on any servers. To delete all app data, simply uninstall the app
          from your device. See our{' '}
          <ContactLink href="#privacy">Privacy Policy</ContactLink> for more
          details.
        </Paragraph>

        <Divider />

        <SectionTitle>Contact Us</SectionTitle>
        <Paragraph>
          Have a question not covered above, found a bug, or want to share
          feedback? We&apos;d love to hear from you.
        </Paragraph>
        <Paragraph>
          📧{' '}
          <ContactLink href="mailto:info@toastbyte.studio">
            info@toastbyte.studio
          </ContactLink>
        </Paragraph>

        <SectionTitle>Share Feedback</SectionTitle>
        <Paragraph>
          Help us improve! Send your feature requests, bug reports, or general
          thoughts to{' '}
          <ContactLink href="mailto:info@toastbyte.studio?subject=Feedback">
            info@toastbyte.studio
          </ContactLink>{' '}
          with the subject line &quot;Feedback&quot;.
        </Paragraph>
      </Container>
    </PageContainer>
  );
};

export default Support;
