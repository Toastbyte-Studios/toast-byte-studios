import { createContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  /** The currently active theme. */
  theme: Theme;
  /** Flips between light and dark, persisting the choice. */
  toggleTheme: () => void;
}

/**
 * Context carrying the active theme and its toggle.
 *
 * Kept in its own module so the provider file only exports components — this
 * keeps `eslint-plugin-react-refresh` happy about fast-refresh boundaries.
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export { ThemeContext };
export type { Theme, ThemeContextValue };
