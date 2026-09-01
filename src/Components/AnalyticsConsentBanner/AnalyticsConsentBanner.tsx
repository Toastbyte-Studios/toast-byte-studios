import type { JSX } from 'react';
import { Link } from '../Footer/style';
import { setAnalyticsConsent } from '../../lib/analytics-client';
import { Actions, Banner, Button, Content, Title } from './styles';

interface AnalyticsConsentBannerProps {
  open: boolean;
  onClose: () => void;
}

const AnalyticsConsentBanner: React.FC<AnalyticsConsentBannerProps> = ({
  open,
  onClose,
}): JSX.Element | null => {
  if (!open) {
    return null;
  }

  const choose = (granted: boolean) => {
    setAnalyticsConsent(granted);
    if (granted) {
      window.zaraz?.consent?.sendQueuedEvents?.();
    }
    onClose();
  };

  return (
    <Banner
      role="dialog"
      aria-modal="true"
      aria-labelledby="analytics-consent-title"
    >
      <Content>
        <Title id="analytics-consent-title">Analytics cookies</Title>
        <p>
          We use analytics cookies to understand how visitors use this site.
          Read our <Link href="#/privacy">Privacy Policy</Link>.
        </p>
      </Content>
      <Actions>
        <Button type="button" onClick={() => choose(false)}>
          Decline
        </Button>
        <Button type="button" onClick={() => choose(true)}>
          Accept
        </Button>
      </Actions>
    </Banner>
  );
};

export default AnalyticsConsentBanner;
