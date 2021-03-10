import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TableComponent } from '../../../core/common/table.component';
import { JobsService } from '../services/jobs.service';
import { Job } from '../models/job.model';
import { JobsDialogComponent } from './jobs-dialog/jobs-dialog.component';
import { NotificationService } from './../../../core/services/notifications.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['../../../ams-portal/common/content-styles.scss', './jobs.component.scss']
})
export class JobsComponent extends TableComponent<Job> implements OnInit {
  displayedColumns = ['domain', 'type', 'city', 'date', 'employer', 'requirements', 'salary', 'actions'];
  jobs: Job[] | undefined;
  form: FormGroup = new FormGroup({});
  role = 'user';


  constructor(
    private notificationService: NotificationService,
    private jobsService: JobsService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    const ls = localStorage.getItem('user');

    if (ls){
      this.role = JSON.parse(ls).role;
    }
  }

  createOrUpdate(title: string, job = new Job({})): void {
    const dialogRef = this.dialog.open(JobsDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        job,
        title,
        onSave: (payload: Job, isUpdate: boolean) => {
          dialogRef.close();
          this.subscriptions.edit = this.jobsService.createOrUpdateJob(payload, isUpdate, payload._id ? payload._id : undefined)
            .subscribe(() => {
              this.searchData();
              this.notificationService.success('Data was saved.');
            });
        },
        onApply: (jobId: string) => {
          dialogRef.close();
          this.subscriptions.edit = this.jobsService.applyForJob(jobId)
            .subscribe(() => {
              this.notificationService.success('Application saved.');
              this.router.navigate(['/ams/applications']);
            });
        },
        onCancel: (isDirty: boolean) => {
          if (isDirty) { this.searchData(); }
          dialogRef.close();
        },
      },
    });

  }

  deleteItem(job: Job): void {
    if (job._id) {
      this.jobsService.deleteJob(job._id).subscribe(() => {
        this.notificationService.success('Job was deleted.');
        this.searchData();
      });
    } else {
      this.notificationService.success('Cannot delete job: missing _id!');
    }
  }

  protected loadItems(): Observable<Job[]> {
    return this.jobsService.getJobs()
    .pipe(
      map( (resp: any) => {
        // console.log('resp load items', resp);

        return resp;
      })
    );
  }

}
