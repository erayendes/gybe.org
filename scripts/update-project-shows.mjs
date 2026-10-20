// Refreshes src/data/projectShows.json from each project's live-date source.
// Adds new dates, drops dates the source no longer lists, prunes past dates, and
// keeps hand-edited venue/ticket details for dates that are still listed.
// Prints REVIEW_NEEDED=1 and exits 2 when something needs a human look.
import { readFile, writeFile } from "node:fs/promises";

const dataUrl = new URL("../src/data/projectShows.json", import.meta.url);
const membersUrl = new URL("../src/data/members.ts", import.meta.url);
const today = process.env.TODAY ?? new Date().toISOString().slice(0, 10);
const headers = {
  "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36",
  accept: "text/html,application/xhtml+xml",
  "accept-language": "en-US,en;q=0.9",
};

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const provinces = new Set(["AB", "BC", "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"]);
// "DE" is left out on purpose: Constellation uses it for Germany.
const states = new Set("AL AK AZ AR CA CO CT DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(" "));
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

const review = [];

const decode = (text) =>
  text
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&#x27;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalize = (text) => decode(text).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");

const acronyms = new Set(["DJ", "MC", "TBA", "TBC"]);
const smallWords = new Set(["and", "de", "del", "des", "du", "et", "la", "le", "les", "of", "the"]);

// Sources that shout in capitals: "CASA DEL POPOLO" -> "Casa del Popolo"; one-word names like "CEM" stay as written.
function titleCase(text, { keepSingleWord = false } = {}) {
  if (text !== text.toUpperCase()) return text;
  return text.replace(/\p{L}+/gu, (word, offset) => {
    const lower = word.toLowerCase();
    if (smallWords.has(lower) && offset > 0) return lower;
    if (acronyms.has(word) || (keepSingleWord && !/\s/.test(text.trim()))) return word;
    return lower[0].toUpperCase() + lower.slice(1);
  });
}

// Drop preview/session tokens that sometimes leak into source links.
function cleanUrl(url) {
  if (!url) return undefined;
  const parsed = new URL(url.replace(/&amp;/g, "&"));
  if (/token|preview/i.test(parsed.search)) parsed.search = "";
  return parsed.toString();
}

function parseDate(text) {
  const clean = text.trim().toLowerCase();
  let match = clean.match(/^(\d{1,2}) ([a-z]{3})[a-z]* (\d{4})$/);
  if (match) return isoDate(match[3], match[2], match[1]);
  match = clean.match(/^([a-z]{3})[a-z]* (\d{1,2}),? (\d{4})$/);
  if (match) return isoDate(match[3], match[1], match[2]);
  return undefined;
}

function isoDate(year, month, day) {
  const index = months.indexOf(month);
  if (index < 0) return undefined;
  return `${year}-${String(index + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function displayDate(iso) {
  const [year, month, day] = iso.split("-");
  const name = months[Number(month) - 1];
  return `${Number(day)} ${name[0].toUpperCase()}${name.slice(1)} ${year}`;
}

function splitPlace(place) {
  const parts = place.split(",").map((part) => part.trim());
  const region = parts.length > 1 ? parts.at(-1) : "";
  if (provinces.has(region)) return { city: place, country: "Canada" };
  if (states.has(region)) return { city: place, country: "USA" };
  if (/^[A-Z]{2}$/.test(region)) {
    const country = regionNames.of(region);
    if (country && country !== region) return { city: parts.slice(0, -1).join(", "), country };
  }
  if (parts.length > 1) return { city: parts.slice(0, -1).join(", "), country: region };
  return { city: place, country: "" };
}

async function fetchPage(url) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const response = await fetch(url, { headers });
    if (response.ok) return response.text();
    if (attempt === 3) throw new Error(`${url} returned ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, attempt * 30_000));
  }
}

// Constellation Live groups dates under one heading per billed artist.
function parseConstellation(html) {
  const sections = [];
  const sectionPattern = /<h2 class="cst-live-dates__artist-heading">([\s\S]*?)<\/h2>\s*<table[^>]*>([\s\S]*?)<\/table>/g;
  for (const [, heading, table] of html.matchAll(sectionPattern)) {
    const rows = [];
    for (const [, row] of table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)) {
      const cells = [...row.matchAll(/<td>([\s\S]*?)<\/td>/g)].map((cell) => cell[1]);
      if (cells.length < 3) continue;
      const date = parseDate(decode(cells[0]));
      if (!date) continue;
      rows.push({ date, place: decode(cells[1]), venue: decode(cells[2]), url: cells[2].match(/href="([^"]+)"/)?.[1] });
    }
    sections.push({ heading: decode(heading), rows });
  }
  return sections;
}

