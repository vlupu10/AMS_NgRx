import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AmsPortalModule } from 'src/app/ams-portal/ams-portal.module';
import { RegistrationComponent } from './components/registration.component';
import { RegistrationService } from './services/registration.service';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    AmsPortalModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegistrationComponent
      }
    ])
  ],
  providers: [
    RegistrationService,
  ],
})
export class RegistrationModule { }
