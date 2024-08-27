import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!!auth.isAuthenticated()){
    router.navigateByUrl('')
    return false;
  }
  return true;
};
