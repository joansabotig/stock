import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/clases/empresa';
import { Cliente } from 'src/app/clases/cliente';
import { Articulo } from 'src/app/clases/articulo';
import { ArticuloAgregado } from 'src/app/clases/articulo-agregado';
import { Factura } from 'src/app/clases/factura';
import { ArticuloMostrar } from 'src/app/clases/articulo-mostrar';
import { Rubro } from 'src/app/clases/rubro';

@Component({
  selector: 'nueva-fac-egreso',
  templateUrl: './nueva-fac-egreso.component.html',
  styleUrls: ['./nueva-fac-egreso.component.css']
})
export class NuevaFacEgresoComponent implements OnInit {
  

  constructor(private service:MiservicioService, private router:Router)
  {
    service.nuevoFactura(this.factura_actual).subscribe(data=>{
      service.obtenerFacturas().subscribe(data=>{ 
        let aux:number =0;
        for(let i =0; i<data.length; i++)
        {
          if(aux<data[i].id)
          {
            aux = data[i].id;
          } 
        }
        service.obtenerFactura(aux).subscribe(data=>{ this.factura_actual = data; this.id = data.id})
        this.filtrar_articulos_select();
      })
    });

    this.obtenerNumeroFactura(); 
  }
  id:number;
  factura_actual:Factura
  bandera_cliente:boolean = false;//cambiar
  anio_maximo = (new Date()).getFullYear()  ;
  numero_factura:number = 0 ; 
  empresa:Empresa =this.service.empresa;
  cliente:Cliente;
  clientes:Cliente[]=[];
  fecha_factura:Date = new Date(); 
  articulos:Articulo[]=[];
  articulos_agregados:ArticuloAgregado[]=[];
  cantidad_articulos:number=1;
  tipo:String;
  rubros:Rubro[]=[];


  articulos_mostrar:ArticuloMostrar[]=[];
  articulos_select:Articulo[]=[];
  total_factura: number;
  subtotal_factura: number;
  iva_factura:number;
  

