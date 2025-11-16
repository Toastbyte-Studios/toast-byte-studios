import { Container, Info, Link } from "./style";

/**
 * Footer component that displays the current year and a copyright notice.
 *
 * @returns {JSX.Element} A footer section with the current year and company name.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <Info>©{currentYear} TOASTbyte Studios. All rights reserved.</Info>
      <Link href="mailto:info@toastbyte.studio">info@toastbyte.studio</Link>
    </Container>
  );
};

export default Footer;
