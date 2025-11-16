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

export { Container, Bold };
