import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../app/login/shared/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let onlyDonorAllowed = route.data['donorOnly'];

  if (authService.isLoggedIn()) {
    if (onlyDonorAllowed) {
      return authService.isDonor();
    }

    return true;
  }

  router.navigate(['/login']);

  return false;
};
