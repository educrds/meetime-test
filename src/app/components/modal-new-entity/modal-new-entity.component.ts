import { Component } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EntityInputComponent } from '../entity-input/entity-input.component';
import { PanelCyclesComponent } from '../panel-cycles/panel-cycles.component';
import { MatDividerModule } from '@angular/material/divider';
import { TableCyclesComponent } from '../table-cycles/table-cycles.component';

@Component({
  selector: 'meet-modal-new-entity',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    EntityInputComponent,
    PanelCyclesComponent,
    MatDividerModule,
    TableCyclesComponent,
  ],
  templateUrl: './modal-new-entity.component.html',
  styleUrl: './modal-new-entity.component.scss',
})
export class ModalNewEntityComponent {}
