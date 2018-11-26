import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Articulo } from 'src/app/clases/articulo';
import { Router } from '@angular/router';

@Component({
  selector: 'lista-articulo',
  templateUrl: './lista-articulo.component.html',
  styleUrls: ['./lista-articulo.component.css']
})
export class ListaArticuloComponent implements OnInit {
  bandera:boolean = false;
  articulos:Articulo[]=[];
  constructor(private servicio:MiservicioService,private router: Router) 
  {
    servicio.obtenerArticulos().subscribe(data=>
      {
      this.articulos = data;
      this.bandera = true;
      })
  }

  ngOnInit() {
  }
  mostrar(item:Articulo)
  {
    this.router.navigate(['editar_articulo/'+item.id]);
  }

}
