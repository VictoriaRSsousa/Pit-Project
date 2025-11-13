import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./views/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'login', loadComponent: () => import('./views/login/login.component').then(m => m.LoginComponent) },
    { path: '**', redirectTo: '' },
];
