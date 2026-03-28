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
    profileLabel: 'Slack profile',
    photoUrl: '/organizers/dhruv.jpg',
    bio: 'Game dev, hardware enthusiast, and generalist who bounces between UI, PCB ideas, and whatever part of the build stack needs debugging.',
  },
  {
    name: 'Aly',
    role: 'Organizer',
    initials: 'A',
    avatarColor: 'var(--organizer-aly)',
    profileUrl: 'https://hackclub.enterprise.slack.com/team/U08AFJFPRJ7',
    profileLabel: 'Slack profile',
    photoUrl: '/organizers/aly.jpg',
    bio: 'Campfire Dubai organizer, club leader, and community builder who is good at turning scattered maker energy into an actual room full of people shipping things.',
  },
];
