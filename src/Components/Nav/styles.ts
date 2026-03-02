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

const NavLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;

  &:focus,
  &:focus-visible {
    outline: 3px solid ${COLORS.SECONDARY_ACCENT};
    outline-offset: 3px;
    border-radius: 4px;
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

const WordmarkDog = styled.img`
  height: 38px;
  width: 38px;
  object-fit: cover;
  border-radius: 50%;
  background: white;
  padding: 3px;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.25));

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    height: 34px;
    width: 34px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    height: 30px;
    width: 30px;
  }
`;

const WordmarkText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 10px;
  line-height: 1;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    margin-left: 7px;
  }
`;

const BrandName = styled.span`
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 1px;
  color: ${COLORS.PRIMARY_LIGHT};
  text-transform: uppercase;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    font-size: 13px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 11px;
  }
`;

const BrandSub = styled.span`
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 9px;
  letter-spacing: 2.5px;
  color: ${COLORS.PRIMARY_LIGHT};
  text-transform: uppercase;
  opacity: 0.85;
  margin-top: 3px;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    font-size: 8px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 7px;
    letter-spacing: 2px;
  }
`;

export {
  Container,
  LogoBackground,
  Logo,
  WordmarkDog,
  WordmarkText,
  BrandName,
  BrandSub,
  NavLink,
};
