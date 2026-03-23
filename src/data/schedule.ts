export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export const scheduleItems: ScheduleItem[] = [
  {
    time: '10:00 AM',
    title: 'Doors Open',
    description: 'Arrive, meet people, get settled. First looks at the components and setup.',
  },
  {
    time: '10:30 AM',
    title: 'Intro to Hardware',
    description:
      'Crash course on what hardware actually is. Different pathways — PCB design, firmware, embedded systems, mechanical. What you can realistically build as a beginner. Fast-paced, not a lecture.',
    highlight: false,
  },
  {
    time: '11:30 AM',
    title: 'Components Crash Course + Hands-On Build Time',
    description:
      'Quick walkthrough of the components on the table — capacitors, resistors, microcontrollers, what they actually do. Then a guided follow-along example project. Mentors walk around 1-on-1. Experienced builders go off-script.',
    highlight: true,
  },
  {
    time: '01:00 PM',
    title: 'Lunch',
    description: 'Included. Take a break, keep talking.',
  },
  {
    time: '02:00 PM',
    title: 'Show & Tell',
    description:
      "Anyone with prior hardware projects demos them to the group. Blueprint builds, HC projects, anything they've made. See what people your age are actually shipping.",
    highlight: true,
  },
  {
    time: '03:00 PM',
    title: 'PCB Workshop',
    description:
      'Guided workshop through EasyEDA or KiCad. Two tracks: PCB hacker card or PCB keychain. Component placement, traces, the basics. Everyone leaves having designed something real.',
    highlight: true,
  },
  {
    time: '06:00 PM',
    title: 'Intro to Hack Club, Blueprint & Hackpad',
    description:
      'How do you keep going after today? What is Blueprint, what is Hackpad, how do you get funding for your own projects. Real next steps, not just vibes.',
  },
  {
    time: '07:00 PM',
    title: 'Open Build + Wind Down',
    description: 'Unstructured time. Keep building, keep talking, exchange contacts.',
  },
  {
    time: '08:00 PM',
    title: 'End',
    description: "That's a wrap. See you at the next one.",
  },
];
