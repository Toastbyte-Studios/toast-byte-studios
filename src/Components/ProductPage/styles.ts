import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants';

const Main = styled.main`
  padding: 72px 0 0;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding-top: 36px;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 30px 0 14px;
  flex-wrap: wrap;
`;

const ProductTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 54px;
  font-weight: 400;
  letter-spacing: -0.02em;
  margin: 0;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    font-size: 40px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 32px;
  }
`;

const StatusPill = styled.span`
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid var(--color-divider);
  padding: 5px 10px;
  border-radius: var(--radius-md);
  color: color-mix(in srgb, var(--color-text) 62%, transparent);
  white-space: nowrap;
`;

const Lede = styled.p`
  font-size: 21px;
  line-height: 1.55;
  max-width: 58ch;
  margin: 0 0 34px;
  text-wrap: pretty;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 18px;
    margin-bottom: 28px;
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  padding-bottom: 44px;
  border-bottom: 1px solid var(--color-divider);

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding-bottom: 32px;
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 64px;
  padding: 48px 0 40px;

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    gap: 32px;
    padding: 32px 0 32px;
  }
`;

const FeatureRow = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-divider);

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    grid-template-columns: 22px 1fr;
    gap: 10px;
  }
`;

const FeatureNumber = styled.span`
  font-family: var(--font-heading);
  font-size: 13px;
  color: var(--color-accent-700);
  font-feature-settings: 'tnum';
  padding-top: 4px;
`;

const FeatureTitle = styled.div`
  font-family: var(--font-heading);
  font-size: 19px;
  margin-bottom: 4px;
`;

const FeatureBody = styled.p`
  margin: 0;
  font-size: 15px;
  color: color-mix(in srgb, var(--color-text) 78%, transparent);
`;

/**
 * Key/value row. Stacks below phone width — several values ("iOS · Android",
 * "Early access list") are long enough that a space-between row squeezes the
 * key down to a couple of characters per line.
 */
const FactRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 11px 0;
  border-bottom: 1px solid var(--color-divider);
  font-size: 14px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    flex-direction: column;
    gap: 2px;
  }
`;

const FactKey = styled.span`
  color: color-mix(in srgb, var(--color-text) 58%, transparent);
`;

const FactValue = styled.span`
  font-feature-settings: 'tnum';
  text-align: right;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    text-align: left;
  }
`;

const ShotFrame = styled.div`
  margin-top: 32px;
  border: 6px solid var(--color-surface);
  outline: 1px solid var(--color-divider);
  background: repeating-linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-text) 8%, var(--color-bg)) 0 6px,
    color-mix(in srgb, var(--color-text) 4%, var(--color-bg)) 6px 12px
  );
  height: 210px;
  display: flex;
  align-items: flex-end;
  padding: 12px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    height: 150px;
    margin-top: 24px;
    border-width: 4px;
  }
`;

const ShotCaption = styled.span`
  font-family: ui-monospace, monospace;
  font-size: 11px;
  color: color-mix(in srgb, var(--color-text) 65%, transparent);
  background: var(--color-bg);
  padding: 4px 7px;
`;

const OtherRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  padding: 32px 0 0;
  border-top: 1px solid var(--color-divider);

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    flex-direction: column;
    gap: 10px;
    padding-top: 24px;
  }
`;

const OtherLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--color-divider);
  padding: 14px 18px;
  color: var(--color-text);
  font-family: var(--font-heading);
  font-size: 16px;
  text-decoration: none;
  transition: background 140ms ease;

  &:hover {
    background: color-mix(in srgb, var(--color-accent) 5%, transparent);
    color: var(--color-text);
    text-decoration: none;
  }
`;

export {
  Main,
  TitleRow,
  ProductTitle,
  StatusPill,
  Lede,
  ActionRow,
  Columns,
  FeatureRow,
  FeatureNumber,
  FeatureTitle,
  FeatureBody,
  FactRow,
  FactKey,
  FactValue,
  ShotFrame,
  ShotCaption,
  OtherRow,
  OtherLink,
};
