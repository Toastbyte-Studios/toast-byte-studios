import type { JSX } from 'react';
import { RELEASES } from '../../data/catalog';
import { PageTitle, BackLink } from '../../styles/primitives';
import {
  Main,
  Intro,
  Entry,
  EntryDate,
  EntryHeading,
  EntryProduct,
  EntryVersion,
  EntryBody,
} from './styles';

/**
 * Changelog renders release notes across the whole portfolio, newest first.
 *
 * @component
 * @returns {JSX.Element} The rendered changelog view.
 */
const Changelog: React.FC = (): JSX.Element => {
  return (
    <Main id="main">
      <BackLink href="#/">← Toastbyte Studios</BackLink>
      <PageTitle>Changelog</PageTitle>
      <Intro>Releases across the portfolio, newest first.</Intro>
      {RELEASES.map((release) => (
        <Entry key={`${release.product}-${release.version}`}>
          <EntryDate>{release.date}</EntryDate>
          <div>
            <EntryHeading>
              <EntryProduct>{release.product}</EntryProduct>
              <EntryVersion>{release.version}</EntryVersion>
            </EntryHeading>
            <EntryBody>{release.body}</EntryBody>
          </div>
        </Entry>
      ))}
    </Main>
  );
};

export default Changelog;
