import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ThemeContextValue } from './ThemeContext';

/**
 * Returns the active theme and its toggle.
 *
 * @throws {Error} If called outside a ThemeProvider.
 * @returns {ThemeContextValue} The current theme and toggle function.
 */
const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export { useTheme };
