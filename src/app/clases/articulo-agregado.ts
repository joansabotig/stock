import { Articulo } from "./articulo";

export class ArticuloAgregado {
    articulo:Articulo;
    cantidad:number;
    constructor(articulo:Articulo,cantidad:number)
    {
        this.articulo = articulo;
        this.cantidad = cantidad;
    }
}
