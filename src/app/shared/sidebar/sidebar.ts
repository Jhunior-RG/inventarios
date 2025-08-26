// sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
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
      icon: '📊',
      roles: ['admin']
    },
    {
      label: 'Caja',
      route: '/cajero',
      icon: '💰',
      roles: ['cajero', 'admin']
    },
    {
      label: 'Usuarios',
      route: '/usuarios',
      icon: '👥',
      roles: ['admin']
    },
    {
      label: 'Productos',
      route: '/productos',
      icon: '📦',
      roles: ['admin', 'cajero']
    },
    {
      label: 'Reportes',
      route: '/reportes',
      icon: '📈',
      roles: ['admin']
    },
    {
      label: 'Configuración',
      route: '/configuracion',
      icon: '⚙️',
      roles: ['admin']
    }
  ];

  constructor(private router: Router) {}

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
    return 'Juan Pérez';
  }

  getUserRole(): string {
    return this.userRole === 'admin' ? 'Administrador' : 'Cajero';
  }
}