import { albums } from "../data/albums";
import { crossingPaths } from "../data/crossingPaths";
import { members } from "../data/members";
import { shows } from "../data/shows";

const site = "https://gybe.org";

export const prerender = true;

function section(title: string, lines: string[]) {
  return [`## ${title}`, "", ...lines, ""].join("\n");
}

export function GET() {
  const albumLines = albums.flatMap((album) => [
    `### ${album.title} (${album.year})`,
    "",
    `- URL: ${site}/disco/${album.slug}/`,
    `- Type: ${album.kind}`,
    `- Label: ${album.label}`,
    `- Summary: ${album.summary}`,
    `- Tracks: ${album.tracks.join("; ")}`,
    ...album.notes.map((note) => `- Note: ${note}`),
    ...Object.entries(album.links ?? {})
      .filter(([, url]) => Boolean(url))
      .map(([label, url]) => `- Link (${label}): ${url}`),
    "",
  ]);

  const memberLines = (["current", "former"] as const).flatMap((status) => [
    `### ${status === "current" ? "Current" : "Former"} members`,
    "",
    ...members
      .filter((member) => member.status === status)
      .map((member) => {
        const related = crossingPaths.filter((item) => item.members.includes(member.slug));
        const projects = related.length > 0 ? ` Related projects: ${related.map((item) => item.title).join(", ")}.` : "";
        return `- ${member.name} (${member.role}; ${member.years}): ${member.summary}${projects} ${site}/members/${member.slug}/`;
      }),
    "",
  ]);

  const showLines = shows.dates.length > 0
    ? shows.dates.map((show) => `- ${show.date}: ${show.city}, ${show.country} at ${show.venue}${show.soldOut ? " (sold out)" : ""}. Tickets/source: ${show.ticketUrl}`)
    : ["- No upcoming dates listed."];

  const pathLines = crossingPaths.flatMap((item) => [
    `### ${item.title}`,
    "",
    `- URL: ${site}/crossing-paths/${item.slug}/`,
    `- Connection: ${item.relation}`,
    `- Summary: ${item.summary}`,
    ...(item.discography?.length ? [`- Records: ${item.discography.join("; ")}`] : []),
    ...(item.shows?.dates ?? []).map((show) => `- Upcoming show: ${show.date}: ${show.city}, ${show.country} at ${show.venue}${show.soldOut ? " (sold out)" : ""}. Tickets/source: ${show.ticketUrl}`),
    "",
  ]);

  const body = [
    "# gybe.org (full text)",
    "",
    "> Unofficial, non-commercial fan archive for Godspeed You! Black Emperor, maintained by Eray Endes. Not affiliated with the band, Constellation, Kranky, or any rights holder. No lyrics are hosted.",
    "",
    `Generated from the site data. Live dates last checked: ${shows.lastChecked}. Short index: ${site}/llms.txt`,
    "",
    section("About the band", [
      "Godspeed You! Black Emperor (GY!BE) is an instrumental post-rock collective from Montreal, Canada, formed in 1994 by Efrim Menuck, Mike Moya, and Mauro Pezzente. The band went on hiatus in 2003, returned in 2010, and releases its records through Constellation.",
      "",
      "The name comes from Mitsuo Yanagimachi's 1976 Japanese documentary God Speed You! Black Emperor, about a Bosozoku motorcycle gang.",
      "",
      `More: ${site}/about/`,
    ]),
    section("Discography", albumLines),
    section("Members", memberLines),
    section(`Upcoming shows (source: ${shows.source}, ${shows.sourceUrl})`, showLines),
    section("Crossing paths (side projects and related artists)", pathLines),
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
