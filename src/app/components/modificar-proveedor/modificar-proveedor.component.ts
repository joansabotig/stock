import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Proveedor } from 'src/app/clases/proveedor';

@Component({
  selector: 'modificar-proveedor',
  templateUrl: './modificar-proveedor.component.html',
  styleUrls: ['./modificar-proveedor.component.css']
})
export class ModificarProveedorComponent {
  proveedor_actual:Proveedor;

  constructor(private servicio:MiservicioService, private router:Router, private route:ActivatedRoute)
  {
    servicio.obtenerProveedor(route.params['value']['id']).subscribe(data=>{
      this.proveedor_actual=data;
      this.iniciar();
    })
  }
  numero_sucursal:number;
  nombre:string;
  cuenta:string;
  email:string;
  telefono:string;
  direccion:string;
  localidad:string;

 
  iniciar()
  {
    this.numero_sucursal = this.proveedor_actual.numero_sucursal;
    this.nombre= this.proveedor_actual.nombre;
    this.cuenta = this.proveedor_actual.cuenta;
    this.email = this.proveedor_actual.email;
    this.telefono = this.proveedor_actual.telefono;
    this.direccion = this.proveedor_actual.direccion;
    this.localidad = this.proveedor_actual.localidad;
  }
  modificar()
  {
    this.servicio.modificarProveedor(this.proveedor_actual,this.nombre,this.direccion,this.localidad,this.telefono,this.email,this.cuenta,this.numero_sucursal)
    .subscribe(data=>{console.log('proveedor modificado')});
    this.router.navigate(['/lista_proveedores']);

  }
  cancelar()
  {
    this.router.navigate(['/lista_proveedores']);
  }
}
