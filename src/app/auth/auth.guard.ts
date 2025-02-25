import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const guardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router      = inject(Router)

  if (authService.isAutentificated()){
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};
