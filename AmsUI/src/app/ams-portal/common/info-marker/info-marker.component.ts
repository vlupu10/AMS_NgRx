import { Component, Input } from '@angular/core';

/**
 * Question mark icon with tooltip on hover.
 * @text - text shown in tooltip
 */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ams-info-marker',
  templateUrl: 'info-marker.component.html',
  styleUrls: ['./info-marker.component.scss'],
})
export class InfoMarkerComponent {
  @Input()
  text!: string;
}
