import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { IDatosUsuario } from "./../Interfaces/IDatosUsuario";
import { IDatosFacturacion } from "./../Interfaces/IDatosFacturacion";
import { GlobalService } from "./../../Global/Services/Global.services";
import { Observable } from "rxjs/Observable";
import { ICliente } from "./../Interfaces/ICliente";

@Injectable()
export class RegistroService 
{
    private _AuthApiUrl : string;
    private _ApiUrl : string;

    constructor (private _http : Http, private _global : GlobalService) 
    { 
        this._AuthApiUrl = this._global.AuthApiUrl();
        this._ApiUrl = this._global.ApiUrl();
    }

    RegistroUsuario (registro : IDatosUsuario) : Observable<string> 
    {
        var headers = new Headers();
        headers.append("Content-Type", "application/json" );
        var options = new RequestOptions({ headers : headers });

        return this._http.post(this._AuthApiUrl + "/Usuario", JSON.stringify(registro), options)
            // .do(data => console.log("Token Server Response: " + JSON.stringify(data)))
            .map(this.GetUserId)
            .catch(this.handleError);
    }

    RegistroDatosFiscales(registro : IDatosFacturacion, idUsuario : string) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json" );
        var options = new RequestOptions({ headers : headers });

        var clienteFinal : ICliente =  {
            Alias : registro.datosFiscales.alias,
            RFC : registro.datosFiscales.RFC,
            RazonSocial : registro.datosFiscales.razonSocial,
            Contacto : "",
            Calle : registro.domicilioFiscal.calle,
            NumeroExterior : registro.domicilioFiscal.numeroExterior,
            NumeroInterior : registro.domicilioFiscal.numeroInterior,
            Colonia : registro.domicilioFiscal.colonia,
            Localidad : registro.domicilioFiscal.localidad,
            Pais : registro.domicilioFiscal.pais,
            CodigoPostal : registro.domicilioFiscal.codigoPostal,
            CorreoElectronico : registro.emailsReceptor,
            Ciudad : registro.domicilioFiscal.ciudad,
            IdEstado : registro.domicilioFiscal.estado
        };

        return this._http.post(this._ApiUrl + "/usuario/" + idUsuario + "/cliente", JSON.stringify(clienteFinal), options)
            .catch (this.handleError);
    }

    VerificarUsuarioExistente(username : string) : Observable<string> {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var options = new RequestOptions({headers : headers});

        return this._http.get(this._AuthApiUrl + "/usuario?username=" + username, options )
            .map(response => <string> response.json().Data)
            .catch(this.handleError);
    }

    private GetUserId(response : Response) {
        return (<string> response.json().Data) || "";
    }

    private handleError(error : Response)
    {
        return Observable.throw(error.json() || "server error");
    }

}