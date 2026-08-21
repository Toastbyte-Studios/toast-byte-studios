import type { JSX } from 'react';
import { PageTitle, BackLink } from '../../styles/primitives';
import { useChangelog } from './useChangelog';
import { formatReleaseNotes } from './formatReleaseNotes';
import {
  Main,
  Intro,
  Entry,
  EntryDate,
  EntryHeading,
  EntryProduct,
  EntryVersion,
  EntryBody,
  EntryNotes,
  EntryLink,
  StateMessage,
  LoadMoreRow,
  LoadMoreButton,
} from './styles';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

/**
 * Changelog renders release notes across the whole portfolio, newest first,
 * pulled live from each product repo's GitHub releases — and from this site's
 * own — revealed a page at a time.
 *
 * @component
 * @returns {JSX.Element} The rendered changelog view.
 */
const Changelog: React.FC = (): JSX.Element => {
  const { releases, loading, loadingMore, error, hasMore, showMore } =
    useChangelog();

  return (
    <Main id="main">
      <BackLink href="#/">← Toastbyte Studios</BackLink>
      <PageTitle>Changelog</PageTitle>
      <Intro>Releases across the portfolio and this site, newest first.</Intro>

      {loading && <StateMessage>Loading releases…</StateMessage>}

      {!loading && error && releases.length === 0 && (
        <StateMessage>
          Couldn&apos;t load releases right now — try refreshing.
        </StateMessage>
      )}

      {!loading && !error && releases.length === 0 && (
        <StateMessage>No releases yet.</StateMessage>
      )}

      {releases.map((release) => {
        const notes = formatReleaseNotes(release.body);
        return (
          <Entry key={release.id}>
            <EntryDate>{formatDate(release.date)}</EntryDate>
            <div>
              <EntryHeading>
                <EntryProduct>{release.product}</EntryProduct>
                <EntryVersion>
                  {release.version}
                  {release.prerelease ? ' · pre-release' : ''}
                </EntryVersion>
              </EntryHeading>
              {notes.length > 0 ? (
                <EntryNotes>
                  {notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </EntryNotes>
              ) : (
                <EntryBody>No release notes provided.</EntryBody>
              )}
              <EntryLink href={release.url} target="_blank" rel="noreferrer">
                View on GitHub ↗
              </EntryLink>
            </div>
          </Entry>
        );
      })}

      {!loading && hasMore && (
        <LoadMoreRow>
          <LoadMoreButton onClick={showMore} disabled={loadingMore}>
            {loadingMore ? 'Loading…' : 'Load more'}
          </LoadMoreButton>
        </LoadMoreRow>
      )}
    </Main>
  );
};

export default Changelog;
