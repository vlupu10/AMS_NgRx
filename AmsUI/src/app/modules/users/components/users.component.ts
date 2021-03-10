import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TableComponent } from '../../../core/common/table.component';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { NotificationService } from '../../../core/services/notifications.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../../../ams-portal/common/content-styles.scss', './users.component.scss']
})
export class UsersComponent extends TableComponent<User> implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'username', 'city', 'email', 'phone', 'role', 'date', 'actions'];
  Users: User[] | undefined;
  form: FormGroup = new FormGroup({});

  constructor(
    private notificationService: NotificationService,
    private usersService: UsersService,
    private readonly dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  createOrUpdate(title: string, user = new User({})): void {
    const dialogRef = this.dialog.open(UsersDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        user,
        title,
        onSave: (payload: User, isUpdate: boolean) => {
          dialogRef.close();
          this.subscriptions.edit = this.usersService.createOrUpdateUser(payload, isUpdate, payload._id ? payload._id : undefined)
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

  deleteItem(user: User): void {
    if (user._id) {
      this.usersService.deleteUser(user._id).subscribe(() => {
        this.notificationService.success('User was deleted.');
        this.searchData();
      });
    } else {
      this.notificationService.success('Cannot delete User: missing _id!');
    }
  }

  protected loadItems(): Observable<User[]> {
    return this.usersService.getUsers()
    .pipe(
      map( (resp: any) => {
        // console.log('resp load items', resp);

        return resp;
      })
    );
  }
}
