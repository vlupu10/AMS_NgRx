import { Profile } from '../../modules/profile/models/profile.model';

export enum AdminAccess {
  DEV = 15141,
  QA = 20606,
  PROD = 20606,
}

export const adminAccessList = [AdminAccess.DEV, AdminAccess.QA, AdminAccess.PROD];

export enum AccessLevel {
  NO_ACCESS = -1,
  DEFAULT_ACCESS = 0,
  COMPANY_ADMINISTRATOR = 2,
  TIME_ADMIN = 3,
}

export enum AccessLevelBasic {
  NO_ACESS = 0,
  FULL_ACCESS = 2,
}

export enum AccessLevelStandard {
  NO_ACESS,
  FULL_ACCESS,
}

export enum AccessLevelInvoicing {
  NO_ACESS,
  READ_ONLY,
  GENERAL_EDIT,
  GENERAL_EDIT_APPROVE,
}

export enum AccountType {
  FREE,
  BASIC,
  ADMIN,
}

export enum MenuSection {
  PERSONAL,
  ACCOUNT,
  SUBSCRIPTION,
  CRM,
  ESTIMATES,
  PRICE_LIST,
  QUICKBOOKS,
  ADMIN,
  DASHBOARD,
  UPGRADE,
  ESTIMATES_SETTINGS,
  ESTIMATES_SUBMENU,
}

// tslint:disable-next-line: cyclomatic-complexity
export function hasAccess(page: MenuSection, profile: Profile, isGG?: boolean): boolean {
  const isFreeUser = profile.accountType === 6;

  switch (page) {
    // case MenuSection.PERSONAL:
    //   return true;

    // case MenuSection.SUBSCRIPTION:
    //   return (isGG ? false : true) && !isFreeUser;

    // case MenuSection.UPGRADE:
    //   return (isGG ? false : true) && isFreeUser;

    // case MenuSection.ACCOUNT:
    //   return profile.securityPermission;

    // case MenuSection.DASHBOARD:
    //   return profile.securityPermission;

    // case MenuSection.CRM:
    //   return profile.settingsAccess === AccessLevelStandard.FULL_ACCESS && profile.CRMPermission === AccessLevelBasic.FULL_ACCESS;

    // case MenuSection.ESTIMATES:
    // case MenuSection.ESTIMATES_SETTINGS:
    //   return (profile.estimatePermission !== AccessLevel.NO_ACCESS);

    // case MenuSection.PRICE_LIST:
    //   return profile.settingsAccess === AccessLevelStandard.FULL_ACCESS && profile.catalogPermission === AccessLevelBasic.FULL_ACCESS;

    // case MenuSection.QUICKBOOKS:
    //   return profile.settingsAccess === AccessLevelStandard.FULL_ACCESS && profile.accountingPermission && !isGG;

    // case MenuSection.ADMIN:
    //   return adminAccessList.includes(+profile.accountId);

    // case MenuSection.ESTIMATES_SUBMENU:
    //   return profile.estimatePermission !== AccessLevel.NO_ACCESS && profile.settingsAccess === AccessLevelStandard.FULL_ACCESS;

    default: return true;
  }
}
