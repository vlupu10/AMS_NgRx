import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, first, map, switchMap } from 'rxjs/operators';

import { UniqueValidation } from '../models/unique-validation.enum';
import { CommonPortalService } from '../services/common-portal.service';

export function isValueUniqueValidator(
  service: CommonPortalService,
  type: UniqueValidation,
  data?: {id: string, originalValue?: string},
  updateOnBlur?: boolean): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value: string = control.value;
    if (value === data?.originalValue) {
      return of(undefined);
    }

    if (!updateOnBlur) {
      return control.valueChanges.pipe(
        debounceTime(700),
        distinctUntilChanged(),
        switchMap(controlValue => {
          if (controlValue === data?.originalValue) {
            return of(undefined);
          }

          return service.checkIfUnique({value, id: data ? data.id : undefined }, type)
            .pipe(
              map((res: {ReturnValue: number}) => {
                return res.ReturnValue < 0 ? { notUnique: true } : undefined;
              })
            );
        }),
        first(),
        finalize(() => {
          control.markAsTouched();
        })
      );
    }

    return service.checkIfUnique({value, id: data ? data.id : undefined }, type)
      .pipe(
        map((res: {ReturnValue: number}) => {
          return res.ReturnValue < 0 ? { notUnique: true } : undefined;
        })
      );
  };
}
