import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from 'src/app/clases/articulo';
import { injectViewContainerRef } from '@angular/core/src/render3';

@Component({
  selector: 'modificar-articulo',
  templateUrl: './modificar-articulo.component.html',
  styleUrls: ['./modificar-articulo.component.css']
})
export class ModificarArticuloComponent implements OnInit {
  codigo:number;
  nombre:string;
  descripcion:string;
  rubro:string;
  precio_compra:number;
  precio_venta:number;
  porcentaje_iva:number;
  articulo_actual:Articulo;

  constructor(private servicio:MiservicioService,private route: ActivatedRoute,private router: Router) 
  {
    servicio.obtenerArticulo(route.params['value']['id']).subscribe(data=>
      {
        this.articulo_actual = data;
        this.iniciar();
      })
  }

  ngOnInit() {
  }
  iniciar()
  {
  this.codigo=this.articulo_actual.codigo;
  this.nombre=this.articulo_actual.nombre;
  this.descripcion=this.articulo_actual.descripcion;
  this.rubro=this.articulo_actual.rubro;
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
    this.servicio.modificarArticulo(this.articulo_actual,this.codigo,this.nombre,this.descripcion,this.rubro,this.precio_compra,this.precio_venta,this.porcentaje_iva,this.articulo_actual.stock)
    .subscribe(data=>{this.router.navigate(['/lista_articulos']);})
  }

}
