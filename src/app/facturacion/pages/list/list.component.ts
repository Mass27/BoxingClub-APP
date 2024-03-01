import { Component, OnInit } from '@angular/core';
import { FacService } from '../../services/fac.service';
import { Factura } from '../../interfaces/Factura.interfaces';
import { Planes } from 'src/app/planes/interfaces/planes.interface';
import { usuarioService } from 'src/app/usuarios/services/usuarios.service';
import { Productos } from 'src/app/productos/interfaces/productos.interfaces';
import { ProductosService } from 'src/app/productos/services/productos.service';
import { Clientes } from 'src/app/usuarios/interfaces/usuario.interfaces';
import { FacturaID } from '../../interfaces/facPorID.interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  facturas: Factura[] = [];
  tipPlanes: Planes[] = [];
  tipProducto: Productos[] = [];
  cliente: Clientes[] = [];
  facturasFiltradas: Factura[] = [];
  isAdmin: boolean = false;
  columnas: string[] = ['nombreCliente', 'numeroFactura', 'fecha', 'metodoPago', 'plan', 'productos', 'cantidadProductos', 'subTotal', 'descuentos', 'total', 'acciones','imprimir'];
  constructor(
    private facturaService: FacService,
    private usuarioService: usuarioService,
    private prodService: ProductosService
  ) {}
  ngOnInit(): void {
    this.facturaService.getAllFacturas().subscribe((facturas) => {
      this.facturas = facturas;
      this.facturasFiltradas = [...this.facturas];
    });
    this.usuarioService
      .getAllplanes()
      .subscribe((planes) => (this.tipPlanes = planes));
    this.prodService
      .getAllProductos()
      .subscribe((prod) => (this.tipProducto = prod));
    this.usuarioService
      .getAllUser()
      .subscribe((clien) => (this.cliente = clien));
    this.adminUser();
  }

  getPlanName(planId: string): string {
    const plan = this.tipPlanes.find((p) => p._id === planId);
    return plan ? plan.nombrePlan : 'Plan no encontrado';
  }
  getProdName(prodId: string): string {
    const prod = this.tipProducto.find((p) => p._id === prodId);
    return prod ? prod.nombreProducto : 'Plan no encontrado';
  }

  getclientesName(clienteId: string): string {
    const cliente = this.cliente.find((p) => p._id === clienteId);
    return cliente ? cliente.nombreCompleto : 'Plan no encontrado';
  }

  formatDate(date: string): string {
    // Obtener solo la parte de la fecha (sin la hora, minutos, segundos ni la zona horaria)
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0];
  }

  buscarFacturasPorNombre(nombre: string): void {
    if (nombre.trim() === '') {
      this.facturasFiltradas = this.facturas; // Restaurar la lista completa
      return;
    }
    this.facturaService.buscarPorNombre(nombre).subscribe(
      (facturas: FacturaID[]) => {
        this.facturasFiltradas = facturas;
       
      },
      (error) => {
        console.error('Error al buscar facturas por nombre:', error);
      }
    );
  }
  adminUser() {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    if (tipoUsuario === 'ADMINISTRADOR') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
