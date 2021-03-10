import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { OnDestroyComponent } from '../../../../core/common/on-destroy.component';
import { Application } from '../../models/application.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ams-applications-dialog',
  templateUrl: './applications-dialog.component.html',
  styleUrls: ['../../../../ams-portal/common/content-styles.scss', './applications-dialog.component.scss'],
})

export class ApplicationsDialogComponent extends OnDestroyComponent implements OnInit {
  form!: FormGroup;
  isAdd = false;
  isDirty = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      application: Application,
      title: string,
      onSave(application: Application, type: boolean): void,
      onCancel(isDirty: boolean): void
    },
    private readonly fb: FormBuilder,
    private readonly datePipe: DatePipe,
  ) {
    super();
  }

  get title(): string {
    return `${ this.data.title } application`;
  }

  ngOnInit(): void {
    this.isAdd = this.data.title === 'Add';
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      resume: [this.data.application.resume, [Validators.required]],
      date: [new Date(this.data.application.date)],
    });

    this.form.valueChanges.subscribe(() => {
      this.isDirty = true;
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const payload: Application = {
        ...this.data.application,
        resume: this.form.controls.resume.value,
        date: this.form.controls.date.value,
      };
      this.data.onSave(payload, !this.isAdd);
    }
  }
}
