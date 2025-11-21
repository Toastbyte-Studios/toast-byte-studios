import { css } from "styled-components";
import styled from "styled-components";
import { FlexCol } from "../../styles/core";

const Container = styled(FlexCol)`
  height: 100%;
  width: 100%;
  justify-content: flex-start;

  padding: 40px;
  gap: 10px;

  font-family: "Inter", Arial, sans-serif;
`;

const Bold = styled.span`
  font-weight: bold;
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

export { Container, Bold };
export { FadeInParagraph };
