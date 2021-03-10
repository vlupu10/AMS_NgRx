import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ams-table-actions',
  templateUrl: 'table-actions.component.html',
  styleUrls: ['table-actions.component.scss'],
})
export class TableActionsComponent {
  @Input() showDelete = true;
  @Output() readonly edit = new EventEmitter<void>();
  @Output() readonly delete = new EventEmitter<void>();

  editClicked(): void {
    this.edit.emit();
  }

  deleteClicked(): void {
    this.delete.emit();
  }
}
