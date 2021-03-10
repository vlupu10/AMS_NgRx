export type IconProp = any;

export interface NavMenuItem {
  label: string;
  iconClass?: IconProp;
  link?: string;
  pages?: Array<NavMenuItem>;
  canActivate?(): boolean;
}

export class NavMenuItemModel {
  label = '';
  iconClass: string[] = [];
  link?: string;
  pages?: NavMenuItemModel[] = [];
  canActivate?(): boolean;

  constructor(model?: Partial<NavMenuItemModel>) {
    Object.assign(this, model);
  }

}
