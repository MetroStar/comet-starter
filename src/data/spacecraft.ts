import { Spacecraft, SpacecraftItems } from '@src/types/spacecraft';

const data: Spacecraft[] = [
  {
    id: 1,
    name: 'Millenium Falcon',
    description:
      'The Millennium Falcon, originally designated YT 492727ZED and formerly known as the Stellar Envoy, was a Corellian YT-1300f light freighter most famously used by the smugglers Han Solo and Chewbacca during the Galactic Civil War. In the time following the Battle of Endor, Imperial turncoat Ralsius Paldora noted that every 2.2 out of 300 stormtroopers were aware of the Falcon.',
    affiliation: 'Rebel Alliance',
    dimensions: '34.75m x 25.61m x 8.27m',
    appearances: 5,
  },
  {
    id: 2,
    name: 'X-Wing',
    description:
      'The X-wing starfighter was a prominent series of multiple starfighters produced by Incom with a characteristic "X"-shape of four wings, known as S-foils, extending out from the fuselage. These starfighters were found in the service of the Rebel Alliance, New Republic, and also the Galactic Alliance.',
    affiliation: 'Rebel Alliance',
    dimensions: '12.5m x 10.9m x 2.4m',
    appearances: 4,
  },
  {
    id: 3,
    name: 'TIE Fighter',
    description:
      'The TIE/LN starfighter, or TIE/line starfighter, simply known as the TIE Fighter or T/F, was the standard Imperial starfighter seen in massive numbers throughout most of the Galactic Civil War and onward. Colloquially, Rebel and New Republic pilots referred to the craft as "eyeballs."',
    affiliation: 'Galactic Empire',
    dimensions: '6.3m x 6.4m x 7.3m',
    appearances: 3,
  },
  {
    id: 4,
    name: 'TIE Interceptor',
    description:
      'The TIE/IN interceptor, also known as the TIE Interceptor or T/I, was a TIE Series starfighter used by the Galactic Empire. The TIE Interceptor was identifiable by its arrow-shaped solar collection panels, a distinct difference from the hexagonal solar arrays of its predecessor, the TIE Fighter.',
    affiliation: 'Galactic Empire',
    dimensions: '9.6m x 6.4m x 7.3m',
    appearances: 2,
  },
  {
    id: 5,
    name: 'TIE Bomber',
    description:
      'The TIE/sa bomber, also referred to as the TIE bomber or T/B, was a heavily armed Imperial attack craft used by the Galactic Empire. Part of the TIE line, the TIE bomber was a descendant of the TIE/sk x1 experimental bomber.',
    affiliation: 'Galactic Empire',
    dimensions: '7.8m x 10.6m x 7.3m',
    appearances: 1,
  },
  {
    id: 6,
    name: 'TIE Reaper',
    description:
      "The TIE/rp Reaper attack lander, also known simply as the TIE Reaper, was a troop carrier variant of Sienar Fleet Systems' TIE line used by the Galactic Empire. The TIE Reaper differed from the standard craft of the TIE line in that it was a troop carrier; designed for ferrying troops amidst the heat of battle, such as the death troopers on Scarif.",
    affiliation: 'Galactic Empire',
    dimensions: '22.5m x 16.5m x 4.3m',
    appearances: 1,
  },
  {
    id: 7,
    name: 'TIE Defender',
    description:
      'The TIE/D Defender, commonly known as the TIE Defender or T/D, was a high-performance TIE Series starfighter developed for the Imperial Navy by Sienar Fleet Systems in a project overseen by Grand Admiral Demetrius Zaarin shortly before the Battle of Endor.',
    affiliation: 'Galactic Empire',
    dimensions: '9.2m x 7.2m x 9.6m',
    appearances: 1,
  },
  {
    id: 8,
    name: 'TIE Advanced x1',
    description:
      'The TIE Advanced x1, or TIE/ad, was an advanced prototype starfighter touted as a replacement for the standard TIE Fighter tested by Darth Vader and X1. It was equipped with deflector shields, a hyperdrive, and a new targeting computer.',
    affiliation: 'Galactic Empire',
    dimensions: '9.2m x 6.6m x 7.3m',
    appearances: 1,
  },
  {
    id: 9,
    name: 'TIE Advanced v1',
    description:
      'The TIE Advanced v1 was a prototype TIE fighter used by the Galactic Empire during the Galactic Civil War. It was equipped with deflector shields, a hyperdrive, and a new targeting computer.',
    affiliation: 'Galactic Empire',
    dimensions: '9.2m x 6.6m x 7.3m',
    appearances: 1,
  },
  {
    id: 10,
    name: 'TIE Advanced v2',
    description:
      'The TIE Advanced v2 was a prototype TIE fighter used by the Galactic Empire during the Galactic Civil War. It was equipped with deflector shields, a hyperdrive, and a new targeting computer.',
    affiliation: 'Galactic Empire',
    dimensions: '9.2m x 6.6m x 7.3m',
    appearances: 1,
  },
  {
    id: 11,
    name: 'TIE Advanced x2',
    description:
      'The TIE Advanced x2 was a prototype TIE fighter used by the Galactic Empire during the Galactic Civil War. It was equipped with deflector shields, a hyperdrive, and a new targeting computer.',
    affiliation: 'Galactic Empire',
    dimensions: '9.2m x 6.6m x 7.3m',
    appearances: 1,
  },
];

export const mockData: SpacecraftItems = {
  items: data,
  item_count: data.length,
  page_count: 2,
  prev_page: null,
  next_page: null,
};
