import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../../../modules/users/models/user.model';

export class LoginModel {
  username!: string;
  password!: string;

  constructor(model?: Partial<LoginModel>) {
    Object.assign(this, model);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  login(login: LoginModel): Observable<User> {
    return this.httpClient.post<User>('users/login', login, { params: { requestType: 'PORTAL.API'} });
  }
}


