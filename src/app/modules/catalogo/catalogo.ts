import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Route, Router } from '@angular/router';

// Interface para medicamento
interface Medicamento {
  id: number;
  codigo: string;
  nombre: string;
  principioActivo: string;
  proveedor: string;
  industria: string;
  paisProcedencia: string;
  capacidad: string;
  dosis: string;
  tipoUnidad: string;
  precio: number;
  stock: number;
  requiereReceta: boolean;
  fechaVencimiento: Date;
  lote: string;
  ubicacion?: string;
  categoria?: string;
}

// Interface para filtros
interface FiltrosCatalogo {
  busqueda: string;
  proveedor: string;
  industria: string;
  pais: string;
  tipoUnidad: string;
  stock: string;
  precioMin: number | null;
  precioMax: number | null;
  requiereReceta: string;
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './catalogo.html',
})
export class CatalogoComponent implements OnInit {

  // Propiedades para filtros
  filtros: FiltrosCatalogo = {
    busqueda: '',
    proveedor: '',
    industria: '',
    pais: '',
    tipoUnidad: '',
    stock: '',
    precioMin: null,
    precioMax: null,
    requiereReceta: ''
  };
  
  constructor(private router: Router) {}

  // Arrays para opciones de filtros
  proveedores: string[] = [
    'Farmacia Nacional',
    'Distribuidora Médica SA',
    'Pharma Supply',
    'Medical Import Co.',
    'Droguería Central',
    'Suministros Hospitalarios'
  ];

  industrias: string[] = [
    'Pfizer',
    'Roche',
    'Novartis',
    'Bayer',
    'Johnson & Johnson',
    'GlaxoSmithKline',
    'Merck',
    'Abbott',
    'Sanofi',
    'Bristol-Myers Squibb',
    'Laboratorios Bagó',
    'Genfar'
  ];

  paises: string[] = [
    'Bolivia',
    'Argentina',
    'Brasil',
    'Chile',
    'Colombia',
    'Perú',
    'Estados Unidos',
    'Alemania',
    'Francia',
    'Suiza',
    'India',
    'México'
  ];

  tiposUnidad: string[] = [
    'Tabletas',
    'Cápsulas',
    'ml',
    'mg',
    'Ampolla',
    'Vial',
    'Sobres',
    'Gotas',
    'Crema',
    'Jarabe',
    'Inyección',
    'Parches'
  ];

