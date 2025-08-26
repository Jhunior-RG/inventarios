import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login';
import { Home } from './modules/home/home';
import { Cajero } from './modules/cajero/cajero';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
      path: 'cajero', component: Cajero 
    }
];