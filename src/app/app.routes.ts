import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard, authGuardGuard } from './auth/guards/index.guards';

export const routes: Routes = [

  {
    path : 'auth',
    // Guards
    canActivate: [isNotAuthenticatedGuard],
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
