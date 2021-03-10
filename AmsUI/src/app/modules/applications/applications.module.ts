import { NgModule } from '@angular/core';
import { ApplicationsComponent } from './components/applications.component';
import { ApplicationsService } from './services/applications.service';
import { AmsPortalModule } from 'src/app/ams-portal/ams-portal.module';
import { RouterModule } from '@angular/router';
import { ApplicationsDialogComponent } from './components/applications-dialog/applications-dialog.component';

@NgModule({
  imports: [
    AmsPortalModule,
    RouterModule.forChild([
      {
        path: '',
        component: ApplicationsComponent
      }
    ])
  ],
  declarations: [ApplicationsComponent, ApplicationsDialogComponent],
  providers: [ApplicationsService],
})
export class ApplicationsModule { }
