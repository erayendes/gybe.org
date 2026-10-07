const sourceUrl = "https://cstrecords.com/pages/live";
const expected = [
  {
    artist: "Godspeed You! Black Emperor",
    date: "21 Nov 2026",
    city: "Buenos Aires",
  },
  {
    artist: "Godspeed You! Black Emperor",
    date: "23 Nov 2026",
    city: "São Paulo",
  },
  {
    artist: "Godspeed You! Black Emperor",
    date: "24 Nov 2026",
    city: "Paulo",
  },
  {
    artist: "Godspeed You! Black Emperor",
    date: "26 Nov 2026",
    city: "Santiago",
  },
  {
    artist: "Godspeed You! Black Emperor",
    date: "21 Feb 2027",
    city: "Quebec City",
  },
  {
    artist: "Godspeed You! Black Emperor",
    date: "26 Feb 2027",
    city: "Toronto",
  },
  {
    artist: "Godspeed You! Black Emperor",
    date: "27 Feb 2027",
    city: "Toronto",
  },
];

const response = await fetch(sourceUrl, {
  headers: {
    "user-agent": "gybe.org static archive monitor",
  },
});

if (!response.ok) {
  console.error(`Could not fetch ${sourceUrl}: ${response.status}`);
  process.exit(1);
}

const html = await response.text();
const compact = html.replace(/\s+/g, " ");
const missing = expected.filter((show) => {
  return !compact.includes(show.artist) || !compact.includes(show.date) || !compact.includes(show.city);
});

if (missing.length > 0) {
  console.log("LIVE_SOURCE_CHANGED=1");
  console.log(`source=${sourceUrl}`);
  console.log(`missing=${JSON.stringify(missing)}`);
  process.exit(2);
}

console.log("LIVE_SOURCE_CHANGED=0");
console.log(`source=${sourceUrl}`);
