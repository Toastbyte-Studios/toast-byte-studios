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
  justify-content: flex-start;

  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.PRIMARY_DARK};

  background: rgba(245, 240, 232, 0.97);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(196, 98, 45, 0.2);
  box-shadow: 0 2px 12px rgba(61, 35, 20, 0.08);
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

const LogoWrapper = styled(FlexRow)`
  gap: 12px;
  width: auto;
  align-items: center;
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;

  &:focus,
  &:focus-visible {
    outline: 3px solid ${COLORS.TOAST_BROWN};
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

const Logo = styled.img`
  height: 52px;
  width: 52px;
  border-radius: 50%;
  border: 2px solid rgba(196, 98, 45, 0.3);
  box-shadow: 0 2px 8px rgba(61, 35, 20, 0.12);
  transition: transform 0.2s ease;
  object-fit: cover;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    height: 46px;
    width: 46px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    height: 40px;
    width: 40px;
  }
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const BrandName = styled.span`
  font-family: 'Raleway', Arial, sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: ${COLORS.PRIMARY_DARK};
  letter-spacing: -0.5px;
  line-height: 1;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    font-size: 18px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 16px;
  }
`;

const BrandSub = styled.span`
  font-family: 'Raleway', Arial, sans-serif;
  font-size: 10px;
  font-weight: 600;
  color: ${COLORS.TOAST_BROWN};
  letter-spacing: 3px;
  line-height: 1;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 9px;
    letter-spacing: 2px;
  }
`;

export { Container, LogoWrapper, Logo, BrandText, BrandName, BrandSub, NavLink };

