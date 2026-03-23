export interface EventDetails {
  eventDate: string;
  eventDateDisplay: string;
  eventTime: string;
  eventLocation: string;
  eventVenue: string;
}

export interface ExternalLinks {
  signupUrl: string;
  slackChannel: string;
  blueprintUrl: string;
  hackClubUrl: string;
  blueprintLogo: string;
}

export const eventDetails: EventDetails = {
  eventDate: '2026-04-18T10:00:00+04:00',
  eventDateDisplay: 'April 18, 2026',
  eventTime: '10:00 AM – 8:00 PM',
  eventLocation: 'Dubai, UAE',
  eventVenue: 'TBD',
};

export const externalLinks: ExternalLinks = {
  signupUrl: 'https://blueprint.hackclub.com/guilds/invite/dubai',
  slackChannel: '#build-guild-dubai',
  blueprintUrl: 'https://blueprint.hackclub.com',
  hackClubUrl: 'https://hackclub.com',
  blueprintLogo: 'https://buildguilddelhi.netlify.app/homepage_logo-3585630b.webp',
};

export const SIGNUP_URL = externalLinks.signupUrl;
export const SLACK_CHANNEL = externalLinks.slackChannel;
export const EVENT_DATE = eventDetails.eventDate;
export const EVENT_DATE_DISPLAY = eventDetails.eventDateDisplay;
export const EVENT_TIME = eventDetails.eventTime;
export const EVENT_LOCATION = eventDetails.eventLocation;
export const EVENT_VENUE = eventDetails.eventVenue;
export const BLUEPRINT_URL = externalLinks.blueprintUrl;
export const HC_URL = externalLinks.hackClubUrl;
export const BLUEPRINT_LOGO = externalLinks.blueprintLogo;
