import { Empresa } from "./empresa";
import { Proveedor } from "./proveedor";
import { ArticuloAgregado } from "./articulo-agregado";

export class FacturaCompra {
    fecha_factura: Date; //fecha de pago
    id:number;
    numero_sucursal:number;
    numero_factura:number;
    articulos:ArticuloAgregado[] = [];
    total:number;
    iva:number;
    subtotal:number;
    empresa:Empresa;
    proveedor:Proveedor;
    fecha:Date; //fecha de emision de la factura
    tipo:String;
    constructor(articulos:ArticuloAgregado[], empresa:Empresa,proveedor:Proveedor, numero_factura,fecha_factura:Date,tipo:String)
    {
        this.empresa = empresa;
        this.proveedor = proveedor;
        this.fecha = fecha_factura;
        this.numero_sucursal = proveedor.numero_sucursal;
        this.numero_factura = numero_factura
        this.articulos = articulos;
        this.tipo = tipo;
        this.fecha_factura = new Date();
        this.calcular();
    }
    calcular()
    {
        let acum_subtotal:number = 0;
        for(let i =0; i<this.articulos.length;i++)
        {
            acum_subtotal += (this.articulos[i].articulo.precio_compra * this.articulos[i].cantidad);
        }
        this.subtotal = acum_subtotal;
        let acum_iva:number=0;
        for(let i =0; i<this.articulos.length;i++)
        {
            acum_iva += ((this.articulos[i].articulo.precio_compra * this.articulos[i].cantidad) /100) *this.articulos[i].articulo.porc_iva;
        }
        this.iva = acum_iva;
        this.total = this.subtotal + this.iva;
    }
}
