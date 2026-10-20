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

Live dates for side projects live in `src/data/projectShows.json`. `.github/workflows/update-project-shows.yml` runs `npm run update:project-shows` every Monday. It reads Constellation Live (and thisquietarmy.com for Some Became Hollow Tubes), adds new dates, drops dates the source no longer lists, prunes past dates, and commits the change after a passing build, which triggers a redeploy. Hand-edited venue or ticket details are kept for dates that are still listed.

It opens a "Review project live dates" issue when a source cannot be read or Constellation lists a billing that names a GY!BE member but matches no project. Fix that by adding the billing to a project's `match` list, or to `ignoreHeadings`.

## IndexNow

`.github/workflows/indexnow.yml` submits every sitemap URL to IndexNow after each successful Vercel production deployment. It can also be run manually from the Actions tab.