  // Datos de medicamentos (simulado)
  medicamentos: Medicamento[] = [
    {
      id: 1,
      codigo: 'MED001',
      nombre: 'Paracetamol',
      principioActivo: 'Acetaminofén',
      proveedor: 'Farmacia Nacional',
      industria: 'Genfar',
      paisProcedencia: 'Colombia',
      capacidad: '500mg',
      dosis: '1 tableta cada 8 horas',
      tipoUnidad: 'Tabletas',
      precio: 12.50,
      stock: 150,
      requiereReceta: false,
      fechaVencimiento: new Date('2025-12-31'),
      lote: 'LOT001'
    },
    {
      id: 2,
      codigo: 'MED002',
      nombre: 'Amoxicilina',
      principioActivo: 'Amoxicilina',
      proveedor: 'Distribuidora Médica SA',
      industria: 'Pfizer',
      paisProcedencia: 'Estados Unidos',
      capacidad: '500mg',
      dosis: '1 cápsula cada 8 horas',
      tipoUnidad: 'Cápsulas',
      precio: 28.75,
      stock: 85,
      requiereReceta: true,
      fechaVencimiento: new Date('2025-08-15'),
      lote: 'LOT002'
    },
    {
      id: 3,
      codigo: 'MED003',
      nombre: 'Ibuprofeno',
      principioActivo: 'Ibuprofeno',
      proveedor: 'Pharma Supply',
      industria: 'Bayer',
      paisProcedencia: 'Alemania',
      capacidad: '400mg',
      dosis: '1 tableta cada 6 horas',
      tipoUnidad: 'Tabletas',
      precio: 18.90,
      stock: 5,
      requiereReceta: false,
      fechaVencimiento: new Date('2026-03-20'),
      lote: 'LOT003'
    },
    {
      id: 4,
      codigo: 'MED004',
      nombre: 'Insulina Glargina',
      principioActivo: 'Insulina Glargina',
      proveedor: 'Medical Import Co.',
      industria: 'Sanofi',
      paisProcedencia: 'Francia',
      capacidad: '100 UI/ml',
      dosis: 'Según prescripción médica',
      tipoUnidad: 'Vial',
      precio: 145.00,
      stock: 25,
      requiereReceta: true,
      fechaVencimiento: new Date('2025-10-10'),
      lote: 'LOT004'
    },
    {
      id: 5,
      codigo: 'MED005',
      nombre: 'Omeprazol',
      principioActivo: 'Omeprazol',
      proveedor: 'Droguería Central',
      industria: 'Abbott',
      paisProcedencia: 'Brasil',
      capacidad: '20mg',
      dosis: '1 cápsula al día',
      tipoUnidad: 'Cápsulas',
      precio: 35.20,
      stock: 0,
      requiereReceta: false,
      fechaVencimiento: new Date('2025-11-30'),
      lote: 'LOT005'
    },
    {
      id: 6,
      codigo: 'MED006',
      nombre: 'Losartán',
      principioActivo: 'Losartán Potásico',
      proveedor: 'Suministros Hospitalarios',
      industria: 'Merck',
      paisProcedencia: 'Estados Unidos',
      capacidad: '50mg',
      dosis: '1 tableta al día',
      tipoUnidad: 'Tabletas',
      precio: 42.80,
      stock: 120,
      requiereReceta: true,
      fechaVencimiento: new Date('2026-01-15'),
      lote: 'LOT006'
    },
    {
      id: 7,
      codigo: 'MED007',
      nombre: 'Salbutamol Inhalador',
      principioActivo: 'Salbutamol',
      proveedor: 'Farmacia Nacional',
      industria: 'GlaxoSmithKline',
      paisProcedencia: 'Reino Unido',
      capacidad: '100 mcg/dosis',
      dosis: '2 inhalaciones cada 4-6 horas',
      tipoUnidad: 'Inhalador',
      precio: 65.50,
      stock: 45,
      requiereReceta: true,
      fechaVencimiento: new Date('2025-09-25'),
      lote: 'LOT007'
    },
    {
      id: 8,
      codigo: 'MED008',
      nombre: 'Metformina',
      principioActivo: 'Metformina HCl',
      proveedor: 'Pharma Supply',
      industria: 'Bristol-Myers Squibb',
      paisProcedencia: 'Estados Unidos',
      capacidad: '500mg',
      dosis: '1 tableta con cada comida',
      tipoUnidad: 'Tabletas',
      precio: 22.30,
      stock: 95,
      requiereReceta: true,
      fechaVencimiento: new Date('2026-04-12'),
      lote: 'LOT008'
    }
  ];

  // Propiedades para tabla y paginación
  medicamentosFiltrados: Medicamento[] = [];
  medicamentosPaginados: Medicamento[] = [];
  paginaActual: number = 1;
  itemsPorPagina: number = 10;
  totalPaginas: number = 0;
  
  // Propiedades para ordenamiento
  columnaOrden: string = '';
  direccionOrden: 'asc' | 'desc' = 'asc';

  // Acceso a Math para el template
  Math = Math;

  

  ngOnInit(): void {
    this.medicamentosFiltrados = [...this.medicamentos];
    this.calcularPaginacion();
  }

  // Métodos de filtrado
  aplicarFiltros(): void {
    this.medicamentosFiltrados = this.medicamentos.filter(medicamento => {
      // Filtro de búsqueda
      const busqueda = this.filtros.busqueda.toLowerCase();
      const coincideBusqueda = !busqueda || 
        medicamento.nombre.toLowerCase().includes(busqueda) ||
        medicamento.codigo.toLowerCase().includes(busqueda) ||
        medicamento.principioActivo.toLowerCase().includes(busqueda);

      // Filtros de select
      const coincideProveedor = !this.filtros.proveedor || medicamento.proveedor === this.filtros.proveedor;
      const coincideIndustria = !this.filtros.industria || medicamento.industria === this.filtros.industria;
      const coincidePais = !this.filtros.pais || medicamento.paisProcedencia === this.filtros.pais;
      const coincideTipoUnidad = !this.filtros.tipoUnidad || medicamento.tipoUnidad === this.filtros.tipoUnidad;

      // Filtro de stock
      let coincideStock = true;
      if (this.filtros.stock === 'disponible') {
        coincideStock = medicamento.stock > 10;
      } else if (this.filtros.stock === 'bajo') {
        coincideStock = medicamento.stock > 0 && medicamento.stock <= 10;
      } else if (this.filtros.stock === 'agotado') {
        coincideStock = medicamento.stock === 0;
      }

      // Filtro de precio
      const coincidePrecioMin = this.filtros.precioMin === null || medicamento.precio >= this.filtros.precioMin;
      const coincidePrecioMax = this.filtros.precioMax === null || medicamento.precio <= this.filtros.precioMax;

      // Filtro de receta
      let coincideReceta = true;
      if (this.filtros.requiereReceta === 'true') {
        coincideReceta = medicamento.requiereReceta;
      } else if (this.filtros.requiereReceta === 'false') {
        coincideReceta = !medicamento.requiereReceta;
      }

      return coincideBusqueda && coincideProveedor && coincideIndustria && 
             coincidePais && coincideTipoUnidad && coincideStock && 
             coincidePrecioMin && coincidePrecioMax && coincideReceta;
    });

    this.paginaActual = 1;
    this.calcularPaginacion();
  }

