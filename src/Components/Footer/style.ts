import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants';

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
    gap: 14px;
  }
`;

const Link = styled.a`
  color: color-mix(in srgb, var(--color-text) 58%, transparent);
  text-decoration: none;

  &:hover {
    color: var(--color-accent-600);
    text-decoration: underline;
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
`;

export { Container, Info, Links, Link, SocialLinks, SocialIconLink };
