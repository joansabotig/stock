import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Articulo } from 'src/app/clases/articulo';
import { Router } from '@angular/router';
import { Rubro } from 'src/app/clases/rubro';

@Component({
  selector: 'lista-articulo',
  templateUrl: './lista-articulo.component.html',
  styleUrls: ['./lista-articulo.component.css']
})
export class ListaArticuloComponent implements OnInit {
  bandera:boolean = false;
  articulos:Articulo[]=[];
  articulos_mostrar:Articulo[]=[];
  rubros:Rubro[]=[];
  constructor(private servicio:MiservicioService,private router: Router) 
  {
    servicio.obtenerRubros().subscribe(data=>{this.rubros= data})
    servicio.obtenerArticulos().subscribe(data=>
      {
      this.articulos = data;
      this.articulos_mostrar = data;
      this.articulos_mostrar.sort((a1,a2)=>{return a1.rubroId-a2.rubroId})
      this.bandera = true;
      })
  }

  filtrar()
  {
    var select_rubros = (<HTMLInputElement>document.getElementById('select_rubro')).value;
    var rubro_actual:Rubro;
    if(select_rubros != '-1')
    {
      for(let i =0; i<this.rubros.length;i++)
      {
        if(this.rubros[i].id.toString() == select_rubros)
        {
          console.log('rubro encontrado')
          rubro_actual = this.rubros[i];
        }
      }

      for(let i =0; i<this.articulos.length; i++)
      {
        this.articulos_mostrar.splice(i);
      }
      for(let i =0; i<this.articulos.length; i++)
      {
        if(this.articulos[i].rubroId == rubro_actual.id)
        {
          //select_rubros= this.articulos[i].id.toString();
          this.articulos_mostrar.push(this.articulos[i])
        }
      }
    }
    else
    {
      this.servicio.obtenerArticulos().subscribe(data=>
        {
        this.articulos_mostrar = data;
        this.articulos_mostrar.sort((a1,a2)=>{return a1.rubroId-a2.rubroId})
        })
    }
    
  }

  ngOnInit() {
  }
  mostrar(item:Articulo)
  {
    this.router.navigate(['editar_articulo/'+item.id]);
  }

}
