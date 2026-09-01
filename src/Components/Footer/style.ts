import styled from 'styled-components';
import { BREAKPOINTS, TOUCH_TARGET } from '../../constants';

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 88px;
  padding-top: 24px;
  border-top: 1px solid var(--color-divider);
  font-size: 13px;
  color: color-mix(in srgb, var(--color-text) 58%, transparent);

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    margin-top: 56px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    margin-top: 44px;
  }
`;

const Info = styled.span`
  font-feature-settings: 'tnum';
`;

const Links = styled.span`
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    gap: 4px 20px;
  }
`;

const Link = styled.a`
  color: color-mix(in srgb, var(--color-text) 58%, transparent);
  text-decoration: none;

  &:hover {
    color: var(--color-accent-600);
    text-decoration: underline;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    display: inline-flex;
    align-items: center;
    min-height: ${TOUCH_TARGET};
  }
`;

const CookieSettings = styled.button`
  padding: 0;
  border: 0;
  background: transparent;
  color: color-mix(in srgb, var(--color-text) 58%, transparent);
  font: inherit;
  cursor: pointer;

  &:hover {
    color: var(--color-accent-600);
    text-decoration: underline;
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    display: inline-flex;
    align-items: center;
    min-height: ${TOUCH_TARGET};
  }
`;

const SocialLinks = styled.span`
  display: flex;
  gap: 14px;
  align-items: center;
`;

const SocialIconLink = styled.a`
  display: inline-flex;
  color: color-mix(in srgb, var(--color-text) 58%, transparent);

  svg {
    width: 15px;
    height: 15px;
    fill: currentColor;
  }

  &:hover {
    color: var(--color-accent-600);
  }

  @media (max-width: ${BREAKPOINTS.TABLET_PORTRAIT}) {
    /* A 15px icon is a 15px tap target without this. */
    align-items: center;
    justify-content: center;
    min-width: ${TOUCH_TARGET};
    min-height: ${TOUCH_TARGET};
    margin-left: -12px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export {
  Container,
  Info,
  Links,
  Link,
  CookieSettings,
  SocialLinks,
  SocialIconLink,
};
