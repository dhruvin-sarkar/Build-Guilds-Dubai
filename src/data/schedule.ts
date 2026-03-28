export interface ScheduleItem {
  time: string;
  title: string;
  highlight?: boolean;
}

export const scheduleItems: ScheduleItem[] = [
  {
    time: '11:00 AM \u2013 11:30 AM',
    title: 'Check-in + Bench Setup',
  },
  {
    time: '11:30 AM \u2013 1:00 PM',
    title: 'Electronics Crash Course + Guided Build',
    highlight: true,
  },
  {
    time: '1:00 PM \u2013 1:30 PM',
    title: 'Lunch',
  },
  {
    time: '1:30 PM \u2013 2:30 PM',
    title: 'Tinkering Session',
  },
  {
    time: '2:30 PM \u2013 3:00 PM',
    title: 'Show & Tell',
    highlight: true,
  },
  {
    time: '3:00 PM \u2013 4:30 PM',
    title: 'Printed Circuit Board Workshop',
    highlight: true,
  },
  {
    time: '4:30 PM \u2013 5:00 PM',
    title: 'Intro to Hack Club + Next Steps',
  },
  {
    time: '5:00 PM',
    title: 'Send Off',
  },
];
