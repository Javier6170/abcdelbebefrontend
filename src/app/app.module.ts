import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { AcercaNosotrosComponent } from './components/acerca-nosotros/acerca-nosotros.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { APP_ROUTING } from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VistaAdminComponent } from './components/vista-admin/vista-admin.component';
import { AccesoDenegadoComponent } from './components/acceso-denegado/acceso-denegado.component';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';
import { interceptorProvider } from './services/interceptors/prod-interceptor.service';
import { OlvideContrasenaComponent } from './components/olvide-contrasena/olvide-contrasena.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditarInfoComponent } from './components/editar-info/editar-info.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    AcercaNosotrosComponent,
    FooterComponent,
    RegistroComponent,
    LoginComponent,
    ProductosComponent,
    ContactoComponent,
    HomeComponent,
    VistaAdminComponent,
    AccesoDenegadoComponent,
    FooterAdminComponent,
    OlvideContrasenaComponent,
    ChangePasswordComponent,
    EditarInfoComponent,
    DetalleProductoComponent,
    EditarProductoComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
