// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login';
import { Cajero } from './modules/cajero/cajero';
import { Admin } from './modules/admin/admin';
import { CatalogoComponent } from './modules/catalogo/catalogo';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'cajero',
        component: Cajero
    },
    {
        path: 'admin',
        component: Admin,
    },
    {
        path: 'catalogo',
        component: CatalogoComponent,
    },
    // Ruta por defecto
    {
        path: '**',
        redirectTo: ''
    }
];