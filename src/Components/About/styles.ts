import { css } from "styled-components";
import styled from "styled-components";
import { FlexCol, FlexRow } from "../../styles/core";
import { COLORS, BREAKPOINTS } from "../../constants";

const Container = styled(FlexCol)`
  width: 100%;
  max-width: 1000px;
  justify-content: flex-start;

  padding: 60px 50px;
  margin: 20px 0;
  gap: 24px;

  font-family: "Inter", Arial, sans-serif;
  background: rgba(192, 154, 107, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(192, 154, 107, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
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

const Bold = styled.span`
  font-weight: 700;
  color: ${COLORS.TOAST_BROWN};
`;

const AboutBackground = styled(FlexRow)`
  width: auto;
  padding: 12px 28px;
  background: linear-gradient(135deg, ${COLORS.TOAST_BROWN} 0%, ${COLORS.SECONDARY_ACCENT} 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-family: "Raleway", sans-serif;
  box-shadow: 0 4px 15px rgba(192, 154, 107, 0.3);
  color: ${COLORS.PRIMARY_DARK};

  h3 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    padding: 10px 24px;

    h3 {
      font-size: 24px;
    }
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 8px 20px;

    h3 {
      font-size: 20px;
    }
  }
`;

export const fadeInCss = css`
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  &.fade-in-visible {
    opacity: 1;
    transform: none;
  }
`;

const FadeInParagraph = styled.p`
  ${fadeInCss}
  margin: 0;
  padding: 0;
`;

export { Container, Bold, AboutBackground, FadeInParagraph };
