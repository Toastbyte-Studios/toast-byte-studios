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

/**
 * The width at and below which the header collapses into a drawer.
 *
 * Two forms of the same threshold: the max-width the styles use, and the
 * matching min-width query the drawer hook listens on to close itself when
 * the viewport grows. They are derived from one value on purpose — if the
 * two ever drifted apart there would be a band of widths where the drawer
 * stays open on top of a nav that is already fully visible.
 */
const NAV_DRAWER_MAX_WIDTH = BREAKPOINTS.TABLET_PORTRAIT;
const NAV_DESKTOP_QUERY = `(min-width: ${
  parseInt(NAV_DRAWER_MAX_WIDTH, 10) + 1
}px)`;

/**
 * Minimum size for anything a finger has to hit, per the WCAG 2.2 target
 * size guidance. Applied on touch-width layouts only — pointer targets do
 * not need the extra height and it would loosen the desktop header.
 */
const TOUCH_TARGET = '44px';

export {
  COLORS,
  BREAKPOINTS,
  NAV_DRAWER_MAX_WIDTH,
  NAV_DESKTOP_QUERY,
  TOUCH_TARGET,
};
