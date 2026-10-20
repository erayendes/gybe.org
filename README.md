# gybe.org

Static, English-language, non-commercial fan archive for Godspeed You! Black Emperor.

## Sections

- `/about`
- `/disco`
- `/disco/[album-slug]`
- `/shows`
- `/members`
- `/members/[member-slug]`
- `/crossing-paths`
- `/crossing-paths/[slug]`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Show Updates

`src/data/shows.ts` is checked weekly against Constellation's live page and published automatically.

The planned free automation is included in `.github/workflows/check-live-source.yml`: it runs weekly and opens an issue when the official source appears to change.

## Project Show Updates

Live dates for side projects live in `src/data/projectShows.json`; `npm run update:project-shows` refreshes them from Constellation Live (and thisquietarmy.com for Some Became Hollow Tubes). It adds new dates, drops dates the source no longer lists, prunes past dates, and keeps hand-edited venue or ticket details for dates that are still listed.

The file is only rewritten when a date was added or removed. The script prints one `added`/`removed` line per change and `CHANGES=<n>`. It exits 2 with `REVIEW_NEEDED=1` when a source cannot be read (that source's projects are left untouched; a Cloudflare check page counts as unreadable) or when Constellation lists a billing that names a GY!BE member but matches no project. Fix the latter by adding the billing to a project's `match` list, or to `ignoreHeadings`.

A weekly Claude Code routine runs the script together with the GY!BE date check, builds and tests the site, pushes to `main` only when something changed, confirms the deploy, and submits IndexNow. `.github/workflows/update-project-shows.yml` remains as a manual fallback.

## IndexNow

`.github/workflows/indexnow.yml` submits every sitemap URL to IndexNow after each successful Vercel production deployment. It can also be run manually from the Actions tab.
