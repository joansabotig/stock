import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/clases/rubro';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'editar-rubro',
  templateUrl: './editar-rubro.component.html',
  styleUrls: ['./editar-rubro.component.css']
})
export class EditarRubroComponent implements OnInit {

  constructor(private servicio:MiservicioService, private router:Router, private route:ActivatedRoute) 
  {
    servicio.obtenerRubro(route.params['value']['id']).subscribe(data=>{
      this.rubro_actual=data;
      this.iniciar();
    })
  }
  nombre:String;
  descripcion:String;
  rubro_actual:Rubro;

  modificar()
  {
    this.servicio.modificarRubro(this.rubro_actual,this.nombre,this.descripcion)
    .subscribe(data=>{console.log('rubro modificado')});
    this.router.navigate(['/lista_rubro']);
  }
  iniciar()
  {
    this.nombre= this.rubro_actual.nombre;
    this.descripcion = this.rubro_actual.descripcion;
  }
  cancelar()
  {
    this.router.navigate(['/lista_rubro']);
  }
  ngOnInit() {
  }
}
