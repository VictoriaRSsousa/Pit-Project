import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guards';

export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./views/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    { 
        path: 'login',
        loadComponent: () => import('./views/login/login.component').then(m => m.LoginComponent), 
        canActivate: [noAuthGuard]
    },
    { path: '**', redirectTo: '/login' },
];
