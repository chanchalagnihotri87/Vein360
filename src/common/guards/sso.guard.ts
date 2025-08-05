import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../app/login/shared/auth.service';

export const ssoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let ssoLogin = route.queryParams['sso'];
  let id = route.queryParams['id'];

  if (ssoLogin && id) {
    router.navigate(['/sso', id]);
    return false;
  }

  return true;
};
