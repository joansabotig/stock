import { Component, OnInit } from '@angular/core';
import { ServiceInicioService } from 'src/app/services/service-inicio.service';

@Component({
  selector: ' info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private service2:ServiceInicioService) { }

  ngOnInit() {
  }
  bandera:boolean=true;

  iniciar()
  {
    this.service2.iniciar();
  }
  limpiarBase()
  {
    this.service2.limpiar();
  }

}
