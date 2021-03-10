import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { OnDestroyComponent } from '../../../../core/common/on-destroy.component';
import { EMAIL_PATTERN } from '../../../../core/common/utils';
import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';

@Component({
  selector: 'sp-profile-layout',
  templateUrl: 'profile-layout.component.html',
  styleUrls: ['../../../../ams-portal/common/content-styles.scss', 'profile-layout.component.scss'],
})
export class ProfileLayoutComponent extends OnDestroyComponent implements OnInit {

  profile!: Profile;
  nameForm!: FormGroup;
  emailForm!: FormGroup;
  emailEditing = false;
  usernameEditing = false;

  constructor(
    private readonly profileService: ProfileService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.profile = this.profileService.getProfile()
      .subscribe((data: Profile) => {
        this.profile = data;

        this.nameForm = this.fb.group({
          username: [
            { value: data.username, disabled: true },
            {
              validators: [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(99),
              ],
            },
          ],
        });

        this.emailForm = this.fb.group({
          email: [
            { value: data.email, disabled: true },
            {
              validators: [Validators.required, Validators.pattern(EMAIL_PATTERN)],
            },
          ],
        });
      });
  }

  switchFieldState(form: FormGroup, controlName: string, editMode: boolean): void {
    if ((!this.usernameEditing && controlName === 'email') || (!this.emailEditing && controlName === 'username')) {
      this.switchEditMode(controlName, editMode);
    }
  }

  saveChanges(form: FormGroup, controlName: string): void {  }

  switchEditMode(field: string, mode: boolean): void {  }

  changePass(): void {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        accountId: this.profile.id,
        onSave: (data: { currentPassword: string; newPassword: string; confirmNewPassword: string }) => {
          dialogRef.close();
          this.subscriptions.pass = this.profileService.changePasssword(data)
            .subscribe();
        },
      },
    });
  }
}
