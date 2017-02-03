import { Injectable } from "@angular/core";
import { IUsuario } from "./../Interfaces/IUsuario";
import { IToken } from "./../Interfaces/IToken";
import { IPerfil } from "./../Interfaces/IPerfil";
import {Headers, Http, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
//import { GlobalService } from "./../../Global/Services/Global.services";
import myGlobalConfig = require("./../../global.config");

@Injectable()
export class AutenticacionService
{
    //Members
    private authApi : string;
    private api : string;

    //Constructor
    constructor(private http : Http) {
        this.api = myGlobalConfig.apiUrl;
         this.authApi = myGlobalConfig.authApiUrl;
    }

    //Métodos
    Autenticar(usuario : IUsuario) : Observable<IToken> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json" );
        let options = new RequestOptions({ headers : headers});

        return this.http.post(this.api + "/Autenticacion", JSON.stringify(usuario), options)
            // .do(data => console.log("Token Server Response: " + JSON.stringify(data)))
            .map(this.getToken)
            .catch(this.handleError);
    }

    ObtenerToken() {
        return;
    }

    ValidarToken() {
        return;
    }

    ObtenerPerfilUsuario () : Observable<IPerfil>
    {
        let headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        let options = new RequestOptions({ headers : headers });

        return this.http.get(this.authApi + "/perfil", options)
            .map(this.mapUsuarioData)
            .catch(this.handleError);
    }

    RecuperarCuenta(username : string) : Observable<string> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json" );
        let options = new RequestOptions({ headers : headers });

        return this.http.get(this.authApi + "/perfil?username=" + username, options)
            .map(this.mapRecuperarData)
            .catch(this.handleError);
    }

    SolicitarReenvioCorreo(username : String, idUsuario : string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json" );
        let options = new RequestOptions({ headers : headers });

        return this.http.get(this.authApi + "/Usuario?username=" + username + "&idUsuario=" + idUsuario + "&reenvio=true", options)
            .map(response =>  response || {})
            .catch(this.handleError);
    }
    //Private Methods

    private getToken(response : Response)
    {
        return (<IToken> response.json()) || {};
    }

     private mapUsuarioData(response : Response) {
        return (<IPerfil> response.json().Data) || {};
    }

    private mapRecuperarData(response : Response) {
        return (response || {});
    }

    private handleError(error : Response){
        return Observable.throw(error.json() || "server error");
    }
}