import { Component, effect, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { EntityStateService } from '../../services/entity-state.service';
import { CyclesStateService } from '../../services/cycles-state.service';
import Utils from '../../utils/utils';
import { Structure } from '../../models/cycle.model';

@Component({
  selector: 'meet-entity-input',
  imports: [
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './entity-input.component.html',
  styleUrl: './entity-input.component.scss',
})
export class EntityInputComponent {
  protected entityValue: WritableSignal<number> = this._entityStateService.entityValue;
  protected totalEventsToday: WritableSignal<number> = signal(0);

  constructor(
    private _entityStateService: EntityStateService,
    private _cyclesStateService: CyclesStateService
  ) {
    /**
     * Reactive effect that calculates and updates the total number of events for the current day,
     * based on the current entity value and the matching cycle structure.
    */
    effect(() => {
      const currentDay = Utils.getCurrentDay();
      const entity = this._entityStateService.entityValue();
      const todayCycle = this._cyclesStateService.cyclesValue().find((cycle) => cycle.day === currentDay);

      if (todayCycle) {
        const total = this._calculateTotalEvents(todayCycle, entity, currentDay);
        this.totalEventsToday.set(total);
      }
    });
  }

  /**
   * Calculates the total number of events (calls, emails, follows, meetings)
   * for a given cycle, entity count, and day.
   * @returns The total number of events.
  */
  private _calculateTotalEvents(cycle: Structure, entity: number, day: number): number {
    const { calls, emails, follows, meetings } = Utils.calculateEvents(cycle, entity, day);
    return calls + emails + follows + meetings;
  }

  /*
   * This method is called when the user clicks the button to update the entity value.
   * It updates the entity value in the EntityStateService.
   * @param newValue The new value to set for the entity.
   */
  protected updateEntityValue(newValue: number): void {
    this._entityStateService.updateStateEntityValue(newValue);
  }
}
