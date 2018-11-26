import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { ActivatedRoute } from '@angular/router';
import { FacturaCompra } from 'src/app/clases/factura-compra';

@Component({
  selector: 'ver-fac-ingreso',
  templateUrl: './ver-fac-ingreso.component.html',
  styleUrls: ['./ver-fac-ingreso.component.css']
})
export class VerFacIngresoComponent implements OnInit {

  factura: FacturaCompra;
  constructor(private service:MiservicioService, private route:ActivatedRoute) 
  { 
    service.obtenerFacturaCompra(route.params['value']['id']).subscribe(data=>
      {
        this.factura = data;
        this.calcular();
        this.bandera = true;
      });
    
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
        this.iva_21 += ((this.factura.articulos[i].cantidad * this.factura.articulos[i].articulo.precio_compra)/100)*21;
      }
      if(this.factura.articulos[i].articulo.porc_iva == 10.5)
      {
        this.iva_10_5 += ((this.factura.articulos[i].cantidad * this.factura.articulos[i].articulo.precio_compra)/100)*10.5;
        
      }

    }
  }

  ngOnInit() {
  }

}