// thisquietarmy.com lists every act Eric Quach plays in, one table row per date.
function parseThisquietarmy(html) {
  const sections = new Map();
  for (const [, row] of html.matchAll(/<tr>([\s\S]*?)<\/tr>/g)) {
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((cell) => cell[1]);
    if (cells.length < 6) continue;
    const date = parseDate(decode(cells[0]));
    if (!date) continue;
    const billing = decode(cells[3]);
    const heading = billing.split(/\s+w\/\s+/i)[0];
    const guests = billing.slice(heading.length).replace(/^\s*w\/\s*/i, "");
    const venue = titleCase(decode(cells[2]), { keepSingleWord: true }) + (guests ? ` (with ${titleCase(guests)})` : "");
    if (!sections.has(heading)) sections.set(heading, { heading, rows: [] });
    const place = decode(cells[1]).replace(/^(.*?)(,\s*[A-Z]{2})?$/, (_, city, region = "") => titleCase(city) + region);
    sections.get(heading).rows.push({ date, place, venue, url: cells[5].match(/href="([^"]+)"/)?.[1] });
  }
  return [...sections.values()];
}

const parsers = { constellation: parseConstellation, thisquietarmy: parseThisquietarmy };

function matchSections(sections, projects) {
  const assigned = new Map();
  const unmatched = [];
  for (const section of sections) {
    const key = normalize(section.heading);
    const exact = projects.find(([, project]) => project.match.some((name) => normalize(name) === key));
    const prefix = exact ?? projects.find(([, project]) =>
      project.match.some((name) => key.startsWith(`${normalize(name)}and`) || key.startsWith(`${normalize(name)}with`)),
    );
    if (prefix) {
      if (!assigned.has(prefix[0])) assigned.set(prefix[0], []);
      assigned.get(prefix[0]).push(section);
    } else {
      unmatched.push(section);
    }
  }
  return { assigned, unmatched };
}

function buildDates(project, title, sections) {
  const existing = new Map(project.dates.map((show) => [show.date, show]));
  const dates = [];
  for (const section of sections) {
    for (const row of section.rows) {
      if (row.date < today) continue;
      const kept = existing.get(row.date);
      if (kept) {
        dates.push(kept);
        continue;
      }
      const billedAs = normalize(section.heading) === normalize(title) ? "" : ` (billed as ${section.heading})`;
      dates.push({
        date: row.date,
        displayDate: displayDate(row.date),
        ...splitPlace(row.place),
        venue: `${row.venue}${billedAs}`,
        ticketUrl: cleanUrl(row.url) ?? project.sourceUrl,
      });
    }
  }
  return dates.sort((a, b) => a.date.localeCompare(b.date));
}

const data = JSON.parse(await readFile(dataUrl, "utf8"));
const titles = Object.fromEntries(
  [...(await readFile(new URL("../src/data/crossingPaths.ts", import.meta.url), "utf8")).matchAll(/slug: "([^"]+)",\n\s+members: \[[^\]]*\],\n\s+title: "((?:[^"\\]|\\.)*)"/g)]
    .map(([, slug, title]) => [slug, title.replace(/\\"/g, '"')]),
);
const memberNames = [...(await readFile(membersUrl, "utf8")).matchAll(/^\s+name: "([^"]+)"/gm)].map((match) => match[1].split(" "));
const ignored = new Set(data.ignoreHeadings.map(normalize));

const bySource = new Map();
for (const entry of Object.entries(data.projects)) {
  const key = `${entry[1].parser} ${entry[1].sourceUrl}`;
  if (!bySource.has(key)) bySource.set(key, []);
  bySource.get(key).push(entry);
}

for (const projects of bySource.values()) {
  const { parser, sourceUrl } = projects[0][1];
  let sections;
  try {
    sections = parsers[parser](await fetchPage(sourceUrl));
  } catch (error) {
    review.push(`Could not read ${sourceUrl}: ${error.message}. Dates for ${projects.map(([slug]) => slug).join(", ")} were only pruned.`);
  }
  if (sections && sections.length === 0) {
    review.push(`No dates could be parsed from ${sourceUrl}; the page layout may have changed. Dates were only pruned.`);
    sections = undefined;
  }

  const { assigned, unmatched } = sections ? matchSections(sections, projects) : { assigned: new Map(), unmatched: [] };
  for (const [slug, project] of projects) {
    const before = JSON.stringify(project.dates);
    if (sections) {
      project.dates = buildDates(project, titles[slug] ?? slug, assigned.get(slug) ?? []);
      project.lastChecked = today;
    } else {
      project.dates = project.dates.filter((show) => show.date >= today);
    }
    if (JSON.stringify(project.dates) !== before) console.log(`updated ${slug}: ${project.dates.length} upcoming`);
  }

  // Flag new billings that name a GY!BE member but match no tracked project.
  for (const section of unmatched) {
    if (ignored.has(normalize(section.heading))) continue;
    const words = new Set(section.heading.toLowerCase().split(/[^\p{L}\p{N}-]+/u));
    const member = memberNames.find((parts) => parts.length > 1 && parts.every((part) => words.has(part.toLowerCase())));
    if (member && !/godspeed/i.test(section.heading)) {
      review.push(`${sourceUrl} lists "${section.heading}" (${section.rows.length} dates), which names ${member.join(" ")} but matches no tracked project. Add it to a project's "match" list or to "ignoreHeadings" in src/data/projectShows.json.`);
    }
  }
}

await writeFile(dataUrl, `${JSON.stringify(data, null, 2)}\n`);

if (review.length > 0) {
  console.log("REVIEW_NEEDED=1");
  for (const line of review) console.log(`- ${line}`);
  process.exit(2);
}
console.log("REVIEW_NEEDED=0");
