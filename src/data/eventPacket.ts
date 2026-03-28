export interface EventPacketItem {
  label: string;
  value: string;
}

export const eventPacketIntro =
  'Treat this as the practical show-up brief: what kind of room you are walking into, what to bring, and where the day points once the bench clears.';

export const eventPacketItems: EventPacketItem[] = [
  {
    label: 'Bench mix',
    value: 'Beginners, return builders, and people already carrying half-routed boards or half-flashed ideas.',
  },
  {
    label: 'Bring list',
    value: 'Laptop optional // dev boards and hardware demos welcome // questions about parts, traces, or firmware encouraged.',
  },
  {
    label: 'After today',
    value: 'Blueprint, Hackpad, and next-step project routes once the bench supply clicks off.',
  },
];
