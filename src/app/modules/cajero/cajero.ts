import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cajero',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe],
  templateUrl: './cajero.html',
  styleUrls: ['./cajero.css']
})
export class Cajero implements OnInit {
  
  // Propiedades del header
  nombreCajero: string = 'Juan Pérez';
  fechaActual: Date = new Date();

  // Propiedades para estadísticas del día
  ventasDelDia: number = 12;
  totalVendidoDia: number = 15750.50;
  productosVendidosDia: number = 48;

  constructor() {}

  ngOnInit(): void {
    // Inicialización del componente
    console.log('Menú del cajero iniciado');
  }

  // Métodos de navegación
  irARegistrarVenta(): void {
    console.log('Navegando a Registrar Venta...');
    // Aquí implementarías la navegación usando Angular Router
    // Ejemplo: this.router.navigate(['/cajero/venta']);
  }

  irACatalogo(): void {
    console.log('Navegando a Catálogo...');
    // Aquí implementarías la navegación usando Angular Router  
    // Ejemplo: this.router.navigate(['/catalogo']);
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
      console.log('Cerrando sesión...');
      // Aquí implementarías la lógica de cierre de sesión
      // Ejemplo: 
      // this.authService.logout();
      // this.router.navigate(['/login']);
    }
  }
}