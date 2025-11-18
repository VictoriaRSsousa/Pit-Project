import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLogged = localStorage.getItem('token'); // sua lógica de login

  if (isLogged) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
