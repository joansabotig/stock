import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { NuevoArticuloComponent } from './components/nuevo-articulo/nuevo-articulo.component';
import { ModificarArticuloComponent } from './components/modificar-articulo/modificar-articulo.component';
import { ListaArticuloComponent } from './components/lista-articulo/lista-articulo.component';
import { ListaProveedoresComponent } from './components/lista-proveedores/lista-proveedores.component';
import { NuevoProveedorComponent } from './components/nuevo-proveedor/nuevo-proveedor.component';
import { ModificarProveedorComponent } from './components/modificar-proveedor/modificar-proveedor.component';
import { ListaClienteComponent } from './components/lista-cliente/lista-cliente.component';
import { NuevoClienteComponent } from './components/nuevo-cliente/nuevo-cliente.component';
import { ModificarClienteComponent } from './components/modificar-cliente/modificar-cliente.component';
import { VerFacIngresoComponent } from './components/ver-fac-ingreso/ver-fac-ingreso.component';
import { VerFacEgresoComponent } from './components/ver-fac-egreso/ver-fac-egreso.component';
import { ListaFacIngresoComponent } from './components/lista-fac-ingreso/lista-fac-ingreso.component';
import { ListaFacEgresoComponent } from './components/lista-fac-egreso/lista-fac-egreso.component';
import { NuevaFacIngresoComponent } from './components/nueva-fac-ingreso/nueva-fac-ingreso.component';
import { NuevaFacEgresoComponent } from './components/nueva-fac-egreso/nueva-fac-egreso.component';
export const routes: Routes = [
    {   path: 'nuevo_articulo' , component: NuevoArticuloComponent},
    {   path: 'editar_articulo/:id' , component: ModificarArticuloComponent},
    {   path: 'lista_articulos' , component: ListaArticuloComponent},
    {   path: 'lista_proveedores' , component: ListaProveedoresComponent},
    {   path: 'nuevo_proveedor' , component: NuevoProveedorComponent},
    {   path: 'editar_proveedor/:id' , component: ModificarProveedorComponent},
    {   path: 'lista_clientes' , component: ListaClienteComponent},
    {   path: 'nuevo_cliente' , component: NuevoClienteComponent},
    {   path: 'editar_cliente/:id' , component: ModificarClienteComponent},
    {   path: 'ver_factura_ingreso/:id' , component: VerFacIngresoComponent},
    {   path: 'ver_factura_egreso/:id' , component: VerFacEgresoComponent},
    {   path: 'nueva_factura_ingreso' , component: NuevaFacIngresoComponent},
    {   path: 'nueva_factura_egreso' , component: NuevaFacEgresoComponent},
    {   path: 'lista_factura_ingreso' , component: ListaFacIngresoComponent},
    {   path: 'lista_factura_egreso' , component: ListaFacEgresoComponent},
    {   path: '' , component: InicioComponent},
    {   path: '**', redirectTo: ''}

]