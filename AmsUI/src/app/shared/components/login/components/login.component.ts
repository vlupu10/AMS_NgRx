import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../../modules/users/models/user.model';
import { LoginService } from './../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  username = 'vlupu';
  password = 'abc123';
  isDirty = true;
  user: User = new User({});

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      username: [this.username, [Validators.required]],
      password: [this.password, [Validators.required]],
    });

    this.form.valueChanges.subscribe(() => {
      this.isDirty = true;
    });
  }

  login(): void {
    this.loginService.login({username: this.form.controls.username.value, password: this.form.controls.password.value})
    .subscribe((usr) => {
      if (usr) {
        localStorage.setItem('user', JSON.stringify(usr));
        this.router.navigate(['portal/jobs']);
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  register(): void {
    this.router.navigate(['registration']);
  }

}
