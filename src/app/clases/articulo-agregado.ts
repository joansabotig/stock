export class ArticuloAgregado {
    id:number;
    articuloId:number;
    cantidad:number;
    facturaId:number;
    facturaCompraId:number;
    //si es de comrpa el factura es null,
    //si es de venta el de compra es null.
    constructor(articuloId:number,cantidad:number, facturaId:number, facturaCompraId:number)
    {
        this.articuloId = articuloId;
        this.cantidad = cantidad;
        this.facturaCompraId = facturaCompraId;
        this.facturaId = facturaId;
    }
}
