import type { JSX } from 'react';
import {
  Container,
  Logo,
  LogoBackground,
  NavLink,
  WordmarkLogo,
  WordmarkText,
} from './styles';

/**
 * Nav is a functional React component that renders the main navigation bar.
 * It displays the Toastbyte Studios logo and title within a styled container.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const Nav: React.FC = (): JSX.Element => {
  return (
    <Container>
      <NavLink href="#" aria-label="Navigate to homepage">
        <Logo
          src="/assets/images/ToastHeadShotClear.webp"
          alt="Toastbyte Studios Logo"
          width={60}
          height={60}
          decoding="async"
        />
      </NavLink>
      <NavLink href="#" aria-label="Navigate to homepage">
        <LogoBackground>
          <WordmarkLogo
            src="/assets/images/ToastHeadShotClear.webp"
            alt="Toast the dog"
            decoding="async"
          />
          <WordmarkText>
            <span>TOAST<em>byte</em></span>
            <span>STUDIOS</span>
          </WordmarkText>
        </LogoBackground>
      </NavLink>
    </Container>
  );
};

export default Nav;
