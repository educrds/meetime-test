export type Cycle = {
  name: string;
  availableEntities: number;
  priority: string;
  structure: Structure[];
  selectedEntities?: number;
  remainingEntities?: number;
  disabled?: boolean;
  eventsTodayDetailed?: Events
}

type Events = {
  meetings: number;
  emails: number;
  calls: number;
  follows: number;
}

type Structure = {
  day: number;
} & Events