import styled from "styled-components";
import { COLORS, BREAKPOINTS } from "../../constants";

const Container = styled.footer`
  width: 100%;
  padding: 24px 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  font-size: 14px;
  font-family: "Inter", Arial, sans-serif;
  color: ${COLORS.PRIMARY_LIGHT};

  background: rgba(15, 15, 16, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(192, 154, 107, 0.2);
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.3);

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    padding: 20px 30px;
    font-size: 13px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    flex-direction: column;
    gap: 10px;
    padding: 16px 20px;
    font-size: 12px;
  }
`;

const Info = styled.p`
  margin: 0;
  opacity: 0.9;
`;

const Link = styled.a`
  color: ${COLORS.TOAST_BROWN};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease, text-shadow 0.2s ease;

  &:hover {
    color: ${COLORS.ACCENT};
    text-shadow: 0 0 10px rgba(255, 139, 67, 0.3);
  }
`;

export { Container, Link, Info };
