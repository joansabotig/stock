import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/clases/cliente';

@Component({
  selector: 'modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.css']
})
export class ModificarClienteComponent implements OnInit {
  cliente_actual:Cliente;
  constructor(private servicio:MiservicioService, private router:Router, private route:ActivatedRoute) 
  {
    servicio.obtenerCliente(route.params['value']['id']).subscribe(data=>{
      this.cliente_actual=data;
      this.iniciar();
    })
  }

  ngOnInit() {
  }
  nombre:string;
  cuenta:string;
  email:string;
  telefono:string;
  direccion:string;
  localidad:string;

  modificar()
  {
    this.servicio.modificarCliente(this.cliente_actual,this.nombre,this.direccion,this.localidad,this.telefono,this.email,this.cuenta)
    .subscribe(data=>{console.log('cliente modificado')});
    this.router.navigate(['/lista_clientes']);

  }

  iniciar()
  {
    this.nombre= this.cliente_actual.nombre;
    this.cuenta = this.cliente_actual.cuenta;
    this.email = this.cliente_actual.email;
    this.telefono = this.cliente_actual.telefono;
    this.direccion = this.cliente_actual.direccion;
    this.localidad = this.cliente_actual.localidad;
  }
  cancelar()
  {
    this.router.navigate(['/lista_clientes']);
  }

}
