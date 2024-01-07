import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuardGuard: CanActivateFn = (route, state) => {



  return true;
};
