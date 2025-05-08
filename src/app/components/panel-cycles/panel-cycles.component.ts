import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TableCyclesComponent } from "../table-cycles/table-cycles.component";

@Component({
  selector: 'meet-panel-cycles',
  imports: [MatExpansionModule, MatCardModule, MatDividerModule, MatIconModule, CommonModule, TableCyclesComponent],
  templateUrl: './panel-cycles.component.html',
  styleUrl: './panel-cycles.component.scss'
})


export class PanelCyclesComponent {

}
