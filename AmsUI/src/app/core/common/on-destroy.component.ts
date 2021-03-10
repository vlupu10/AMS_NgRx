import { Component, OnDestroy } from '@angular/core';
import each from 'lodash-es/each';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-on-destroy',
  template: '',
})

export abstract class OnDestroyComponent implements OnDestroy {
  protected subscriptions: { [key: string]: Subscription } = {};

  ngOnDestroy(): void {
    each(this.subscriptions, (subscription: { unsubscribe: () => void; }) => { subscription.unsubscribe(); });
  }
}
