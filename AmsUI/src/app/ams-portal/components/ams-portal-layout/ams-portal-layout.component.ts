import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { NavigationEnd, Router } from '@angular/router';

import { OnDestroyComponent } from '../../../../app/core/common/on-destroy.component';
import { WindowRef } from '../../../core/common/global-refs';
import { Profile } from '../../../modules/profile/models/profile.model';
import { defineMenuItems, filterByActivate } from '../../directives/side-menu.functions';
import { NavMenuItem } from '../../models/navigation-menu-item.model';

@Component({
  selector: 'app-ams-portal-layout',
  templateUrl: './ams-portal-layout.component.html',
  styleUrls: ['./ams-portal-layout.component.scss']
})
export class AmsPortalLayoutComponent extends OnDestroyComponent implements OnInit {
  activePanel!: MatExpansionPanel;
  sideNavOpened = true;
  currentMenuItem = '';
  startPageRoute = '/settings/profile';
  navItems: Array<NavMenuItem> = [];
  profileNavItem!: {
    iconClass: Array<string>;
    label: string;
    tooltip: string;
    click(): void;
  };
  logoUrl = '';
  useLogoForHeader!: boolean;
  login = true;

  readonly headerLeft: Array<{
    iconClass: any;
    tooltip: string;
    text?: string;
    settingsLink?: boolean;
    click(): void;
  }> = [
      {
        iconClass: ['fad', 'globe-americas'],
        click: () => {
          this.windowRef.nativeWindow.location.href = 'https://www.weareams.com/';
        },
        text: 'AMS',
        tooltip: 'We are AMS',
      },
      {
        iconClass: ['fad', 'clock'],
        click: () => {
          this.windowRef.nativeWindow.location.href = 'https://www.weareams.com/digital/hourly/';
        },
        text: 'Hourly',
        tooltip: 'Hourly by AMS',
      },
    ];

  constructor(
    private readonly windowRef: WindowRef,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.routerEvents = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.openMenuLink(); // open side menu deep elements
      }
    });

    this.initMenu(new Profile());

    if (localStorage.getItem('user')) {
      this.login = true;
      this.router.navigate(['portal/jobs']);
    } else {
      this.login = false;
      this.router.navigate(['login']);
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    // window.location.reload();
  }

  setActivePanel(panel: MatExpansionPanel): void {
    this.activePanel = panel;
  }

  closeActivePanel(): void {
    if (this.activePanel) {
      this.activePanel.close();
    }
  }

  isSizeIncompatible(): boolean {
    const MIN_WIDTH = 1000;

    return this.windowRef.nativeWindow.screen.availHeight < MIN_WIDTH && this.windowRef.nativeWindow.screen.availWidth < MIN_WIDTH;
  }

  private initMenu(profile: Profile): void {
    const menuItems = defineMenuItems(profile, false);

    this.navItems = menuItems.filter(filterByActivate);
    this.openMenuLink();

    this.profileNavItem = {
      iconClass: ['fad', 'sign-out-alt'],
      label: profile.fullName,
      click: () => {
        // this.oauthService.logOut();
      },
      tooltip: 'Logout',
    };
  }

  private openMenuLink(): void {
    this.navItems.forEach(navItem => {
      if (navItem.pages) { navItem.pages.forEach(item => {
        if (item.pages) {
          item.pages.forEach(page => {
            if (this.router.url.includes(page.link ? page.link : '')) {
              this.currentMenuItem = item.label; // expand the needed panel on init
              this.cd.detectChanges(); // to prevent ExpressionChanged error
            }
          });
        }
      });
      }
    });
  }
}
