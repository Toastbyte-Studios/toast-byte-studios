import styled from "styled-components";
import { COLORS } from "../../constants";

/**
 * Footer component that displays the current year and a copyright notice.
 *
 * @returns {JSX.Element} A footer section with the current year and company name.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <p>©{currentYear} TOASTbyte Studios. All rights reserved.</p>
    </Container>
  );
};

const Container = styled.footer`
  height: 50px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  font-family: "Inter", Arial, sans-serif;
  color: ${COLORS.PRIMARY_DARK};

  background-color: ${COLORS.SECONDARY_ACCENT};
`;

export default Footer;
