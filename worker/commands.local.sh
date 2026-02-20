#!/bin/bash
# Local reference — not committed (matched by *.local in .gitignore)

# List all email signups newest first
npx wrangler d1 execute toast-email-signups --remote --command "SELECT * FROM email_signups ORDER BY rowid DESC"

# Count total signups
# npx wrangler d1 execute toast-email-signups --remote --command "SELECT COUNT(*) FROM email_signups"

# Export emails as a plain list
# npx wrangler d1 execute toast-email-signups --remote --command "SELECT email FROM email_signups ORDER BY rowid DESC"
