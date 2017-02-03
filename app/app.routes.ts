import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./Welcome/Components/Welcome.component";
import { HomeComponent } from "./Home/Components/home.component";
import { RegistroComponent } from "./Registro/Components/Registro.component";
import { PerfilComponent } from "./Perfil/Components/Perfil.component";
import { FacturacionComponent } from "./../app/Facturacion/Components/facturacion.component";
import { FacturacionRapidaComponent } from "./../app/Facturacion/Components/facturacionrapida.component";
import { FacturacionHistorialComponent } from "./../app/Facturacion/Components/facturacion.historial.component";
import { ContactoExtComponent } from "./Contacto/Components/ContactoExt.Component";
import { RecuperarCuentaComponent } from "./Autenticacion/Components/RecuperarCuenta.component";
import  { AuthGuard } from "./Common/Auth/auth.guard";

const appRoutes : Routes = [
    { path: "", redirectTo : "/welcome", pathMatch : "full" },
    { path: "welcome", component: WelcomeComponent },
    { path: "Welcome", component: WelcomeComponent },
    { path: "home", component : HomeComponent, canActivate : [AuthGuard],
        children : [
            { path: "", component : FacturacionComponent },
            { path: "perfil", component : PerfilComponent },
            { path: "facturacion", component : FacturacionComponent },
            { path: "historial", component : FacturacionHistorialComponent },
            { path: "contacto", component : ContactoExtComponent }
        ]
    },
    { path: "Home", component : HomeComponent, canActivate : [AuthGuard],
        children : [
            { path: "", component : FacturacionComponent },
            { path: "Perfil", component : PerfilComponent },
            { path: "Facturacion", component : FacturacionComponent },
            { path: "Historial", component : FacturacionHistorialComponent },
            { path: "Contacto", component : ContactoExtComponent }
        ]
    },
    {path: "registro", component : RegistroComponent},
    {path: "Registro", component : RegistroComponent},
    {path: "recuperarcuenta", component : RecuperarCuentaComponent},
    {path: "RecuperarCuenta", component : RecuperarCuentaComponent},
    {path: "facturacionrapida", component : FacturacionRapidaComponent},
    {path: "FacturacionRapida", component : FacturacionRapidaComponent}
];

export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);