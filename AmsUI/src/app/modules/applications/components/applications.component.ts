import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TableComponent } from '../../../core/common/table.component';
import { ApplicationsService } from '../services/applications.service';
import { Application } from '../models/application.model';
import { ApplicationsDialogComponent } from './applications-dialog/applications-dialog.component';
import { NotificationService } from '../../../core/services/notifications.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['../../../ams-portal/common/content-styles.scss', './applications.component.scss']
})
export class ApplicationsComponent extends TableComponent<Application> implements OnInit {
  displayedColumns = ['date', 'resume', 'actions'];
  applications: Application[] | undefined;
  form: FormGroup = new FormGroup({});

  constructor(
    private notificationService: NotificationService,
    private applicationsService: ApplicationsService,
    private readonly dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  createOrUpdate(title: string, application = new Application({})): void {
    const dialogRef = this.dialog.open(ApplicationsDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        application,
        title,
        onSave: (payload: Application, isUpdate: boolean) => {
          dialogRef.close();
          this.subscriptions.edit = this.applicationsService.createOrUpdateApplication(payload, isUpdate, 
            payload._id ? payload._id : undefined)
            .subscribe(() => {
              this.searchData();
              this.notificationService.success('Data was saved.');
            });
        },
        onCancel: (isDirty: boolean) => {
          if (isDirty) { this.searchData(); }
          dialogRef.close();
        },
      },
    });

  }

  deleteItem(application: Application): void {
    if (application._id) {
      this.applicationsService.deleteApplication(application._id).subscribe(() => {
        this.notificationService.success('Application was deleted.');
        this.searchData();
      });
    } else {
      this.notificationService.success('Cannot delete application: missing _id!');
    }
  }

  protected loadItems(): Observable<Application[]> {
    return this.applicationsService.getApplications()
    .pipe(
      map( (resp: any) => {
        // console.log('resp load items', resp);

        return resp;
      })
    );
  }
}
