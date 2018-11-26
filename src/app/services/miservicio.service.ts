import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../clases/empresa';
import { Cliente } from '../clases/cliente';
import { Proveedor } from '../clases/proveedor';
import { Articulo } from '../clases/articulo';
import { Factura } from '../clases/factura';
import { FacturaCompra } from '../clases/factura-compra';
@Injectable({
  providedIn: 'root'
})
export class MiservicioService {
  host:String = 'http://localhost:3000/';
  empresa:Empresa;

  constructor(private http:HttpClient){
    this.empresa = new Empresa('el laboratorio','Zanni 2018','Parana','4200220','laboratorio@programacion.com','15437',1);
  }

  //manejo de articulos
  obtenerArticulos()
  {
    return this.http.get<Articulo[]>(this.host+'articulo');
  }
  obtenerArticulo(id:number)
  {
    return this.http.get<Articulo>(this.host + 'articulo/'+id)
  }
  borrarArticulo(id:number)
  {
    return this.http.delete(this.host + 'articulo/'+id)
  }

  modificarArticulo(arti:Articulo, codigo:number, nombre:string, descripcion:string, rubro:string, precio_compra:number, precio_venta:number, porc_iva:number, stock:number)
  {
    arti.codigo = codigo;
    arti.nombre = nombre;
    arti.descripcion = descripcion;
    arti.rubro = rubro;
    arti.precio_compra = precio_compra;
    arti.precio_venta = precio_venta;
    arti.stock= stock;
    arti.porc_iva = porc_iva
    return this.http.patch(this.host + 'articulo/'+arti.id,arti);
  }
  ArticuloAgregarStock(articulo:Articulo, stock:number)
  {
    articulo.stock +=stock;
    return this.http.patch(this.host + 'articulo/'+articulo.id,articulo)
  }
  ArticuloQuitarStock(articulo:Articulo, stock:number)
  {
    articulo.stock -=stock;
    return this.http.patch(this.host + 'articulo/'+articulo.id,articulo)
  }
  nuevoArticulo(arti:Articulo)
  {
    return this.http.post(this.host + 'articulo', arti);
  }
  //manejo de proveedores
  obtenerProveedores()
  {
    return this.http.get<Proveedor[]>(this.host+'proveedor');
  }
  obtenerProveedor(id:number)
  {
    return this.http.get<Proveedor>(this.host + 'proveedor/'+id)
  }
  borrarProveedor(id:number)
  {
    return this.http.delete(this.host + 'proveedor/'+id)
  }
  modificarProveedor(prove:Proveedor,nombre,direccion,localidad,telefono,email,cuenta,numero_sucursal)
  {
    prove.nombre=nombre;
    prove.direccion = direccion;
    prove.localidad=localidad;
    prove.telefono=telefono;
    prove.email = email;
    prove.cuenta = cuenta;
    prove.numero_sucursal = numero_sucursal;
    return this.http.patch(this.host + 'proveedor/'+prove.id,prove);
  }
  nuevoProveedor(prove:Proveedor)
  {
    return this.http.post(this.host + 'proveedor', prove);
  }
  //manejo de clientes
  obtenerClientes()
  {
    return this.http.get<Cliente[]>(this.host+'cliente');
  }
  obtenerCliente(id:number)
  {
    return this.http.get<Cliente>(this.host + 'cliente/'+id)
  }
  borrarCliente(id:number)
  {
    return this.http.delete(this.host + 'cliente/'+id)
  }
  modificarCliente(clien:Cliente,nombre,direccion,localidad,telefono,email,cuenta)
  {
    clien.nombre=nombre;
    clien.direccion = direccion;
    clien.localidad=localidad;
    clien.telefono=telefono;
    clien.email = email;
    clien.cuenta = cuenta;
    return this.http.patch(this.host + 'cliente/'+clien.id,clien);
  }
  nuevoCliente(clien:Cliente)
  {
    return this.http.post(this.host + 'cliente', clien);
  }
  //manejo de empresa
  
  // obtenerEmpresa(id:number)
  // {
  //   return this.http.get<Empresa>(this.host + 'empresa/'+id)
  // }
  
  // modificarEmpresa(empre:Empresa,nombre,direccion,localidad,telefono,email,cuenta,numero_sucursal)
  // {
  //   empre.nombre=nombre;
  //   empre.direccion = direccion;
  //   empre.localidad=localidad;
  //   empre.telefono=telefono;
  //   empre.email = email;
  //   empre.cuenta = cuenta;
  //   empre.numero_sucursal = numero_sucursal;
  //   return this.http.patch(this.host + 'empresa/'+empre.id,empre);
  // }
  // nuevaEmpresa(empre:Empresa)
  // {
  //   return this.http.post(this.host + 'empresa', empre);
  // }
  //manejo facturas venta
  obtenerFacturas()
  {
    return this.http.get<Factura[]>(this.host+'factura');
  }
  obtenerFactura(id:number)
  {
    return this.http.get<Factura>(this.host + 'factura/'+id)
  }
  borrarFactura(id:number)
  {
    return this.http.delete(this.host + 'factura/'+id)
  }
  nuevoFactura(fac:Factura)
  {
    return this.http.post(this.host + 'factura', fac);
  }


  //manejo de facturas compra
  obtenerFacturasCompra()
  {
    return this.http.get<FacturaCompra[]>(this.host+'factura_compra');
  }
  obtenerFacturaCompra(id:number)
  {
    return this.http.get<FacturaCompra>(this.host + 'factura_compra/'+id)
  }
  borrarFacturaCompra(id:number)
  {
    return this.http.delete(this.host + 'factura_compra/'+id)
  }
  nuevoFacturaCompra(fac:FacturaCompra)
  {
    return this.http.post(this.host + 'factura_compra', fac);
  }
 

}
