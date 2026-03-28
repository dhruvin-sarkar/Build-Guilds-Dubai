export interface ScheduleItem {
  time: string;
  title: string;
  highlight?: boolean;
}

export const scheduleItems: ScheduleItem[] = [
  {
    time: '11:00 AM – 11:30 AM',
    title: 'Check-In + Bench Setup',
  },
  {
    time: '11:30 AM – 12:00 PM',
    title: 'Hardware Primer',
    highlight: false,
  },
  {
    time: '12:00 PM – 1:30 PM',
    title: 'Parts Crash Course + Guided Build',
    highlight: true,
  },
  {
    time: '1:30 PM – 2:00 PM',
    title: 'Lunch Break',
  },
  {
    time: '2:00 PM – 2:30 PM',
    title: 'Show + Tell',
    highlight: true,
  },
  {
    time: '2:30 PM – 5:30 PM',
    title: 'PCB Workshop',
    highlight: true,
  },
  {
    time: '5:30 PM – 6:00 PM',
    title: 'Blueprint + Hackpad Next Steps',
  },
  {
    time: '6:00 PM – 7:30 PM',
    title: 'Open Bench + Wrap',
  },
];
