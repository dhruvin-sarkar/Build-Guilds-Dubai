export type OrganizerRole = 'Lead Organizer' | 'Organizer';

export interface Organizer {
  name: string;
  role: OrganizerRole;
  initials: string;
  avatarColor: string;
  slackHandle: string;
  bio: string;
}

export const organizers: Organizer[] = [
  {
    name: 'Dhruv',
    role: 'Lead Organizer',
    initials: 'D',
    avatarColor: '#1e3a8a',
    slackHandle: '#',
    bio: 'Game dev, hardware enthusiast, pulled an all-nighter debugging Unity WebGL for Ember game jam.',
  },
  {
    name: 'Aly',
    role: 'Organizer',
    initials: 'A',
    avatarColor: '#064e3b',
    slackHandle: '#',
    bio: 'Organized Campfire Dubai. Deep in the HC community. Designed the campfire merch.',
  },
];