  ngOnInit() {
    this.empresa = this.service.empresa;
    this.service.obtenerClientes().subscribe(data=>{this.clientes = data});
    this.service.obtenerArticulos().subscribe(data=>{this.articulos = data});
    this.service.obtenerRubros().subscribe(data=>{this.rubros = data;})
  }
  calcular()
  {
    //calcular el subtotal: obtener el articulo - precio venta. y multiplicarlo x la cantidad.
    //calcular el iva 
    let acum_subtotal: number = 0;
    let acum_iva: number = 0;

    for(let i =0; i<this.articulos_agregados.length;i++)
    {
      let articulo_actual:Articulo;
      let c =0;
      let encontrado = false;
      while(c<this.articulos.length && !encontrado)
        {
          
          if(this.articulos[c].id == this.articulos_agregados[i].articuloId)
          {
            articulo_actual = this.articulos[c];
            encontrado = true;
          }
          c++;
        }
      acum_iva += ( (articulo_actual.precio_venta * this.articulos_agregados[i].cantidad)/100)*articulo_actual.porc_iva;
      acum_subtotal += (articulo_actual.precio_venta * this.articulos_agregados[i].cantidad);
    }

    this.subtotal_factura = acum_subtotal;
    this.iva_factura = acum_iva;
    this.total_factura = this.subtotal_factura + this.iva_factura;
  }
  actualizar_select()
  {
    this.filtrar_articulos_select();
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
      if(facturas[i].numero_factura > numero)
      {
        numero = facturas[i].numero_factura;
      }
    }
    numero++; //se le suma uno para la nueva factura
    this.numero_factura = numero;
    });
  }
  filtrar_articulos_select()
  {
    var select_rubros = (<HTMLInputElement>document.getElementById('select_rubro')).value;
    var rubro_actual:Rubro;
    for(let i =0; i<this.rubros.length;i++)
    {
      if(this.rubros[i].id.toString() == select_rubros)
      {
        rubro_actual = this.rubros[i];
      }
    }
    for(let i =0; i<this.articulos_select.length; i++)
    {
     this.articulos_select.splice(i);
    }
    for(let i =0; i<this.articulos.length; i++)
    {
      if(this.articulos[i].rubroId == rubro_actual.id)
      {
        //select_rubros= this.articulos[i].id.toString();
        this.articulos_select.push(this.articulos[i])
      }
    }
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
        //saco el articulo del select para que no pueda ponerlo 2 veces en la misma factura
        if(this.articulos[i].stock > this.cantidad_articulos)
        {
          //this.articulos.splice(i,1);
        }
        
      }
    }
      //controlar que el stock de articulos esté disponible
      if(articulo.stock < this.cantidad_articulos)
      {
        
        alert('no hay suficientes ' + articulo.nombre + '. Hay ' + articulo.stock + ' y desea ' +this.cantidad_articulos)
      }
      else
      {
        let ya_esta_agregado=false;
        for(let x=0; x<this.articulos_agregados.length;x++)
        {
          if(articulo.id == this.articulos_agregados[x].articuloId)
          {
            alert('Esta articulo ya fue agregado');
            ya_esta_agregado = true;
          }
        }
        if(!ya_esta_agregado)
        {
          var art_agr:ArticuloAgregado = new ArticuloAgregado(articulo.id,this.cantidad_articulos,this.id,null);
          var art_mos = new ArticuloMostrar(this.cantidad_articulos,articulo)
          this.articulos_mostrar.push(art_mos);
          this.articulos_agregados.push(art_agr);
        }
        
      }
  }
 
  guardar_factura()
  {
    var factura:Factura;
    if(this.verificar_facutra())
    {
      this.calcular();
      this.tipo = (<HTMLInputElement>document.getElementById("select_tipo")).value;
      factura = new Factura(this.empresa.numero_sucursal, this.numero_factura,this.total_factura, this.iva_factura, this.subtotal_factura, this.cliente.id,this.fecha_factura, this.tipo)
      // factura = new Factura(this.articulos_agregados,this.empresa,this.cliente, this.fecha_factura,this.tipo,this.numero_factura);
      this.service.modificarFactura(this.factura_actual,factura).subscribe(data=>{this.redireccionar_a_vista();},err=>console.log(err));
      for(let j=0; j<this.articulos_agregados.length; j++)
      {
        this.service.nuevoArticuloAgregado(this.articulos_agregados[j]).subscribe();
      }
      this.actualizar_stock();
      
    }
  }
  redireccionar_a_vista()
  {
    var facturas:Factura[];
    this.router.navigate(['/ver_factura_egreso/'+ this.id]);
    // this.service.obtenerFacturas().subscribe(data=>
    //   {
    //     facturas = data;
    //     for(let i = 0; i<facturas.length; i++)
    //     {
    //       if(facturas[i].numero_factura == this.numero_factura)
    //       {
    //         this.router.navigate(['/ver_factura_egreso/'+ facturas[i].id]);
    //       }
    //     }
    //   });
  }
  actualizar_stock()
  {
    for(let i =0; i<this.articulos_agregados.length;i++)
    {
      let encontrado = false;
      let c=0;
      while(c<this.articulos.length && !encontrado)
      {
        if(this.articulos_agregados[i].articuloId == this.articulos[c].id)
        {
          this.service.ArticuloQuitarStock(this.articulos[c],this.articulos_agregados[i].cantidad).subscribe(data=>{},err=>console.log(err));
        }
        c++;
      }
     
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
      let encontrado = false;
      let c=0;
      while(c<this.articulos.length && !encontrado)
      {
        if(this.articulos_agregados[i].articuloId == this.articulos[c].id)
        {
          encontrado= true;
          if(this.articulos[c].stock < this.articulos_agregados[i].cantidad)
          {
            retorno = false;
            alert('no hay suficientes ' + this.articulos[c].nombre + '. Hay ' + this.articulos[c].stock + ' y desea ' +this.articulos_agregados[i].cantidad)
          }
        }
        c++;
      }
      
    }
    return retorno;
  }
  quitar(art: ArticuloMostrar)
  {
    for(let i =0; i<this.articulos_mostrar.length;i++)
    {
      if(this.articulos_mostrar[i]==art)
      {
        //vuelvo a poner el articulo en el select si lo saca de la factura.
        //this.articulos.push(this.articulos_mostrar[i].articulo);
        //saco el articulo de la factura
        this.articulos_mostrar.splice(i,1);
        this.articulos_agregados.splice(i,1);

      }
    }
   
  }
}
