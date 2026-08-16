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

export {
  Main,
  Intro,
  Entry,
  EntryDate,
  EntryHeading,
  EntryProduct,
  EntryVersion,
  EntryBody,
};
