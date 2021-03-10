import { Component, Input } from '@angular/core';
export type IconProp = any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ams-dialog-title',
  templateUrl: 'dialog-title.component.html',
  styleUrls: ['dialog-title.component.scss'],
})
export class DialogTitleComponent {
  @Input()
  icon: IconProp = [];
  @Input()
  label!: string;
}
