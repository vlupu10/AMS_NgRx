import { Profile } from '../../modules/profile/models/profile.model';
import { NavMenuItem } from '../models/navigation-menu-item.model';

export function filterByActivate(item: NavMenuItem): boolean {
  let pagesLeft = true;
  if (item.pages) {
    item.pages = item.pages.filter(page => {
      filterByActivate(page);

      return page.canActivate ? page.canActivate() : true;
    });

    pagesLeft = item.pages.length > 0;
  }

  return item.canActivate ? item.canActivate() : pagesLeft;
}

export function defineMenuItems(profile: Profile, isGG: boolean): Array<NavMenuItem> {
  const menuItems: Array<NavMenuItem> = [
    {
      label: 'Access Jobs',
      pages: [
        { label: 'Jobs', iconClass: ['fad', 'binoculars'], link: 'jobs' },
        { label: 'Applications', iconClass: ['fad', 'tasks'], link: 'applications' },
        { label: 'Users', iconClass: ['fad', 'users'], link: 'users' },
        { label: 'Notifications', iconClass: ['fad', 'envelope'], link: 'notifications' },
      ],
      // canActivate: () => hasAccess(MenuSection.JOBS, profile),
    },

  ];

  return menuItems;
}
