import { PRODUCTS } from '../data/catalog';
import type { ReleaseSourceKind } from '../types/catalog';

const GITHUB_API = 'https://api.github.com';
const GITHUB_WEB = 'https://github.com';
const REPO_URL_PATTERN = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/;

/** A version tag: `v1.2.3` or `1.2.3`, optionally with a suffix. */
const VERSION_TAG_PATTERN = /^v?(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/;

/** Commit subjects that carry no information for a reader of the changelog. */
const NOISE_SUBJECT_PATTERN = /^(chore\(release\)|merge branch|merge remote)/i;
const MERGE_PR_SUBJECT_PATTERN = /^merge pull request #\d+/i;

/** The largest page the GitHub REST API will serve. */
const MAX_PER_PAGE = 100;

/** A normalised changelog entry, from a GitHub release or a pushed tag. */
interface GithubRelease {
  /** Unique across every source, used as the React key. */
  id: string;
  product: string;
  version: string;
  date: string;
  body: string;
  url: string;
  prerelease: boolean;
}

/** A repo to pull version history from, paired with the product to display. */
interface ReleaseSource {
  owner: string;
  repo: string;
  product: string;
  /** Whether entries come from GitHub releases or from pushed tags. */
  kind: ReleaseSourceKind;
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

interface RawGithubTag {
  name: string;
  commit: { sha: string };
}

interface RawGithubCommit {
  sha: string;
  commit: {
    message: string;
    committer: { date: string } | null;
    author: { date: string } | null;
  };
}

interface RawGithubCompare {
  commits: RawGithubCommit[];
}

/**
 * Product repos to pull history from, derived from the product catalog so
 * this list never drifts out of sync with it. A product whose `repo` points
 * at the org root rather than a specific repo (no public repo yet) is skipped.
 */
const PRODUCT_RELEASE_SOURCES: ReleaseSource[] = PRODUCTS.flatMap((product) => {
  const match = product.repo.match(REPO_URL_PATTERN);
  if (!match) return [];
  return [
    {
      owner: match[1],
      repo: match[2],
      product: product.name,
      kind: product.releaseSource ?? 'releases',
    },
  ];
});

/**
 * Repos that ship releases but are not entries in the product catalog.
 *
 * The site itself lives here: its updates belong in the changelog it renders,
 * but it is not a product and should not appear on the products grid, so it
 * is deliberately kept out of the catalog rather than added as an entry.
 */
const EXTRA_RELEASE_SOURCES: ReleaseSource[] = [
  {
    owner: 'Toastbyte-Studios',
    repo: 'toast-byte-studios',
    product: 'Toastbyte.Studio',
    kind: 'releases',
  },
];

/** Drops repeats so one repo cannot be fetched, and listed, twice. */
const dedupeSources = (sources: ReleaseSource[]): ReleaseSource[] => {
  const seen = new Set<string>();
  return sources.filter((source) => {
    const key = `${source.owner}/${source.repo}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

/** Every repo the changelog pulls from: the products, then the site. */
const RELEASE_SOURCES: ReleaseSource[] = dedupeSources([
  ...PRODUCT_RELEASE_SOURCES,
  ...EXTRA_RELEASE_SOURCES,
]);

const repoKey = (source: ReleaseSource) => `${source.owner}/${source.repo}`;

const getJson = async <T>(source: ReleaseSource, path: string): Promise<T> => {
  const res = await fetch(`${GITHUB_API}/repos/${repoKey(source)}${path}`);
  if (!res.ok) {
    throw new Error(`GitHub API error for ${source.repo}: ${res.status}`);
  }
  return res.json() as Promise<T>;
};

/** Maps a raw GitHub release onto a changelog entry. */
const fromRelease = (
  source: ReleaseSource,
  release: RawGithubRelease,
): GithubRelease => ({
  id: String(release.id),
  product: source.product,
  version: release.tag_name || release.name || 'Untitled release',
  date: release.published_at ?? release.created_at,
  body: release.body ?? '',
  url: release.html_url,
  prerelease: release.prerelease,
});

/** Fetches one page of a repo's GitHub releases, newest first. */
const fetchReleasesPage = async (
  source: ReleaseSource,
  page: number,
  perPage: number,
): Promise<{ releases: GithubRelease[]; hasMore: boolean }> => {
  const raw = await getJson<RawGithubRelease[]>(
    source,
    `/releases?page=${page}&per_page=${perPage}`,
  );
  const releases = raw
    .filter((release) => !release.draft)
    .map((release) => fromRelease(source, release));
  return { releases, hasMore: raw.length === perPage };
};

/**
 * Per-repo caches for tag-sourced history. Paging through the changelog asks
 * for the same tag list and release lookup on every batch, and the anonymous
 * GitHub API allows only 60 requests an hour, so each is fetched once per
 * page load. A failed fetch is evicted so a later "Load more" can retry.
 */
const tagListCache = new Map<string, Promise<RawGithubTag[]>>();
const releaseByTagCache = new Map<
  string,
  Promise<Map<string, RawGithubRelease>>
>();

const cached = <T>(
  cache: Map<string, Promise<T>>,
  key: string,
  load: () => Promise<T>,
): Promise<T> => {
  const hit = cache.get(key);
  if (hit) return hit;
  const pending = load().catch((error: unknown) => {
    cache.delete(key);
    throw error;
  });
  cache.set(key, pending);
  return pending;
};

/** Orders two version tags newest first, by semver rather than by name. */
const compareVersionTagsDesc = (a: string, b: string): number => {
  const pa = a.match(VERSION_TAG_PATTERN)!.slice(1, 4).map(Number);
  const pb = b.match(VERSION_TAG_PATTERN)!.slice(1, 4).map(Number);
  for (let i = 0; i < 3; i += 1) {
    if (pa[i] !== pb[i]) return pb[i] - pa[i];
  }
  return b.localeCompare(a);
};

/**
 * Every version tag in a repo, newest first. GitHub's tag listing is not
 * reliably version-ordered (v1.10.0 can land before v1.9.0), so the whole
 * list is read and sorted here before any paging happens.
 */
const loadVersionTags = (source: ReleaseSource): Promise<RawGithubTag[]> =>
  cached(tagListCache, repoKey(source), async () => {
    const tags: RawGithubTag[] = [];
    for (let page = 1; ; page += 1) {
      const batch = await getJson<RawGithubTag[]>(
        source,
        `/tags?page=${page}&per_page=${MAX_PER_PAGE}`,
      );
      tags.push(...batch);
      if (batch.length < MAX_PER_PAGE) break;
    }
    return tags
      .filter((tag) => VERSION_TAG_PATTERN.test(tag.name))
      .sort((a, b) => compareVersionTagsDesc(a.name, b.name));
  });

/** The repo's published (non-draft) releases, keyed by tag name. */
const loadReleasesByTag = (
  source: ReleaseSource,
): Promise<Map<string, RawGithubRelease>> =>
  cached(releaseByTagCache, repoKey(source), async () => {
    const raw = await getJson<RawGithubRelease[]>(
      source,
      `/releases?per_page=${MAX_PER_PAGE}`,
    );
    return new Map(
      raw
        .filter((release) => !release.draft)
        .map((release) => [release.tag_name, release]),
    );
  });

/**
 * Turns the commits a tag shipped into note lines. Release-bump commits and
 * branch merges are dropped; a merged pull request contributes its title
 * (the first line after GitHub's "Merge pull request #n" subject).
 */
const notesFromCommits = (commits: RawGithubCommit[]): string =>
  commits
    .map(({ commit }) => {
      const [subject = '', ...rest] = commit.message.split(/\r?\n/);
      if (MERGE_PR_SUBJECT_PATTERN.test(subject)) {
        return rest.map((line) => line.trim()).find(Boolean) ?? '';
      }
      return NOISE_SUBJECT_PATTERN.test(subject) ? '' : subject.trim();
    })
    .filter(Boolean)
    .map((line) => `- ${line}`)
    .join('\n');

const commitDate = (commit: RawGithubCommit): string =>
  commit.commit.committer?.date ?? commit.commit.author?.date ?? '';

/**
 * Builds the changelog entry for one pushed tag.
 *
 * If a GitHub release was published for the tag, its notes and date are used
 * as-is. Otherwise the entry is assembled from the commits between the
 * previous version tag and this one, dated by the tagged commit.
 */
const entryForTag = async (
  source: ReleaseSource,
  tag: RawGithubTag,
  previous: RawGithubTag | undefined,
  releasesByTag: Map<string, RawGithubRelease>,
): Promise<GithubRelease> => {
  const release = releasesByTag.get(tag.name);
  if (release) return fromRelease(source, release);

  const base = {
    id: `${repoKey(source)}@${tag.name}`,
    product: source.product,
    version: tag.name,
    prerelease: false,
  };

  if (!previous) {
    const commit = await getJson<RawGithubCommit>(
      source,
      `/commits/${tag.commit.sha}`,
    );
    return {
      ...base,
      date: commitDate(commit),
      body: '',
      url: `${GITHUB_WEB}/${repoKey(source)}/tree/${encodeURIComponent(tag.name)}`,
    };
  }

  const range = `${encodeURIComponent(previous.name)}...${encodeURIComponent(tag.name)}`;
  const { commits } = await getJson<RawGithubCompare>(
    source,
    `/compare/${range}`,
  );
  const tagged = commits[commits.length - 1];
  return {
    ...base,
    date: tagged ? commitDate(tagged) : '',
    body: notesFromCommits(commits),
    url: `${GITHUB_WEB}/${repoKey(source)}/compare/${range}`,
  };
};

/**
 * Fetches one page of a repo's history as pushed version tags, newest first.
 *
 * Used for native apps: a store build ships when its tag is pushed, so the
 * tag is what the changelog should follow, whether or not anyone published a
 * GitHub release alongside it.
 */
const fetchTagsPage = async (
  source: ReleaseSource,
  page: number,
  perPage: number,
): Promise<{ releases: GithubRelease[]; hasMore: boolean }> => {
  const [tags, releasesByTag] = await Promise.all([
    loadVersionTags(source),
    loadReleasesByTag(source),
  ]);
  const start = (page - 1) * perPage;
  const slice = tags.slice(start, start + perPage);
  const releases = await Promise.all(
    slice.map((tag, i) =>
      entryForTag(source, tag, tags[start + i + 1], releasesByTag),
    ),
  );
  return { releases, hasMore: start + perPage < tags.length };
};

/** Fetches one page of a source's changelog entries, newest first. */
const fetchReleasePage = (
  source: ReleaseSource,
  page: number,
  perPage: number,
): Promise<{ releases: GithubRelease[]; hasMore: boolean }> =>
  source.kind === 'tags'
    ? fetchTagsPage(source, page, perPage)
    : fetchReleasesPage(source, page, perPage);

export { RELEASE_SOURCES, fetchReleasePage };
export type { GithubRelease, ReleaseSource };
