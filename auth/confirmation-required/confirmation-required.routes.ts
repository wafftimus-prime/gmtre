import { Routes } from '@angular/router';
import { AuthConfirmationRequiredComponent } from './confirmation-required.component';

export const authConfirmationRequiredRoutes: Routes = [
    {
        path     : '',
        component: AuthConfirmationRequiredComponent,
    },
]