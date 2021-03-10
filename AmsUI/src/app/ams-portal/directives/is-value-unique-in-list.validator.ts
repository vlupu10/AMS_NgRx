import { AbstractControl, ValidatorFn } from '@angular/forms';

export function isValueUniqueInListValidator(list: Array<string>, originalValue?: string): ValidatorFn | null {
  return (control: AbstractControl): {[key: string]: boolean} | null  => {
    if (control.value !== undefined) {
      const value = control.value.trim()
        .toLocaleLowerCase();
      // tslint:disable-next-line: newline-per-chained-call
      const basicValue = originalValue ? originalValue.trim().toLocaleLowerCase() : '';
      if (value !== basicValue) {
        // tslint:disable-next-line: newline-per-chained-call
        if (list.some(item => item.trim().toLocaleLowerCase() === value)) {
          return { notUnique: true };
        }
      }
    }

    return null;
  };
}
