import { Articulo } from "./articulo";

export class ArticuloMostrar {
    cantidad:number;
    articulo:Articulo;
    constructor(cantidad:number, articulo: Articulo)
    {
        this.cantidad=cantidad;
        this.articulo = articulo;
    }
}
