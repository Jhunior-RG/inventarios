// admin.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';

// Registrar Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
  standalone: true,
  imports: [DecimalPipe]
})
export class Admin implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('ventasChart') ventasCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('gananciasChart') gananciasCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('productosChart') productosCanvas!: ElementRef<HTMLCanvasElement>;

  private ventasChart: any = null;
  private gananciasChart: any = null;
  private productosChart: any = null;
  
  // Stats data
  totalVentas = 125430;
  totalProductos = 1250;
  clientesActivos = 340;
  crecimientoMensual = 15.8;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeCharts();
    }, 100);
  }

  private initializeCharts(): void {
    this.createVentasChart();
    this.createGananciasChart();
    this.createProductosChart();
  }

  private createVentasChart(): void {
    if (this.ventasCanvas) {
      const ctx = this.ventasCanvas.nativeElement.getContext('2d');
      if (ctx) {
        this.ventasChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
            datasets: [{
              label: 'Ventas ($)',
              data: [12000, 19000, 15000, 25000, 22000, 30000],
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: 'rgb(59, 130, 246)',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            }
          } as any
        });
      }
    }
  }

  private createGananciasChart(): void {
    if (this.gananciasCanvas) {
      const ctx = this.gananciasCanvas.nativeElement.getContext('2d');
      if (ctx) {
        this.gananciasChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            datasets: [{
              data: [300, 450, 320, 580, 690, 420, 280],
              backgroundColor: [
                '#ef4444',
                '#f97316', 
                '#eab308',
                '#22c55e',
                '#06b6d4',
                '#3b82f6',
                '#8b5cf6'
              ],
              borderWidth: 3,
              borderColor: '#fff',
              hoverBorderWidth: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%'
          } as any
        });
      }
    }
  }

  private createProductosChart(): void {
    if (this.productosCanvas) {
      const ctx = this.productosCanvas.nativeElement.getContext('2d');
      if (ctx) {
        this.productosChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Paracetamol', 'Amoxilina', 'Ibuprofeno', 'Insulina Glargina', 'Omeprazol'],
            datasets: [{
              label: 'Unidades Vendidas',
              data: [120, 190, 300, 50, 200],
              backgroundColor: [
                'rgba(34, 197, 94, 0.8)',
                'rgba(59, 130, 246, 0.8)',
                'rgba(168, 85, 247, 0.8)',
                'rgba(249, 115, 22, 0.8)',
                'rgba(236, 72, 153, 0.8)'
              ],
              borderColor: [
                'rgb(34, 197, 94)',
                'rgb(59, 130, 246)',
                'rgb(168, 85, 247)',
                'rgb(249, 115, 22)',
                'rgb(236, 72, 153)'
              ],
              borderWidth: 2,
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            }
          } as any
        });
      }
    }
  }

  private loadDashboardData(): void {
    setTimeout(() => {
      console.log('Dashboard data loaded');
    }, 1000);
  }

  refreshData(): void {
    this.totalVentas += Math.floor(Math.random() * 1000);
    this.clientesActivos += Math.floor(Math.random() * 10);

    // Actualizar gráfico de ventas
    if (this.ventasChart) {
      this.ventasChart.data.datasets[0].data = [
        Math.floor(Math.random() * 35000) + 10000,
        Math.floor(Math.random() * 35000) + 10000,
        Math.floor(Math.random() * 35000) + 10000,
        Math.floor(Math.random() * 35000) + 10000,
        Math.floor(Math.random() * 35000) + 10000,
        Math.floor(Math.random() * 35000) + 10000
      ];
      this.ventasChart.update();
    }

    // Actualizar gráfico de productos
    if (this.productosChart) {
      this.productosChart.data.datasets[0].data = [
        Math.floor(Math.random() * 200) + 50,
        Math.floor(Math.random() * 200) + 50,
        Math.floor(Math.random() * 200) + 50,
        Math.floor(Math.random() * 200) + 50,
        Math.floor(Math.random() * 200) + 50
      ];
      this.productosChart.update();
    }
  }

  exportData(): void {
    console.log('Exportando datos del dashboard...');
    // Implementar lógica de exportación
  }

  ngOnDestroy(): void {
    if (this.ventasChart) {
      this.ventasChart.destroy();
    }
    if (this.gananciasChart) {
      this.gananciasChart.destroy();
    }
    if (this.productosChart) {
      this.productosChart.destroy();
    }
  }
}