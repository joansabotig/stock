import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clases/cliente';
import { Empresa } from 'src/app/clases/empresa';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Proveedor } from 'src/app/clases/proveedor';
import { Articulo } from 'src/app/clases/articulo';
import { ArticuloAgregado } from 'src/app/clases/articulo-agregado';
import { FacturaCompra } from 'src/app/clases/factura-compra';
import { Router } from '@angular/router';
import { Factura } from 'src/app/clases/factura';
import { ArticuloMostrar } from 'src/app/clases/articulo-mostrar';

@Component({
  selector: 'nueva-fac-ingreso',
  templateUrl: './nueva-fac-ingreso.component.html',
  styleUrls: ['./nueva-fac-ingreso.component.css']
})
export class NuevaFacIngresoComponent implements OnInit {

  constructor(private service:MiservicioService, private router:Router)
  {
    service.nuevoFacturaCompra(this.factura_actual).subscribe(data=>{
      service.obtenerFacturasCompra().subscribe(data=>{ 
        let aux:number =0;
        for(let i =0; i<data.length; i++)
        {
          if(aux<data[i].id)
          {
            aux = data[i].id;
          } 
        }
        service.obtenerFacturaCompra(aux).subscribe(data=>{ this.factura_actual = data; this.id = data.id})
      })
    });

  }
  factura_actual: FacturaCompra;
  id:number;
  bandera_proveedor:boolean = false;//cambiar
  anio_maximo = (new Date()).getFullYear()  ;
  numero_factura:number = 1 ;
  empresa:Empresa;
  proveedor:Proveedor=null;
  proveedores:Proveedor[];
  fecha_factura:Date = new Date(); 
  articulos:Articulo[]=[];
  articulos_agregados:ArticuloAgregado[]=[];
  cantidad_articulos:number=1;
  tipo:String;

  articulos_select:Articulo[];
  articulos_mostrar:ArticuloMostrar[]=[];
  total_factura:number;
  iva_factura:number;
  subtotal_factura:number;

  ngOnInit() {
    this.empresa = this.service.empresa;
    this.service.obtenerProveedores().subscribe(data=>{this.proveedores = data});
    this.service.obtenerArticulos().subscribe(data=>{this.articulos = data; this.articulos_select = data;});
  }

  calcular()
  {
    //calcular el subtotal: obtener el articulo - precio compra. y multiplicarlo x la cantidad.
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
      acum_iva += ( (articulo_actual.precio_compra * this.articulos_agregados[i].cantidad)/100)*articulo_actual.porc_iva;
      acum_subtotal += (articulo_actual.precio_compra * this.articulos_agregados[i].cantidad);
    }
    this.subtotal_factura = acum_subtotal;
    this.iva_factura = acum_iva;
    this.total_factura = this.subtotal_factura + this.iva_factura;
  }

  seleccionar_proveedor()
  {
    this.bandera_proveedor = true;
  }
  aceptar_proveedor(proveedor:Proveedor)
  {
    this.proveedor = proveedor;
    this.bandera_proveedor = false;
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
       // this.articulos_select.splice(i,1);
      }
    }

    let ya_esta_agregado=false;
        for(let x=0; x<this.articulos_agregados.length;x++)
        {
          if(articulo.id == this.articulos_agregados[x].articuloId)
          {
            alert('Esta articulo ya fue agregado');
            ya_esta_agregado = true;
          }
        }
        if(!ya_esta_agregado){
          var art_agr:ArticuloAgregado = new ArticuloAgregado(articulo.id,this.cantidad_articulos,null,this.id);
          let art_mos:ArticuloMostrar = new ArticuloMostrar(this.cantidad_articulos,articulo);
          this.articulos_mostrar.push(art_mos);
          this.articulos_agregados.push(art_agr);
        }
    
   
  }
 
  guardar_factura()
  {
    var factura:FacturaCompra;
    if(this.verificar_facutra())
    {
      this.calcular();
      this.tipo = (<HTMLInputElement>document.getElementById("select_tipo")).value;
      factura = new FacturaCompra(this.proveedor.numero_sucursal,this.numero_factura,this.total_factura, this.iva_factura, this.subtotal_factura, this.proveedor.id, this.fecha_factura,this.tipo)
      this.service.modificarFacturaCompra(this.factura_actual,factura).subscribe(data=>{ this.redireccionar_a_vista();},err=>console.log(err));
      for(let j=0; j<this.articulos_agregados.length; j++)
      {
        this.service.nuevoArticuloAgregado(this.articulos_agregados[j]).subscribe();
      }
      this.actualizar_stock();
      
    }

  }
  redireccionar_a_vista()
  {
    var facturas:FacturaCompra[];
    this.router.navigate(['/ver_factura_ingreso/'+ this.id]);
    // this.service.obtenerFacturasCompra().subscribe(data=>
    //   {
    //     facturas = data;
    //     for(let i = 0; i<facturas.length; i++)
    //     {
    //       if(facturas[i].numero_factura == this.numero_factura && facturas[i].numero_sucursal == this.proveedor.numero_sucursal)
    //       {
    //         this.router.navigate(['/ver_factura_ingreso/'+ facturas[i].id]);
    //       }
    //     }
    //   });
  }
  actualizar_stock()
  {
    for(let i =0; i<this.articulos_agregados.length;i++)
    {
      let c=0;
      let encontrado = false;
      while(c<this.articulos.length && !encontrado)
      {
        if(this.articulos_agregados[i].articuloId == this.articulos[c].id)
        {
          this.service.ArticuloAgregarStock(this.articulos[c],this.articulos_agregados[i].cantidad).subscribe(data=>{},err=>console.log(err));
        }
        c++;
      }
      
    }
  }
  verificar_facutra()
  {
    var retorno:boolean = true;
    if(this.proveedor == null)
    {
      retorno = false;
      alert('No asigno un Proveedor');
    }
    if(this.articulos_agregados.length ==0)
    {
      alert('No se agrego ningun articulo a la factura');
      retorno = false;
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
        //this.articulos_select.push(this.articulos_mostrar[i].articulo);
        //saco el articulo de la factura
        this.articulos_mostrar.splice(i,1);
        this.articulos_agregados.splice(i,1);

      }
    }
   
  }
}
