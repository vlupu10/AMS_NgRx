import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Check if 2 controls match
 * @param controlName matched control
 * @param matchingControlName matching control
 * @returns ValidatorFn
 */
export function areControlsEqualValidator(controlName: string, matchingControlName: string): ValidatorFn | null {
  return (form: AbstractControl) => {
    const control = form.get(controlName);
    const matchingControl = form.get(matchingControlName);

    if (matchingControl?.invalid && !matchingControl.errors?.areEqual) {
      // return if another validator has already found an error on the matchingControl
      return null;
    }
    // set error on matchingControl if validation fails
    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ areEqual: true });
    } else {
      matchingControl?.setErrors(null);
    }
    return null;
  };
}
