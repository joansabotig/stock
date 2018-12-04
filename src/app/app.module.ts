import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { NuevoArticuloComponent } from './components/nuevo-articulo/nuevo-articulo.component';
import { ModificarArticuloComponent } from './components/modificar-articulo/modificar-articulo.component';
import { ListaArticuloComponent } from './components/lista-articulo/lista-articulo.component';
import { ListaProveedoresComponent } from './components/lista-proveedores/lista-proveedores.component';
import { NuevoProveedorComponent } from './components/nuevo-proveedor/nuevo-proveedor.component';
import { ModificarProveedorComponent } from './components/modificar-proveedor/modificar-proveedor.component';
import { ListaClienteComponent } from './components/lista-cliente/lista-cliente.component';
import { NuevoClienteComponent } from './components/nuevo-cliente/nuevo-cliente.component';
import { ModificarClienteComponent } from './components/modificar-cliente/modificar-cliente.component';
import { NuevaFacIngresoComponent } from './components/nueva-fac-ingreso/nueva-fac-ingreso.component';
import { NuevaFacEgresoComponent } from './components/nueva-fac-egreso/nueva-fac-egreso.component';
import { VerFacEgresoComponent } from './components/ver-fac-egreso/ver-fac-egreso.component';
import { VerFacIngresoComponent } from './components/ver-fac-ingreso/ver-fac-ingreso.component';
import { ListaFacIngresoComponent } from './components/lista-fac-ingreso/lista-fac-ingreso.component';
import { ListaFacEgresoComponent } from './components/lista-fac-egreso/lista-fac-egreso.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from '@angular/common/http';
import { NuevoRubroComponent } from './components/nuevo-rubro/nuevo-rubro.component';
import { ListaRubroComponent } from './components/lista-rubro/lista-rubro.component';
import { EditarRubroComponent } from './components/editar-rubro/editar-rubro.component';
import { InfoComponent } from './components/info/info.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    NuevoArticuloComponent,
    ModificarArticuloComponent,
    ListaArticuloComponent,
    ListaProveedoresComponent,
    NuevoProveedorComponent,
    ModificarProveedorComponent,
    ListaClienteComponent,
    NuevoClienteComponent,
    ModificarClienteComponent,
    NuevaFacIngresoComponent,
    NuevaFacEgresoComponent,
    VerFacEgresoComponent,
    VerFacIngresoComponent,
    ListaFacIngresoComponent,
    ListaFacEgresoComponent,
    NuevoRubroComponent,
    ListaRubroComponent,
    EditarRubroComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
