import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clases/cliente';
import { Empresa } from 'src/app/clases/empresa';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Proveedor } from 'src/app/clases/proveedor';
import { Articulo } from 'src/app/clases/articulo';
import { ArticuloAgregado } from 'src/app/clases/articulo-agregado';
import { FacturaCompra } from 'src/app/clases/factura-compra';
import { Router } from '@angular/router';

@Component({
  selector: 'nueva-fac-ingreso',
  templateUrl: './nueva-fac-ingreso.component.html',
  styleUrls: ['./nueva-fac-ingreso.component.css']
})
export class NuevaFacIngresoComponent implements OnInit {

  constructor(private service:MiservicioService, private router:Router)
  {
    console.log(this.fecha_factura)

  }
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
  

  ngOnInit() {
    this.empresa = this.service.empresa;
    this.service.obtenerProveedores().subscribe(data=>{this.proveedores = data});
    this.service.obtenerArticulos().subscribe(data=>{this.articulos = data});
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
      }
    }
    
    var art_agr:ArticuloAgregado = new ArticuloAgregado(articulo,this.cantidad_articulos);
    this.articulos_agregados.push(art_agr);
  }
 
  guardar_factura()
  {
    var factura:FacturaCompra;
    if(this.verificar_facutra())
    {
      this.tipo = (<HTMLInputElement>document.getElementById("select_tipo")).value;
      console.log(this.tipo)
      factura = new FacturaCompra(this.articulos_agregados,this.empresa,this.proveedor, this.numero_factura,this.fecha_factura,this.tipo)
      this.service.nuevoFacturaCompra(factura).subscribe(data=>{},err=>console.log(err));
      this.actualizar_stock();
      this.redireccionar_a_vista();
    }

  }
  redireccionar_a_vista()
  {
    var facturas:FacturaCompra[];
    this.service.obtenerFacturasCompra().subscribe(data=>
      {
        facturas = data;
        for(let i = 0; i<facturas.length; i++)
        {
          if(facturas[i].numero_factura = this.numero_factura)
          {
            this.router.navigate(['/ver_factura_ingreso/'+ facturas[i].id]);
          }
        }
      });
  }
  actualizar_stock()
  {
    for(let i =0; i<this.articulos_agregados.length;i++)
    {
      this.service.ArticuloAgregarStock(this.articulos_agregados[i].articulo,this.articulos_agregados[i].cantidad).subscribe(data=>{},err=>console.log(err));
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
}
