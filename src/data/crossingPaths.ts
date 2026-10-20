import projectShows from "./projectShows.json";

export type ProjectShow = {
  date: string;
  displayDate: string;
  city: string;
  country: string;
  venue: string;
  ticketUrl: string;
  soldOut?: boolean;
};

export type ProjectShowList = {
  source: string;
  sourceUrl: string;
  lastChecked: string;
  dates: ProjectShow[];
};

export type CrossingPath = {
  slug: string;
  /** Slugs from members.ts; drives the links on member and project pages. */
  members: string[];
  title: string;
  relation: string;
  origin?: string;
  founded?: string;
  active?: string;
  summary: string;
  body: string[];
  discography: string[];
  links: { label: string; url: string }[];
};

/** Live dates for tracked projects, kept in projectShows.json by scripts/update-project-shows.mjs. */
export function showsFor(item: CrossingPath): ProjectShowList | undefined {
  return (projectShows.projects as Record<string, ProjectShowList>)[item.slug];
}

/** Dates still ahead of the build date, so past shows drop off on the next deploy. */
export function upcomingShows(item: CrossingPath, today = new Date().toISOString().slice(0, 10)) {
  return (showsFor(item)?.dates ?? []).filter((show) => show.date >= today);
}

export const crossingPaths: CrossingPath[] = [
  {
    slug: "thee-silver-mt-zion-memorial-orchestra",
    members: ["efrim-menuck", "thierry-amar", "sophie-trudeau"],
    title: "Thee Silver Mt. Zion Memorial Orchestra",
    relation: "Efrim Menuck, Sophie Trudeau, Thierry Amar and others",
    origin: "Montreal, Quebec",
    founded: "1999",
    active: "1999-2014; on hiatus",
    summary: "The most visible GY!BE-adjacent project: more vocal, more openly wounded, and still built from communal crescendos.",
    body: [
      "Thee Silver Mt. Zion Memorial Orchestra, commonly shortened to Silver Mt. Zion, began in Montreal in 1999 as a side project connected directly to Godspeed You! Black Emperor. Efrim Menuck, Sophie Trudeau, and Thierry Amar were among the founding figures.",
      "Where GY!BE often keeps voices buried in field recordings and public fragments, Silver Mt. Zion pushes vocals and lyrics forward. The project makes room for grief, anti-capitalist politics, elegy, family, and collective endurance.",
      "Its records move through chamber rock, folk, punk energy, and long post-rock forms. The changing band name is part of the project history, but the emotional and political vocabulary remains consistent.",
      "Aidan Girt sat in on drums for the 2000 debut, so four of GY!BE's classic-era players appear somewhere in the band's recorded history."
    ],
    discography: [
      "He Has Left Us Alone but Shafts of Light Sometimes Grace the Corner of Our Rooms... (2000)",
      "Born Into Trouble as the Sparks Fly Upward (2001)",
      "This Is Our Punk-Rock, Thee Rusted Satellites Gather + Sing (2003)",
      "Horses in the Sky (2005)",
      "13 Blues for Thirteen Moons (2008)",
      "Kollaps Tradixionales (2010)",
      "Fuck Off Get Free We Pour Light on Everything (2014)"
    ],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/thee-silver-mt-zion-memorial-orchestra" },
      { label: "Bandcamp", url: "https://theesilvermtzion.bandcamp.com/" }
    ]
  },
  {
    slug: "set-fire-to-flames",
    members: ["david-bryant", "mike-moya", "sophie-trudeau", "aidan-girt", "bruce-cawdron", "roger-tellier-craig", "thea-pratt", "jean-sebastian-truchy", "fluffy-erskine"],
    title: "Set Fire to Flames",
    relation: "David Bryant, Mike Moya, Sophie Trudeau, Bruce Cawdron, Roger Tellier-Craig and others",
    origin: "Montreal, Quebec",
    founded: "2001",
    active: "2001-2003; archival releases since",
    summary: "A loose, haunted recording project built from room tone, fragments, and collective improvisation.",
    body: [
      "Set Fire to Flames is a Canadian experimental collective formed in 2001 and closely associated with the Montreal post-rock and avant-garde scene around GY!BE and Silver Mt. Zion. David Bryant conceived and named the project, designed its artwork, and oversaw the editing of the recordings.",
      "The album credits read like a map of GY!BE's classic era: Bryant, Mike Moya, and Roger Tellier-Craig on guitars, Sophie Trudeau on violin, Bruce Cawdron and Aidan Girt on drums, Thea Pratt on French horn, and projectionists Jean-Sebastian Truchy and Fluffy Erskine on bass, saw, and tapes. Rebecca Foon, Gen Heistek, Gordon Krieger, Christof Migone, and Speedy Weaver also took part. Efrim Menuck is not credited.",
      "The project is known for raw, improvisational recordings that blur composition, ambient noise, field recording, and sound art. Its records were shaped by unusual recording environments, including decaying domestic spaces that became part of the sound.",
      "The music often feels less like a conventional band than a document of a room under pressure: creaking floors, distant voices, bowed strings, damaged melodies, and long passages of unease."
    ],
    discography: [
      "Sings Reign Rebuilder (2001)",
      "Telegraphs in Negative / Mouths Trapped in Static (2003)",
      "Barn Levitate (2020, single)"
    ],
    links: [
      { label: "Website", url: "http://setfiretoflames.com/" },
      { label: "Bandcamp", url: "https://setfiretoflames.bandcamp.com/" }
    ]
  },
  {
    slug: "esmerine",
    members: ["bruce-cawdron"],
    title: "Esmerine",
    relation: "Bruce Cawdron and Rebecca Foon",
    origin: "Montreal, Quebec",
    founded: "2002",
    active: "2002-present",
    summary: "A chamber-oriented project connected to the same Montreal experimental network.",
    body: [
      "Esmerine was founded in Montreal in 2002 by percussionist Bruce Cawdron and cellist Rebecca Foon. It sits near the GY!BE constellation through Cawdron's work with Godspeed and Foon's work with Silver Mt. Zion.",
      "The group blends marimba, cello, percussion, strings, and global folk influences into instrumental music that is quieter and more chamber-focused than GY!BE but still emotionally expansive.",
      "Albums such as Dalmak and Lost Voices show the group extending beyond post-rock into Turkish collaborations, minimalism, and acoustic ensemble writing.",
      "Other GY!BE players appear as guests: Thierry Amar and Efrim Menuck on the 2003 debut, Mike Moya on Aurora, Sophie Trudeau on the later albums, and Amar again as recording and mixing engineer on La Lechuza."
    ],
    discography: [
      "If Only a Sweet Surrender to the Nights to Come Be True (2003)",
      "Aurora (2005)",
      "La Lechuza (2011)",
      "Dalmak (2013)",
      "Lost Voices (2015)",
      "Mechanics of Dominion (2017)",
      "Everything Was Forever Until It Was No More (2022)"
    ],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/esmerine" },
      { label: "Website", url: "https://www.esmerine.com/" },
      { label: "Bandcamp", url: "https://esmerine.bandcamp.com/" }
    ]
  },
  {
    slug: "black-ox-orkestar",
    members: ["thierry-amar"],
    title: "Black Ox Orkestar",
    relation: "Thierry Amar",
    origin: "Montreal, Quebec",
    founded: "2000",
    active: "2000-2007, 2021-present",
    summary: "A project drawing from Yiddish, folk, and chamber traditions within the Constellation orbit.",
    body: [
      "Black Ox Orkestar formed in Montreal in 2000 and connects Eastern European Jewish music, Yiddish song, folk, and experimental chamber arrangements.",
      "The project includes musicians tied to Silver Mt. Zion and the broader Constellation scene, including Thierry Amar. Its songs carry themes of displacement, memory, resistance, and cultural continuity.",
      "After early records Ver Tanzt? and Nisht Azoy, the band returned with Everything Returns in 2022. Amar plays bass on all three albums; Constellation now lists Stephane Diamantakiou as the band's bassist."
    ],
    discography: ["Ver Tanzt? (2004)", "Nisht Azoy (2006)", "Everything Returns (2022)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/black-ox-orkestar" },
      { label: "Bandcamp", url: "https://blackoxorkestar.bandcamp.com/" }
    ]
  },
  {
    slug: "hrsta",
    members: ["mike-moya", "sophie-trudeau"],
    title: "Hrsta",
    relation: "Mike Moya",
    summary: "Mike Moya's project, moving through experimental rock, drone, and intimate song forms.",
    body: [
      "Hrsta is Mike Moya's solo and band project, active from the early 2000s. Compared with the scale of GY!BE, Hrsta works in a more intimate register.",
      "The music draws from folk, ambient textures, drone, and experimental rock. Moya's guitar language remains present, but the arrangements leave more space around voice, atmosphere, and fragile melodic shapes.",
      "Sophie Trudeau played in the group around Stem Stem in Electro, and Bruce Cawdron, Norsola Johnson, and Fluffy Erskine appear on the 2001 debut. David Bryant recorded and mixed Ghosts Will Come and Kiss Our Eyes. The project has been dormant since Moya rejoined GY!BE in 2010.",
      "Hrsta belongs in this archive because it makes audible one of the quieter paths out of GY!BE: less monumental, still patient and textural."
    ],
    discography: ["L'Eclat du Ciel Etait Insoutenable (2001)", "Stem Stem in Electro (2005)", "Ghosts Will Come and Kiss Our Eyes (2007)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/hrsta" },
      { label: "Bandcamp", url: "https://hrsta.bandcamp.com/" }
    ]
  },
  {
    slug: "fly-pan-am",
    members: ["roger-tellier-craig", "jean-sebastian-truchy"],
    title: "Fly Pan Am",
    relation: "Roger Tellier-Craig and Jean-Sebastian Truchy",
    origin: "Montreal, Quebec",
    founded: "1996",
    active: "1996-2005, 2018-present",
    summary: "An experimental rock group with a sharper, more fragmented rhythmic vocabulary.",
    body: [
      "Fly Pan Am formed in Montreal in 1996 and became one of the key experimental rock groups on Constellation. Roger Tellier-Craig and bassist Jean-Sebastian Truchy, who also ran projections for GY!BE in the early 2000s, connect the project directly to the classic-era band.",
      "Their music pushes repetition, electronics, noise, and post-rock structures into more fractured and confrontational shapes. The band sits near GY!BE historically, but its vocabulary is more clipped, electric, and rhythmically unstable.",
      "After a long hiatus, Fly Pan Am returned in 2019 with C'est ca and continued with Frontera in 2021."
    ],
    discography: ["Fly Pan Am (1999)", "Sedatif en frequences et sillons (2001)", "Ceux Qui Inventent N'ont Jamais Vecu (2002)", "N'Ecoutez Pas (2004)", "C'est ca (2019)", "Frontera (2021)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/fly-pan-am" },
      { label: "Bandcamp", url: "https://flypanam.bandcamp.com/" }
    ]
  },
  {
    slug: "hangedup",
    members: [],
    title: "Hangedup",
    relation: "Constellation / Montreal experimental network",
    summary: "A viola-and-percussion duo tied to Constellation's heavier chamber-experimental side.",
    body: [
      "Hangedup is a Montreal experimental duo formed by violist Genevieve Heistek and percussionist Eric Craven. It connects to this archive through the same Constellation ecosystem and the broader string/percussion language around GY!BE's early scene.",
      "The duo's sound is minimal, rhythmic, and hypnotic: viola patterns, percussion cycles, drones, and live energy that can feel both chamber-like and physically heavy.",
      "Efrim Menuck recorded and mixed the duo's albums at Hotel2Tango. Hangedup is a useful crossing path because it shows how the Montreal constellation could make intense instrumental music without adopting GY!BE's large-ensemble scale."
    ],
    discography: ["Hangedup (2001)", "Kicker in Tow (2002)", "Clatter for Control (2005)", "Transit of Venus (2012)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/hangedup" },
      { label: "Bandcamp", url: "https://hangedup.bandcamp.com/" }
    ]
  },
  {
    slug: "1-speed-bike",
    members: ["aidan-girt"],
    title: "1-Speed Bike",
    relation: "Aidan Girt",
    summary: "Aidan Girt's electronic and percussion-driven solo project.",
    body: [
      "1-Speed Bike is the solo project of Aidan Girt, drummer of Godspeed You! Black Emperor and Exhaust. It moves away from orchestral post-rock toward raw, politically charged electronic music.",
      "The project uses lo-fi textures, samples, breakbeats, and a deliberately abrasive energy. Its track titles and presentation often sharpen the political edge already present around GY!BE's world.",
      "As a crossing path, 1-Speed Bike documents how a GY!BE percussionist translated rhythmic pressure into a more electronic and sample-based form."
    ],
    discography: ["Droopy Butt Begone! (2000)", "Klootzak Keizer (2001)", "El Gallito (2004)", "Pashto Translator Wanted (2008)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/1-speed-bike" }
    ]
  },
  {
    slug: "sackville",
    members: [],
    title: "Sackville",
    relation: "Montreal scene / Constellation",
    summary: "A Montreal folk-rock node from the same 1990s independent music map.",
    body: [
      "Sackville was a Montreal-based folk-rock band active from the mid-1990s into the early 2000s. Its members included Gabe Levine, Gen Heistek, Harris Newman, Ian Ilavsky, Eric Craven, and Pat Conan; no GY!BE member is credited, so the connection runs through the local scene and Constellation itself, which Ilavsky co-founded.",
      "Compared with GY!BE's scale and volume, Sackville works in a more intimate register: folk-rock forms, understated arrangements, and melancholic songwriting.",
      "The project belongs under crossing paths because it helps map the softer, song-oriented side of the same Montreal period that produced the first GY!BE records."
    ],
    discography: ["These Last Songs (1998)", "The Principles of Science (2001)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/sackville" }
    ]
  },
  {
    slug: "lhasa-de-sela",
    members: [],
    title: "Lhasa de Sela",
    relation: "Montreal scene",
    summary: "A Montreal-based songwriter whose work crossed the same independent music map.",
    body: [
      "Lhasa de Sela was a Mexican-American singer-songwriter based in Montreal for much of her career. Her music drew from Mexican folk, chanson, jazz, and other traditions, carried by a voice that was direct, intimate, and unmistakable.",
      "She is a crossing path rather than a side project: her work sits beside the same Montreal independent community that shaped many Constellation-era collaborations.",
      "Her albums La Llorona, The Living Road, and Lhasa sit outside post-rock, but they belong in this map because they show how porous the Montreal independent scene was across language, folk forms, and experimental practice."
    ],
    discography: ["La Llorona (1997)", "The Living Road (2003)", "Lhasa (2009)"],
    links: [
      { label: "Website", url: "https://lhasadesela.com/" },
      { label: "Bandcamp", url: "https://lhasadesela.bandcamp.com/" }
    ]
  },
  {
    slug: "triple-burner",
    members: ["bruce-cawdron"],
    title: "Triple Burner",
    relation: "Bruce Cawdron and Harris Newman",
    summary: "A small acoustic project where folk instrumentation meets minimalist and experimental guitar language.",
    body: [
      "Triple Burner is a duo project by Bruce Cawdron and guitarist Harris Newman. It connects to this archive through Cawdron, GY!BE's classic-era percussionist, and through the wider Montreal experimental network.",
      "The music is built around acoustic guitar, mandolin, lap steel textures, and restrained improvisational movement. It is much smaller in scale than GY!BE, but shares an interest in patience, texture, and slow development.",
      "As a crossing path, Triple Burner adds an acoustic and folk-minimalist branch to the map."
    ],
    discography: ["Triple Burner (2006)"],
    links: [
      { label: "Website", url: "https://www.harrisnewman.com/tripleburner.html" },
      { label: "Bandcamp", url: "https://harrisnewman.bandcamp.com/album/triple-burner" }
    ]
  },
  {
    slug: "saltland",
    members: [],
    title: "Saltland",
    relation: "Rebecca Foon / Silver Mt. Zion and Esmerine network",
    summary: "Rebecca Foon's solo project, built from cello, voice, electronics, and ecological grief.",
    body: [
      "Saltland is the solo project of Montreal cellist and composer Rebecca Foon, known for her work with Thee Silver Mt. Zion Memorial Orchestra and Esmerine.",
      "The project centers cello, voice, electronics, and slow atmospheric arrangements. Its records often carry ecological and political concerns in a quieter, more intimate form than GY!BE or Silver Mt. Zion.",
      "Bruce Cawdron plays glockenspiel and percussion on the 2013 debut. Saltland belongs here because it extends the chamber side of the Montreal collective into solo composition and environmental lament."
    ],
    discography: ["I Thought It Was Us But It Was All of Us (2013)", "A Common Truth (2017)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/rebecca-foon-saltland" },
      { label: "Bandcamp", url: "https://saltland.bandcamp.com/" }
    ]
  },
  {
    slug: "hiss-tracts",
    members: ["david-bryant", "karl-lemieux"],
    title: "Hiss Tracts",
    relation: "David Bryant",
    summary: "A soundscape-oriented project linked to David Bryant's post-GY!BE work.",
    body: [
      "Hiss Tracts is the collaborative project of David Bryant and Kevin Doria (Growing, Total Life). It grew out of sessions for a 2008 Lausanne Underground Film Festival performance with filmmaker Karl Lemieux, who is credited with 16mm projector sounds and film imagery on Shortwave Nights. It extends Bryant's interest in guitar, tape, field recording, and landscape-like sound into a more explicitly ambient and drone-based form.",
      "The project's music is patient and textured, using layered sound, minimal melodic movement, and a strong sense of place. It sits near GY!BE's atmospheric side while avoiding the full-band crescendo structure.",
      "For this archive, Hiss Tracts is an important post-GY!BE branch because it follows the tape-and-environment thread into its own project."
    ],
    discography: ["Shortwave Nights (2014)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/hiss-tracts" },
      { label: "Bandcamp", url: "https://hisstracts.bandcamp.com/" }
    ]
  },
  {
    slug: "exhaust",
    members: ["aidan-girt"],
    title: "Exhaust",
    relation: "Aidan Girt",
    summary: "A raw experimental trio connected through Aidan Girt and the Montreal underground.",
    body: [
      "Exhaust was a Montreal experimental trio featuring Aidan Girt on drums, Gordon Krieger on bass clarinet, and Mike Zabitsky on tape loops and bass guitar.",
      "The band fused repetition, noise, bass clarinet, tape loops, and blunt rhythmic force. Its sound is grittier and more stripped than GY!BE, but it shares the same interest in texture, pressure, and unconventional ensemble roles.",
      "Exhaust belongs in the archive because it documents the rawer underground context around Girt's percussion work."
    ],
    discography: ["Exhaust (1998)", "Enregistreur (2002)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/exhaust" },
      { label: "Bandcamp", url: "https://exhaustmtl.bandcamp.com/" }
    ]
  },
  {
    slug: "vic-chesnutt",
    members: [],
    title: "Vic Chesnutt",
    relation: "Constellation collaboration context",
    summary: "A songwriter whose late recordings brought Silver Mt. Zion and GY!BE-adjacent musicians into his orbit.",
    body: [
      "Vic Chesnutt was an American singer-songwriter known for stark, vulnerable writing and a singular vocal presence. His connection to this archive comes through Constellation and the Montreal musicians who collaborated with him late in his career.",
      "North Star Deserter and At the Cut were recorded with members of the Silver Mt. Zion and GY!BE orbit, placing Chesnutt's intimate songs inside a larger, darker ensemble sound.",
      "He is not a side project of GY!BE, but his Constellation records are important crossing points between American songwriting and the Montreal collective's arrangement language."
    ],
    discography: ["North Star Deserter (2007)", "At the Cut (2009)", "Skitter on Take-Off (2009)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/vic-chesnutt" }
    ]
  },
  {
    slug: "jerusalem-in-my-heart",
    members: ["karl-lemieux"],
    title: "Jerusalem In My Heart",
    relation: "Karl Lemieux / Constellation and Montreal audiovisual network",
    summary: "A multisensory project from the wider Constellation orbit, led by Radwan Ghazi Moumneh.",
    body: [
      "Jerusalem In My Heart is a multimedia project led by Radwan Ghazi Moumneh, combining Arabic musical traditions, electronics, experimental composition, and live visual work.",
      "The connection to this archive runs through Constellation, Montreal's experimental scene, and Karl Lemieux, who has performed live 16mm projections with Moumneh since 2006. The project treats image and sound as a combined performance language. Moumneh is also a co-owner of Hotel2Tango alongside Efrim Menuck and Thierry Amar.",
      "JIMH expands the map beyond post-rock into Arabic music, contemporary electronics, and audiovisual performance."
    ],
    discography: ["Mo7it Al-Mo7it (2013)", "If He Dies, If If If If If If (2015)", "Daqa'iq Tudaiq (2018)", "Qalaq (2021)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/jerusalem-in-my-heart" },
      { label: "Bandcamp", url: "https://jerusaleminmyheart.bandcamp.com/" }
    ]
  },
  {
    slug: "clues",
    members: [],
    title: "Clues",
    relation: "Constellation / Montreal indie network",
    summary: "A short-lived Montreal indie-rock group from the wider Constellation map.",
    body: [
      "Clues was a Montreal indie-rock band formed in 2007 by Alden Penner and Brendan Reed. It is a wider-scene crossing path rather than a direct GY!BE side project.",
      "The band's self-titled album on Constellation blended jagged rhythms, abrupt structures, and raw melodic fragments. Its short lifespan makes it a small but notable node in the Montreal independent music network.",
      "Clues stays in this archive as a reminder that the GY!BE-adjacent map includes not only post-rock and chamber projects, but also stranger indie-rock offshoots from the same ecosystem."
    ],
    discography: ["Clues (2009)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/clues" },
      { label: "Bandcamp", url: "https://clues.bandcamp.com/" }
    ]
  },
  {
    slug: "efrim-manuel-menuck",
    members: ["efrim-menuck"],
    title: "Efrim Manuel Menuck",
    relation: "Efrim Menuck (solo)",
    origin: "Montreal, Quebec",
    founded: "2011",
    active: "2011-present",
    summary: "Efrim Menuck's solo work: hymn-like songs, drones, and damaged electronics under his full name.",
    body: [
      "Efrim Menuck began releasing solo records as Efrim Manuel Menuck in 2011, the year after GY!BE returned from hiatus. Plays \"High Gospel\" and Pissing Stars came out on Constellation and sit between Silver Mt. Zion's vocal intensity and a more private, home-recorded drone language.",
      "The solo records lean on synthesizers, drum machines, processed voice, and long repeating figures rather than ensemble crescendos. Their politics are close to the surface, but the delivery is quieter and more fragile than in his band work.",
      "Menuck also works across a string of duos and small groups documented separately in this archive, including SING SINCK, SING, ALL HANDS_MAKE LIGHT, BLOOM AND RUIN, and WE ARE WINTER'S BLUE AND RADIANT CHILDREN."
    ],
    discography: [
      "Plays \"High Gospel\" (2011)",
      "Pissing Stars (2018)",
      "Baby It Has To Fall (2020, single)",
      "STARLING TROUBLES SPARROW (2020)"
    ],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/efrim-manuel-menuck" },
      { label: "Bandcamp", url: "https://efrimmanuelmenuck.bandcamp.com/" }
    ]
  },
  {
    slug: "bloom-and-ruin",
    members: ["efrim-menuck"],
    title: "BLOOM AND RUIN",
    relation: "Efrim Menuck with Tashi Dorji",
    founded: "2023",
    active: "2023-present",
    summary: "A duo of Efrim Menuck and guitarist Tashi Dorji, built from drone and fractured improvised guitar.",
    body: [
      "BLOOM AND RUIN is the duo of Efrim Manuel Menuck and Tashi Dorji, the Bhutan-born guitarist based in Asheville, North Carolina. Menuck had already recorded an improvised set with MANAS, Dorji's group with Thom Nguyen, during its 2022 tour with GY!BE; it was released as the cassette At House Unamerican.",
      "Two Liberations was recorded partly live on 11 November 2023 and partly in 2024 and 2025. It sets long drones against Dorji's splintered, percussive guitar playing, closer to free improvisation than to anything in GY!BE's composed long forms.",
      "The duo is booked to present the project at Big Ears Festival in April 2027."
    ],
    discography: ["Two Liberations (2026)"],
    links: [
      { label: "Bandcamp", url: "https://efrimmanuelmenuck.bandcamp.com/album/bloom-and-ruin-two-liberations" }
    ]
  },
  {
    slug: "sing-sinck-sing",
    members: ["efrim-menuck"],
    title: "SING SINCK, SING",
    relation: "Efrim Menuck and Kevin Doria",
    origin: "Montreal, Quebec",
    founded: "2018",
    summary: "Efrim Menuck and Kevin Doria's duo of drones, processed electronics, and distorted voice.",
    body: [
      "SING SINCK, SING is a duo of Efrim Manuel Menuck and Kevin Doria (Growing, Total Life, Hiss Tracts). It began when Doria joined Menuck's live band for the Pissing Stars shows.",
      "The album was recorded in Mexico City and Montreal in autumn 2018. Its pieces combine heavy drones, processed electronics, and distorted vocals; Constellation framed it as an antifascist poetics of sound.",
      "No further releases have followed the 2019 album, which makes it a single, concentrated document of the pairing."
    ],
    discography: ["are SING SINCK, SING (2019)"],
    links: [
      { label: "Bandcamp", url: "https://singsincksing.bandcamp.com/" }
    ]
  },
  {
    slug: "all-hands-make-light",
    members: ["efrim-menuck"],
    title: "ALL HANDS_MAKE LIGHT",
    relation: "Efrim Menuck and Ariel Engle",
    origin: "Montreal, Quebec",
    founded: "2021",
    summary: "A duo pairing Efrim Menuck's electronics with Ariel Engle's voice.",
    body: [
      "ALL HANDS_MAKE LIGHT is the duo of Efrim Manuel Menuck and Ariel Engle, known for La Force and her work with Broken Social Scene and Patrick Watson.",
      "The project started with a self-released cassette in 2021 before Darling The Dawn appeared on Constellation in 2023. Engle's voice sits at the center, set inside Menuck's synthesizers, drones, and slow-building electronic arrangements.",
      "It is one of the more song-focused branches of Menuck's post-reunion work."
    ],
    discography: ["ALL HANDS_MAKE LIGHT (2021, cassette)", "Darling The Dawn (2023)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/all-hands-make-light" },
      { label: "Bandcamp", url: "https://allhandsmakelight.bandcamp.com/" }
    ]
  },
  {
    slug: "we-are-winters-blue-and-radiant-children",
    members: ["efrim-menuck"],
    title: "WE ARE WINTER'S BLUE AND RADIANT CHILDREN",
    relation: "Efrim Menuck with Mat Ball, Jonathan Downs, and Patch One",
    origin: "Montreal, Quebec / Maine",
    founded: "2024",
    summary: "A quartet of heavily distorted, lullaby-like pieces over electronic pulses.",
    body: [
      "WE ARE WINTER'S BLUE AND RADIANT CHILDREN brings Efrim Manuel Menuck together with Mat Ball of BIG|BRAVE and Jonathan Downs and Patch One, both formerly of the Maine band Ada. The connection with Ada began when Menuck recorded the band's 2018 album at Hotel2Tango.",
      "NO MORE APOCALYPSE FATHER, released on Constellation in 2024, pushes melody through heavy distortion and electronic pulse. The pieces often feel like lullabies played through broken equipment.",
      "The project shows how Hotel2Tango's recording work continues to generate new collaborations around GY!BE's members."
    ],
    discography: ["NO MORE APOCALYPSE FATHER (2024)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/we-are-winters-blue-and-radiant-children" }
    ]
  },
  {
    slug: "maica-mia",
    members: ["mauro-pezzente"],
    title: "Maica Mia",
    relation: "Mauro Pezzente",
    origin: "Montreal, Quebec",
    founded: "2009",
    active: "2009-2015",
    summary: "A slow, distorted Montreal band where Mauro Pezzente played bass.",
    body: [
      "Maica Mia was a Montreal band built around guitarist and singer Maica Armata and drummer Jonny Paradise. GY!BE bassist Mauro Pezzente joined around 2013, first in the studio and then live.",
      "The band played slow, distorted, dark songs that sat between post-rock and what it called gloompop. Pezzente plays bass on Des Era.",
      "The band has been on hiatus since 2015. Later Maica Mia releases are credited to Armata without Pezzente."
    ],
    discography: ["Sparcity Blues (2012)", "Des Era (2014)", "Crazy Moon (2016)"],
    links: [
      { label: "Bandcamp", url: "https://maicamia.bandcamp.com/" }
    ]
  },
  {
    slug: "molasses",
    members: ["mike-moya", "thierry-amar", "norsola-johnson", "fluffy-erskine", "jean-sebastian-truchy"],
    title: "Molasses",
    relation: "Mike Moya, Thierry Amar, Norsola Johnson and others",
    origin: "Montreal, Quebec",
    active: "c. 1998-2004",
    summary: "Scott Chernoff's avant-folk ensemble, staffed by a rotating cast from GY!BE's classic era.",
    body: [
      "Molasses was a Montreal avant-folk ensemble led by songwriter Scott Chernoff, with a lineup that changed from record to record.",
      "Its cast drew heavily on GY!BE's classic era: Mike Moya was a core member, and Thierry Amar, Norsola Johnson, Fluffy Erskine, and Jean-Sebastian Truchy are listed among the players, alongside Sam Shalabi and Lisa Gamble.",
      "The records are slow, spare, and devotional, built from acoustic guitar, strings, and room sound. They document the same late-1990s Montreal community that produced GY!BE's first albums, heard at its most hushed."
    ],
    discography: [
      "You'll Never Be Well No More (1999)",
      "Trilogie: Toil & Peaceful Life (2000)",
      "A Slow Messe (2003)",
      "Trouble at Jinx Hotel (2004)"
    ],
    links: []
  },
  {
    slug: "land-of-kush",
    members: ["thierry-amar", "norsola-johnson"],
    title: "Land of Kush",
    relation: "Thierry Amar and Norsola Johnson, in Sam Shalabi's orchestra",
    origin: "Montreal, Quebec",
    summary: "Sam Shalabi's large Montreal orchestra, mixing Arabic music, free jazz, and psychedelia.",
    body: [
      "Land of Kush is the large ensemble assembled by Montreal oud player and composer Sam Shalabi, recording for Constellation.",
      "The orchestra fuses Arabic modes, free jazz, rock, and psychedelic drift. Thierry Amar plays acoustic bass on Against the Day and Monogamy, and Norsola Johnson plays cello on Against the Day.",
      "Land of Kush shows the improvising, large-group side of the Montreal scene around GY!BE and Hotel2Tango."
    ],
    discography: ["Against the Day (2009)", "Monogamy (2010)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/land-of-kush" }
    ]
  },
  {
    slug: "ratchet-orchestra",
    members: ["norsola-johnson", "thea-pratt"],
    title: "Ratchet Orchestra",
    relation: "Norsola Johnson and Thea Pratt",
    origin: "Montreal, Quebec",
    summary: "Nicolas Caloia's free-jazz big band, with two early GY!BE players in its ranks.",
    body: [
      "Ratchet Orchestra is a Montreal free-jazz big band led by bassist and composer Nicolas Caloia.",
      "Former GY!BE cellist Norsola Johnson and early French horn player Thea Pratt have both played in the orchestra.",
      "Its large, loosely organised sound connects GY!BE's early orchestral instincts to Montreal's improvised music community."
    ],
    discography: ["Hemlock (2012)", "Coco Swirl (2019)"],
    links: []
  },
  {
    slug: "craig-pedersen-quartet",
    members: ["thierry-amar"],
    title: "Craig Pedersen Quartet",
    relation: "Thierry Amar",
    origin: "Montreal / Ottawa",
    summary: "Trumpeter Craig Pedersen's jazz quartet, with Thierry Amar on double bass.",
    body: [
      "The Craig Pedersen Quartet is led by trumpeter Craig Pedersen, with Linsey Wellman on alto saxophone and Bennett Bedoukian on drums.",
      "Thierry Amar plays double bass on As Long As There Is Sorrow (2024). The group's earlier album Ghosts (2020) used a different lineup.",
      "The record is a clear example of Amar working as an improvising bassist outside the rock and chamber settings of GY!BE and Silver Mt. Zion."
    ],
    discography: ["As Long As There Is Sorrow (2024)"],
    links: [
      { label: "Bandcamp", url: "https://craigpedersen.bandcamp.com/" }
    ]
  },
  {
    slug: "bliss",
    members: ["david-bryant"],
    title: "Bliss",
    relation: "David Bryant",
    origin: "Montreal, Quebec",
    active: "c. 1989-1993",
    summary: "A pre-GY!BE Montreal band with David Bryant on vocals.",
    body: [
      "Bliss was a Montreal band active around the turn of the 1990s, with David Bryant on vocals alongside Michael Stevenson, Sylvain Bouthillette, Colin Burnett, and Iain Cook.",
      "The band released a cassette EP, a self-titled album, Grafted To An Elbow, and a split LP with Chicago's Trenchmouth.",
      "Bliss predates Bryant's arrival in GY!BE by several years and shows the louder independent rock scene he came from."
    ],
    discography: [
      "Off The Pig (1989, cassette EP)",
      "Bliss (1990)",
      "Grafted To An Elbow (1993)",
      "The Position Of The Right Hand (1993, split with Trenchmouth)"
    ],
    links: []
  },
  {
    slug: "trudeau-grill",
    members: ["sophie-trudeau"],
    title: "Trudeau-Grill",
    relation: "Sophie Trudeau with Michaela Grill",
    founded: "2015",
    active: "2015-present",
    summary: "An audiovisual duo of Sophie Trudeau and Austrian filmmaker Michaela Grill.",
    body: [
      "Trudeau-Grill is the collaboration between Sophie Trudeau and Austrian filmmaker Michaela Grill, presented as live performance and installation.",
      "Trudeau's violin and electronics are performed together with Grill's moving images. The duo has appeared at L'Alternativa in Barcelona, the Ann Arbor Film Festival, VOX, and Suoni per il Popolo.",
      "Recent performances include the Cinematheque quebecoise in February 2025 and echoraum in Vienna in April 2026. Like GY!BE's projection work, the project treats image and sound as one live system."
    ],
    discography: [],
    links: [
      { label: "Website", url: "https://trudeaugrill.wordpress.com/" }
    ]
  },
  {
    slug: "mile-end-ladies-string-auxiliary",
    members: ["sophie-trudeau"],
    title: "The Mile End Ladies String Auxiliary",
    relation: "Sophie Trudeau, Rebecca Foon, and Gen Heistek",
    origin: "Montreal, Quebec",
    summary: "A Montreal string trio of Sophie Trudeau, Rebecca Foon, and Gen Heistek.",
    body: [
      "The Mile End Ladies String Auxiliary was a string trio of Sophie Trudeau on violin, Rebecca Foon on cello, and Gen Heistek on viola, named after the Montreal neighbourhood at the heart of the Constellation scene.",
      "Its album From Cells of Roughest Air came out in 2005 on Bangor Records, the label Trudeau founded.",
      "The trio links three string players who also appear in Silver Mt. Zion, Esmerine, Saltland, Hangedup, and Set Fire to Flames."
    ],
    discography: ["From Cells of Roughest Air (2005)"],
    links: []
  },
  {
    slug: "diebold",
    members: ["sophie-trudeau"],
    title: "Diebold",
    relation: "Sophie Trudeau and Ian Ilavsky",
    origin: "Montreal, Quebec",
    summary: "A duo of Sophie Trudeau and Constellation co-founder Ian Ilavsky.",
    body: [
      "Diebold is a duo of Sophie Trudeau and Ian Ilavsky, co-founder of Constellation Records.",
      "The project released a self-titled record in 2007 and Listen to My Heartbeast in 2008.",
      "It is a small but direct link between one of GY!BE's most recognizable players and the label that has released the band's records since 1997."
    ],
    discography: ["Diebold (2007)", "Listen to My Heartbeast (2008)"],
    links: []
  },
  {
    slug: "et-sans",
    members: ["roger-tellier-craig", "sophie-trudeau"],
    title: "Et Sans",
    relation: "Roger Tellier-Craig, Sophie Trudeau, and Alexandre St-Onge",
    origin: "Montreal, Quebec",
    active: "2000-2006",
    summary: "A French-language avant-rock group from Fly Pan Am's circle.",
    body: [
      "Et Sans was a Montreal experimental rock group with French lyrics, formed around Roger Tellier-Craig and Alexandre St-Onge, with Felix Morel and Stephen De Oliveira.",
      "Sophie Trudeau plays on the 2005 album Par noussss touss les trous de vos cranes!, released by Alien8. Thierry Amar mixed some of the group's work.",
      "The band's abrasive, collage-like songs sit close to Fly Pan Am and far from GY!BE's orchestral scale."
    ],
    discography: [
      "L'Autre (2001)",
      "Mi la le memoire... (2004)",
      "Par noussss touss les trous de vos cranes! (2005)"
    ],
    links: []
  },
  {
    slug: "valley-of-the-giants",
    members: ["sophie-trudeau"],
    title: "Valley of the Giants",
    relation: "Sophie Trudeau with members of Broken Social Scene",
    active: "2002-2004",
    summary: "A Canadian post-rock supergroup joining Montreal and Toronto scenes.",
    body: [
      "Valley of the Giants was a Canadian post-rock supergroup with Sophie Trudeau, Brendan Canning and Charles Spearin of Broken Social Scene, Deirdre Smith, Anthony Seck, and Raoul Tangeuy.",
      "Its only album was released by Arts & Crafts in 2004.",
      "The group is a rare direct bridge between the Constellation orbit and Toronto's Broken Social Scene circle."
    ],
    discography: ["Valley of the Giants (2004)"],
    links: []
  },
  {
    slug: "some-became-hollow-tubes",
    members: ["aidan-girt"],
    title: "Some Became Hollow Tubes",
    relation: "Aidan Girt and Eric Quach",
    origin: "Montreal, Quebec",
    founded: "2019",
    active: "2019-present",
    summary: "Aidan Girt's improvised drone duo with Eric Quach of thisquietarmy.",
    body: [
      "Some Became Hollow Tubes is a duo of Aidan Girt on drums and Eric Quach, known for the guitar project thisquietarmy, on guitar.",
      "The duo improvises long drone and post-rock pieces, with Girt's drumming moving between slow pressure and full-force build. Track and album titles carry the same climate and political urgency found around GY!BE.",
      "Its fourth album, Seed Weed Freed Breed Lead Deed Greed, was released in March 2026, and the duo is touring Quebec in December 2026."
    ],
    discography: [
      "In 1988 I Thought This Shit Would Never Change (2019)",
      "Keep It in the Ground (2019)",
      "Unhealthy for Sensitive Groups (2021)",
      "Seed Weed Freed Breed Lead Deed Greed (2026)"
    ],
    links: [
      { label: "Bandcamp", url: "https://somebecamehollowtubes.bandcamp.com/" }
    ]
  },
  {
    slug: "pangea-de-futura",
    members: ["aidan-girt"],
    title: "Pangea De Futura",
    relation: "Aidan Girt with Eric Quach, Eric Craven and others",
    origin: "Montreal, Quebec",
    founded: "2019",
    summary: "A Montreal mega-jam collective with an explicitly anti-extraction politics.",
    body: [
      "Pangea De Futura describes itself as a mega-jam collective. Its players include Aidan Girt, Eric Quach, Eric Craven (Hangedup), Samuel Bobony, and Veronique Janosy.",
      "The group records long, collective improvisations whose titles target pipelines, crypto speculation, and war. War Milk was released by the Belgian label Sub Rosa in 2024.",
      "Together with Some Became Hollow Tubes, it shows Girt's current work drifting toward improvisation and open-ended drone."
    ],
    discography: [
      "No More Fucking Pipelines Leave It in the Fucking Ground (2019)",
      "Bitcoin-Bananas, Crypto-Bahamas (2022)",
      "War Milk (2024)"
    ],
    links: [
      { label: "Bandcamp", url: "https://pangeadefutura.bandcamp.com/" }
    ]
  },
  {
    slug: "esprits-frappeurs",
    members: ["karl-lemieux"],
    title: "Esprits Frappeurs",
    relation: "Karl Lemieux with Philippe Lambert and Alexandre St-Onge",
    origin: "Montreal, Quebec",
    summary: "Karl Lemieux's sound project of processed voices and occult psychedelia.",
    body: [
      "Esprits Frappeurs is a trio of Karl Lemieux, Philippe Lambert, and Alexandre St-Onge, working with digital voice processing and what the project described as occult psychedelia.",
      "Its one release, Premiere Apparition, came out in 2011.",
      "The project is part of a wider body of audiovisual work by Lemieux, which also includes Unzip Violence with Roger Tellier-Craig and St-Onge, the 16mm performance Unearthed with BJ Nilsen, and Kuroshio with Philip Jeck and Michaela Grill."
    ],
    discography: ["Premiere Apparition (2011)"],
    links: []
  },
  {
    slug: "des-ark",
    members: ["timothy-herzog"],
    title: "Des Ark",
    relation: "Timothy Herzog",
    origin: "North Carolina",
    summary: "Aimee Argote's North Carolina band, with Timothy Herzog on drums in its early years.",
    body: [
      "Des Ark is the North Carolina project of songwriter Aimee Argote, moving between quiet confessional songs and heavy, loud rock.",
      "Timothy Herzog drummed with the band from 2002 to 2005 and plays on Day of Prole and Loose Lips Sink Ships.",
      "It is part of the North Carolina underground that Herzog came from before joining GY!BE in 2012."
    ],
    discography: ["Day of Prole (2003)", "Loose Lips Sink Ships (2005)"],
    links: [
      { label: "Bandcamp", url: "https://desark.bandcamp.com/" }
    ]
  },
  {
    slug: "black-skies",
    members: ["timothy-herzog"],
    title: "Black Skies",
    relation: "Timothy Herzog",
    origin: "Chapel Hill / Carrboro, North Carolina",
    active: "2005-2013; on hiatus",
    summary: "A North Carolina heavy rock band with Timothy Herzog on drums.",
    body: [
      "Black Skies was a heavy rock band from Chapel Hill and Carrboro, North Carolina, with Timothy Herzog on drums.",
      "Herzog plays on On the Wings of Time and Echoes in the Void / Dead Batteries, the band's last release before its hiatus.",
      "The band's riff-heavy sound points to the weight Herzog brought into GY!BE's post-reunion rhythm section."
    ],
    discography: ["On the Wings of Time (2011)", "Echoes in the Void / Dead Batteries (2013)"],
    links: [
      { label: "Bandcamp", url: "https://blackskies.bandcamp.com/" }
    ]
  },
  {
    slug: "milemarker",
    members: ["timothy-herzog"],
    title: "Milemarker",
    relation: "Timothy Herzog",
    origin: "Chapel Hill, North Carolina / Chicago",
    summary: "A synth-driven post-hardcore band that Timothy Herzog drummed for in the early 2000s.",
    body: [
      "Milemarker was a post-hardcore band that started in Chapel Hill and later moved to Chicago, known for mixing hardcore with synthesizers and political themes.",
      "Timothy Herzog drummed with the band around 2001 and 2002 and plays on Satanic Versus.",
      "It is one of the earliest documented steps in Herzog's path toward GY!BE."
    ],
    discography: ["Satanic Versus (2002)"],
    links: []
  },
  {
    slug: "wrekmeister-harmonies",
    members: ["timothy-herzog"],
    title: "Wrekmeister Harmonies",
    relation: "Timothy Herzog; Sophie Trudeau as guest",
    origin: "Chicago, Illinois",
    summary: "J.R. Robinson's Chicago project, joining drone, doom, and chamber textures.",
    body: [
      "Wrekmeister Harmonies is the project of Chicago musician J.R. Robinson, recording for Thrill Jockey with a changing cast of players.",
      "Timothy Herzog plays drums on Light Falls (2016) and played with the project live that year. Sophie Trudeau is also a guest on the same album.",
      "The record's mix of drone, doom metal, and strings sits close to GY!BE's slow-building heaviness."
    ],
    discography: ["Light Falls (2016)"],
    links: [
      { label: "Thrill Jockey", url: "https://www.thrilljockey.com/artists/wrekmeister-harmonies" }
    ]
  },
  {
    slug: "roger-tellier-craig",
    members: ["roger-tellier-craig"],
    title: "Roger Tellier-Craig",
    relation: "Roger Tellier-Craig (solo)",
    origin: "Montreal, Quebec",
    active: "2015-present",
    summary: "Roger Tellier-Craig's solo electronic work, built from synthesizers and structured sound.",
    body: [
      "Since leaving GY!BE in 2003, Roger Tellier-Craig has moved steadily toward electronic and audiovisual work. His solo records use modular and analog synthesizers, patterns, and slowly shifting textures.",
      "Releases include Instantanes on Root Strata and Etudes on Second Editions. He also plays in the trio Fousek/Hansen/Tellier-Craig and composed the score for Karl Lemieux's film Somehow Continue (2023).",
      "His earlier groups Fly Pan Am, Et Sans, Pas Chic Chic, and Le Revelateur are documented separately in this archive."
    ],
    discography: [
      "Visites Possibles and Sightings (2015)",
      "Instantanes (2017)",
      "Etudes (2020)",
      "Horizons paves (2021, single)"
    ],
    links: [
      { label: "Website", url: "https://rogertelliercraig.com/" },
      { label: "Bandcamp", url: "https://rogertelliercraig.bandcamp.com/" }
    ]
  },
  {
    slug: "le-revelateur",
    members: ["roger-tellier-craig"],
    title: "Le Revelateur",
    relation: "Roger Tellier-Craig and Sabrina Ratte",
    origin: "Montreal, Quebec",
    active: "2008-2019",
    summary: "Roger Tellier-Craig's synthesizer project, later an audiovisual duo with video artist Sabrina Ratte.",
    body: [
      "Le Revelateur began in 2008 as Roger Tellier-Craig's synthesizer project. Video artist Sabrina Ratte joined in 2010, turning it into an audiovisual duo.",
      "The records explore analog synthesis, repetition, and drifting electronic forms; the live shows paired them with Ratte's video synthesis.",
      "The project ended in 2019, but Tellier-Craig and Ratte still perform audiovisual work together under their own names."
    ],
    discography: [
      "Motion Flares (2010)",
      "Fictions (2011)",
      "Horizon Fears (2012)",
      "Extreme Events (2014)",
      "Hyper (2016)"
    ],
    links: []
  },
  {
    slug: "pas-chic-chic",
    members: ["roger-tellier-craig"],
    title: "Pas Chic Chic",
    relation: "Roger Tellier-Craig",
    origin: "Montreal, Quebec",
    summary: "Psychedelic French-language pop led by Roger Tellier-Craig.",
    body: [
      "Pas Chic Chic was a Montreal group playing psychedelic, French-language pop, led by Roger Tellier-Craig with Radwan Ghazi Moumneh (Jerusalem In My Heart) and Eric Gingras among its members.",
      "Its album Au Contraire, released by Semprini in 2008, was longlisted for the Polaris Music Prize.",
      "The band shows a lighter, more melodic side of the Constellation and Hotel2Tango circle."
    ],
    discography: ["Au Contraire (2008)"],
    links: []
  },
  {
    slug: "avec-le-soleil-sortant-de-sa-bouche",
    members: ["jean-sebastian-truchy"],
    title: "Avec le soleil sortant de sa bouche",
    relation: "Jean-Sebastian Truchy",
    origin: "Montreal, Quebec",
    founded: "2011",
    summary: "A Montreal kraut-funk group on Constellation, with former GY!BE projectionist Jean-Sebastian Truchy.",
    body: [
      "Avec le soleil sortant de sa bouche is a Montreal group formed in 2011, playing repetitive, groove-driven music between krautrock and funk.",
      "Its members include Jean-Sebastian Truchy, who ran film projections for GY!BE in the early 2000s and played bass in Fly Pan Am and Set Fire to Flames.",
      "The band's two Constellation albums show the label's rhythmic, dance-adjacent side."
    ],
    discography: ["Zubberdust! (2014)", "Pas pire pop, I Love You So Much (2017)"],
    links: [
      { label: "Constellation", url: "https://cstrecords.com/pages/artist/avec-le-soleil-sortant-de-sa-bouche" }
    ]
  },
  {
    slug: "frog-eyes",
    members: ["grayson-walker"],
    title: "Frog Eyes",
    relation: "Grayson Walker",
    origin: "Victoria, British Columbia",
    summary: "Carey Mercer's art-rock band, which counted early GY!BE accordionist Grayson Walker among its members.",
    body: [
      "Frog Eyes is the art-rock band led by Carey Mercer, known for theatrical vocals and restless song structures.",
      "Grayson Walker, who played accordion with GY!BE in 1997, is a past member. He has also played accordion and keyboards on records by Destroyer and Himalayan Bear, and in the duo Hearse.",
      "The band places one of GY!BE's earliest contributors inside the West Coast indie scene."
    ],
    discography: [],
    links: []
  }
];
