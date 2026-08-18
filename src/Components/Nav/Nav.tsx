import type { JSX } from 'react';
import { useTheme } from '../../theme/useTheme';
import type { View } from '../../routing/useHashRoute';
import {
  Header,
  Brand,
  BrandMark,
  BrandName,
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
 * links, and the light/dark theme toggle.
 *
 * @component
 * @param {NavProps} props - The active view.
 * @returns {JSX.Element} The rendered site header.
 */
const Nav: React.FC<NavProps> = ({ view }): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const themeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <Header>
      <Brand href="#/" aria-label="Toastbyte Studios — home">
        <BrandMark
          src="/assets/images/ToastHeadShotClear.webp"
          alt=""
          width={40}
          height={40}
          decoding="async"
        />
        <BrandName>Toastbyte Studios</BrandName>
      </Brand>
      <NavLinks>
        {LINKS.map((link) => (
          <NavLink
            key={link.label}
            href={link.href}
            $active={view === link.view}
            aria-current={view === link.view ? 'page' : undefined}
          >
            {link.label}
          </NavLink>
        ))}
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
