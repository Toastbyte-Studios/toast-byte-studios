import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants';

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 26px 0 22px;
  border-bottom: 1px solid var(--color-divider);
  flex-wrap: wrap;
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--color-text);

  &:hover {
    color: var(--color-text);
    text-decoration: none;
  }
`;

const BrandMark = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  object-position: 50% 38%;
  outline: 1px solid var(--color-divider);
`;

const BrandName = styled.span`
  font-family: var(--font-heading);
  font-size: 20px;
  letter-spacing: 0.02em;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 26px;
  font-family: var(--font-heading);
  font-size: 13px;
  letter-spacing: 0.09em;
  text-transform: uppercase;

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    gap: 14px;
    font-size: 12px;
  }
`;

const NavLink = styled.a<{ $active?: boolean }>`
  color: var(--color-text);
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 1px solid
    ${({ $active }) =>
      $active
        ? 'color-mix(in srgb, var(--color-accent) 70%, transparent)'
        : 'transparent'};

  &:hover {
    color: var(--color-accent-600);
    text-decoration: none;
  }
`;

const ThemeToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 6px 11px;
  cursor: pointer;
  transition:
    background 140ms ease,
    border-color 140ms ease;

  &:hover {
    background: color-mix(in srgb, var(--color-accent) 5%, transparent);
  }
`;

const ThemeDot = styled.span<{ $filled: boolean }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid currentColor;
  background: ${({ $filled }) => ($filled ? 'currentColor' : 'transparent')};
`;

export {
  Header,
  Brand,
  BrandMark,
  BrandName,
  NavLinks,
  NavLink,
  ThemeToggle,
  ThemeDot,
};
