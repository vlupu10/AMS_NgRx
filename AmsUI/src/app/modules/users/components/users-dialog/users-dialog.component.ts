import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { OnDestroyComponent } from '../../../../core/common/on-destroy.component';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { areControlsEqualValidator } from '../../../../ams-portal/directives/are-controls-equal.validator';
import { isValueUniqueInListValidator } from '../../../../ams-portal/directives/is-value-unique-in-list.validator';
import { NotificationService } from '../../../../core/services/notifications.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ams-materials-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['../../../../ams-portal/common/content-styles.scss', './users-dialog.component.scss'],
})

export class UsersDialogComponent extends OnDestroyComponent implements OnInit {
  form: FormGroup = this.fb.group({...new User()});
  isAdd = false;
  isDirty = false;
  roles: string[] = ['admin', 'employer', 'user'];
  confirmPassword = '';
  users: User[] = [];
  usernames: string[] = [];

  constructor(
    private notificationService: NotificationService,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: {
      user: User,
      title: string,
      onSave(user: User, type: boolean): void,
      onCancel(isDirty: boolean): void,
    },
    private readonly fb: FormBuilder,
    private readonly datePipe: DatePipe,
  ) {
    super();
  }

  get title(): string {
    return `${ this.data.title } user`;
  }

  ngOnInit(): void {
    this.isAdd = this.data.title === 'Add';
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
      this.usernames = data.map(el => {
        return el.username;
      });
      this.createForm();
    }, err => {
      this.notificationService.error(err);
    });
  }

  createForm(): void {
    this.form = this.fb.group({
      firstName: [this.data.user.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [this.data.user.lastName, [Validators.required, Validators.maxLength(50)]],
      username: [this.data.user.username, [Validators.required, Validators.minLength(5),
      isValueUniqueInListValidator(this.usernames)]],
      password: [this.data.user.password, [Validators.required, Validators.minLength(5)]],
      confirmPassword: [this.confirmPassword, [Validators.required, Validators.minLength(5)]],
      city: [this.data.user.city, [Validators.required]],
      date: [new Date(this.data.user.date)],
      role: [this.data.user.role, [Validators.required]],
      email: [this.data.user.email, [Validators.required]],
      phone: [this.data.user.phone, [Validators.required]],
    }, {validators: areControlsEqualValidator('password', 'confirmPassword')
  });

    this.form.valueChanges.subscribe(() => {
      this.isDirty = true;
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const payload: User = {
        ...this.data.user,
        firstName: this.form.controls.firstName.value,
        lastName: this.form.controls.lastName.value,
        username: this.form.controls.username.value,
        password: this.form.controls.password.value,
        city: this.form.controls.city.value,
        date: this.form.controls.date.value,
        email: this.form.controls.email.value,
        phone: this.form.controls.phone.value,
      };
      this.data.onSave(payload, !this.isAdd);
    }
  }
}
