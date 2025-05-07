import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'meet-cycle-name-element',
  imports: [MatIconModule,MatListModule],
  templateUrl: './cycle-name-element.component.html',
  styleUrl: './cycle-name-element.component.scss'
})
export class CycleNameElementComponent {
  public name = input<string>();
  public priority = input<string>();
}
