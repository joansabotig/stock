import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/clases/rubro';
import { Router } from '@angular/router';
import { MiservicioService } from 'src/app/services/miservicio.service';

@Component({
  selector: 'lista-rubro',
  templateUrl: './lista-rubro.component.html',
  styleUrls: ['./lista-rubro.component.css']
})
export class ListaRubroComponent implements OnInit {

  bandera:boolean=false;
  rubros:Rubro[]=[];
  constructor(private router:Router, private servicio:MiservicioService) 
  {
    this.servicio.obtenerRubros().subscribe(data=>
      {
        this.rubros = data;
        this.bandera=true;
      })  
  }

  mostrar(item:Rubro)
  {
    this.router.navigate(['modificar_rubro/'+item.id]);
  }

  ngOnInit() {
  }

}
