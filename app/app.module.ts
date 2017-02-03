import { NgModule, Provider }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Ng2ModalModule } from "./../app/Common/Modal/Components/Modal.component";
import { routing } from "./app.routes";
import { AUTH_PROVIDERS } from "angular2-jwt";
import { AuthGuard } from "./Common/Auth/auth.guard";
import { ToastModule, ToastOptions } from "ng2-toastr/ng2-toastr";
import MaskedInput from "angular2-text-mask";
import { BusService } from "./Common/Bus/busService";
import { Ng2SmartTableModule } from "./Common/SmartTable/ng2-smart-table.module";
import { PopoverModule } from "ng2-popover";

//Components
import { WelcomeComponent } from "./Welcome/Components/Welcome.component";
import { HomeComponent } from "./Home/Components/home.component";
import { MenuComponent } from "./../app/Shared/Menu/Components/Menu.component";
import { RegistroComponent } from "./Registro/Components/Registro.component";
import { RegistroModule } from "./Registro/Registro.Module";
import { RegistroConfirmacionComponent } from "./Registro/Components/RegistroConfirmacion.Component";
import { RegistroProgresoComponent } from "./Registro/Components/RegistroProgreso.Component";
import { RegistroReceptoresComponent } from "./Registro/Components/RegistroReceptores.Component";
import { RegistroUsuarioComponent } from "./Registro/Components/RegistroUsuario.Component";
import { RecuperarCuentaComponent } from "./Autenticacion/Components/RecuperarCuenta.component";
import { AutenticacionComponent } from "./../app/Autenticacion/Components/Autenticacion.component";
import { FacturacionComponent } from "./../app/Facturacion/Components/facturacion.component";
import { facturacionBusquedaComponent } from "./../app/Facturacion/Components/facturacion.busqueda.component";
import { FacturacionPreFacturaComponent } from "./../app/Facturacion/Components/facturacion.preFactura.component";
import { FacturacionTransaccionComponent } from "./../app/Facturacion/Components/facturacion.transacciones.component";
import { FacturacionHistorialComponent } from  "./../app/Facturacion/Components/facturacion.historial.component";
import { FacturacionRapidaComponent } from  "./../app/Facturacion/Components/facturacionrapida.component";
import { PerfilComponent } from "./../app/Perfil/Components/Perfil.component";
import { PerfilFacturacionComponent } from "./../app/Perfil/Components/Perfil.receptores.component";
import { PerfilUsuarioComponent } from "./../app/Perfil/Components/Perfil.usuario.component";
import { BlockUIComponent } from "../app/Common/BlockUI/Component/BlockUI.Component";
import { ContactoExtComponent } from "./Contacto/Components/ContactoExt.Component";

//Services
import { GlobalService } from "./../app/Global/Services/Global.services";
import { BlockUIService } from "./../app/Common/BlockUI/Service/BlockUI.Service";

 let toastOptions = <ToastOptions> {
      autoDismiss: true,
      positionClass: "toast-top-right",
    };

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, Ng2ModalModule, routing, ToastModule.forRoot(toastOptions), Ng2SmartTableModule, PopoverModule ],
  declarations : [
      AppComponent,
      BlockUIComponent,
      HomeComponent,
      MenuComponent,
      WelcomeComponent,
      AutenticacionComponent,
      RecuperarCuentaComponent,
      RegistroComponent,
      //Registro Usuario
      RegistroUsuarioComponent,
      RegistroProgresoComponent,
      RegistroConfirmacionComponent,
      RegistroReceptoresComponent,
      //Facturacion
      FacturacionComponent,
      facturacionBusquedaComponent,
      FacturacionPreFacturaComponent,
      FacturacionTransaccionComponent,
      FacturacionHistorialComponent,
      FacturacionRapidaComponent,
     //Perfil
     PerfilComponent,
     PerfilFacturacionComponent,
     PerfilUsuarioComponent,
     //Contacto
     ContactoExtComponent,
     //Otros
     MaskedInput
    ],
    entryComponents : [ BlockUIComponent ],
    providers : [ GlobalService, BlockUIService, AUTH_PROVIDERS, AuthGuard, BusService],
    bootstrap : [ AppComponent ]
})
export class AppModule {

 }