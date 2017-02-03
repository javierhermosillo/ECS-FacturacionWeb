import { Injectable } from "@angular/core"; 
import { Observable } from "rxjs/Observable";
import { IUsuarioSession } from "./../Interfaces/IUsuarioSession"

@Injectable()
export class SessionService
{
    private usuarioSesion : IUsuarioSession = { UsuarioId : ""};

    RegistrarSesionDeUsuario(identificadorUsuario : string) {
        this.usuarioSesion.UsuarioId = identificadorUsuario;
    }

    ObtenerIdentificadorDeUsuario() : IUsuarioSession {
        return this.usuarioSesion;
    }

}