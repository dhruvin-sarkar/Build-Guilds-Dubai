export interface BlueprintProject {
  id: string;
  slug: string;
  name: string;
  creator: string;
  summary: string;
  githubUrl: string;
  blueprintUrl: string;
  imageUrl: string;
  views: number;
  followers: number;
}

export const blueprintProjects: BlueprintProject[] = [
  {
    id: '370',
    slug: 'becca-rocket',
    name: 'BECCA Rocket',
    creator: 'Parker Rupe',
    summary:
      'A high-power certification rocket build focused on launch-readiness, recovery hardware, and the full stack of fabrication needed to get an L1 flight off the pad.',
    githubUrl: 'https://github.com/ProgrammerTurtle/BECCA',
    blueprintUrl: 'https://blueprint.hackclub.com/projects/370',
    imageUrl: '/blueprint-projects/370.webp',
    views: 3453,
    followers: 42,
  },
  {
    id: '2195',
    slug: 'cyberboard-v2',
    name: 'Cyberboard V2',
    creator: 'NotARoomba',
    summary:
      'A cyberpunk STM32 dev board with Bluetooth 5.1, Li-ion charging, IMU, and barometer sensors packed into a polished second-revision PCB.',
    githubUrl: 'https://github.com/notaroomba/cyberboard',
    blueprintUrl: 'https://blueprint.hackclub.com/projects/2195',
    imageUrl: '/blueprint-projects/2195.webp',
    views: 3279,
    followers: 34,
  },
  {
    id: '4721',
    slug: 'es-01-eink-smartwatch',
    name: 'ES_01 E-ink Smartwatch',
    creator: 'sandgum',
    summary:
      'A 5mm-thin modular smartwatch that lines up its electronics in a bendable straight-run architecture with an E-ink touch display and ESP32-S3 brain.',
    githubUrl: 'https://github.com/sandgum/Triangulate-ES_01-Watch',
    blueprintUrl: 'https://blueprint.hackclub.com/projects/4721',
    imageUrl: '/blueprint-projects/4721.webp',
    views: 3072,
    followers: 72,
  },
  {
    id: '2176',
    slug: 'plico',
    name: 'Plico',
    creator: 'Aaron',
    summary:
      'A fully custom split keyboard running KMK, with responsive lighting, foldable portability goals, and a hardware layout tuned for daily ergonomic use.',
    githubUrl: 'https://github.com/achen18/Plico',
    blueprintUrl: 'https://blueprint.hackclub.com/projects/2176',
    imageUrl: '/blueprint-projects/2176.webp',
    views: 2672,
    followers: 22,
  },
  {
    id: '381',
    slug: 'linuxwood',
    name: 'LinuxWood',
    creator: 'RoboHub',
    summary:
      'An upcycled laptop rebuild that turns old parts into a slim Linux workstation with a custom enclosure, SSD upgrade, and desk-friendly all-in-one form factor.',
    githubUrl: 'https://github.com/AhmedBO55/LinuxWood',
    blueprintUrl: 'https://blueprint.hackclub.com/projects/381',
    imageUrl: '/blueprint-projects/381.webp',
    views: 2306,
    followers: 34,
  },
  {
    id: '2563',
    slug: 'clementine-clock',
    name: 'clementine clock',
    creator: 'magic frog',
    summary:
      'A citrus-themed desk clock with alarms, timers, speakers, rotary input, and a two-part 3D-printed shell built like a tiny consumer hardware product.',
    githubUrl: 'https://github.com/themagicfrog/clementine-clock',
    blueprintUrl: 'https://blueprint.hackclub.com/projects/2563',
    imageUrl: '/blueprint-projects/2563.webp',
    views: 1677,
    followers: 11,
  },
  {
    id: '11174',
    slug: 'ledino-and-angstromio',
    name: 'LEDino & AngstromIO',
    creator: 'Clém',
    summary:
      'Two compact dev boards pushed to the edge of PCB density: one with a charlieplexed LED matrix and one barely longer than a USB-C connector.',
    githubUrl: 'https://github.com/Dieu-de-l-elec/AngstromIO-devboard',
    blueprintUrl: 'https://blueprint.hackclub.com/projects/11174',
    imageUrl: '/blueprint-projects/11174.webp',
    views: 1641,
    followers: 7,
  },
  {
    id: '2766',
    slug: 'killersplit',
    name: 'KillerSplit',
    creator: 'Shaunak Bajaj',
    summary:
      'An ergonomic wireless split keyboard that fuses Corne and Voyager ideas into a low-profile daily driver with a carefully tuned thumb cluster.',
    githubUrl: 'https://github.com/MrKillerShaunBa/KillerSplit',
    blueprintUrl: 'https://blueprint.hackclub.com/projects/2766',
    imageUrl: '/blueprint-projects/2766.webp',
    views: 1485,
    followers: 5,
  },
];
