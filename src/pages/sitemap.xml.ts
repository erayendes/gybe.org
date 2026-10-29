import { albums } from "../data/albums";
import { crossingPaths } from "../data/crossingPaths";
import { members } from "../data/members";
import { gitLastmod } from "../lib/gitLastmod.mjs";

const site = "https://gybe.org";

export const prerender = true;

type SitemapPage = {
  path: string;
  priority: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  lastmod?: string;
  images?: string[];
};

// lastmod is the date of the last commit touching a page's template or the data it renders,
// so Google only sees a new date when the page really changed.
const data = {
  albums: "src/data/albums.ts",
  band: "src/data/band.ts",
  members: "src/data/members.ts",
  crossingPaths: "src/data/crossingPaths.ts",
  projectShows: "src/data/projectShows.json",
  shows: "src/data/shows.ts",
};

const page = (path: string, priority: string, changefreq: SitemapPage["changefreq"], files: string[], images?: string[]): SitemapPage => ({
  path,
  priority,
  changefreq,
  lastmod: gitLastmod(files),
  images,
});

const staticPages: SitemapPage[] = [
  page("/", "1.0", "weekly", ["src/pages/index.astro", data.albums, data.members, data.crossingPaths, data.shows], ["/images/site/live-stage.jpg"]),
  page("/about/", "0.8", "monthly", ["src/pages/about.astro", data.albums, data.band, data.members, data.shows]),
  page("/disco/", "0.9", "monthly", ["src/pages/disco/index.astro", data.albums]),
  page("/shows/", "0.8", "weekly", ["src/pages/shows.astro", data.band, data.shows]),
  page("/members/", "0.8", "monthly", ["src/pages/members/index.astro", data.members, data.crossingPaths]),
  page("/crossing-paths/", "0.8", "monthly", ["src/pages/crossing-paths/index.astro", data.crossingPaths, data.members]),
  page("/contact/", "0.5", "yearly", ["src/pages/contact.astro"]),
];

const albumFiles = ["src/pages/disco/[slug].astro", "src/components/AlbumEmbed.astro", data.albums, data.band];
const memberFiles = ["src/pages/members/[slug].astro", data.members, data.crossingPaths, data.band];
const crossingPathFiles = ["src/pages/crossing-paths/[slug].astro", data.crossingPaths, data.projectShows, data.members];

const dynamicPages: SitemapPage[] = [
  ...albums.map((album) => page(`/disco/${album.slug}/`, "0.7", "yearly", albumFiles, [album.image])),
  ...members.map((member) => page(`/members/${member.slug}/`, "0.6", "yearly", memberFiles)),
  ...crossingPaths.map((item) => page(`/crossing-paths/${item.slug}/`, "0.6", "yearly", crossingPathFiles)),
];

const pages: SitemapPage[] = [...staticPages, ...dynamicPages];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map((page) => {
    const loc = `${site}${page.path}`;
    const lastmod = page.lastmod ? `\n    <lastmod>${escapeXml(page.lastmod)}</lastmod>` : "";
    const images = (page.images ?? [])
      .map((image) => `\n    <image:image>\n      <image:loc>${escapeXml(`${site}${image}`)}</image:loc>\n    </image:image>`)
      .join("");

    return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmod}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${images}
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
