import type { JSX } from "react";
import { Container, Logo, Title } from "./styles";

/**
 * Nav is a functional React component that renders the main navigation bar.
 * It displays the TOASTbyte Studios logo and title within a styled container.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const Nav: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Logo
        src="/assets/images/ToastHeadShotClear.webp"
        alt="TOASTbyte Studios Logo"
        loading="lazy"
        width={60}
        height={60}
        decoding="async"
      />
      <Title>TOASTbyte Studios</Title>
    </Container>
  );
};

export default Nav;
