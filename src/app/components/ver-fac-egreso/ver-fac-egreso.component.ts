import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/clases/factura';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ver-fac-egreso',
  templateUrl: './ver-fac-egreso.component.html',
  styleUrls: ['./ver-fac-egreso.component.css']
})
export class VerFacEgresoComponent implements OnInit {

  factura: Factura;
  constructor(private service:MiservicioService, private route:ActivatedRoute) {
   service.obtenerFactura(route.params['value']['id']).subscribe(data=>
    {
      this.factura = data;
      this.calcular();
      this.bandera = true;
    });
  }

  ngOnInit() {
  }

  bandera:boolean = false;
  iva_21:number=0;
  iva_10_5:number=0;


  calcular()
  {
    for(let i=0; i<this.factura.articulos.length; i++)
    {
 
      if(this.factura.articulos[i].articulo.porc_iva == 21)
      {
        this.iva_21 += ((this.factura.articulos[i].cantidad * this.factura.articulos[i].articulo.precio_venta)/100)*21;

      }
      if(this.factura.articulos[i].articulo.porc_iva == 10.5)
      {
        this.iva_10_5 += ((this.factura.articulos[i].cantidad * this.factura.articulos[i].articulo.precio_venta)/100)*10.5;

      }

    }
  }


}
