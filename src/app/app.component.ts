import { Component, inject } from '@angular/core';
import { ModalNewEntityComponent } from "./components/modal-new-entity/modal-new-entity.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'meet-root',
    imports: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.dialog.open(ModalNewEntityComponent, {
      disableClose: true,
      hasBackdrop: true,  
      maxWidth: '50vw'
    });
  }}

