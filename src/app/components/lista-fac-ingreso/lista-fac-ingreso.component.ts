import { Component, OnInit } from '@angular/core';
import { FacturaCompra } from 'src/app/clases/factura-compra';
import { Router } from '@angular/router';
import { MiservicioService } from 'src/app/services/miservicio.service';

@Component({
  selector: 'lista-fac-ingreso',
  templateUrl: './lista-fac-ingreso.component.html',
  styleUrls: ['./lista-fac-ingreso.component.css']
})
export class ListaFacIngresoComponent implements OnInit {

  bandera:boolean=false;
  facturas:FacturaCompra[]=[];
  constructor(private router:Router, private servicio:MiservicioService) 
  {
    this.servicio.obtenerFacturasCompra().subscribe(data=>
      {
        this.facturas = data;
        this.bandera=true;
      })  
  }
  mostrar(item:FacturaCompra)
  {
    this.router.navigate(['ver_factura_ingreso/'+item.id]);
  }

  ngOnInit() {
  }

}
