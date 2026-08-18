import type { Product, Principle, Contact } from '../types/catalog';

/**
 * The studio product catalog.
 *
 * NOTE ON ACCURACY: entries carry a `verified` flag. Only GitAll has been
 * confirmed accurate. TOAST and Alley Admin are placeholder copy carried over
 * from the design comp — the prose reads as real, so check every figure,
 * version string and status line before launch.
 *
 * Each product's `status` is the single source of truth for that product's
 * state. It is set once per entry below and then threaded automatically into
 * `facts` (as the "Status" row) and into `meta` (wherever a `{status}` token
 * appears) — change `status` here and every place it is displayed updates
 * with it.
 */
const RAW_PRODUCTS: Product[] = [
  {
    key: 'gitall',
    name: 'GitAll',
    dot: '#2dd4bf',
    status: 'Live',
    kind: 'Developer tool · Web',
    domain: 'gitall.app',
    site: 'https://gitall.app',
    repo: 'https://github.com/Toastbyte-Studios/git-all',
    blurb:
      'Every git contribution graph you have, merged into one heatmap. GitHub, GitLab, Bitbucket and Gitea/Forgejo — side by side or combined.',
    meta: 'Free · no required login · v1.37.1',
    lede: 'Contribution history is scattered across four platforms and none of them will show you the others. GitAll merges them into a single heatmap. See your contributions side by side, or combined into one graph of everything at once.',
    shot: 'screenshot: unified heatmap',
    features: [
      {
        n: '01',
        title: 'Four platforms',
        body: 'GitHub, GitLab and Bitbucket today; Gitea/Forgejo, including Codeberg, next.',
      },
      {
        n: '02',
        title: 'No account required',
        body: 'Public profile data is read anonymously. No sign-up, no tokens, no OAuth screen.',
      },
      {
        n: '03',
        title: 'Two views',
        body: 'Separate heatmaps per platform, or one integrated graph of everything at once.',
      },
      {
        n: '04',
        title: 'Embeddable',
        body: 'Generate a snippet and drop the combined graph into a README or personal site.',
      },
    ],
    facts: [
      { k: 'Version', v: '1.37.1' },
      { k: 'Price', v: 'Free' },
      { k: 'Platform', v: 'Web' },
      { k: 'Source', v: 'Public' },
    ],
    verified: true,
  },
  {
    key: 'toast',
    name: 'TOAST',
    dot: '#C4622D',
    status: 'In Development',
    kind: 'Preparedness · iOS & Android',
    domain: 'toastbyte.studio',
    site: 'https://toastbyte.studio',
    repo: 'https://github.com/Toastbyte-Studios',
    blurb:
      'Trusted Outdoor and Survival Toolkit: an offline-first preparedness app with maps, guides, references and field utilities that keep working with no signal.',
    meta: '{status} · offline-first',
    lede: 'An offline-first emergency preparedness toolkit for hikers, preppers and anyone who would rather be ready. Maps, guides, references and utilities that keep working when the network does not.',
    shot: 'screenshot: offline map view',
    features: [
      {
        n: '01',
        title: 'Offline maps',
        body: 'Download regions ahead of time and navigate with no connection at all.',
      },
      {
        n: '02',
        title: 'Field references',
        body: 'Ham radio bands, knots, first aid, signalling — stored on device and searchable.',
      },
      {
        n: '03',
        title: 'Utilities',
        body: 'The small tools you actually reach for in the field, gathered in one place.',
      },
      {
        n: '04',
        title: 'Nothing to sign into',
        body: 'Kit lists and downloaded regions stay on the device.',
      },
    ],
    facts: [
      { k: 'Platform', v: 'iOS · Android' },
      { k: 'Connectivity', v: 'Offline-first' },
      { k: 'Account', v: 'Not required' },
    ],
    verified: false,
  },
  {
    // PLACEHOLDER COPY — confirm before launch.
    key: 'alley',
    name: 'Alley Admin',
    dot: '#d97706',
    status: 'In Development',
    kind: 'Operations · Web',
    domain: 'alleyadmin.app',
    site: 'https://alleyadmin.app',
    repo: 'https://github.com/Toastbyte-Studios/alley-admin',
    blurb:
      'An administration console for running a league: rosters, schedules, scoring and the paperwork around them, in one interface built for the person on the desk.',
    meta: '{status} · early access list open',
    lede: 'League administration without the spreadsheet sprawl. Rosters, schedules, scoring and reporting in one console, designed around the work of actually running a season.',
    shot: 'screenshot: season dashboard',
    features: [
      {
        n: '01',
        title: 'Rosters and schedules',
        body: 'Teams, players and fixtures kept in one place, with a history you can audit.',
      },
      {
        n: '02',
        title: 'Scoring',
        body: 'Enter results once and let standings, records and reports follow.',
      },
      {
        n: '03',
        title: 'Built for the desk',
        body: 'Dense, keyboard-friendly screens for people entering data all evening.',
      },
      {
        n: '04',
        title: 'Export anything',
        body: 'Everything on screen leaves as CSV — the data stays yours.',
      },
    ],
    facts: [
      { k: 'Platform', v: 'Web' },
      { k: 'Access', v: 'Early access list' },
      { k: 'Launch', v: 'TBA' },
    ],
    verified: false,
  },
];

const PRODUCTS: Product[] = RAW_PRODUCTS.map((product) => ({
  ...product,
  meta: product.meta.replace('{status}', product.status),
  facts: [{ k: 'Status', v: product.status }, ...product.facts],
}));

/** Studio principles shown on the studio page. */
const PRINCIPLES: Principle[] = [
  {
    title: 'Stay fluid',
    body: 'Technology changes, we should too. We are not married to any platform, language or framework. We use the right tool for the job, and we change it when a better one comes along.',
  },
  {
    title: 'No account theatre',
    body: 'We ask for a login when there is data to protect, and not before.',
  },
  {
    title: 'Say the real timeline',
    body: 'Dates get published when we believe them. “Coming soon” means we are not ready to commit to one.',
  },
  {
    title: 'Ship, then maintain',
    body: 'A release is the start of the obligation, not the end of it. Every product here is still supported.',
  },
];

/** Contact routes shown on the support page. */
const CONTACTS: Contact[] = [
  {
    k: 'General and press',
    v: 'info@toastbyte.studio',
    href: 'mailto:info@toastbyte.studio',
  },
  {
    k: 'Product support',
    v: 'support@toastbyte.studio',
    href: 'mailto:support@toastbyte.studio',
  },
  {
    k: 'GitAll issues',
    v: 'github.com/Toastbyte-Studios/git-all',
    href: 'https://github.com/Toastbyte-Studios/git-all/issues',
  },
  {
    k: 'Organization',
    v: 'github.com/Toastbyte-Studios',
    href: 'https://github.com/Toastbyte-Studios',
  },
];

export { PRODUCTS, PRINCIPLES, CONTACTS };
