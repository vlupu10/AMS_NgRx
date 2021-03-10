import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { OnDestroyComponent } from '../../../../core/common/on-destroy.component';
import { Job } from '../../models/job.model';
import { User } from 'src/app/modules/users/models/user.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ams-materials-dialog',
  templateUrl: './jobs-dialog.component.html',
  styleUrls: ['../../../../ams-portal/common/content-styles.scss', './jobs-dialog.component.scss'],
})

export class JobsDialogComponent extends OnDestroyComponent implements OnInit {
  form: FormGroup = this.fb.group({...new Job()});
  isAdd = false;
  isDirty = false;
  role = 'user';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      job: Job,
      title: string,
      onSave(job: Job, type: boolean): void,
      onCancel(isDirty: boolean): void,
      onApply(jobId: string | undefined): void,
    },
    private readonly fb: FormBuilder,
    private readonly datePipe: DatePipe,
  ) {
    super();
  }

  get title(): string {
    return `${ this.data.title } job`;
  }

  ngOnInit(): void {
    this.isAdd = this.data.title === 'Add';
    const ls = localStorage.getItem('user');

    if (ls){
      this.role = JSON.parse(ls).role;
    }
    console.log('role', this.role);
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      type: [this.data.job.type, [Validators.required, Validators.maxLength(50)]],
      city: [this.data.job.city, [Validators.required]],
      date: [new Date(this.data.job.date)],
      employer: [this.data.job.employer, [Validators.required, Validators.maxLength(50)]],
      domain: [this.data.job.domain, [Validators.required, Validators.maxLength(50)]],
      requirements: [this.data.job.requirements, [Validators.required]],
      salary: [this.data.job.salary],
    });

    this.form.valueChanges.subscribe(() => {
      this.isDirty = true;
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const payload: Job = {
        ...this.data.job,
        domain: this.form.controls.domain.value,
        type: this.form.controls.type.value,
        city: this.form.controls.city.value,
        date: this.form.controls.date.value,
        employer: this.form.controls.employer.value,
        requirements: this.form.controls.requirements.value,
        salary: this.form.controls.salary.value,
      };
      this.data.onSave(payload, !this.isAdd);
    }
  }

  onApply(): void {
    this.data.onApply(this.data.job._id);
  }
}
