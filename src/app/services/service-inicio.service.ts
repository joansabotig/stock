import { Injectable } from '@angular/core';
import { Cliente } from '../clases/cliente';
import { Proveedor } from '../clases/proveedor';
import { Articulo } from '../clases/articulo';
import { Factura } from '../clases/factura';
import { FacturaCompra } from '../clases/factura-compra';
import { Rubro } from '../clases/rubro';
import { ArticuloAgregado } from '../clases/articulo-agregado';
import { MiservicioService } from './miservicio.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceInicioService {

  constructor(private service:MiservicioService) { }

  rubros:Rubro[];

  limpiar()
  {
    this.limpiar_facturas();

    this.limpiar_clientes();
    this.limpiar_proveedores();
    this.limpiar_articulos_agregados();
    this.limpiar_articulos();//cuando temrina llama a limpiar rubros
  }
  iniciar()
  {
    this.agregar_rubros();
    this.agregar_clientes();
    this.agregar_proveedores();
  }
  limpiar_articulos_agregados()
  {
    this.service.obtenerArticulosAgregados().subscribe(data=>
      {
        for(let i=0; i<data.length;i++)
        {
            this.service.borrarArticuloAregado(data[i].id).subscribe();
        }
        
      })
  }
  limpiar_facturas()
  {
    this.service.obtenerFacturas().subscribe(data=>
    {
      for(let i=0; i<data.length;i++)
      {
        if(i==data.length-1)
        {
          this.service.borrarFactura(data[i].id).subscribe(data=>{this.limpiar_clientes();});
        }
        else
        {
          this.service.borrarFactura(data[i].id).subscribe();
        }
      }
    })
    this.service.obtenerFacturasCompra().subscribe(data=>
    {
      for(let i=0; i<data.length;i++)
      {
        if(i==data.length-1)
        {
          this.service.borrarFacturaCompra(data[i].id).subscribe(data=>{this.limpiar_proveedores();});
        }
        else
        {
          this.service.borrarFacturaCompra(data[i].id).subscribe();
        }
      }
    })
  }
  limpiar_rubros()
  {
    this.service.obtenerRubros().subscribe(data=>
      {
        for(let i=0; i<data.length;i++)
        {
          this.service.borrarRubro(data[i].id).subscribe();
        }
        
      })
  }
  limpiar_articulos()
  {
    
    this.service.obtenerArticulos().subscribe(data=>
      {
        for(let i=0; i<data.length;i++)
        {
          if(i==data.length-1)
          {
            this.service.borrarArticulo(data[i].id).subscribe(data=>{this.limpiar_rubros();});
          }
          else
          {
            this.service.borrarArticulo(data[i].id).subscribe();
          }
          
        }
      })
  }
  limpiar_clientes()
  {
    this.service.obtenerClientes().subscribe(data=>
      {
        for(let i=0; i<data.length;i++)
        {
          this.service.borrarCliente(data[i].id).subscribe();
        }
      })
  }
  limpiar_proveedores()
  {
    this.service.obtenerProveedores().subscribe(data=>
      {
        for(let i=0; i<data.length;i++)
        {
          this.service.borrarProveedor(data[i].id).subscribe();
        }
      })
  }
  agregar_rubros()
  {
    var rubro1:Rubro = new Rubro('Lacteos','Pasillo 1 Gondola 2');
    var rubro2:Rubro = new Rubro('Panificacion','Pasillo 3 Gondola 1');
    var rubro3:Rubro = new Rubro('Enlatados','Pasillo 2');
    var rubro4:Rubro = new Rubro('Perfumeria','Pasillo 5');
    var rubro5:Rubro = new Rubro('Farmaceuticos','Farmacia interna');
    var rubro6:Rubro = new Rubro('Herramientas','Pasillo 6 Gondola 4');

    var bandera = true;
    this.service.nuevoRubro(rubro1).subscribe(data=>{
      this.service.nuevoRubro(rubro2).subscribe(data=>{
        this.service.nuevoRubro(rubro3).subscribe(data=>{
          this.service.nuevoRubro(rubro4).subscribe(data=>{
            this.service.nuevoRubro(rubro5).subscribe(data=>{
              this.service.nuevoRubro(rubro6).subscribe(data=>{
                this.service.obtenerRubros().subscribe(data=>{
                  this.rubros = data;
                  this.agregar_articulos();
                })
                
              });
            });
          });
        });
      });
    });
  }
  agregar_articulos()
  {
    var articulo1:Articulo;
    var articulo2:Articulo;
    var articulo3:Articulo;
    var articulo4:Articulo;
    var articulo5:Articulo;
    var articulo6:Articulo;
    var articulo7:Articulo;
    var articulo8:Articulo;
    var articulo9:Articulo;
    var articulo10:Articulo;
    var articulo11:Articulo;
    var articulo12:Articulo;
    for(let i =0; i<this.rubros.length;i++)
    {
      if(this.rubros[i].nombre == 'Lacteos')
      {
        var id_rubro = this.rubros[i].id;
        articulo1 = new Articulo(1,'Leche','Larga vida - descremada',id_rubro,15.25,25.50,21);
        articulo2 = new Articulo(2,'Yogurt','La Serenisima - Cremoso', id_rubro,10.5,20,21);
        this.service.nuevoArticulo(articulo1).subscribe();
        this.service.nuevoArticulo(articulo2).subscribe();
      }
      if(this.rubros[i].nombre == 'Panificacion')
      {
        var id_rubro = this.rubros[i].id;
        articulo3 = new Articulo(3,'Pan Lactal','Bimbo',id_rubro,5.25,11.50,21);
        articulo4 = new Articulo(4,'Facturas','Dulce de leche', id_rubro,5.5,15,21);
        this.service.nuevoArticulo(articulo3).subscribe();
        this.service.nuevoArticulo(articulo4).subscribe();
      }
      if(this.rubros[i].nombre == 'Enlatados')
      {
        var id_rubro = this.rubros[i].id;
        articulo5 = new Articulo(5,'Palmitos','Entero',id_rubro,30.25,45.50,21);
        articulo6 = new Articulo(6,'Atun','Grande', id_rubro,20.5,29,21);
        this.service.nuevoArticulo(articulo5).subscribe();
        this.service.nuevoArticulo(articulo6).subscribe();
      }
      if(this.rubros[i].nombre == 'Perfumeria')
      {
        var id_rubro = this.rubros[i].id;
        articulo7 = new Articulo(7,'Quita esmalte','Grande',id_rubro,50.25,71.80,21);
        articulo8 = new Articulo(8,'Desodrante','Axe', id_rubro,15,25,21);
        this.service.nuevoArticulo(articulo7).subscribe();
        this.service.nuevoArticulo(articulo8).subscribe();
      }
      if(this.rubros[i].nombre == 'Farmaceuticos')
      {
        var id_rubro = this.rubros[i].id;
        articulo9 = new Articulo(9,'Cafiaspirina','Caja',id_rubro,45,55.50,10.5);
        articulo10 = new Articulo(10,'Aspirineta','Caja', id_rubro,25.5,38,10.5);
        this.service.nuevoArticulo(articulo9).subscribe();
        this.service.nuevoArticulo(articulo10).subscribe();
      }
      if(this.rubros[i].nombre == 'Herramientas')
      {
        var id_rubro = this.rubros[i].id;
        articulo11 = new Articulo(11,'Martillo','Mango de madera',id_rubro,85.8,110.50,21);
        articulo12 = new Articulo(12,'Pulidora','Black&Decker', id_rubro,350.5,410,21);
        this.service.nuevoArticulo(articulo11).subscribe();
        this.service.nuevoArticulo(articulo12).subscribe();
      }
    }
  }
  agregar_clientes()
  {
    var cliente1:Cliente = new Cliente('Joan','Jorge Newvery 2020','Parana','4202020','joansabotig96@gmail.com','b2550');
    var cliente2:Cliente = new Cliente('Roberto','Nogoya 1920','Parana','4202852','roberto@gmail.com','a669');
    var cliente3:Cliente = new Cliente('Pepe','Carbo 1570','Parana','4242589','pepe@gmail.com','z8888');
    var cliente4:Cliente = new Cliente('Jose','Av. Zanni 1010','Parana','4212121','jose@gmail.com','x1112');
    this.service.nuevoCliente(cliente1).subscribe();
    this.service.nuevoCliente(cliente2).subscribe();
    this.service.nuevoCliente(cliente3).subscribe();
    this.service.nuevoCliente(cliente4).subscribe();
  }
  agregar_proveedores()
  {
    var prov1:Proveedor = new Proveedor('Walle', 'Urquiza 2015','Parana', '4215896','walle_1980@hotmail.com','a315',1025);
    var prov2:Proveedor = new Proveedor('Thor', 'Laurencena 205','Parana', '4211476','soy_thor@hotmail.com','a316',1125);
    var prov3:Proveedor = new Proveedor('Jennifer', 'Gdor Caputo 115','Parana', '4112233','jenny@hotmail.com','a315',1025);
    this.service.nuevoProveedor(prov1).subscribe();
    this.service.nuevoProveedor(prov2).subscribe();
    this.service.nuevoProveedor(prov3).subscribe();
  }


}
