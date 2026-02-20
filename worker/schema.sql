-- D1 database schema for toast-email-signups
-- Run once to initialise the database:
--   npx wrangler d1 execute toast-email-signups --remote --command "$(cat schema.sql)"

CREATE TABLE IF NOT EXISTS email_signups (
  email TEXT NOT NULL UNIQUE
);
