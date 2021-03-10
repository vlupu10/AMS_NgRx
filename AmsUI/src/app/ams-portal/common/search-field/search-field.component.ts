import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

import { OnDestroyComponent } from '../../../core/common/on-destroy.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ams-search-field',
  templateUrl: 'search-field.component.html',
  styleUrls: ['search-field.component.scss'],
})
export class SearchFieldComponent extends  OnDestroyComponent implements OnInit {
  searchControl = new FormControl('');
  hideCancelBtn = true;
  @Output() readonly search = new EventEmitter<string>();
  @Input() placeholder = 'Type to search';

  ngOnInit(): void {
    this.subscriptions.value = this.searchControl.valueChanges
      .pipe(
        tap(value => this.hideCancelBtn = !(value.length > 0)),
        debounceTime(500)
      )
      .subscribe(data => {
        this.search.emit(data);
      });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }
}
