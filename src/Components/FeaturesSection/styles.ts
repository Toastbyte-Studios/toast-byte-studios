import styled from 'styled-components';
import { FlexCol, FlexRow } from '../../styles/core';
import { COLORS, BREAKPOINTS } from '../../constants';
import { fadeInCss } from '../About/styles';

const Container = styled(FlexCol)`
  width: 100%;
  max-width: 1000px;
  justify-content: flex-start;

  padding: 60px 50px;
  margin: 20px 0;
  gap: 36px;

  font-family: 'Inter', Arial, sans-serif;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(196, 98, 45, 0.15);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(61, 35, 20, 0.08);
  color: ${COLORS.PRIMARY_DARK};

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    padding: 50px 40px;
    gap: 28px;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    padding: 40px 30px;
    gap: 24px;
    border-radius: 16px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 30px 20px;
    margin: 10px 0;
    gap: 20px;
    border-radius: 12px;
  }
`;

const SectionHeader = styled(FlexRow)`
  width: auto;
  padding: 12px 28px;
  background: linear-gradient(
    135deg,
    ${COLORS.TOAST_BROWN} 0%,
    ${COLORS.ACCENT} 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-family: 'Raleway', sans-serif;
  box-shadow: 0 4px 15px rgba(196, 98, 45, 0.25);
  color: ${COLORS.PRIMARY_LIGHT};

  h2 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    padding: 10px 24px;

    h2 {
      font-size: 24px;
    }
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 8px 20px;

    h2 {
      font-size: 20px;
    }
  }
`;

const OfflineTag = styled.p`
  margin: 0;
  font-size: 15px;
  color: ${COLORS.TOAST_BROWN};
  text-align: center;
  font-style: italic;
  letter-spacing: 0.3px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 14px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const Card = styled.div`
  ${fadeInCss}
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 24px 20px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(196, 98, 45, 0.15);
  border-radius: 14px;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(196, 98, 45, 0.18);
    border-color: rgba(196, 98, 45, 0.35);
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 18px 16px;
    gap: 8px;
  }
`;

const CardIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: ${COLORS.TOAST_BROWN};

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    width: 28px;
    height: 28px;
  }
`;

const CardName = styled.h3`
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  font-family: 'Raleway', Arial, sans-serif;
  color: ${COLORS.TOAST_BROWN};
  letter-spacing: 0.3px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 16px;
  }
`;

const CardDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${COLORS.PRIMARY_DARK};
  line-height: 1.6;
  opacity: 0.8; /* secondary text — slightly muted relative to card title */

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 13px;
  }
`;

export {
  Container,
  SectionHeader,
  OfflineTag,
  Grid,
  Card,
  CardIcon,
  CardName,
  CardDescription,
};
