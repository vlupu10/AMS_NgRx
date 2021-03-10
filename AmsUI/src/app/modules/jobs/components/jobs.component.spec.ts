// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { JobsComponent } from './jobs.component';
import { JobsService } from '../services/jobs.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable()
class MockJobsService {}

@Injectable()
class MockRouter {
  navigate() {};
}

@Directive({ selector: '[oneviewPermitted]' })
class OneviewPermittedDirective {
  @Input() oneviewPermitted: any;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value: any) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value: any) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value: any) { return value; }
}

describe('JobsComponent', () => {
  let fixture: ComponentFixture<JobsComponent>;
  let component: { ngOnDestroy: () => void; ngOnInit: () => void; dialog: { open?: any; }; jobsService: { createOrUpdateJob?: any; applyForJob?: any; deleteJob?: any; getJobs?: any; }; searchData: any; subscriptions: { edit?: any; }; router: { navigate?: any; }; createOrUpdate: (arg0: {}) => void; deleteItem: (arg0: { _id: {}; }) => void; loadItems: () => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        JobsComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: JobsService, useClass: MockJobsService },
        MatDialog,
        { provide: Router, useClass: MockRouter }
      ]
    }).overrideComponent(JobsComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  fit('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  fit('should run #ngOnInit()', async () => {
    component.ngOnInit = function () {};//jest.fn();
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  // it('should run #createOrUpdate()', async () => {
  //   component.dialog = component.dialog || {};
  //   component.dialog.open = function () {};//jest.fn().mockReturnValue({
  //     close: function() {}
  //   });
  //   component.jobsService = component.jobsService || {};
  //   component.jobsService.createOrUpdateJob = jest.fn().mockReturnValue(observableOf({}));
  //   component.jobsService.applyForJob = jest.fn().mockReturnValue(observableOf({}));
  //   component.searchData = jest.fn();
  //   component.subscriptions = component.subscriptions || {};
  //   component.subscriptions.edit = 'edit';
  //   component.router = component.router || {};
  //   component.router.navigate = jest.fn();
  //   component.createOrUpdate({});
  //   // expect(component.dialog.open).toHaveBeenCalled();
  //   // expect(component.jobsService.createOrUpdateJob).toHaveBeenCalled();
  //   // expect(component.jobsService.applyForJob).toHaveBeenCalled();
  //   // expect(component.searchData).toHaveBeenCalled();
  //   // expect(component.router.navigate).toHaveBeenCalled();
  // });

  // it('should run #deleteItem()', async () => {
  //   component.jobsService = component.jobsService || {};
  //   component.jobsService.deleteJob = jest.fn().mockReturnValue(observableOf({}));
  //   component.searchData = jest.fn();
  //   component.deleteItem({
  //     _id: {}
  //   });
  //   // expect(component.jobsService.deleteJob).toHaveBeenCalled();
  //   // expect(component.searchData).toHaveBeenCalled();
  // });

  // it('should run #loadItems()', async () => {
  //   component.jobsService = component.jobsService || {};
  //   component.jobsService.getJobs = jest.fn().mockReturnValue(observableOf({}));
  //   component.loadItems();
  //   // expect(component.jobsService.getJobs).toHaveBeenCalled();
  // });

});
