import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Articulo } from 'src/app/clases/articulo';
import { Router } from '@angular/router';
import { Rubro } from 'src/app/clases/rubro';

@Component({
  selector: 'nuevo-articulo',
  templateUrl: './nuevo-articulo.component.html',
  styleUrls: ['./nuevo-articulo.component.css']
})
export class NuevoArticuloComponent implements OnInit {

  constructor(private servicio:MiservicioService,private router:Router){
    servicio.obtenerRubros().subscribe(data=>{this.rubros=data});
   }
  codigo:number;
  nombre:string;
  descripcion:string;
  rubro:Rubro;
  precio_compra:number;
  precio_venta:number;
  porcentaje_iva:number;
  rubros:Rubro[];

  ngOnInit() {
  }
  
  agregar()
  {
    var sel = (<HTMLInputElement>document.getElementById('select_rubro')).value;
    for(let i  =0; i<this.rubros.length; i++)
    {
      if(this.rubros[i].id.toString() == sel)
      {
        this.rubro = this.rubros[i];
      }
    }
    
    var opc_iva = (<HTMLInputElement>document.getElementById('select_iva')).value;
    if(opc_iva == '21')
    {
      this.porcentaje_iva = 21;
    }
    else
    {
      this.porcentaje_iva = 10.5;
    }

    let articulo:Articulo = new Articulo(this.codigo,this.nombre,this.descripcion,this.rubro.id, this.precio_compra,this.precio_venta,this.porcentaje_iva);
    this.servicio.nuevoArticulo(articulo).subscribe(data=>
      {
        this.router.navigate(['/lista_articulos']);
      },
      err=>console.log(err));
  }

}
