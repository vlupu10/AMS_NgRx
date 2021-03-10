import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private requestsAmount = 0;

  constructor(private readonly ngxLoader: NgxUiLoaderService) {}

  pushRequest(): void {
    this.requestsAmount++;

    if (this.requestsAmount === 1 && !this.ngxLoader.hasRunningTask(true, 'master')) {
      this.ngxLoader.start();
    }
  }

  removeRequest(): void {
    this.requestsAmount--;
    if (this.requestsAmount < 0) {
      this.requestsAmount = 0;
    }

    if (this.requestsAmount === 0 && this.ngxLoader.hasRunningTask(true, 'master')) {
      this.ngxLoader.stop();
    }
  }
}
