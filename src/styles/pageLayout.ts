import styled from 'styled-components';
import { FlexCol, FlexRow } from './core';
import { COLORS, BREAKPOINTS } from '../constants';

/**
 * Shared layout components for full-page content pages (e.g. Privacy Policy, Support).
 */

const PageContainer = styled(FlexCol)`
  width: 100%;
  padding: 40px 20px;
  justify-content: flex-start;
  flex: 1;
`;

const PageContent = styled(FlexCol)`
  width: 100%;
  max-width: 1000px;
  justify-content: flex-start;
  align-items: flex-start;

  padding: 60px 50px;
  margin: 20px 0;
  gap: 24px;

  font-family: 'Inter', Arial, sans-serif;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(196, 98, 45, 0.15);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(61, 35, 20, 0.08);
  color: ${COLORS.PRIMARY_DARK};
  line-height: 1.8;
  font-size: 18px;

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    padding: 50px 40px;
    gap: 20px;
    font-size: 17px;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    padding: 40px 30px;
    gap: 18px;
    font-size: 16px;
    border-radius: 16px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 30px 20px;
    margin: 10px 0;
    gap: 15px;
    font-size: 15px;
    border-radius: 12px;
  }
`;

const PageHeader = styled(FlexRow)`
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
  align-self: flex-start;

  h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    padding: 10px 24px;

    h1 {
      font-size: 24px;
    }
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 8px 20px;

    h1 {
      font-size: 20px;
    }
  }
`;

const Paragraph = styled.p`
  margin: 0;
  padding: 0;
`;

const ContactLink = styled.a`
  color: ${COLORS.TOAST_BROWN};
  text-decoration: none;
  font-weight: 500;
  transition:
    color 0.2s ease,
    text-shadow 0.2s ease;

  &:hover {
    color: ${COLORS.ACCENT};
    text-shadow: 0 0 10px rgba(255, 139, 67, 0.3);
  }
`;

export { PageContainer, PageContent, PageHeader, Paragraph, ContactLink };
