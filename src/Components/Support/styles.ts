import styled from 'styled-components';
import { FlexCol, FlexRow } from '../../styles/core';
import { COLORS, BREAKPOINTS } from '../../constants';

const Container = styled(FlexCol)`
  width: 100%;
  max-width: 1000px;
  justify-content: flex-start;
  align-items: flex-start;

  padding: 60px 50px;
  margin: 20px 0;
  gap: 24px;

  font-family: 'Inter', Arial, sans-serif;
  background: rgba(192, 154, 107, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(192, 154, 107, 0.25);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.25);
  color: ${COLORS.PRIMARY_LIGHT};
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

const PageContainer = styled(FlexCol)`
  width: 100%;
  padding: 40px 20px;
  justify-content: flex-start;
  flex: 1;
`;

const Header = styled(FlexRow)`
  width: auto;
  padding: 12px 28px;
  background: linear-gradient(
    135deg,
    ${COLORS.TOAST_BROWN} 0%,
    ${COLORS.SECONDARY_ACCENT} 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-family: 'Raleway', sans-serif;
  box-shadow: 0 4px 15px rgba(192, 154, 107, 0.3);
  color: ${COLORS.PRIMARY_DARK};
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

const SectionTitle = styled.h2`
  margin: 8px 0 0;
  font-size: 22px;
  font-weight: 700;
  color: ${COLORS.TOAST_BROWN};
  font-family: 'Raleway', sans-serif;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 19px;
  }
`;

const Question = styled.h3`
  margin: 4px 0 0;
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.SECONDARY_ACCENT};

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 16px;
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

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid rgba(192, 154, 107, 0.25);
  margin: 4px 0;
`;

export {
  Container,
  PageContainer,
  Header,
  SectionTitle,
  Question,
  Paragraph,
  ContactLink,
  Divider,
};
