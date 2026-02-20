#!/bin/bash
# Reference script for managing the D1 email signups database.
# For local-only overrides, copy to a file ending in `.local` (e.g. commands.sh.local, matched by *.local in .gitignore).

# List all email signups newest first
npx wrangler d1 execute toast-email-signups --remote --command "SELECT * FROM email_signups ORDER BY rowid DESC"

# Count total signups
# npx wrangler d1 execute toast-email-signups --remote --command "SELECT COUNT(*) FROM email_signups"

# Export emails as a plain list
# npx wrangler d1 execute toast-email-signups --remote --command "SELECT email FROM email_signups ORDER BY rowid DESC"
