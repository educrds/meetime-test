import { Structure } from '../models/cycle.model';

export default class Utils {
  /**
   * Calculates the event projections for a specific day by multiplying the base structure
   * with a given assignable factor. It defaults to 0.
   *
   * @param dayStructure - Partial structure containing event counts.
   * @param assignable - A multiplier factor to adjust the event numbers.
   * @param day - The day of the week (1-5).
   * @returns A complete `Structure` object with calculated event values.
 */
  static calculateEvents(dayStructure: Partial<Structure>, assignable: number, day: number): Structure {
    return {
      day,
      meetings: (dayStructure.meetings ?? 0) * assignable,
      emails: (dayStructure.emails ?? 0) * assignable,
      calls: (dayStructure.calls ?? 0) * assignable,
      follows: (dayStructure.follows ?? 0) * assignable,
    };
  }

  /**
   * Returns the current weekday number as an integer between 1 and 5,
   * @returns The current day of the week (1-5).
   */
   static getCurrentDay(): number {
    const today = new Date().getDay();
    const currentDay = today === 0 ? 1 : today === 6 ? 5 : today;
    return currentDay;
  }
}
