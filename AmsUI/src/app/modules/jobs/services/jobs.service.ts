import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Job } from './../models/job.model';
import { ApplicationsService } from '../../applications/services/applications.service';
import { Application } from '../../applications/models/application.model';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
    private httpClient: HttpClient,
    private applicationsService: ApplicationsService,
  ) { }

  getJobs(): Observable<Job[]> {
    return this.httpClient.get<Job[]>('jobs', { params: { requestType: 'AMS.API'} })
    .pipe(
      map(data => {

        return data;
      })
    );
  }

  createOrUpdateJob(job: Job, type: boolean, id?: string): any {
    if (!type) {
      delete job._id;
    }
    return type ? this.httpClient.put<Job>(`jobs/${id}`, job, { params: { requestType: 'AMS.API'} }) :
    this.httpClient.post<Job>('jobs', job, { params: { requestType: ''} });
  }

  deleteJob(id: string): any {
    return this.httpClient.delete<string>(`jobs/${id}`, { params: { requestType: 'AMS.API'} });
  }

  applyForJob(jobId: string): any {
    const application: Application = new Application({
      userId: '602201203fc1f24d8ccceb9e',// TODO: current_user
      jobId,
      resume: 'Experience with multiple accounting software: ACCPAC, SAMPCO, Navision, QuickBooks, Simply Accounting, Jonas for Construction and specialized in-house accounting software'
    });
    delete application._id;
    return this.httpClient.post<Application>('applications', application, { params: { requestType: ''} });
  }

}
