import type { JSX } from 'react';
import {
  Container,
  Logo,
  LogoWrapper,
  BrandText,
  BrandName,
  BrandSub,
  NavLink,
} from './styles';

/**
 * Nav is a functional React component that renders the main navigation bar.
 * It displays the ToastByte Studios logo (mascot + brand text) within a styled container.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const Nav: React.FC = (): JSX.Element => {
  return (
    <Container>
      <NavLink href="#" aria-label="Navigate to homepage">
        <LogoWrapper>
          <Logo
            src="/assets/images/ToastHeadShotClear.webp"
            alt="Toast the Jack Russell Terrier — ToastByte Studios mascot"
            width={50}
            height={50}
            decoding="async"
          />
          <BrandText>
            <BrandName>TOASTBYTE</BrandName>
            <BrandSub>STUDIOS</BrandSub>
          </BrandText>
        </LogoWrapper>
      </NavLink>
    </Container>
  );
};

export default Nav;
