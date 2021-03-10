import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

import { IconService } from './core/services/icon.service';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-router',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  title = 'amsUI';

  constructor(
    private readonly router: Router,
    private readonly loaderService: LoaderService,
    private readonly iconService: IconService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loaderService.pushRequest();
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loaderService.removeRequest();
      }
    });

    this.iconService.registerIcons();
  }
}

