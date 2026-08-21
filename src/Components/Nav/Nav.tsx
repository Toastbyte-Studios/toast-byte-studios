import { useEffect } from 'react';
import type { JSX } from 'react';
import { useTheme } from '../../theme/useTheme';
import type { View } from '../../routing/useHashRoute';
import { NAV_DESKTOP_QUERY } from '../../constants';
import { useNavMenu } from './useNavMenu';
import {
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
} from './styles';

interface NavProps {
  /** The active view, used to underline the current section. */
  view: View;
}

const LINKS: { label: string; href: string; view: View }[] = [
  { label: 'Products', href: '#/', view: 'home' },
  { label: 'Studio', href: '#/studio', view: 'studio' },
  { label: 'Changelog', href: '#/changelog', view: 'changelog' },
  { label: 'Support', href: '#/support', view: 'support' },
];

/**
 * Nav renders the site header: the studio mark and wordmark, the section
 * links, and the light/dark theme toggle. Below the tablet breakpoint the
 * links collapse into a drawer behind a hamburger toggle.
 *
 * @component
 * @param {NavProps} props - The active view.
 * @returns {JSX.Element} The rendered site header.
 */
const Nav: React.FC<NavProps> = ({ view }): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const { open, toggle, close, panelRef, toggleRef } =
    useNavMenu(NAV_DESKTOP_QUERY);
  const isDark = theme === 'dark';
  const themeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  // Closing on view change covers the routes the link handlers do not: the
  // browser back button, and the in-page anchors on the home view.
  useEffect(() => close(), [view, close]);

  return (
    <Header>
      <Brand href="#/" aria-label="Toastbyte Studios — home" onClick={close}>
        <BrandMark
          src="/assets/images/ToastHeadShotClear.webp"
          alt=""
          width={40}
          height={40}
          decoding="async"
        />
        <BrandName>Toastbyte Studios</BrandName>
      </Brand>
      <NavToggle
        ref={toggleRef}
        type="button"
        onClick={toggle}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="site-nav"
      >
        <NavToggleBar aria-hidden="true" />
        <NavToggleBar aria-hidden="true" />
        <NavToggleBar aria-hidden="true" />
      </NavToggle>
      <NavLinks id="site-nav" ref={panelRef} $open={open}>
        {LINKS.map((link) => (
          <NavLink
            key={link.label}
            href={link.href}
            $active={view === link.view}
            aria-current={view === link.view ? 'page' : undefined}
            onClick={close}
          >
            {link.label}
          </NavLink>
        ))}
        {/* Deliberately does not close the drawer — the point of pressing it
            is to see the theme change, and closing would hide the result. */}
        <ThemeToggle
          type="button"
          onClick={toggleTheme}
          title={themeLabel}
          aria-label={themeLabel}
        >
          <ThemeDot $filled={isDark} />
          {isDark ? 'Dark' : 'Light'}
        </ThemeToggle>
      </NavLinks>
    </Header>
  );
};

export default Nav;
