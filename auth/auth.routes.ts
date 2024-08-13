import { Route } from '@angular/router';
import { NoAuthGuard } from './guards';

export const authRoutes: Route[] = [
  {
    path: 'confirmation-required',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./confirmation-required/confirmation-required.routes').then(
        (m) => m.authConfirmationRequiredRoutes
      ),
  },
  {
    path: 'forgot-password',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./forgot-password/forgot-password.routes').then(
        (m) => m.authForgotPasswordRoutes
      ),
  },
  {
    path: 'reset-password',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./reset-password/reset-password.routes').then(
        (m) => m.authResetPasswordRoutes
      ),
  },
  {
    path: 'confirm-reset-password',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./confirm-reset-password/confirm-reset-password.routes').then(
        (m) => m.authConfirmResetPasswordRoutes
      ),
  },
  {
    path: 'sign-in',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./sign-in/sign-in.routes').then((m) => m.authSignInRoutes),
  },
  {
    path: 'sign-up',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./sign-up/sign-up.routes').then((m) => m.authSignUpRoutes),
  },
  {
    path: 'sign-out',
    loadChildren: () =>
      import('./sign-out/sign-out.routes').then((m) => m.authSignOutRoutes),
  },
];
