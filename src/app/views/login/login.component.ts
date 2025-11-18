import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, MailIcon,LockIcon, LoaderIcon } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  readonly mailIcon = MailIcon;
  readonly lockIcon = LockIcon
  readonly loaderIcon = LoaderIcon;
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  senhaForte(): string {
    const senha = this.form.get('senha')?.value || '';
    if (senha.length >= 12 && /[A-Z]/.test(senha) && /\d/.test(senha) && /\W/.test(senha)) return 'forte';
    if (senha.length >= 8) return 'media';
    return 'fraca';
  }

  entrar() {
    if (this.form.invalid) return;

    this.loading = true;

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loading = false;
        alert('Credenciais inválidas!');
      }
    });
  }
}
