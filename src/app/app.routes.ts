import { Routes } from '@angular/router';
import { authGuardGuard } from './auth/guards/auth-guard.guard';

export const routes: Routes = [

  {
    path : 'auth',
    // Guards
    loadChildren : ()=> import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path : 'dashboard',
    // Guards
    canActivate : [authGuardGuard],
    loadChildren : ()=> import('./dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path : '**',
    redirectTo:'auth'
  }
]
