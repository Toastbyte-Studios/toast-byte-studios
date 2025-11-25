import { css } from "styled-components";
import styled from "styled-components";
import { FlexCol, FlexRow } from "../../styles/core";
import { COLORS } from "../../constants";

const Container = styled(FlexCol)`
  height: 100%;
  width: 90%;
  justify-content: flex-start;

  padding: 40px;
  margin: 10px;
  gap: 10px;

  font-family: "Inter", Arial, sans-serif;
  background-color: ${COLORS.TOAST_BROWN};
  border: 2px ridge ${COLORS.ACCENT};
  border-radius: 10px;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const AboutBackground = styled(FlexRow)`
  width: auto;
  padding: 0% 10px;
  background-color: ${COLORS.SECONDARY_ACCENT};
  border: 2px ridge ${COLORS.ACCENT};
  border-radius: 10px;
  font-family: "Raleway", sans-serif;
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
`;

export { Container, Bold, AboutBackground };
export { FadeInParagraph };
