import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FORM_VALIDATION } from './form-validation.const';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ams-validation-error',
  templateUrl: './validation-error.component.html',
})
export class ValidationErrorComponent {
  validationMessageList = FORM_VALIDATION;
  @Input()
  form: FormGroup = new FormGroup({});
  @Input() controlName: any;

  checkIfValid(validationType: string): boolean {
    const control = this.form.get(this.controlName);
    if (control && (control.dirty || control.touched) && control.invalid && control.errors) {
      const errors = Object.keys(control.errors);

      return errors[0] === validationType;
    }

    return false;
  }
}
