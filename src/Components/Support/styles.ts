import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants';

const Main = styled.main`
  padding: 72px 0 40px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding-top: 48px;
  }
`;

const Lede = styled.p`
  font-size: 20px;
  max-width: 52ch;
  margin: 0 0 44px;
  text-wrap: pretty;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  border-top: 1px solid var(--color-divider);
  padding-top: 40px;

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--color-divider);
`;

const ContactKey = styled.span`
  color: color-mix(in srgb, var(--color-text) 58%, transparent);
  font-size: 14px;
`;

const ContactLink = styled.a`
  font-size: 14px;
  text-align: right;
  text-decoration: none;
  color: var(--color-accent-700);

  &:hover {
    color: var(--color-accent-600);
    text-decoration: underline;
  }
`;

export { Main, Lede, Columns, ContactRow, ContactKey, ContactLink };
