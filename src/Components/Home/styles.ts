import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants';

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 56px;
  align-items: start;
  padding: 88px 0 72px;
  border-bottom: 1px solid var(--color-divider);

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 56px 0 48px;
  }
`;

const Eyebrow = styled.div`
  font-family: var(--font-heading);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent-700);
  font-feature-settings: 'tnum';
  margin-bottom: 22px;
`;

const HeroHeadline = styled.h1`
  font-family: var(--font-heading);
  font-size: 62px;
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: -0.02em;
  margin: 0 0 24px;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    font-size: 46px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 36px;
  }
`;

const HeroLede = styled.p`
  font-size: 19px;
  line-height: 1.65;
  max-width: 46ch;
  margin: 0 0 28px;
  text-wrap: pretty;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatusPanel = styled.div`
  border: 1px solid var(--color-divider);
  padding: 26px;
`;

const PanelLabel = styled.h2`
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 55%, transparent);
  margin: 0 0 18px;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid var(--color-divider);
`;

const StatusName = styled.span`
  font-family: var(--font-heading);
  font-size: 18px;
  flex: 1;
`;

const StatusValue = styled.span`
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 58%, transparent);
  font-feature-settings: 'tnum';
`;

const PanelNote = styled.p`
  font-size: 13px;
  line-height: 1.55;
  margin: 18px 0 0;
  color: color-mix(in srgb, var(--color-text) 62%, transparent);
`;

const ProductsSection = styled.section`
  padding: 72px 0 8px;
`;

const ProductCard = styled.article`
  display: grid;
  grid-template-columns: 210px 1fr 150px;
  gap: 40px;
  align-items: start;
  padding: 32px 24px;
  border: 1px solid var(--color-divider);
  margin-bottom: -1px;
  transition: background 140ms ease;

  &:hover {
    background: color-mix(in srgb, var(--color-accent) 5%, transparent);
  }

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const ProductHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const ProductName = styled.h3`
  font-family: var(--font-heading);
  font-size: 27px;
  font-weight: 400;
  margin: 0;
`;

const ProductKind = styled.div`
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 55%, transparent);
  font-feature-settings: 'tnum';
`;

const ProductBlurb = styled.p`
  margin: 0 0 12px;
  text-wrap: pretty;
`;

const ProductMeta = styled.div`
  font-size: 13px;
  color: color-mix(in srgb, var(--color-text) 60%, transparent);
  font-feature-settings: 'tnum';
`;

const ProductActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

const DomainLink = styled.a`
  font-size: 13px;
  text-decoration: none;
  color: color-mix(in srgb, var(--color-text) 60%, transparent);

  &:hover {
    color: var(--color-accent-600);
  }
`;

const ClosingSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  padding: 80px 0 0;
  margin-top: 64px;
  border-top: 1px solid var(--color-divider);

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    grid-template-columns: 1fr;
    gap: 48px;
    padding-top: 56px;
    margin-top: 48px;
  }
`;

const PullQuote = styled.p`
  font-size: 21px;
  font-family: var(--font-heading);
  line-height: 1.35;
  margin: 0 0 20px;
`;

export {
  Hero,
  Eyebrow,
  HeroHeadline,
  HeroLede,
  ButtonRow,
  SideColumn,
  StatusPanel,
  PanelLabel,
  StatusRow,
  StatusName,
  StatusValue,
  PanelNote,
  ProductsSection,
  ProductCard,
  ProductHeading,
  ProductName,
  ProductKind,
  ProductBlurb,
  ProductMeta,
  ProductActions,
  DomainLink,
  ClosingSection,
  PullQuote,
};
