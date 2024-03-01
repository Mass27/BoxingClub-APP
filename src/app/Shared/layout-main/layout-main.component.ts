import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



interface MenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-header.css']
})
export class LayoutMainComponent implements OnInit{
   isAdmin: boolean = false;


  listadoMenuItems: MenuItem[] = [
    { label: 'Clientes', link: '/usuarios/list'},
    { label: 'Empleados', link: '/empleados/list' },
    { label: 'Productos', link: '/productos/list' },
    { label: 'Planes', link: '/planes/list', },
    { label: 'Facturacion', link: '/facturacion/list' }
  ];



  constructor(  private router: Router){}


  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuarioLogin');
    sessionStorage.removeItem('tipoUsuario');
    this.router.navigate(['/auth']);
  }

  ngOnInit(): void {
 this.adminUser();
  }


adminUser(){
  const tipoUsuario = sessionStorage.getItem('tipoUsuario');
  if (tipoUsuario === 'ADMINISTRADOR') {
    this.isAdmin = true;
  } else {
    this.isAdmin = false;
  }
}



}
