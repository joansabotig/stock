import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Cliente } from 'src/app/clases/cliente';

@Component({
  selector: 'lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {
  bandera:boolean=false;
  clientes:Cliente[]=[];
  constructor(private router:Router, private servicio:MiservicioService) 
  {
    this.servicio.obtenerClientes().subscribe(data=>
      {
        this.clientes = data;
        this.bandera=true;
      })  
  }

  ngOnInit() {
  }
  mostrar(item:Cliente)
  {
    this.router.navigate(['editar_cliente/'+item.id]);
  }

}
