import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login.component';
import { LoginService } from './services/login.service';
import { AmsPortalModule } from 'src/app/ams-portal/ams-portal.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    AmsPortalModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ])
  ],
  declarations: [LoginComponent],
  providers: [LoginService],
})
export class LoginModule { }
