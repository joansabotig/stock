import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturaCompra } from 'src/app/clases/factura-compra';
import { Articulo } from 'src/app/clases/articulo';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Proveedor } from 'src/app/clases/proveedor';
import { Empresa } from 'src/app/clases/empresa';
import { ArticuloAgregado } from 'src/app/clases/articulo-agregado';
import { ArticuloMostrar } from 'src/app/clases/articulo-mostrar';

@Component({
  selector: 'ver-fac-ingreso',
  templateUrl: './ver-fac-ingreso.component.html',
  styleUrls: ['./ver-fac-ingreso.component.css']
})
export class VerFacIngresoComponent implements OnInit {

  
  constructor(private service:MiservicioService, private route:ActivatedRoute, private router:Router) 
  { 
    service.obtenerFacturaCompra(route.params['value']['id']).subscribe(data=>
      {
        this.factura = data;
        service.obtenerProveedor(data.proveedorId).subscribe(data2=>{this.proveedor = data2;})
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

  factura: FacturaCompra;
  todos_los_articulos:Articulo[];
  //new
  proveedor:Proveedor;
  empresa:Empresa;
  articulos:ArticuloAgregado[]=[];
  articulos_filtrados:ArticuloAgregado[]=[];
  
  //
  bandera:boolean = false;
  iva_21:number=0;
  iva_10_5:number=0;
  salir()
  {
    this.router.navigate(['/inicio']);
  }
  filtrar()
  {
    for(let i =0; i<this.articulos.length; i++)
    {
      if(this.articulos[i].facturaCompraId == this.factura.id)
      {
        this.articulos_filtrados.push(this.articulos[i]);
      }
    }
  }
  calcular()//calcula cantidad de iva para 21% y para 10.5%
  {
    for(let i=0; i<this.articulos_filtrados.length; i++)
    {
      if(this.articulos_filtrados[i].porc_iva == 21)
      {
        this.iva_21 += ((this.articulos_filtrados[i].cantidad * this.articulos_filtrados[i].precio_compra)/100)*21;
      }
      if(this.articulos_filtrados[i].porc_iva == 10.5)
      {
        this.iva_10_5 += ((this.articulos_filtrados[i].cantidad * this.articulos_filtrados[i].precio_compra)/100)*10.5;
      }
    }
  }

  ngOnInit() {
  }

}
