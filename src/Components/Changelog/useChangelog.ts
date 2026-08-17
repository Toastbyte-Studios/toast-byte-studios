import { useEffect, useRef, useState } from 'react';
import {
  RELEASE_SOURCES,
  fetchReleasePage,
  type GithubRelease,
} from '../../lib/github';

const PAGE_SIZE = 8;
const FETCH_PAGE_SIZE = 10;

interface SourceCursor {
  page: number;
  hasMore: boolean;
}

const sortByDateDesc = (releases: GithubRelease[]) =>
  [...releases].sort((a, b) => (a.date < b.date ? 1 : -1));

/**
 * Loads releases across every product repo, merged newest first, and reveals
 * them a page at a time. Fetches happen in per-repo batches sized well below
 * a full release history, so paging through the list never pulls more than
 * it needs.
 */
const useChangelog = () => {
  const [releases, setReleases] = useState<GithubRelease[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const cursors = useRef<SourceCursor[]>(
    RELEASE_SOURCES.map(() => ({ page: 1, hasMore: true })),
  );
  const didInit = useRef(false);

  const fetchNextBatch = async () => {
    const activeIndices = RELEASE_SOURCES.map((_, i) => i).filter(
      (i) => cursors.current[i].hasMore,
    );

    const results = await Promise.all(
      activeIndices.map((i) =>
        fetchReleasePage(
          RELEASE_SOURCES[i],
          cursors.current[i].page,
          FETCH_PAGE_SIZE,
        ),
      ),
    );

    const fetched: GithubRelease[] = [];
    results.forEach((result, resultIndex) => {
      const sourceIndex = activeIndices[resultIndex];
      cursors.current[sourceIndex] = {
        page: cursors.current[sourceIndex].page + 1,
        hasMore: result.hasMore,
      };
      fetched.push(...result.releases);
    });

    if (fetched.length > 0) {
      setReleases((prev) => sortByDateDesc([...prev, ...fetched]));
    }
  };

  useEffect(() => {
    // Guards against StrictMode's dev-mode double-invoke: without it, two
    // concurrent initial fetches would both read the same starting cursors
    // and append duplicate releases.
    if (didInit.current) return;
    didInit.current = true;

    (async () => {
      try {
        await fetchNextBatch();
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const hasMore =
    visibleCount < releases.length || cursors.current.some((c) => c.hasMore);

  const showMore = async () => {
    const needsFetch =
      visibleCount + PAGE_SIZE > releases.length &&
      cursors.current.some((c) => c.hasMore);

    if (needsFetch) {
      setLoadingMore(true);
      try {
        await fetchNextBatch();
      } catch {
        setError(true);
      } finally {
        setLoadingMore(false);
      }
    }
    setVisibleCount((v) => v + PAGE_SIZE);
  };

  return {
    releases: releases.slice(0, visibleCount),
    loading,
    loadingMore,
    error,
    hasMore,
    showMore,
  };
};

export { useChangelog };
