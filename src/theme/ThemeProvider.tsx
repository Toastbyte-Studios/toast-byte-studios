import { useState, useEffect, useCallback } from 'react';
import type { JSX, ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme } from './ThemeContext';

const STORAGE_KEY = 'tb-theme';

/**
 * Reads the initial theme from localStorage, falling back to the operating
 * system preference. Runs lazily inside useState so it happens once, before
 * first paint, rather than on every render.
 */
const readInitialTheme = (): Theme => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // localStorage unavailable (private mode, blocked cookies) — fall through
  }

  const prefersDark =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  return prefersDark ? 'dark' : 'light';
};

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider owns the light/dark theme for the whole site.
 *
 * The theme is persisted to localStorage under `tb-theme` and mirrored onto
 * the document element as the `tb-dark` class, so the CSS custom properties in
 * tokens.css repaint everything without React touching individual components.
 *
 * @component
 * @returns {JSX.Element} The provider wrapping the application tree.
 */
const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}): JSX.Element => {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('tb-dark', theme === 'dark');
    root.style.colorScheme = theme;
    document.body.style.background = theme === 'dark' ? '#17161a' : '#f3f2f2';
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((previous) => {
      const next: Theme = previous === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // localStorage unavailable — the choice simply won't persist
      }
      return next;
    });
  }, []);

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};

export default ThemeProvider;
