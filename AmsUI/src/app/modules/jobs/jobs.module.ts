import { NgModule } from '@angular/core';
import { JobsComponent } from './components/jobs.component';
import { JobsService } from './services/jobs.service';
import { AmsPortalModule } from 'src/app/ams-portal/ams-portal.module';
import { RouterModule } from '@angular/router';
import { JobsDialogComponent } from './components/jobs-dialog/jobs-dialog.component';

@NgModule({
  imports: [
    AmsPortalModule,
    RouterModule.forChild([
      {
        path: '',
        component: JobsComponent
      }
    ])
  ],
  declarations: [JobsComponent, JobsDialogComponent],
  providers: [JobsService],
})
export class JobsModule { }
