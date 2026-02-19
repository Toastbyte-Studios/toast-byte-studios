import { Container, Info, Link, NavLinks } from './style';

/**
 * Footer component that displays the current year, a copyright notice,
 * and links to Privacy Policy and Support pages.
 *
 * @returns {JSX.Element} A footer section with the current year and company name.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <Info>©{currentYear} Toastbyte Studios. All rights reserved.</Info>
      <NavLinks>
        <Link href="#privacy">Privacy Policy</Link>
        <Link href="#support">Support</Link>
      </NavLinks>
      <Link href="mailto:info@toastbyte.studio">info@toastbyte.studio</Link>
    </Container>
  );
};

export default Footer;
