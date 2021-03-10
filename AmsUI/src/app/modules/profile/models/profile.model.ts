import { AccessLevel, AccessLevelBasic, AccessLevelStandard, AccountType } from '../../../ams-portal/models/access.enum';
// import { PlanType } from '../../account/modules/setup-users/models/plan-type.enum';

export enum PlanType {
  FREE,
  PRO,
}

export class Profile {
  username!: string;
  email!: string;
  id!: string;
  firstname!: string;
  lastname!: string;
  accountType!: number;
  // accountId!: string;
  // accountUserId!: string;
  // franchiseGroupCode!: string;
//   // budgetPermission: AccessLevel;
//   // estimatePermission: AccessLevel;
//   docLibPermission!: boolean; // No Access (false); Full Access (true)
//  // No Access (false); Full Access (true)
  // securityPermission!: boolean; // No Access (false); Full Access (true)
//  // No Access (false); Full Access (true)
//   // taxPermission: AccessLevelBasic;
//   // catalogPermission: AccessLevelBasic;
//   accountingPermission!: boolean; // No Access (false); Full Access (true);
//  // No Access (false); Full Access (true);
//   // trainingPermission: AccessLevelBasic;
//   libraryPermission!: boolean; // No Access (false); Full Access (true);;
//  // No Access (false); Full Access (true);;
//   membershipLevel!: string;
//   LMNTimeStatus!: string;
//   jobsAccess!: string;
//   // CRMPermission: AccessLevelBasic;
//   suspended!: string;
//   company!: string;
//   accountExpiry!: string;
//   franchiseId!: string;
//   host!: string;
//   phone!: string;
//   lastBudget!: string;
//   standardEstimates!: string;
//   serviceEstimates!: string;
//   budgetCount!: string;
//   lastEstimate!: string;
//   timeStaff!: string;
//   timesheets!: string;
//   lastTimesheet!: string;
//   authCode!: string;
//   planType: PlanType | undefined;

  get fullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  constructor(model?: Partial<Profile>) {
    Object.assign(this, model);
  }
}
