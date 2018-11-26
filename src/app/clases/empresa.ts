export class Empresa {
    id:number;
    numero_sucursal:number;
    nombre:string;
    direccion:string;
    localidad:string;
    telefono:string;
    email:string;
    cuenta:string;
    num_factura:number;
    constructor(nombre,direccion,localidad,telefono,email,cuenta,numero_sucursal)
    {
        this.nombre=nombre;
        this.direccion = direccion;
        this.localidad=localidad;
        this.telefono=telefono;
        this.email = email;
        this.cuenta = cuenta;
        this.numero_sucursal = numero_sucursal;
        this.num_factura =0;
    }
    getNumFactura()
    {
        this.num_factura++;
        return this.num_factura;
    }

}
