import { Container, Logo, Title } from "./styles";

/**
 * Nav is a functional React component that renders the main navigation bar.
 * It displays the TOASTbyte Studios logo and title within a styled container.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const Nav: React.FC = () => {
  return (
    <Container>
      <Logo
        src="/assets/images/ToastHeadShotClear.png"
        alt="TOASTbyte Studios Logo"
      />
      <Title>TOASTbyte Studios</Title>
    </Container>
  );
};

export default Nav;
