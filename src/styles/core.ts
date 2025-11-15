import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  padding: 0;
  margin: 0;
`;

const FlexCol = styled(Flex)`
  flex-direction: column;
`;

const FlexRow = styled(Flex)`
  flex-direction: row;
`;

export { FlexCol, FlexRow };
