import { NgModule } from '@angular/core';
import { UsersComponent } from './components/users.component';
import { UsersService } from './services/users.service';
import { AmsPortalModule } from 'src/app/ams-portal/ams-portal.module';
import { RouterModule } from '@angular/router';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';

@NgModule({
  imports: [
    AmsPortalModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent
      }
    ])
  ],
  declarations: [UsersComponent, UsersDialogComponent],
  providers: [UsersService],
})
export class UsersModule { }
