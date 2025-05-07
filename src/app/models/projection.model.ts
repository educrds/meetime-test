
export type EventsProjection = {
  day: number;
  events: Events;
}

type Events = {
  meetings: number;
  emails: number;
  calls: number;
  follows: number;
}