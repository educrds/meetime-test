import { Component } from '@angular/core';
import {
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EntityInputComponent } from '../entity-input/entity-input.component';
import { PanelCyclesComponent } from '../panel-cycles/panel-cycles.component';
import { MatDividerModule } from '@angular/material/divider';
import { TableCyclesComponent } from '../table-cycles/table-cycles.component';
import { EventsChartComponent } from "../events-chart/events-chart.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'meet-modal-new-entity',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    EntityInputComponent,
    PanelCyclesComponent,
    MatDividerModule,
    TableCyclesComponent,
    EventsChartComponent,
    MatIconModule
],
  templateUrl: './modal-new-entity.component.html',
  styleUrl: './modal-new-entity.component.scss',
})
export class ModalNewEntityComponent {}
