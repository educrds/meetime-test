export type Cycle = {
  name: string;
  availableEntities: number;
  priority: string;
  structure: Structure[];
  events_today?: number;
}

type Structure = {
  day: number;
  meetings: number;
  emails: number;
  calls: number;
  follows: number;
}