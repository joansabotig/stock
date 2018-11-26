import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/clases/cliente';

@Component({
  selector: 'nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {
  nombre:string;
  cuenta:string;
  email:string;
  telefono:string;
  direccion:string;
  localidad:string;

  constructor(private servicio:MiservicioService, private router:Router) { }

  ngOnInit() {
  }
  agregar()
  {
    let cliente:Cliente = new Cliente(this.nombre,this.direccion,this.localidad,this.telefono,this.email,this.cuenta);
    this.servicio.nuevoCliente(cliente).subscribe(data=>
      {
        console.log('se agrego el cliente');
        this.router.navigate(['/lista_clientes']);
      }
      ,err=>console.log(err));

  }

}
