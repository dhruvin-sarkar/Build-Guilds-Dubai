export interface EventPacketItem {
  label: string;
  value: string;
}

export const eventPacketIntro =
  "Think of this as the practical show-up brief: what kind of room you're walking into, what to bring, and where the day points once the bench clears.";

export const eventPacketItems: EventPacketItem[] = [
  {
    label: 'Bench mix',
    value: 'A mix of complete beginners, return builders, and teens already carrying half-routed boards or half-flashed ideas.',
  },
  {
    label: 'Bring list',
    value: 'Bring a laptop if you have one. Dev boards, hardware demos, and obvious questions about parts, traces, or firmware are all welcome.',
  },
  {
    label: 'After today',
    value: 'You should leave with clearer next steps into Blueprint, Hackpad, and whatever you want to prototype once the bench supply clicks off.',
  },
];
