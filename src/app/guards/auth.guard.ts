import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLogged = localStorage.getItem('token'); // ou sua lógica de autenticação

  if (isLogged) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
