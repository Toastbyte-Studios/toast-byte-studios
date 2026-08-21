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

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    gap: 32px;
    padding: 36px 0 40px;
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

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    /* The middot separator lands mid-phrase at this width; a slightly
       looser line height keeps the wrapped second line readable. */
    line-height: 1.5;
    margin-bottom: 16px;
  }
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
    line-height: 1.1;
  }
`;

const HeroLede = styled.p`
  font-size: 19px;
  line-height: 1.65;
  max-width: 46ch;
  margin: 0 0 28px;
  text-wrap: pretty;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 17px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    /* Two buttons side by side wrap awkwardly at 320px, leaving one full
       width and one short. Stacking them keeps both at the same weight. */
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatusPanel = styled.div`
  border: 1px solid var(--color-divider);
  padding: 26px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 20px 18px;
  }
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
  text-align: right;
`;

const PanelNote = styled.p`
  font-size: 13px;
  line-height: 1.55;
  margin: 18px 0 0;
  color: color-mix(in srgb, var(--color-text) 62%, transparent);
`;

const ProductsSection = styled.section`
  padding: 72px 0 8px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 44px 0 8px;
  }
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

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 24px 18px;
    gap: 14px;
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

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 24px;
  }
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

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    /* Once the card is a single column these two sit on one line rather
       than burning two stacked rows on a phone. */
    flex-direction: row;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
`;

const DomainLink = styled.a`
  font-size: 13px;
  text-decoration: none;
  color: color-mix(in srgb, var(--color-text) 60%, transparent);

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }

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

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    gap: 40px;
    padding-top: 40px;
    margin-top: 40px;
  }
`;

const PullQuote = styled.p`
  font-size: 21px;
  font-family: var(--font-heading);
  line-height: 1.35;
  margin: 0 0 20px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 19px;
  }
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
