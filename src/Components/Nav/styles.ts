import styled from "styled-components";
import { COLORS } from "../../constants";
import { FlexRow } from "../../styles/core";

const Container = styled.nav`
  height: 60px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.PRIMARY_DARK};

  background-color: ${COLORS.TOAST_BROWN};
  border-bottom: 2px solid ${COLORS.SECONDARY_ACCENT};
`;

const LogoBackground = styled(FlexRow)`
  padding: 5px;
  background-color: ${COLORS.SECONDARY_ACCENT};
  border-radius: 8px;
  margin-right: 20px;
  width: 220px;
  height: 50px;
  border: 1px solid ${COLORS.PRIMARY_DARK};
`;

const Logo = styled.img`
  height: 60px;
  width: auto;
  margin-left: 10px;
  padding: 0;
`;

const BrandedLogo = styled.img`
  height: 40px;
  width: auto;
  padding: 0;
`;

export { Container, LogoBackground, Logo, BrandedLogo };
