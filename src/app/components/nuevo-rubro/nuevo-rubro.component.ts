import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Rubro } from 'src/app/clases/rubro';
import { Router } from '@angular/router';

@Component({
  selector: 'nuevo-rubro',
  templateUrl: './nuevo-rubro.component.html',
  styleUrls: ['./nuevo-rubro.component.css']
})
export class NuevoRubroComponent implements OnInit {
  nombre:string;
  descripcion:string;
  constructor(private service:MiservicioService, private router:Router) 
  {

  }
  agregar()
  {
    var rubro:Rubro = new Rubro(this.nombre,this.descripcion);
    this.service.nuevoRubro(rubro).subscribe(data=>{},err=>{console.log(err)});
    this.router.navigate(['lista_rubro'])
  }

  ngOnInit() {
  }

}
