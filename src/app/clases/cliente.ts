export class Cliente {
    id:number;
    nombre:string;
    cuenta:string;
    email:string;
    telefono:string;
    direccion:string;
    localidad:string;
    constructor(nombre,direccion,localidad,telefono,email,cuenta)
    {
        this.nombre=nombre;
        this.direccion = direccion;
        this.localidad=localidad;
        this.telefono=telefono;
        this.email = email;
        this.cuenta = cuenta;
    }
}

