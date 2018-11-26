import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/clases/empresa';
import { Cliente } from 'src/app/clases/cliente';
import { Articulo } from 'src/app/clases/articulo';
import { ArticuloAgregado } from 'src/app/clases/articulo-agregado';
import { Factura } from 'src/app/clases/factura';

@Component({
  selector: 'nueva-fac-egreso',
  templateUrl: './nueva-fac-egreso.component.html',
  styleUrls: ['./nueva-fac-egreso.component.css']
})
export class NuevaFacEgresoComponent implements OnInit {

  constructor(private service:MiservicioService, private router:Router)
  {
    this.obtenerNumeroFactura(); 
  }
  bandera_cliente:boolean = false;//cambiar
  anio_maximo = (new Date()).getFullYear()  ;
  numero_factura:number; 
  tipo_factura:string="A";
  empresa:Empresa =this.service.empresa;
  cliente:Cliente;
  clientes:Cliente[]=[];
  fecha_factura:Date = new Date(); 
  articulos:Articulo[]=[];
  articulos_agregados:ArticuloAgregado[]=[];
  cantidad_articulos:number=1;
  tipo:String;
  

  ngOnInit() {
    this.empresa = this.service.empresa;
    this.service.obtenerClientes().subscribe(data=>{this.clientes = data});
    this.service.obtenerArticulos().subscribe(data=>{this.articulos = data});
  }

  obtenerNumeroFactura()
  {
    var numero:number=1;
    var facturas:Factura[];
    this.service.obtenerFacturas().subscribe(data=>{
      facturas = data;
      //se obtiene el mayor 
    for(let i =0; i<facturas.length;i++)
    {
      console.log('iteracion')
      console.log(facturas[i].numero_factura)
      if(facturas[i].numero_factura > numero)
      {
        console.log(facturas[i].numero_factura)
        numero = facturas[i].numero_factura;
      }
    }
    numero++; //se le suma uno para la nueva factura
    this.numero_factura = numero;
    });
  }
  seleccionar_cliente()
  {
    this.bandera_cliente = true;
  }
  aceptar_cliente(cliente:Cliente)
  {
    this.cliente = cliente;
    this.bandera_cliente = false;
  }

  agregar()
  {
    var sel = (<HTMLInputElement>document.getElementById('select_articulo')).value;
    var articulo:Articulo;
    

    for(let i =0; i<this.articulos.length; i++)
    {
      if(this.articulos[i].id.toString() == sel)
      {
        articulo = this.articulos[i];
      }
    }
      //controlar que el stock de articulos esté disponible
      if(articulo.stock < this.cantidad_articulos)
      {
        
        alert('no hay suficientes ' + articulo.nombre + '. Hay ' + articulo.stock + ' y desea ' +this.cantidad_articulos)
      }
      else
      {
        var art_agr:ArticuloAgregado = new ArticuloAgregado(articulo,this.cantidad_articulos);
        this.articulos_agregados.push(art_agr);
      }
    
  }
 
  guardar_factura()
  {
    var factura:Factura;
    if(this.verificar_facutra())
    {
      this.tipo = (<HTMLInputElement>document.getElementById("select_tipo")).value;
      factura = new Factura(this.articulos_agregados,this.empresa,this.cliente, this.fecha_factura,this.tipo,this.numero_factura);
      this.service.nuevoFactura(factura).subscribe(data=>{},err=>console.log(err));
      this.actualizar_stock();
      this.redireccionar_a_vista();
    }

  }
  redireccionar_a_vista()
  {
    var facturas:Factura[];
    this.service.obtenerFacturas().subscribe(data=>
      {
        facturas = data;
        for(let i = 0; i<facturas.length; i++)
        {
          if(facturas[i].numero_factura = this.numero_factura)
          {
            this.router.navigate(['/ver_factura_egreso/'+ facturas[i].id]);
          }
        }
      });
  }
  actualizar_stock()
  {
    for(let i =0; i<this.articulos_agregados.length;i++)
    {
      this.service.ArticuloQuitarStock(this.articulos_agregados[i].articulo,this.articulos_agregados[i].cantidad).subscribe(data=>{},err=>console.log(err));
    }
  }
  verificar_facutra()
  {
    var retorno:boolean = true;
    if(this.cliente == null)
    {
      retorno = false;
      alert('No asigno un Cliente');
    }
    if(this.articulos_agregados.length ==0)
    {
      alert('No se agrego ningun articulo a la factura');
      retorno = false;
    }
    for(let i =0; i<this.articulos_agregados.length;i++)
    {
      //controlar que el stock de articulos esté disponible
      if(this.articulos_agregados[i].articulo.stock < this.articulos_agregados[i].cantidad)
      {
        retorno = false;
        alert('no hay suficientes ' + this.articulos_agregados[i].articulo.nombre + '. Hay ' + this.articulos_agregados[i].articulo.stock + ' y desea ' +this.articulos_agregados[i].cantidad)
      }
    }
    return retorno;
  }
}
