import styled from 'styled-components';
import { BREAKPOINTS } from '../constants';

/**
 * Shared layout for long-form legal and reference pages (e.g. Privacy Policy).
 *
 * These pages are prose rather than product surfaces, so they use a narrower
 * measure than the rest of the site — but they read from the same design
 * tokens, which is what keeps them legible in dark mode.
 */

const PageContainer = styled.div`
  width: 100%;
  padding: 72px 0 40px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding-top: 36px;
  }
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 720px;
  gap: 20px;
  padding-top: 32px;
  border-top: 1px solid var(--color-divider);
  color: var(--color-text);
  font-size: 16px;
  line-height: 1.7;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    gap: 16px;
    padding-top: 24px;
    /* Legal prose is dense; a slightly shorter measure is easier to track
       line to line on a phone. */
    line-height: 1.65;
  }
`;

const PageHeader = styled.div`
  h1 {
    font-family: var(--font-heading);
    font-size: 54px;
    font-weight: 400;
    letter-spacing: -0.02em;
    margin: 30px 0 18px;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    h1 {
      font-size: 40px;
    }
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    h1 {
      font-size: 32px;
      margin: 20px 0 14px;
    }
  }
`;

const Paragraph = styled.p`
  margin: 0;
  padding: 0;
`;

const ContactLink = styled.a`
  color: var(--color-accent-700);
  text-decoration: none;
  border-bottom: 1px solid
    color-mix(in srgb, var(--color-accent) 50%, transparent);
  overflow-wrap: anywhere;

  &:hover {
    color: var(--color-accent-600);
  }
`;

export { PageContainer, PageContent, PageHeader, Paragraph, ContactLink };
