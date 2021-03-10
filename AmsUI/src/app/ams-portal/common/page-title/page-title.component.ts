import { Component, Input } from '@angular/core';
export type IconProp = any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ams-page-title',
  templateUrl: 'page-title.component.html',
  styleUrls: ['page-title.component.scss'],
})
export class PageTitleComponent {
  @Input()
  icon!: IconProp;
  @Input()
  label!: string;

  constructor() {  }

}
