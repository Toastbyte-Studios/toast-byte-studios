import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants';

const Main = styled.main`
  padding: 72px 0 40px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding-top: 36px;
  }
`;

const Lede = styled.p`
  font-size: 21px;
  line-height: 1.55;
  max-width: 54ch;
  margin: 0 0 44px;

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
  padding-top: 44px;

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    gap: 32px;
    padding-top: 28px;
  }
`;

const PrincipleRow = styled.div`
  padding: 18px 0;
  border-bottom: 1px solid var(--color-divider);
`;

const PrincipleTitle = styled.div`
  font-family: var(--font-heading);
  font-size: 20px;
  margin-bottom: 6px;
`;

const PrincipleBody = styled.p`
  margin: 0;
  color: color-mix(in srgb, var(--color-text) 80%, transparent);
`;

const MarkImage = styled.img`
  width: 50%;
  height: auto;
  aspect-ratio: 1 / 1;
  border: 6px solid var(--color-surface);
  outline: 1px solid var(--color-divider);

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    /* 50% of a full-width phone column is a thumbnail. Once the columns
       have collapsed there is nothing beside it, so give it the room. */
    width: 70%;
    border-width: 4px;
  }
`;

const MarkCaption = styled.p`
  font-size: 13px;
  margin-top: 14px;
  color: color-mix(in srgb, var(--color-text) 58%, transparent);
`;

const PressPanel = styled.div`
  margin-top: 36px;
  border: 1px solid var(--color-divider);
  padding: 24px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    margin-top: 28px;
    padding: 20px 18px;
  }
`;

const PressHeading = styled.h3`
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 0 0 16px;
`;

const PressBody = styled.p`
  margin: 0 0 16px;
  font-size: 15px;
`;

export {
  Main,
  Lede,
  Columns,
  PrincipleRow,
  PrincipleTitle,
  PrincipleBody,
  MarkImage,
  MarkCaption,
  PressPanel,
  PressHeading,
  PressBody,
};
