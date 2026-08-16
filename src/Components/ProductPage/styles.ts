import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants';

const Main = styled.main`
  padding: 72px 0 0;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding-top: 48px;
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
`;

const Lede = styled.p`
  font-size: 21px;
  line-height: 1.55;
  max-width: 58ch;
  margin: 0 0 34px;
  text-wrap: pretty;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  padding-bottom: 44px;
  border-bottom: 1px solid var(--color-divider);
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
`;

const FeatureRow = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-divider);
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

const FactRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 11px 0;
  border-bottom: 1px solid var(--color-divider);
  font-size: 14px;
`;

const FactKey = styled.span`
  color: color-mix(in srgb, var(--color-text) 58%, transparent);
`;

const FactValue = styled.span`
  font-feature-settings: 'tnum';
  text-align: right;
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
