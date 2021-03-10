import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { OnDestroyComponent } from '../../../../core/common/on-destroy.component';
// import { areControlsEqualValidator } from '../../../../settings-portal/directives/are-controls-equal.validator';
// import { isValueUniqueValidator } from '../../../../settings-portal/directives/is-value-unique.validator';
// import { nonWhitespacesValueValidator } from '../../../../settings-portal/directives/non-whitespaces-value.validator';
// import { valueMatchValidator } from '../../../../settings-portal/directives/value-match.validator';
// import { UniqueValidation } from '../../../../settings-portal/models/unique-validation.enum';
// import { CommonPortalService } from '../../../../settings-portal/services/common-portal.service';

@Component({
  selector: 'sp-password-dialog',
  templateUrl: 'password-dialog.component.html',
  styleUrls: ['password-dialog.component.scss'],
})
export class PasswordDialogComponent extends OnDestroyComponent {
  form!: FormGroup;
  warningText = 'When deleting categories, you may have existing items which refer to the category you wish to delete. Choose a replacement, and these items will be updated to point to the new category.';
  taxesList = [];
  currentPass = '';
  oldPassView = true;
  newPassView = true;
  confirmPassView = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      onSave(item: string): void,
    },
    private readonly fb: FormBuilder,
    // private readonly commonPortalService: CommonPortalService
    ) {
      super();
     }

  // ngOnInit(): void {
  //   this.form = this.fb.group({
  //     currentPassword: ['', {
  //       validators: [
  //         Validators.required,
  //         // TODO we need approve from Mike about new validation rules
  //         // Validators.maxLength(100),
  //       ],
  //       asyncValidators:  isValueUniqueValidator(this.commonPortalService, UniqueValidation.CURRENT_PASSWORD),
  //       updateOn: 'blur',
  //     }],
  //     newPassword: ['', [
  //       Validators.required,
  //       Validators.maxLength(100),
  //       Validators.minLength(4),
  //       nonWhitespacesValueValidator(),
  //       // passwordFormatValidator(),
  //     ]],
  //     confirmNewPassword: ['', Validators.required],
  //   }, {validators: areControlsEqualValidator('newPassword', 'confirmNewPassword')});

  //   // to add the currentPass value dynamically to valueMatchValidator
  //   this.subscriptions.currentPassstatus = this.form.get('currentPassword').statusChanges
  //     .subscribe((status: string) => {
  //       if (status === 'VALID') {
  //         const newPassControl = this.form.get('newPassword');
  //         newPassControl.setValidators([
  //           Validators.required,
  //           Validators.maxLength(100),
  //           Validators.minLength(4),
  //           nonWhitespacesValueValidator(),
  //           valueMatchValidator(this.form.get('currentPassword').value, true),
  //         ]);
  //         newPassControl.updateValueAndValidity();
  //       }
  //     });
  // }

  // onSave(): void {
  //   if (this.form.valid) {
  //     this.data.onSave(this.form.value);
  //   }

  //   this.form.markAllAsTouched();
  // }

}
