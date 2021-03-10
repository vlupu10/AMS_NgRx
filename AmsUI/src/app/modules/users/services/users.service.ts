import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './../models/user.model';
// import { ApplicationsService } from '../../applications/services/applications.service';
// import { Application } from '../../applications/models/application.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('users', { params: { requestType: 'AMS.API'} })
    .pipe(
      map(data => {

        return data;
      })
    );
  }

  createOrUpdateUser(user: User, type: boolean, id?: string): any {
    if (!type) {
      delete user._id;
    }
    return type ? this.httpClient.put<User>(`users/${id}`, user, { params: { requestType: 'AMS.API'} }) :
    this.httpClient.post<User>('users', user, { params: { requestType: 'AMS.API'} });
  }

  deleteUser(id: string): any {
    return this.httpClient.delete<string>(`users/${id}`, { params: { requestType: 'AMS.API'} });
  }

}
