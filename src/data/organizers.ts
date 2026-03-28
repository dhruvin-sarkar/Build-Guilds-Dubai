export type OrganizerRole = 'Lead Organizer' | 'Organizer';

export interface Organizer {
  name: string;
  role: OrganizerRole;
  initials: string;
  avatarColor: string;
  profileUrl: string;
  profileLabel: string;
  photoUrl?: string;
  bio: string;
}

export const organizers: Organizer[] = [
  {
    name: 'Dhruv',
    role: 'Lead Organizer',
    initials: 'D',
    avatarColor: 'var(--organizer-dhruv)',
    profileUrl: 'https://hackclub.enterprise.slack.com/team/U0914NPNKM2',
    profileLabel: 'Slack',
    photoUrl: '/organizers/dhruv.jpg',
    bio: 'Game dev, hardware enthusiast, Programmer I do a lot of things.',
  },
  {
    name: 'Aly',
    role: 'Organizer',
    initials: 'A',
    avatarColor: 'var(--organizer-aly)',
    profileUrl: 'https://hackclub.enterprise.slack.com/team/U08AFJFPRJ7',
    profileLabel: 'Slack',
    photoUrl: '/organizers/aly.jpg',
    bio: 'horizons singapore org // campfire dubai poc // club leader @dubai overall goat.',
  },
];
