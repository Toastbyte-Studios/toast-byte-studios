import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants';

const Main = styled.main`
  padding: 128px 0 96px;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    padding: 88px 0 64px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 56px 0 48px;
  }
`;

const Message = styled.p`
  font-size: 20px;
  max-width: 42ch;
  margin: 0 0 32px;
  text-wrap: pretty;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 18px;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    align-items: stretch;
    flex-direction: column;
    gap: 10px;
  }
`;

export { Main, Message, Actions };
