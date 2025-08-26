import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cajero',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe],
  templateUrl: './cajero.html',
  styleUrls: ['./cajero.css']
})
export class Cajero implements OnInit {
  nombreCajero: string = 'Pablo Hans';
  fechaActual: Date = new Date();
  ventasDelDia: number = 12;
  totalVendidoDia: number = 15750.50;
  productosVendidosDia: number = 48;

  constructor(private router: Router) {} // <- inyectamos el Router

  ngOnInit(): void {
    console.log('Menú del cajero iniciado');
  }

  // Métodos de navegación
  irARegistrarVenta(): void {
    console.log('Navegando a Registrar Venta...');
    //this.router.navigate(['/cajero/venta']); 
  }

  irACatalogo(): void {
    console.log('Navegando a Catálogo...');
    this.router.navigate(['/catalogo']);  
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
      console.log('Cerrando sesión...');
      this.router.navigate(['/login']); 
    }
  }
}
