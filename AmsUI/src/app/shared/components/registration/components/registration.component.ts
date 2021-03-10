import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../../modules/users/models/user.model';
import { RegistrationService } from './../services/registration.service';
import { areControlsEqualValidator } from '../../../../ams-portal/directives/are-controls-equal.validator';
import { isValueUniqueInListValidator } from '../../../../ams-portal/directives/is-value-unique-in-list.validator';
import { EMAIL_PATTERN } from '../../../../core/common/utils';
import { NotificationService } from '../../../../core/services/notifications.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup = this.fb.group({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    city: '',
    role: '',
    email: '',
    phone: '',
  });
  isDirty = true;
  users: User[] = [];
  usernames: string[] = [];
  user: User = new User({
    firstName: 'Viorel',
    lastName: 'Lupu',
    username: 'vlupu10',
    password: 'Leroiv20',
    city: 'Pickering',
    email: 'vlupu10@gmail.com',
    role: 'employer',
    phone: '416-200-9004',
    date: new Date(),
  });
  roles: string[] = ['employer', 'user'];
  confirmPassword = 'Leroiv20';

  constructor(
    private readonly notificationService: NotificationService,
    private readonly fb: FormBuilder,
    private readonly registrationService: RegistrationService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.registrationService.getUsers().subscribe(data => {
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
      firstName: [this.user.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [this.user.lastName, [Validators.required, Validators.maxLength(50)]],
      username: [this.user.username, [Validators.required, Validators.minLength(5),
      isValueUniqueInListValidator(this.usernames)]],
      password: [this.user.password, [Validators.required, Validators.minLength(5)]],
      confirmPassword: [this.confirmPassword, [Validators.required, Validators.minLength(5)]],
      city: [this.user.city, [Validators.required]],
      role: [this.user.role, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      phone: [this.user.phone, [Validators.required]],
    }, {validators: areControlsEqualValidator('password', 'confirmPassword')
  });

    this.form.valueChanges.subscribe(() => {
      this.isDirty = true;
    });
  }

  save(): void {
    const payload: User = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
      city: this.form.get('city')?.value,
      role: this.form.get('role')?.value,
      email: this.form.get('email')?.value,
      phone: this.form.get('phone')?.value,
      date: new Date(),
    };
    this.registrationService.createUser(payload).subscribe(data => {
      if (data) {
        this.notificationService.success('Registration was successful. Now you can login.');
        this.router.navigate(['login']);
      }
    }, err => {
      this.notificationService.error(err);
    });
  }

}
