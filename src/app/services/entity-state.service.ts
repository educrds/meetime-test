import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntityStateService {
  /**
   * A reactive signal that holds the current value of the entity.
   * Initialized with a default value of 1.
   */
  readonly entityValue = signal(1);

  /**
   * Updates the value of the entity signal with a new value.
   * 
   * @param newValue The new value to set for the entity.
   */
  public updateEntityValue(newValue: number): void {
    this.entityValue.set(newValue);
  }
}