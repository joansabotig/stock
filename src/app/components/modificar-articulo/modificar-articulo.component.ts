import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from 'src/app/clases/articulo';
import { injectViewContainerRef } from '@angular/core/src/render3';
import { Rubro } from 'src/app/clases/rubro';

@Component({
  selector: 'modificar-articulo',
  templateUrl: './modificar-articulo.component.html',
  styleUrls: ['./modificar-articulo.component.css']
})
export class ModificarArticuloComponent implements OnInit {
  codigo:number;
  nombre:string;
  descripcion:string;
  rubro:Rubro;
  precio_compra:number;
  precio_venta:number;
  porcentaje_iva:number;
  articulo_actual:Articulo;
  rubros:Rubro[];

  constructor(private servicio:MiservicioService,private route: ActivatedRoute,private router: Router) 
  {
    servicio.obtenerArticulo(route.params['value']['id']).subscribe(data=>
      {
        this.articulo_actual = data;
        this.iniciar();
      })
      servicio.obtenerRubros().subscribe(data=>{this.rubros = data});
  }

  ngOnInit() {
  }
  iniciar()
  {
  this.codigo=this.articulo_actual.codigo;
  this.nombre=this.articulo_actual.nombre;
  this.descripcion=this.articulo_actual.descripcion;
  this.servicio.obtenerRubro(this.articulo_actual.rubroId).subscribe(data=>{
    this.rubro = data;
    (<HTMLInputElement>document.getElementById('select_rubro')).value = data.id.toString();
  })

  this.precio_compra=this.articulo_actual.precio_compra;
  this.precio_venta=this.articulo_actual.precio_venta;
  this.porcentaje_iva=this.articulo_actual.porc_iva;
  }
  cancelar()
  {
    this.router.navigate(['/lista_articulos']);
  }
  modificar()
  {
    var sel = (<HTMLInputElement>document.getElementById('select_rubro')).value;
    for(let i  =0; i<this.rubros.length; i++)
    {
      if(this.rubros[i].id.toString() == sel)
      {
        this.rubro = this.rubros[i];
      }
    }


    this.servicio.modificarArticulo(this.articulo_actual,this.codigo,this.nombre,this.descripcion,this.rubro.id,this.precio_compra,this.precio_venta,this.porcentaje_iva,this.articulo_actual.stock)
    .subscribe(data=>{this.router.navigate(['/lista_articulos']);})
  }

}
