import { Component } from "@angular/core";
import { PerfilUsuarioComponent } from "./../Components/Perfil.usuario.component";
import { PerfilFacturacionComponent } from "./../Components/Perfil.receptores.component";
import { IUsuario } from "./../Interfaces/IUsuario";
import { PerfilUsuarioService } from "./../Services/perfil.usuario.service";
import { EstadoService } from "./../../Global/Services/Estado.services";

@Component({
    templateUrl: "App/Perfil/Views/Perfil.component.html",
    //directives : [PerfilUsuarioComponent, PerfilFacturacionComponent],
    providers: [PerfilUsuarioService, EstadoService],
    styleUrls: ["app/Perfil/Styles/Perfil.component.css"]
})
export class PerfilComponent 
{
    _contextUsuario : IUsuario = { IdUsuario : "", Nombre: "",  ApellidoPaterno : "", ApellidoMaterno : "", Celular : "", Email : ""  };
    PosicionamientoPerfilUsuario : boolean  = true;
    PosicionamientoPerfilFacturacion : boolean  = true;

    RegistrarDatosUsuario(usuario : IUsuario) {
        this._contextUsuario = usuario;
    }

}