
export type EventsProjection = {
  day: number;
  events: Events;
}

export type Events = {
  meetings: number;
  emails: number;
  calls: number;
  follows: number;
}