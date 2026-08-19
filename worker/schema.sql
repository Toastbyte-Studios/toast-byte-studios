-- D1 database schema for toast-email-signups
--
-- Apply to a database created with `wrangler d1 create`:
--   npx wrangler d1 execute toast-email-signups --remote --file=./schema.sql
--   npx wrangler d1 execute toast-email-signups --local  --file=./schema.sql
--
-- The Worker inserts only `email`; `id` and `signed_up_at` populate themselves.
-- The UNIQUE constraint is load-bearing: index.ts catches the resulting
-- "UNIQUE constraint failed" error and returns a duplicate response rather
-- than a 500, so a repeat signup is handled gracefully.

CREATE TABLE IF NOT EXISTS email_signups (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  email        TEXT    NOT NULL UNIQUE,
  signed_up_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
