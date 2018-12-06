import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/services/miservicio.service';
import { Factura } from 'src/app/clases/factura';
import { FacturaCompra } from 'src/app/clases/factura-compra';
import { NumberSymbol } from '@angular/common';
import { Articulo } from 'src/app/clases/articulo';

@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private service:MiservicioService)
  {
    service.obtenerArticulos().subscribe(data=>{ this.articulos = data})
    service.obtenerFacturas().subscribe(data=>
      {
        this.facturas_venta = data;
        service.obtenerFacturasCompra().subscribe(data=>
          {
            this.facturas_compra = data;
            this.calcular();
            this.porcentajes();
          })
      })
  }
  bandera:boolean = true;
  articulos:Articulo[]=[];
  facturas_compra:FacturaCompra[]=[];
  facturas_venta:Factura[]=[];
  total_gastos:number=0;
  total_ventas:number=0;
  iva_aPagar:number=0;
  iva_saldo_aFavor:number=0;
  ganancias:number=0;
  iva_final:number=0;

  valor_stock:number=0;

  //porcentajes para las barras

  porc_total_gastos:number=0;
  porc_total_ventas:number=0;
  porc_iva_aPagar:number=0;
  porc_iva_saldo_aFavor:number=0;
  porc_ganancias:number=0;
  porc_iva_final:number=0;
  
  calcular()
  {
    for(let i=0; i<this.articulos.length;i++)
    {
      this.valor_stock += this.articulos[i].precio_venta * this.articulos[i].stock;
    }
    for(let i =0; i<this.facturas_compra.length;i++)
    {
      this.iva_saldo_aFavor += parseFloat(this.facturas_compra[i].iva.toString());
      this.total_gastos += parseFloat(this.facturas_compra[i].total.toString());
    }
    for(let i =0; i<this.facturas_venta.length;i++)
    {
      this.total_ventas+=  parseFloat(this.facturas_venta[i].total.toString());
      this.iva_aPagar += parseFloat(this.facturas_venta[i].iva.toString());
    }

    this.iva_final = this.iva_aPagar-this.iva_saldo_aFavor;
    this.ganancias = this.total_ventas-this.total_gastos;

    //porcentajes

    var total_mov_dinero= this.total_gastos + this.total_ventas;
    var total_mov_iva = this.iva_aPagar + this.iva_saldo_aFavor;
    this.porc_total_gastos = (100/total_mov_dinero)*this.total_gastos;

    this.porc_total_ventas =(100/total_mov_dinero)*this.total_ventas;
    this.porc_iva_aPagar = (100/total_mov_iva)*this.iva_aPagar;
    this.porc_iva_saldo_aFavor = (100/total_mov_iva)*this.iva_saldo_aFavor;
    this.porc_ganancias =  (100/total_mov_dinero)*this.ganancias;
    this.porc_iva_final = (100/total_mov_iva)*this.iva_final;
  }
  porcentajes()
  {
    document.getElementById('id001').style.width=parseInt(this.porc_total_gastos.toString()).toString().concat('%');
    document.getElementById('id002').style.width=parseInt(this.porc_total_ventas.toString()).toString().concat('%');
    document.getElementById('id003').style.width=parseInt(this.porc_ganancias.toString()).toString().concat('%');
    document.getElementById('id004').style.width=parseInt(this.porc_iva_saldo_aFavor.toString()).toString().concat('%');
    document.getElementById('id005').style.width=parseInt(this.porc_iva_aPagar.toString()).toString().concat('%');
    document.getElementById('id006').style.width=parseInt(this.porc_iva_final.toString()).toString().concat('%');

  }
  ngOnInit() {
  }
}
//700 lineas de codigo del servidor
//2000 lineas de codigo (solo logica)
// 1500 en HTML (sin css)
// = 4000!!
