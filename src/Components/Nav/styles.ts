import styled from 'styled-components';
import { NAV_DRAWER_MAX_WIDTH, TOUCH_TARGET } from '../../constants';

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 26px 0 22px;
  border-bottom: 1px solid var(--color-divider);
  flex-wrap: wrap;

  @media (max-width: ${NAV_DRAWER_MAX_WIDTH}) {
    /* nowrap keeps the brand and the toggle on one line — wrapping them was
       what pushed the links onto a second row in the first place. */
    flex-wrap: nowrap;
    gap: 16px;
    padding: 18px 0 16px;
  }
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--color-text);
  min-width: 0;

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
  flex: none;

  @media (max-width: ${NAV_DRAWER_MAX_WIDTH}) {
    width: 34px;
    height: 34px;
  }
`;

const BrandName = styled.span`
  font-family: var(--font-heading);
  font-size: 20px;
  letter-spacing: 0.02em;

  @media (max-width: ${NAV_DRAWER_MAX_WIDTH}) {
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const NavToggle = styled.button`
  display: none;

  @media (max-width: ${NAV_DRAWER_MAX_WIDTH}) {
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: ${TOUCH_TARGET};
    height: ${TOUCH_TARGET};
    padding: 0;
    background: none;
    border: 1px solid var(--color-divider);
    border-radius: var(--radius-md);
    color: inherit;
    cursor: pointer;
  }
`;

const NavToggleBar = styled.span`
  width: 18px;
  height: 2px;
  background: var(--color-text);
`;

const NavLinks = styled.nav<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 26px;
  font-family: var(--font-heading);
  font-size: 13px;
  letter-spacing: 0.09em;
  text-transform: uppercase;

  @media (max-width: ${NAV_DRAWER_MAX_WIDTH}) {
    /* Absolutely positioned so opening the drawer cannot change the height
       of the header row — otherwise the toggle slides out from under the
       thumb that just pressed it. */
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 20;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 8px 0 14px;
    font-size: 14px;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-divider);
    box-shadow: var(--shadow-md);
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

  @media (max-width: ${NAV_DRAWER_MAX_WIDTH}) {
    display: flex;
    align-items: center;
    min-height: 48px;
    padding: 0 16px;
    border-bottom: none;
    /* The active marker moves to the leading edge: an underline reads as
       decoration once the links are stacked. */
    border-left: 2px solid
      ${({ $active }) => ($active ? 'var(--color-accent)' : 'transparent')};
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

  @media (max-width: ${NAV_DRAWER_MAX_WIDTH}) {
    align-self: flex-start;
    justify-content: center;
    min-height: ${TOUCH_TARGET};
    margin: 12px 16px 0;
    padding: 6px 16px;
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
  NavToggle,
  NavToggleBar,
  NavLinks,
  NavLink,
  ThemeToggle,
  ThemeDot,
};
