import styled from 'styled-components';
import { BREAKPOINTS, TOUCH_TARGET } from '../../constants';

const Main = styled.main`
  padding: 72px 0 40px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding-top: 36px;
  }
`;

const Lede = styled.p`
  font-size: 20px;
  max-width: 52ch;
  margin: 0 0 44px;
  text-wrap: pretty;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 18px;
    margin-bottom: 32px;
  }
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

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    gap: 32px;
    padding-top: 28px;
  }
`;

/**
 * Contact route row. Stacks below phone width: the values here are the
 * longest strings on the site (`github.com/Toastbyte-Studios/git-all`), and
 * a space-between row leaves the label with almost no room beside them.
 */
const ContactRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--color-divider);

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 10px 0;
  }
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
  /* These are addresses and repo paths — let them break anywhere rather
     than pushing the page wider than the screen. */
  overflow-wrap: anywhere;

  &:hover {
    color: var(--color-accent-600);
    text-decoration: underline;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    display: inline-flex;
    align-items: center;
    min-height: ${TOUCH_TARGET};
    text-align: left;
  }
`;

export { Main, Lede, Columns, ContactRow, ContactKey, ContactLink };
