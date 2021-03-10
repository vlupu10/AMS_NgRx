import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { AmsPortalLayoutComponent } from './components/ams-portal-layout/ams-portal-layout.component';
import { AddNewBtnComponent } from './common/add-new-button/add-new-btn.component';
import { PageTitleComponent } from './common/page-title/page-title.component';
import { SearchFieldComponent } from './common/search-field/search-field.component';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';
import { DeleteDialogComponent } from './common/delete-dialog/delete-dialog.component';
import { DialogTitleComponent } from './common/dialog-title/dialog-title.component';
import { TableActionsComponent } from './common/table-actions/table-actions.component';
import { ValidationErrorComponent } from './common/validation-error/validation-error.component';
import { InfoMarkerComponent } from './common/info-marker/info-marker.component';
import { InformationDialogComponent } from './common/information-dialog/information-dialog.component';

@NgModule({
  imports: [
    CoreModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatMenuModule,
    MatChipsModule,
    MatStepperModule,
    MatCardModule,
    RouterModule.forChild([
      {
        path: 'portal',
        component: AmsPortalLayoutComponent,
        children: [
          { path: '', pathMatch: 'full'},
          {
            path: 'jobs',
            loadChildren: () => import('../modules/jobs/jobs.module')
              .then(m => m.JobsModule),
          },
          {
            path: 'applications',
            loadChildren: () => import('../modules/applications/applications.module')
              .then(m => m.ApplicationsModule),
          },
          {
            path: 'users',
            loadChildren: () => import('../modules/users/users.module')
              .then(m => m.UsersModule),
          },
          {
            path: 'notifications',
            loadChildren: () => import('../modules/notifications/notifications.module')
              .then(m => m.NotificationsModule),
          },
        ],
      },
    ]),
  ],
  exports: [
    CoreModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatChipsModule,
    MatMenuModule,
    MatStepperModule,
    MatCardModule,
    AddNewBtnComponent,
    PageTitleComponent,
    SearchFieldComponent,
    ConfirmDialogComponent,
    DeleteDialogComponent,
    DialogTitleComponent,
    TableActionsComponent,
    ValidationErrorComponent,
    AmsPortalLayoutComponent,
    InfoMarkerComponent,
    InformationDialogComponent,
  ],
  declarations: [
    AmsPortalLayoutComponent,
    AddNewBtnComponent,
    PageTitleComponent,
    SearchFieldComponent,
    ConfirmDialogComponent,
    DeleteDialogComponent,
    DialogTitleComponent,
    TableActionsComponent,
    ValidationErrorComponent,
    InfoMarkerComponent,
    InformationDialogComponent,
  ],
  providers: [
    DatePipe, CurrencyPipe
  ],
})
export class AmsPortalModule { }

