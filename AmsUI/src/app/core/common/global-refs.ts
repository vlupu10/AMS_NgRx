import { Injectable } from '@angular/core';

declare global {
  interface Window {
    dataLayer: {
      // tslint:disable-next-line: ban-types
      push: Function;
    };
  }
}

@Injectable({ providedIn: 'root' })
export class WindowRef {
  get nativeWindow(): Window {
    return window;
  }
}
