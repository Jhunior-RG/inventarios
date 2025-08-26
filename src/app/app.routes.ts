import { Routes } from '@angular/router';
import { Login } from './modules/login/login';
import { Home } from './modules/home/home';
import {  Admin } from './modules/admin/admin';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'admin',
        component: Admin,
    }
];