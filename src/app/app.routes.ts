import { Routes } from '@angular/router';
import { Login } from './modules/login/login';
import { Cajero } from './modules/cajero/cajero';
import { Admin } from './modules/admin/admin';

export const routes: Routes = [
    {
        path: '',
        component: Login,
    },
    {
        path: 'cajero', component: Cajero
    }, {
        path: 'admin',
        component: Admin,
    }
];