import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Application } from './../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private httpClient: HttpClient) { }

  getApplications(): Observable<Application[]> {
    return this.httpClient.get<Application[]>('applications', { params: { requestType: 'AMS.API'} })
    .pipe(
      map(data => {

        return data;
      })
    );
  }

  createOrUpdateApplication(application: Application, type: boolean, id?: string): any {
    if (!type) {
      delete application._id;
    }
    return type ? this.httpClient.put<Application>(`applications/${id}`, application, { params: { requestType: 'AMS.API'} }) :
    this.httpClient.post<Application>('applications', application, { params: { requestType: ''} });
  }

  deleteApplication(id: string) {
    return this.httpClient.delete<string>(`applications/${id}`, { params: { requestType: 'AMS.API'} });
  }
}
