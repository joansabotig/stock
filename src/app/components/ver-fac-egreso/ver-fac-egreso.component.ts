import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/clases/factura';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/clases/cliente';
import { Empresa } from 'src/app/clases/empresa';
import { ArticuloAgregado } from 'src/app/clases/articulo-agregado';
import { Articulo } from 'src/app/clases/articulo';
import { ArticuloMostrar } from 'src/app/clases/articulo-mostrar';

@Component({
  selector: 'ver-fac-egreso',
  templateUrl: './ver-fac-egreso.component.html',
  styleUrls: ['./ver-fac-egreso.component.css']
})
export class VerFacEgresoComponent implements OnInit {

  
  constructor(private service:MiservicioService, private route:ActivatedRoute, private router:Router) {
   service.obtenerFactura(route.params['value']['id']).subscribe(data=>
    {
      this.factura = data;
      service.obtenerCliente(data.clienteId).subscribe(data=>{
        this.cliente = data;
      })
      
      this.empresa = service.empresa;
      service.obtenerArticulos().subscribe(data3=>{
        this.todos_los_articulos = data3;
        service.obtenerArticulosAgregados().subscribe(data4=>{
          this.articulos = data4;
          this.filtrar();
          this.calcular();
          this.bandera = true;
        })
      })

    });
  }

  ngOnInit() {
  }
  factura: Factura;
  bandera:boolean = false;
  iva_21:number=0;
  iva_10_5:number=0;
  //new
  cliente:Cliente;
  empresa:Empresa;
  todos_los_articulos:Articulo[]=[];
  articulos:ArticuloAgregado[]=[];//todos los articulos agregados se la bd.
  articulos_filtrados:ArticuloAgregado[]=[];//los articulos agregados de esta factura.

  salir()
  {
    this.router.navigate(['/inicio']);
  }

  filtrar()
  {
    for(let i =0; i<this.articulos.length; i++)
    {
      if(this.articulos[i].facturaId == this.factura.id)
      {
        this.articulos_filtrados.push(this.articulos[i]);
      }
    }
  }
  calcular()
  {
    for(let i=0; i<this.articulos_filtrados.length; i++)
    {
      if(this.articulos_filtrados[i].porc_iva == 21)
      {
        this.iva_21 += ((this.articulos_filtrados[i].cantidad * this.articulos_filtrados[i].precio_venta)/100)*21;
      }
      if(this.articulos_filtrados[i].porc_iva == 10.5)
      {
        this.iva_10_5 += ((this.articulos_filtrados[i].cantidad * this.articulos_filtrados[i].precio_venta)/100)*10.5;
      }
    }
  }
}
