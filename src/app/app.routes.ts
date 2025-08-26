import { Routes } from '@angular/router';
import { Login } from './modules/login/login';
import { Home } from './modules/home/home';
import { Cajero } from './modules/cajero/cajero';

export const routes: Routes = [
    {
        path: '',
        component: Login,
    },
    {
      path: 'cajero', component: Cajero 
    }
];