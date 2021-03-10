import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'portal', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./ams-portal/ams-portal.module')
      .then(m => m.AmsPortalModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./shared/components/login/login.module')
      .then(m => m.LoginModule),
  },
  {
    path: 'registration',
    loadChildren: () => import('./shared/components/registration/registration.module')
      .then(m => m.RegistrationModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/not-found/not-found.module')
      .then(m => m.NotFoundModule),
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule { }

