import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/clases/proveedor';

@Component({
  selector: 'nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.css']
})
export class NuevoProveedorComponent implements OnInit {
  numero_sucursal:number;
  nombre:string;
  cuenta:string;
  email:string;
  telefono:string;
  direccion:string;
  localidad:string;

  constructor(private servicio:MiservicioService, private router:Router) { }

  ngOnInit() {
  }
  agregar()
  {
    let proveedor:Proveedor = new Proveedor(this.nombre,this.direccion,this.localidad,this.telefono,this.email,this.cuenta,this.numero_sucursal);
    this.servicio.nuevoProveedor(proveedor).subscribe(data=>
      {
        console.log('se agrego el proveedor');
        this.router.navigate(['/lista_proveedores']);
      }
      ,err=>console.log(err));

  }

}
