export class Factura {
    id:number;//
    numero_sucursal:number;//
    numero_factura:number;//
    total:number;//
    iva:number;//
    subtotal:number;//
    clienteId:number//-----
    fecha:Date;//
    tipo:String;//
    constructor(
        numero_sucursal:number,
        numero_factura:number,
        total:number,
        iva:number,
        subtotal:number,
        clienteId:number, 
        fecha:Date,
        tipo:String)
    {
        this.numero_sucursal = numero_sucursal;
        this.numero_factura = numero_factura;
        this.total = total;
        this.iva = iva;
        this.subtotal=subtotal;
        this.clienteId = clienteId;
        this.fecha = fecha;
        this.tipo = tipo;
    }
    /*
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
    */
    
}
