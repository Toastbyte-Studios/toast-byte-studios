import { useCallback, useEffect, useSyncExternalStore } from 'react';
import type { JSX, ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme } from './ThemeContext';

const STORAGE_KEY = 'tb-theme';

/** Fired on the document when this tab changes the stored theme. */
const THEME_EVENT = 'tb-theme-change';

const DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * Reads the visitor's theme from localStorage, falling back to the operating
 * system preference.
 */
const readTheme = (): Theme => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // localStorage unavailable (private mode, blocked cookies) — fall through
  }

  const prefersDark =
    typeof window.matchMedia === 'function' &&
    window.matchMedia(DARK_QUERY).matches;

  return prefersDark ? 'dark' : 'light';
};

/**
 * The theme assumed when there is no DOM to read.
 *
 * Neither localStorage nor a media query exists at prerender time, so the
 * markup is built as light and React uses this same value for the first
 * client render, keeping hydration consistent. Nothing visible waits on it:
 * the inline script in index.html has already put the real theme's class on
 * the document before first paint, and the CSS custom properties in
 * tokens.css repaint from that class alone.
 */
const readServerTheme = (): Theme => 'light';

/** Subscribes to every source that can change the resolved theme. */
const subscribeToTheme = (onChange: () => void): (() => void) => {
  const media =
    typeof window.matchMedia === 'function' ? window.matchMedia(DARK_QUERY) : null;

  // 'storage' covers another tab; THEME_EVENT covers this one, which storage
  // deliberately does not fire for.
  window.addEventListener('storage', onChange);
  document.addEventListener(THEME_EVENT, onChange);

  if (media) {
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
    } else {
      media.addListener(onChange);
    }
  }

  return () => {
    window.removeEventListener('storage', onChange);
    document.removeEventListener(THEME_EVENT, onChange);

    if (media) {
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', onChange);
      } else {
        media.removeListener(onChange);
      }
    }
  };
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
  const theme = useSyncExternalStore(
    subscribeToTheme,
    readTheme,
    readServerTheme,
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('tb-dark', theme === 'dark');
    root.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — the choice simply won't persist
    }

    // Tells useSyncExternalStore to re-read; 'storage' does not fire in the
    // tab that performed the write.
    document.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
