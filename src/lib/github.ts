import { PRODUCTS } from '../data/catalog';

const GITHUB_API = 'https://api.github.com';
const REPO_URL_PATTERN = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/;

/** A normalised release, merged from a product repo's GitHub releases. */
interface GithubRelease {
  id: number;
  product: string;
  version: string;
  date: string;
  body: string;
  url: string;
  prerelease: boolean;
}

/** A repo to pull release notes from, paired with the product name to display. */
interface ReleaseSource {
  owner: string;
  repo: string;
  product: string;
}

interface RawGithubRelease {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  html_url: string;
  published_at: string | null;
  created_at: string;
  draft: boolean;
  prerelease: boolean;
}

/**
 * Repos to pull releases from, derived from the product catalog so this list
 * never drifts out of sync with it. A product whose `repo` points at the org
 * root rather than a specific repo (no public repo yet) is skipped.
 */
const RELEASE_SOURCES: ReleaseSource[] = PRODUCTS.flatMap((product) => {
  const match = product.repo.match(REPO_URL_PATTERN);
  if (!match) return [];
  return [{ owner: match[1], repo: match[2], product: product.name }];
});

/** Fetches one page of a single repo's releases, newest first. */
const fetchReleasePage = async (
  source: ReleaseSource,
  page: number,
  perPage: number,
): Promise<{ releases: GithubRelease[]; hasMore: boolean }> => {
  const res = await fetch(
    `${GITHUB_API}/repos/${source.owner}/${source.repo}/releases?page=${page}&per_page=${perPage}`,
  );
  if (!res.ok) {
    throw new Error(`GitHub API error for ${source.repo}: ${res.status}`);
  }
  const raw: RawGithubRelease[] = await res.json();
  const releases = raw
    .filter((release) => !release.draft)
    .map((release) => ({
      id: release.id,
      product: source.product,
      version: release.tag_name || release.name || 'Untitled release',
      date: release.published_at ?? release.created_at,
      body: release.body ?? '',
      url: release.html_url,
      prerelease: release.prerelease,
    }));
  return { releases, hasMore: raw.length === perPage };
};

export { RELEASE_SOURCES, fetchReleasePage };
export type { GithubRelease, ReleaseSource };
