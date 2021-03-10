import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Profile } from '../models/profile.model';

@Injectable({providedIn: 'root'})
export class ProfileService {
  private profile!: Profile;
  constructor(private readonly httpClient: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.httpClient.get<any>('profile/base', { params: { requestType: 'basic' }})
      .pipe(
        map(createProfile)
      );
  }

  saveProfileChanges(data: {username: string; email: string}): Observable<void> {
    this.profile.username = data.username;
    this.profile.email = data.email;

    return this.httpClient.post<any>('profile/base', data, { params: { requestType: 'basic' }});
  }

  changePasssword(data: {currentPassword: string; newPassword: string; confirmNewPassword: string}): Observable<void> {
    return this.httpClient.post<any>('profile/changePassword', data,  { params: { requestType: 'basic' }});
  }

  getFullProfile(): Observable<Profile> {
    if (this.profile) {
      return of(this.profile);
    }

    return this.httpClient.get<any>('profile', { params: { requestType: 'basic' }})
      .pipe(
        map(data => {
          this.profile = createProfile(data);

          return this.profile;
        })
      );
  }
}

function createProfile(data: any): Profile {
  return new Profile({
    username: data.Username,
    email: data.Email,
    id: data.Id,
    firstname: data.Firstname,
    lastname: data.Lastname,
  });
}