  limpiarFiltros(): void {
    this.filtros = {
      busqueda: '',
      proveedor: '',
      industria: '',
      pais: '',
      tipoUnidad: '',
      stock: '',
      precioMin: null,
      precioMax: null,
      requiereReceta: ''
    };
    this.aplicarFiltros();
  }

  // Métodos de ordenamiento
  ordenar(columna: string): void {
    if (this.columnaOrden === columna) {
      this.direccionOrden = this.direccionOrden === 'asc' ? 'desc' : 'asc';
    } else {
      this.columnaOrden = columna;
      this.direccionOrden = 'asc';
    }

    this.medicamentosFiltrados.sort((a, b) => {
      let valorA: any = a[columna as keyof Medicamento];
      let valorB: any = b[columna as keyof Medicamento];

      if (typeof valorA === 'string') {
        valorA = valorA.toLowerCase();
        valorB = valorB.toLowerCase();
      }

      if (valorA < valorB) {
        return this.direccionOrden === 'asc' ? -1 : 1;
      }
      if (valorA > valorB) {
        return this.direccionOrden === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.calcularPaginacion();
  }

  // Métodos de paginación
  calcularPaginacion(): void {
    this.totalPaginas = Math.ceil(this.medicamentosFiltrados.length / this.itemsPorPagina);
    this.actualizarPaginaActual();
  }

  actualizarPaginaActual(): void {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.medicamentosPaginados = this.medicamentosFiltrados.slice(inicio, fin);
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarPaginaActual();
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.cambiarPagina(this.paginaActual - 1);
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.cambiarPagina(this.paginaActual + 1);
    }
  }

  getPaginas(): number[] {
    const paginas: number[] = [];
    const maxPaginas = 5;
    let inicio = Math.max(1, this.paginaActual - Math.floor(maxPaginas / 2));
    let fin = Math.min(this.totalPaginas, inicio + maxPaginas - 1);
    
    if (fin - inicio < maxPaginas - 1) {
      inicio = Math.max(1, fin - maxPaginas + 1);
    }
    
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    
    return paginas;
  }

  // Métodos de acciones
  verDetalle(medicamento: Medicamento): void {
    console.log('Ver detalle del medicamento:', medicamento);
    // Implementar modal o navegación a detalle
  }

  editarMedicamento(medicamento: Medicamento): void {
    console.log('Editar medicamento:', medicamento);
    // Implementar formulario de edición
  }

  eliminarMedicamento(medicamento: Medicamento): void {
    if (confirm(`¿Está seguro que desea eliminar ${medicamento.nombre}?`)) {
      const index = this.medicamentos.findIndex(m => m.id === medicamento.id);
      if (index !== -1) {
        this.medicamentos.splice(index, 1);
        this.aplicarFiltros();
        console.log('Medicamento eliminado:', medicamento.nombre);
      }
    }
  }

  agregarMedicamento(): void {
    console.log('Abrir formulario para agregar nuevo medicamento');
    // Implementar formulario de agregar
  }

  exportarCatalogo(): void {
    console.log('Exportando catálogo...');
    // Implementar exportación a Excel/CSV
  }

  volverAlMenu(): void {
    console.log('Volviendo al menú principal...');
    this.router.navigate(['/cajero']);
  }
}