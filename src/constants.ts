/**
 * An object containing the main color palette used throughout the application.
 *
 * @property TOAST_BROWN    - The primary warm orange-brown accent color.
 * @property PRIMARY_DARK   - The main dark espresso brown for text and headings.
 * @property PRIMARY_LIGHT  - The cream off-white for backgrounds and light surfaces.
 * @property ACCENT         - The lighter warm orange for gradients and hover states.
 * @property SECONDARY_ACCENT  - Mid-tone warm brown for complementary UI elements.
 * @property BACKGROUND     - The cream page background color.
 * @property GRADIENT_START - Gradient start color for subtle warm backgrounds.
 * @property GRADIENT_END   - Gradient end color for warm backgrounds.
 * @property CARD_BG        - Card background color with warm transparency.
 */
const COLORS = {
  TOAST_BROWN: '#C4622D',
  PRIMARY_DARK: '#3D2314',
  PRIMARY_LIGHT: '#F5F0E8',
  ACCENT: '#D97748',
  SECONDARY_ACCENT: '#8B5E3C',
  BACKGROUND: '#F5F0E8',
  GRADIENT_START: '#EDE5D4',
  GRADIENT_END: '#F5F0E8',
  CARD_BG: 'rgba(196, 98, 45, 0.07)',
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
