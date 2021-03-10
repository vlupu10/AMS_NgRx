import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * example of custom icon
 * @value the same as file name
 * @usage <mat-icon svgIcon="menu"></mat-icon>
 */
enum CustomIcons {
  MENU = 'menu',
  TUNE_WHITE = 'tune_white',
}

@Injectable({
  providedIn: 'root',
})
export class IconService {

  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer
  ) { }

  registerIcons(): void {
    this.loadIcons(Object.values(CustomIcons), 'assets/images/custom-icons');
  }

  private loadIcons(iconKeys: Array<string>, iconUrl: string): void {
    // classes in all svgs should not be the same for correct view. set existingClass + id
    iconKeys.forEach(key => {
      this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
    });
  }
}
