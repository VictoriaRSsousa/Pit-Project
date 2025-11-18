import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, CpuIcon } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly cpuIcon = CpuIcon;
  isLoggedIn = false;

  @Input() logout!: () => void;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    // Só acessa o localStorage no navegador
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  }

  handleLogout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }
}
