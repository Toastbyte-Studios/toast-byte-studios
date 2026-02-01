import type { JSX } from 'react';
import { BrandedLogo, Container, Logo, LogoBackground } from './styles';

/**
 * Nav is a functional React component that renders the main navigation bar.
 * It displays the Toastbyte Studios logo and title within a styled container.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const Nav: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Logo
        src="/assets/images/ToastHeadShotClear.webp"
        alt="Toastbyte Studios Logo"
        width={60}
        height={60}
        decoding="async"
      />
      <LogoBackground>
        <BrandedLogo
          src="/assets/images/HeaderLogo.svg"
          alt="Toastbyte Studios Logo"
          decoding="async"
        />
      </LogoBackground>
    </Container>
  );
};

export default Nav;
