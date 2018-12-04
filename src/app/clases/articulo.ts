import { concat } from "rxjs";
import { Rubro } from "./rubro";

export class Articulo {
    id:number;
    codigo:number;
    nombre:string;
    descripcion:string;
    rubroId:number;
    precio_compra:number;
    precio_venta:number;
    stock:number;
    porc_iva:number;
    constructor(codigo:number, nombre:string, descripcion:string, rubroId:number, precio_compra:number, precio_venta:number, porc_iva:number)
    {
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.rubroId = rubroId;
        this.precio_compra = precio_compra;
        this.precio_venta = precio_venta;
        this.stock = 0;
        this.porc_iva = porc_iva
    }
    
    
}
