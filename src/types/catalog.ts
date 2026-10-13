/** A single numbered feature highlight on a product page. */
interface ProductFeature {
  /** Two-digit ordinal shown alongside the title, e.g. '01'. */
  n: string;
  title: string;
  body: string;
}

/** A key/value row in a product's facts table. */
interface ProductFact {
  k: string;
  v: string;
}

/**
 * A live image shown in place of a product's screenshot placeholder, wrapped
 * in a link. `src` must accept a `theme=light|dark` query parameter: the page
 * requests both and shows whichever matches the site's own theme toggle.
 */
interface ProductEmbed {
  href: string;
  src: string;
  alt: string;
}

/**
 * A real screenshot shown in place of a product's screenshot placeholder,
 * with one image per site theme. `width` and `height` are the images'
 * intrinsic size (both must match), so the page reserves the right space
 * before they load.
 */
interface ProductScreenshot {
  light: string;
  dark: string;
  alt: string;
  width: number;
  height: number;
}

/** A product in the studio catalog. */
interface Product {
  /** URL-safe identifier used in the product route, e.g. 'gitall'. */
  key: string;
  name: string;
  /** Status dot colour, a hex string. */
  dot: string;
  status: string;
  /** Short category line, e.g. 'Developer tool · Web'. */
  kind: string;
  domain: string;
  site: string;
  repo: string;
  /** One-paragraph summary used on the home index. */
  blurb: string;
  /** Short meta line, e.g. 'Free · no login · v1.37.1'. */
  meta: string;
  /** Longer opening paragraph used on the product page. */
  lede: string;
  /** Caption for the screenshot placeholder. */
  shot: string;
  /** Live image that replaces the screenshot placeholder when present. */
  embed?: ProductEmbed;
  /** Screenshot that replaces the placeholder when present (and no embed). */
  screenshot?: ProductScreenshot;
  features: ProductFeature[];
  facts: ProductFact[];
  /**
   * Whether the copy and figures above are confirmed accurate.
   * Placeholder entries are rendered normally but flagged in the source so
   * they are easy to find and correct before launch.
   */
  verified: boolean;
}

/** A guiding principle shown on the studio page. */
interface Principle {
  title: string;
  body: string;
}

/** A contact row on the support page. */
interface Contact {
  k: string;
  v: string;
  href: string;
}

export type {
  Product,
  ProductEmbed,
  ProductScreenshot,
  ProductFeature,
  ProductFact,
  Principle,
  Contact,
};
