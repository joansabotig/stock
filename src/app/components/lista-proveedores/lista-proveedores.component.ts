import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/clases/proveedor';
import { Router } from '@angular/router';
import { MiservicioService } from 'src/app/services/miservicio.service';

@Component({
  selector: 'lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit {
  bandera:boolean =false;
  proveedores:Proveedor[] = [];
  constructor(private router:Router, private servicio:MiservicioService) 
  {
    this.servicio.obtenerProveedores().subscribe(data=>
      {
        this.proveedores = data;
        this.bandera=true;
      })
  }

  ngOnInit() {
  }
  mostrar(item:Proveedor)
  {
    this.router.navigate(['editar_proveedor/'+item.id]);
  }

}
