import { Articulo } from "./articulo";
import { Empresa } from "./empresa";
import { Cliente } from "./cliente";
import { Proveedor } from "./proveedor";
import { ArticuloAgregado } from "./articulo-agregado";

export class Factura {
    id:number;
    numero_sucursal:number;
    numero_factura:number;
    articulos:ArticuloAgregado[] = [];
    total:number;
    iva:number;
    subtotal:number;
    empresa:Empresa;
    cliente:Cliente;
    fecha:Date;
    tipo:String;
    constructor(articulos:ArticuloAgregado[], empresa:Empresa,cliente:Cliente, fecha:Date,tipo:String, numero_factura:number)
    {
        this.empresa = empresa;
        this.cliente = cliente;
        this.fecha = fecha;
        this.numero_sucursal = empresa.numero_sucursal;
        this.numero_factura = empresa.getNumFactura();
        this.articulos = articulos;
        this.tipo = tipo;
        this.numero_factura = numero_factura;
        this.calcular();
    }
    calcular()
    {
        let acum_subtotal:number = 0;
        for(let i =0; i<this.articulos.length;i++)
        {
            acum_subtotal += (this.articulos[i].articulo.precio_venta * this.articulos[i].cantidad);
        }
        this.subtotal = acum_subtotal;
        let acum_iva:number=0;
        for(let i =0; i<this.articulos.length;i++)
        {
            acum_iva += ((this.articulos[i].articulo.precio_venta * this.articulos[i].cantidad) /100) *this.articulos[i].articulo.porc_iva;
        }
        this.iva = acum_iva;
        this.total = this.subtotal + this.iva;
    }
    
}
