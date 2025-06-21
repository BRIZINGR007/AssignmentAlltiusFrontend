import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    {
        path: 'login',
        loadComponent: () =>
            import('./layout/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'signup',
        loadComponent: () =>
            import('./layout/signup/signup.component').then(m => m.SignupComponent),
    },
    {
        path: '',
        loadComponent: () =>
            import('./layout/chat-dashboard/chat-dashboard.component').then(m => m.ChatDashboardComponent),
        canActivate: [authGuard],
    }
];
