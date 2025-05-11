import { Injectable, signal } from '@angular/core';
import { Structure } from '../models/cycle.model';

@Injectable({
  providedIn: 'root'
})
export class CyclesStateService {
  /**
   * A reactive signal that holds the current value of the cycles.
   * Initialized with a default value of null.
   */
  readonly cyclesValue = signal<Structure[]>([]);

  /**
   * Updates the value of the cycles signal with a new value.
   * 
   * @param newValue The new value to set for the entity.
   */
  public updateCycleValue(newValue: Structure[]): void {
    this.cyclesValue.set(newValue);
  }
}
