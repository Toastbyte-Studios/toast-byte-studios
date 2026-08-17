const HEADING_LINE = /^#{1,6}\s+/;
const FULL_CHANGELOG_LINE = /^\*\*full changelog\*\*/i;
const BULLET_MARKER = /^[*-]\s+/;

/**
 * Reduces a GitHub release body to a flat list of note lines: strips
 * markdown headings, the auto-generated "Full Changelog" compare line (the
 * entry already links out to the release itself), bullet markers and bold
 * markers. Returns an empty array for an empty or note-free body.
 */
const formatReleaseNotes = (body: string): string[] =>
  body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.length > 0 &&
        !HEADING_LINE.test(line) &&
        !FULL_CHANGELOG_LINE.test(line),
    )
    .map((line) => line.replace(BULLET_MARKER, '').replace(/\*\*/g, ''));

export { formatReleaseNotes };
