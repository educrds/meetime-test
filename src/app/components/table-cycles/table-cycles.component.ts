import { SelectionModel } from '@angular/cdk/collections';
import { Component, effect } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { Cycle, Structure } from '../../models/cycle.model';
import { tap } from 'rxjs';
import { CycleNameElementComponent } from '../cycle-name-element/cycle-name-element.component';
import { EntityStateService } from '../../services/entity-state.service';
import { MatListModule } from '@angular/material/list';
import { CyclesStateService } from '../../services/cycles-state.service';
import Utils from '../../utils/utils';

@Component({
  selector: 'meet-table-cycles',
  imports: [MatCheckboxModule, MatDividerModule, MatTableModule, MatCheckboxModule, CycleNameElementComponent, MatListModule],
  templateUrl: './table-cycles.component.html',
  styleUrl: './table-cycles.component.scss',
})
export class TableCyclesComponent {
  protected displayedColumns: string[] = ['select', 'name', 'selected_available', 'detailed_structure_today'];
  protected dataSource = new MatTableDataSource<Cycle>([]);
  protected cyclesWithoutSpace: Cycle[] = [];
  protected selection = new SelectionModel<Cycle>(true, []);
  private _allCycles: Cycle[] = [];

  constructor(
    private _apiService: ApiService,
    private _entityStateService: EntityStateService,
    private _cyclesStateService: CyclesStateService,
  ) {
    effect(() => this._initializeCycles());
  }

  /**
   * Initializes cycles by loading from API, sorting them, setting the initial selection,
   * redistributing entities among cycles, and updating the global state with event data
  */
  private _initializeCycles(): void {
    this._apiService.getCycles().pipe(
      tap(cycles => {
        this._allCycles = this._sortCycles(cycles);
        this._updateInitialSelection();
        this._redistribute();
        this._cyclesStateService.updateCycleValue(this._getEventsInCycle());
      })
    ).subscribe();
  }

  private _sortCycles(cycles: Cycle[]): Cycle[] {
    const priorityRank: Record<string, number> = { HIGH: 3, MEDIUM: 2, LOW: 1 };

    return [...cycles].sort((a, b) => {
      const priorityDiff = priorityRank[b.priority] - priorityRank[a.priority];
      return priorityDiff !== 0 ? priorityDiff : cycles.indexOf(a) - cycles.indexOf(b);
    });
  }

  // @returns an array of `Structure` objects representing events in selected cycles
  private _getEventsInCycle(): Structure[] {
    return this.selection.selected.flatMap(cycle => cycle.eventsCycle ?? [])
  }

  private _updateInitialSelection(): void {
    const initialSelection = this._calculateInitialSelection();
    this.selection.select(...initialSelection);
  }

  /**
   * Determines which cycles should be initially selected based on entity availability.
   * @returns An array of `Cycle` objects to be initially selected
  */
  private _calculateInitialSelection(): Cycle[] {
    let remaining = this._entityStateService.entityValue();
    return this._allCycles.filter(cycle => {
      if (remaining <= 0 || cycle.availableEntities <= 0) return false;
      const assignable = Math.min(remaining, cycle.availableEntities);
      remaining -= assignable;
      return true;
    });
  }

  /**
   * Redistributes entities across the selected cycles and updates the data source
   * and cycles without space accordingly
  */
  private _redistribute(): void {
    const entitiesCount = this._entityStateService.entityValue();
    const processedCycles = this._distributeEntities(entitiesCount);
    
    this.dataSource.data = processedCycles.filter(c => c.availableEntities > 0);
    this.cyclesWithoutSpace = processedCycles.filter(c => c.availableEntities === 0);
    
    this._syncSelectionWithProcessedCycles(processedCycles);
  }

  /**
   * Distributes the given number of entities among all cycles,
   * calculating events and updating cycle state accordingly
   *
   * @param entitiesCount - Total number of entities to distribute
   * @returns A list of processed `Cycle` objects with updated state
  */
  private _distributeEntities(entitiesCount: number): Cycle[] {
    let remaining = entitiesCount;
    return this._allCycles.map(cycle => {
      const isSelected = this.selection.isSelected(cycle);
      const assignable = isSelected ? Math.min(remaining, cycle.availableEntities) : 0;
      
      remaining -= assignable;
      
      return {
        ...cycle,
        selectedEntities: assignable,
        remainingEntities: cycle.availableEntities - assignable,
        eventsTodayDetailed: this._calculateTodayEvents(cycle, assignable),
        eventsCycle: cycle.structure.map(structure =>
          Utils.calculateEvents(structure, assignable, structure.day)
        ),
        disabled: !isSelected && remaining <= 0
      };
    });
  }


  /**
   * Synchronizes the selection model with the list of cycles that have assigned entities
   * @param processedCycles - List of all processed cycles after distribution
  */
  private _syncSelectionWithProcessedCycles(processedCycles: Cycle[]): void {
    const currentSelection = processedCycles.filter(c => (c.selectedEntities || 0) > 0);
    this.selection.clear();
    this.selection.select(...currentSelection);
  }

  
  /**
   * Calculates the detailed event structure for today using a cycle's structure and assigned entities.
   * @param cycle - The cycle being processed.
   * @param assignable - Number of entities assigned to this cycle.
   * @returns A `Structure` object representing today's event projection.
  */
  private _calculateTodayEvents(cycle: Cycle, assignable: number): Structure {
    const currentDay = Utils.getCurrentDay()
    const structureToday = cycle.structure.find(s => s.day === currentDay) ?? {};
    return Utils.calculateEvents(structureToday, assignable, currentDay);
  }

  // Toggles the selection state of a given cycle (if not disabled) and updates the global state.
  protected toggleCycleSelection(cycle: Cycle): void {
    if (!cycle.disabled) {
      this.selection.toggle(cycle);
    }
    this._cyclesStateService.updateCycleValue(this._getEventsInCycle());
  }
}