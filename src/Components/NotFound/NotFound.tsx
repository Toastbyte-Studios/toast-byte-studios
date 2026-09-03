import type { JSX } from 'react';
import { BackLink, Button, PageTitle } from '../../styles/primitives';
import { Main, Message, Actions } from './styles';

/**
 * NotFound renders when the requested path does not match a site route.
 *
 * @component
 * @returns {JSX.Element} The rendered not-found view.
 */
const NotFound: React.FC = (): JSX.Element => {
  return (
    <Main id="main">
      <BackLink href="/">← Toastbyte Studios</BackLink>
      <PageTitle>Page not found</PageTitle>
      <Message>
        The page you’re looking for doesn’t exist or may have moved.
      </Message>
      <Actions>
        <Button href="/" $variant="primary">
          Return home
        </Button>
        <Button href="/support" $variant="secondary">
          Get support
        </Button>
      </Actions>
    </Main>
  );
};

export default NotFound;
