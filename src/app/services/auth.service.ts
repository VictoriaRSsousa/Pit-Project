import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  router = new Router();
  login({ email, senha }: any) {
    if (email === 'admin@iot.com' && senha === '123456') {
      localStorage.setItem('token', 'FAKE_TOKEN_IOT');
      this.router.navigate(['/']);
      return of(true).pipe(delay(1500));
    }

    return throwError(() => new Error("Credenciais inválidas")).pipe(delay(1000));
  }
}
