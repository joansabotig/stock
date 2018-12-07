import { NodeCompatibleEventEmitter } from "rxjs/internal/observable/fromEvent";

export class ArticuloAgregado {
    id:number;
    cantidad:number;
    facturaId:number;
    facturaCompraId:number;
    articuloId:number;
    //cambios actualizacion
    nombre:string;
    descripcion:string;
    porc_iva:number;
    precio_compra:number;
    precio_venta:number;
    rubroId:number;

    //si es de comrpa el factura es null,
    //si es de venta el de compra es null.
    constructor(cantidad:number, facturaId:number, facturaCompraId:number, nombre:string, descripcion:string, precio_compra:number, precio_venta:number, rubroId:number,porc_iva:number, articuloId:number)
    {
        this.cantidad = cantidad;
        this.facturaCompraId = facturaCompraId;
        this.facturaId = facturaId;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio_compra = precio_compra;
        this.precio_venta = precio_venta;
        this.rubroId  = rubroId;
        this.articuloId = articuloId;
        this.porc_iva = porc_iva
    }
}
