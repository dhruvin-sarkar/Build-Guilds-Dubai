export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'What is Build Guild?',
    answer:
      "A 1-day hardware meetup organized as part of Hack Club Blueprint's global Build Guilds week (April 13-19). Hack Club funds local organizers to run events in their cities. Free, open to any teen who's curious about circuits, boards, and hardware.",
  },
  {
    question: 'Is it free?',
    answer: '100% free. Hack Club funds us per attendee - you pay nothing to show up.',
  },
  {
    question: 'Do I need hardware experience?',
    answer:
      "Not at all. The whole day is structured so complete beginners can follow along and actually make something. If you've never touched a breadboard, dev board, or circuit board, this is the right place to start.",
  },
  {
    question: 'Who can attend?',
    answer: "Any teenager aged 13-18 in or near Dubai. You don't need to be a Hack Club member.",
  },
  {
    question: 'What should I bring?',
    answer:
      'A laptop if you have one (not required but helpful). Any hardware projects, breadboards, dev boards, or PCBs you want to show off during Show & Tell. Curiosity.',
  },
  {
    question: 'Where is the venue?',
    answer: "We're finalizing the venue - join #build-guild-dubai on Hack Club Slack for updates.",
  },
  {
    question: 'Will there be food?',
    answer: 'Yes. Lunch is included as part of the event.',
  },
  {
    question: 'What is Hack Club Blueprint?',
    answer:
      'A program by Hack Club - a nonprofit with 50,000+ teen makers - where teens design hardware projects, from keyboard PCBs to dev boards, and get funding from Hack Club to make them real. Blueprint is made in collaboration with AMD.',
  },
];
