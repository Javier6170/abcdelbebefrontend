import { RouterModule, Routes } from "@angular/router";
import { AccesoDenegadoComponent } from "./components/acceso-denegado/acceso-denegado.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { ContactoComponent } from "./components/contacto/contacto.component";
import { EditarInfoComponent } from "./components/editar-info/editar-info.component";
import { EditarProductoComponent } from "./components/editar-producto/editar-producto.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { OlvideContrasenaComponent } from "./components/olvide-contrasena/olvide-contrasena.component";
import { ProductosComponent } from "./components/productos/productos.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { VistaAdminComponent } from "./components/vista-admin/vista-admin.component";

const APP_ROUTES:Routes = [
    {path:'home', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'registro', component: RegistroComponent},
    {path:'productos', component: ProductosComponent},
    {path:'contacto', component: ContactoComponent},
    {path:'recargar_registro', component: RegistroComponent},
    {path:'vista_admin', component:VistaAdminComponent},
    {path:'acceso_denegado', component:AccesoDenegadoComponent},
    {path:'olvideContrasena', component:OlvideContrasenaComponent},
    {path:'changePassword/:tokenPassword', component:ChangePasswordComponent},
    {path:'editar_informacion', component:EditarInfoComponent},
    {path: 'editar/:id', component: EditarProductoComponent},
    {path:'**', pathMatch:'full', redirectTo:'home'}   
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);