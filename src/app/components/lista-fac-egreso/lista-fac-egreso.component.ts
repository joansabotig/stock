import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/clases/factura';
import { Router } from '@angular/router';
import { MiservicioService } from 'src/app/services/miservicio.service';

@Component({
  selector: 'lista-fac-egreso',
  templateUrl: './lista-fac-egreso.component.html',
  styleUrls: ['./lista-fac-egreso.component.css']
})
export class ListaFacEgresoComponent implements OnInit {
  bandera:boolean=false;
  facturas:Factura[]=[];
  constructor(private router:Router, private servicio:MiservicioService) 
  {
    this.servicio.obtenerFacturas().subscribe(data=>
      {
        this.facturas = data;
        this.bandera=true;
      })  
  }
  mostrar(item:Factura)
  {
    this.router.navigate(['ver_factura_egreso/'+item.id]);
  }

  ngOnInit() {
  }

}
