/**
 * An object containing the main color palette used throughout the application.
 *
 * @property TOAST_BROWN    - The primary brown color for toast branding.
 * @property PRIMARY_DARK   - The main dark color for backgrounds or text.
 * @property PRIMARY_LIGHT  - The main light color for backgrounds or highlights.
 * @property ACCENT         - The accent color used for highlights and important elements.
 * @property SECONDARY_ACCENT  - The first secondary color for complementary UI elements.
 * @property BACKGROUND     - The background color.
 * @property GRADIENT_START - Gradient start color for modern backgrounds.
 * @property GRADIENT_END   - Gradient end color for modern backgrounds.
 * @property CARD_BG        - Card background color with transparency.
 */
const COLORS = {
  TOAST_BROWN: '#C09A6B',
  PRIMARY_DARK: '#2C3E50',
  PRIMARY_LIGHT: '#F5F1EB',
  ACCENT: '#E67E4A',
  SECONDARY_ACCENT: '#8DAA9D',
  BACKGROUND: '#3D4F5F',
  GRADIENT_START: '#34495E',
  GRADIENT_END: '#4A6274',
  CARD_BG: 'rgba(192, 154, 107, 0.12)',
};

/**
 * Breakpoints for responsive design
 * Use max-width media queries with these values
 */
const BREAKPOINTS = {
  MOBILE: '599px',
  TABLET_PORTRAIT: '767px',
  TABLET_LANDSCAPE: '1024px',
};

export { COLORS, BREAKPOINTS };
