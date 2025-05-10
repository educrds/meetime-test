import { Events, EventsProjection } from "./projection.model";

export type Cycle = {
  name: string;
  availableEntities: number;
  priority: string;
  structure: Structure[];
  selectedEntities?: number;
  remainingEntities?: number;
  disabled?: boolean;
  eventsCycle?: Structure[]
  eventsTodayDetailed?: Structure
}

export type Structure = {
  day: number;
} & Events