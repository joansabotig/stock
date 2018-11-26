export class Proveedor {
    id:number;
    numero_sucursal:number;
    nombre:string;
    cuenta:string;
    email:string;
    telefono:string;
    direccion:string;
    localidad:string;
    constructor(nombre,direccion,localidad,telefono,email,cuenta,numero_sucursal)
    {
        this.nombre=nombre;
        this.direccion = direccion;
        this.localidad=localidad;
        this.telefono=telefono;
        this.email = email;
        this.cuenta = cuenta;
        this.numero_sucursal =numero_sucursal;
    }
}
