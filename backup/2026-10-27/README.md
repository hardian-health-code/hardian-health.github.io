# Rollback copies, 27 Oct 2026

Snapshots of what www.hardianhealth.com was loading before the Insights author fix.

- `style.css`: the stylesheet served from hardian-health-github-io.pages.dev (this repo's `master` at the time).
- `header.js`: the script loaded from the old repo via
  `cdn.jsdelivr.net/gh/hardian-health/hardian-health.github.io@master/header.js`.
  It matched this repo's `header.js` at the time.

To roll back, point the Squarespace header code injection at
`https://hardian-health-github-io.pages.dev/backup/2026-10-27/style.css` and/or `.../header.js`.
