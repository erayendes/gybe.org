export const band = {
  "@type": "MusicGroup",
  "@id": "https://gybe.org/about/#band",
  name: "Godspeed You! Black Emperor",
  alternateName: ["GY!BE", "Godspeed You Black Emperor!", "Godspeed"],
  sameAs: [
    "https://en.wikipedia.org/wiki/Godspeed_You!_Black_Emperor",
    "https://www.wikidata.org/wiki/Q181341",
    "https://musicbrainz.org/artist/3648db01-b29d-4ab9-835c-83f6a5068fe4",
    "https://godspeedyoublackemperor.bandcamp.com/",
    "https://cstrecords.com/en-int/pages/artist/godspeed-you-black-emperor",
  ],
};

export const bandRef = {
  "@type": "MusicGroup",
  "@id": band["@id"],
  name: band.name,
};
