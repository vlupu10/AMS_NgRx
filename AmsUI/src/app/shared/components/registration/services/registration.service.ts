import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './../../../../modules/users/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('users', { params: { requestType: 'PORTAL.API'} });
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>('users', user, { params: { requestType: 'PORTAL.API'} });
  }
}
