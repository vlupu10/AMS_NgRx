import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AmsPortalModule } from '../../ams-portal/ams-portal.module';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [ProfileLayoutComponent, PasswordDialogComponent],
  imports: [
    AmsPortalModule,
    RouterModule.forChild([
      { path: '', component: ProfileLayoutComponent},
    ]),
  ],
  entryComponents: [PasswordDialogComponent],
})
export class ProfileModule { }
