import styled, { css } from 'styled-components';
import { BREAKPOINTS } from '../constants';

/**
 * Shared primitives for the studio site.
 *
 * Everything here reads from the CSS custom properties in tokens.css rather
 * than from JavaScript constants, so a theme change repaints the site without
 * React re-rendering a single component.
 */

/** Muted body text at a given opacity against the current foreground. */
const muted = (percent: number) => css`
  color: color-mix(in srgb, var(--color-text) ${percent}%, transparent);
`;

/** Tabular figures — keeps version numbers and dates from shifting. */
const tnum = css`
  font-feature-settings: 'tnum';
`;

const Shell = styled.div`
  background: var(--color-bg);
  color: var(--color-text);
  min-height: 100vh;
  width: 100%;
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  transition:
    background 160ms ease,
    color 160ms ease;
`;

const Wrap = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 32px 72px;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: 0 20px 48px;
  }
`;

/** Small uppercase section heading used across every view. */
const SectionLabel = styled.h2`
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 0 0 24px;
`;

/** Large page title used on the interior views. */
const PageTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 54px;
  font-weight: 400;
  letter-spacing: -0.02em;
  margin: 30px 0 18px;

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    font-size: 40px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    font-size: 32px;
  }
`;

/** Uppercase back link that returns to the home view. */
const BackLink = styled.a`
  font-family: var(--font-heading);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  ${muted(60)}

  &:hover {
    color: var(--color-accent-600);
  }
`;

const Button = styled.a<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 15px;
  letter-spacing: 0.02em;
  padding: 11px 20px;
  border-radius: var(--radius-md);
  text-decoration: none;
  cursor: pointer;
  transition:
    background 140ms ease,
    border-color 140ms ease,
    color 140ms ease;

  ${({ $variant = 'primary' }) =>
    $variant === 'primary'
      ? css`
          background: var(--color-accent);
          border: 1px solid var(--color-accent);
          color: var(--color-bg);

          &:hover {
            background: var(--color-accent-600);
            border-color: var(--color-accent-600);
            color: var(--color-bg);
            text-decoration: none;
          }
        `
      : css`
          background: transparent;
          border: 1px solid var(--color-divider);
          color: var(--color-text);

          &:hover {
            background: color-mix(in srgb, var(--color-accent) 8%, transparent);
            color: var(--color-text);
            text-decoration: none;
          }
        `}
`;

/** Coloured status dot. Size defaults to 9px. */
const Dot = styled.span<{ $color: string; $size?: number }>`
  width: ${({ $size = 9 }) => $size}px;
  height: ${({ $size = 9 }) => $size}px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex: none;
`;

/** Inline link with the accent underline used for "Details →" style calls. */
const QuietLink = styled.a`
  font-family: var(--font-heading);
  font-size: 14px;
  text-decoration: none;
  color: var(--color-accent-700);
  border-bottom: 1px solid
    color-mix(in srgb, var(--color-accent) 50%, transparent);
  cursor: pointer;

  &:hover {
    color: var(--color-accent-600);
  }
`;

/** Two-column grid that collapses to one column on tablet portrait. */
const TwoCol = styled.div<{ $columns?: string; $gap?: number }>`
  display: grid;
  grid-template-columns: ${({ $columns = '1fr 1fr' }) => $columns};
  gap: ${({ $gap = 56 }) => $gap}px;

  @media (max-width: ${BREAKPOINTS.TABLET_LANDSCAPE}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

/** Justified body paragraph used in the prose columns. */
const Prose = styled.p`
  margin: 0 0 14px;
  text-align: justify;
  hyphens: auto;
`;

export {
  Shell,
  Wrap,
  SectionLabel,
  PageTitle,
  BackLink,
  Button,
  Dot,
  QuietLink,
  TwoCol,
  Prose,
  muted,
  tnum,
};
