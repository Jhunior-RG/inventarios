// sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';


interface MenuItem {
  label: string;
  route: string;
  icon?: string;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit {

  currentRoute = '';
  userRole = 'admin'; // Esto vendría de tu servicio de autenticación

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      route: '/admin',
      icon: `<i class="pi pi-chart-line" style="font-size: 2.5rem"></i>`,

      roles: ['admin']
    },
    {
      label: 'Usuarios',
      route: '/usuarios',
      icon: `<i class="pi pi-user" style="font-size: 2.5rem"></i>`,
      roles: ['admin']
    },
    {
      label: 'Farmacos',
      route: '/productos',
      icon: `<i class="pi pi-list-check" style="font-size: 2.5rem"></i>`,

      roles: ['admin', 'cajero']
    },
    {
      label: 'Reportes',
      route: '/reportes',

      icon: `<i class="pi pi-file-export" style="font-size: 2.5rem"></i>`,
      roles: ['admin']
    },
    {
      label: 'Configuración',
      route: '/configuracion',
      icon: `<i class="pi pi-cog" style="font-size: 2.5rem"></i>`,

      roles: ['admin']
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Obtener la ruta actual
    this.currentRoute = this.router.url;

    // Escuchar cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }


  isMenuItemVisible(item: MenuItem): boolean {
    return !item.roles || item.roles.includes(this.userRole);
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  logout(): void {
    // Implementar lógica de logout
    console.log('Cerrando sesión...');
    this.router.navigate(['/']);
  }

  getUserName(): string {
    // Esto vendría de tu servicio de usuario
    return 'Pablo Hans';
  }

  getUserRole(): string {
    return this.userRole === 'admin' ? 'Administrador' : 'Cajero';
  }
}