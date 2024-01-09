import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlSegmentGroup, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  // Aunque router ya ha sido injectado con anterioridad no se crea una nueva instancia dado que esta ya está guardada en memoria y simplemente la reutiliza! Genial! :)
  const router      = inject(Router);

  console.log({status : authService.authStatus()});

  // Los guards como funciones son mas usados que las clases dado que son mas ligeros y mas rapidos

  if(authService.authStatus() === AuthStatus.authenticated){
    console.log("Usuario autenticado");
    return true;
  };

  const urlTreeResult = router.createUrlTree(['/login']);

  return urlTreeResult;
};
