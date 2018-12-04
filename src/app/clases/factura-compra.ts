import { Empresa } from "./empresa";
import { Proveedor } from "./proveedor";
import { ArticuloAgregado } from "./articulo-agregado";

export class FacturaCompra {
    fecha_factura: Date; //fecha de ingreso en el sistema
    id:number;
    numero_sucursal:number;
    numero_factura:number;
    total:number;
    iva:number;
    subtotal:number;
    proveedorId:number;
    fecha:Date; //fecha de emision de la factura
    tipo:String;
    constructor(
        numero_sucursal:number,
        numero_factura:number,
        total:number,
        iva:number,
        subtotal:number,
        proveedorId:number,
        fecha_factura:Date,
        tipo:String)
    {
        this.numero_sucursal = numero_sucursal;
        this.numero_factura = numero_factura;
        this.total = total;
        this.iva = iva;
        this.subtotal=subtotal;
        this.proveedorId = proveedorId;
        this.fecha = fecha_factura;
        this.tipo = tipo;
        this.fecha_factura = new Date();
    }

}
