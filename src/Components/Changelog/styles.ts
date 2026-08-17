import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants';

const Main = styled.main`
  padding: 72px 0 40px;
  max-width: 720px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding-top: 48px;
  }
`;

const Intro = styled.p`
  margin: 0 0 44px;
  color: color-mix(in srgb, var(--color-text) 72%, transparent);
`;

const Entry = styled.article`
  display: grid;
  grid-template-columns: 108px 1fr;
  gap: 28px;
  padding: 24px 0;
  border-top: 1px solid var(--color-divider);

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const EntryDate = styled.div`
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 55%, transparent);
  font-feature-settings: 'tnum';
  padding-top: 5px;
`;

const EntryHeading = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;

const EntryProduct = styled.span`
  font-family: var(--font-heading);
  font-size: 19px;
`;

const EntryVersion = styled.span`
  font-size: 13px;
  color: var(--color-accent-700);
  font-feature-settings: 'tnum';
`;

const EntryBody = styled.p`
  margin: 0;
  color: color-mix(in srgb, var(--color-text) 82%, transparent);
`;

const EntryNotes = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: color-mix(in srgb, var(--color-text) 82%, transparent);

  li + li {
    margin-top: 6px;
  }
`;

const EntryLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  font-family: var(--font-heading);
  font-size: 13px;
  text-decoration: none;
  color: var(--color-accent-700);
  border-bottom: 1px solid
    color-mix(in srgb, var(--color-accent) 50%, transparent);

  &:hover {
    color: var(--color-accent-600);
  }
`;

const StateMessage = styled.p`
  margin: 24px 0;
  color: color-mix(in srgb, var(--color-text) 60%, transparent);
`;

const LoadMoreRow = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;

const LoadMoreButton = styled.button`
  font-family: var(--font-heading);
  font-size: 14px;
  letter-spacing: 0.02em;
  padding: 10px 22px;
  border-radius: var(--radius-md);
  background: transparent;
  border: 1px solid var(--color-divider);
  color: var(--color-text);
  cursor: pointer;
  transition:
    background 140ms ease,
    border-color 140ms ease;

  &:hover:not(:disabled) {
    background: color-mix(in srgb, var(--color-accent) 8%, transparent);
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

export {
  Main,
  Intro,
  Entry,
  EntryDate,
  EntryHeading,
  EntryProduct,
  EntryVersion,
  EntryBody,
  EntryNotes,
  EntryLink,
  StateMessage,
  LoadMoreRow,
  LoadMoreButton,
};
