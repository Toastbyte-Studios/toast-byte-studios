import styled from 'styled-components';
import { COLORS, BREAKPOINTS } from '../../constants';
import { FlexRow } from '../../styles/core';

const Container = styled.nav`
  height: 80px;
  width: 100%;
  padding: 0 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.PRIMARY_LIGHT};

  background: rgba(44, 62, 80, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(192, 154, 107, 0.25);
  box-shadow: 0 2px 20px rgba(44, 62, 80, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    height: 70px;
    padding: 0 20px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    height: 60px;
    padding: 0 15px;
  }
`;

const LogoBackground = styled(FlexRow)`
  padding: 8px 16px;
  background: linear-gradient(
    135deg,
    ${COLORS.TOAST_BROWN} 0%,
    ${COLORS.SECONDARY_ACCENT} 100%
  );
  border-radius: 12px;
  width: auto;
  min-width: 200px;
  height: 55px;
  border: 1px solid rgba(192, 154, 107, 0.3);
  box-shadow: 0 4px 15px rgba(192, 154, 107, 0.2);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(192, 154, 107, 0.3);
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    min-width: 180px;
    height: 50px;
    padding: 6px 12px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    min-width: 150px;
    height: 45px;
    padding: 5px 10px;
  }
`;

const Logo = styled.img`
  height: 70px;
  width: auto;
  margin-left: 0;
  padding: 5px;
  background: white;
  border-radius: 50%;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  transition: transform 0.2s ease;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    height: 60px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    height: 50px;
  }
`;

const BrandedLogo = styled.img`
  height: 45px;
  width: auto;
  padding: 0;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    height: 40px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    height: 35px;
  }
`;

export { Container, LogoBackground, Logo, BrandedLogo };
