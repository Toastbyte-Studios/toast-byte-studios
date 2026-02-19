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
 * Covers data collection, usage, third-party sharing, and deletion requests
 * as required for App Store and Google Play submission.
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
        <LastUpdated>Last updated: February 2025</LastUpdated>

        <Paragraph>
          Toastbyte Studios (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
          operates the TOAST mobile application (the &quot;App&quot;). This
          Privacy Policy explains what information we collect, how we use it,
          and your rights regarding that information.
        </Paragraph>

        <SectionTitle>1. Information We Collect</SectionTitle>
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

        <SectionTitle>2. How We Use Your Information</SectionTitle>
        <Paragraph>We use the information described above solely to:</Paragraph>
        <Paragraph>
          • Provide and improve the functionality of TOAST
          <br />
          • Ensure compatibility across devices and operating system versions
          <br />• Respond to your support requests
        </Paragraph>
        <Paragraph>
          We do not use your data for advertising, profiling, or any purpose
          beyond operating TOAST.
        </Paragraph>

        <SectionTitle>3. Data Sharing with Third Parties</SectionTitle>
        <Paragraph>
          We do not sell, trade, or rent your personal information to third
          parties. We do not share your data with any third-party analytics,
          advertising, or marketing services.
        </Paragraph>
        <Paragraph>
          The only third parties involved are Apple (App Store) and Google
          (Google Play) for payment processing when you purchase the Pro unlock.
          These transactions are governed by their respective privacy policies.
        </Paragraph>

        <SectionTitle>4. Data Retention</SectionTitle>
        <Paragraph>
          Because TOAST is designed to work offline and store data locally on
          your device, we do not retain personal data on our servers.
          Uninstalling TOAST from your device will remove all locally stored app
          data.
        </Paragraph>

        <SectionTitle>5. Your Rights and Data Deletion</SectionTitle>
        <Paragraph>
          Since we do not collect or store personal data on our servers, there
          is no user account or server-side data to delete. All TOAST data
          resides on your device and can be removed by uninstalling TOAST.
        </Paragraph>
        <Paragraph>
          If you believe we hold any personal data about you, or to submit a
          data deletion request, please contact us at{' '}
          <ContactLink href="mailto:info@toastbyte.studio">
            info@toastbyte.studio
          </ContactLink>
          .
        </Paragraph>

        <SectionTitle>6. Children&apos;s Privacy</SectionTitle>
        <Paragraph>
          TOAST is not directed at children under the age of 13. We do not
          knowingly collect personal information from children. If you are a
          parent or guardian and believe your child has provided us with
          personal information, please contact us and we will promptly delete
          it.
        </Paragraph>

        <SectionTitle>7. Changes to This Policy</SectionTitle>
        <Paragraph>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated &quot;Last updated&quot; date.
          Continued use of TOAST after changes are posted constitutes your
          acceptance of the revised policy.
        </Paragraph>

        <SectionTitle>8. Contact Us</SectionTitle>
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
