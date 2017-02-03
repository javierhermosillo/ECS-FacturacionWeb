import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { GlobalService } from "./../../Global/Services/Global.services";
import { IDatosActualizacionUsuario } from "./../Interfaces/IDatosActualizacionUsuario";
import { IUsuario } from "./../Interfaces/IUsuario";
import { IReceptor } from "./../Interfaces/Receptores/IReceptor";
import { IDatosFacturacion } from "./../Interfaces/Receptores/IDatosFacturacion";
import { IReceptorRegistro } from "./../Interfaces/Receptores/IReceptorRegistro";  

@Injectable()
export class PerfilUsuarioService {

    private _authApi : string;
    private _api : string;

    constructor(private _http : Http, private _globalService : GlobalService) {
        this._authApi = _globalService.AuthApiUrl();
        this._api = _globalService.ApiUrl();
    }

    ActualizarPerfilUsuario(usuario : IDatosActualizacionUsuario) 
    {
        var headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        var options = new RequestOptions({ headers : headers });

        return this._http.put(this._authApi + "/perfil", JSON.stringify(usuario), options)
            .map(data => data.json().Data)
            .catch(this.handleError)
    }

    ActualizarReceptor(idUsuario : string, idCliente: string, datosFacturacion : IDatosFacturacion) : Observable<string> {
        var headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        var options = new RequestOptions({ headers : headers });

         var clienteFinal : IReceptorRegistro =  {
            Alias : datosFacturacion.datosFiscales.alias,
            IdCliente : idCliente,
            RFC : datosFacturacion.datosFiscales.RFC,
            RazonSocial : datosFacturacion.datosFiscales.razonSocial,
            Contacto : "",
            Calle : datosFacturacion.domicilioFiscal.calle,
            NumeroExterior : datosFacturacion.domicilioFiscal.numeroExterior,
            NumeroInterior : datosFacturacion.domicilioFiscal.numeroInterior,
            Colonia : datosFacturacion.domicilioFiscal.colonia,
            Localidad : datosFacturacion.domicilioFiscal.localidad,
            Pais : datosFacturacion.domicilioFiscal.pais,
            CodigoPostal : datosFacturacion.domicilioFiscal.codigoPostal,
            CorreoElectronico : datosFacturacion.emailsReceptor,
            Ciudad : datosFacturacion.domicilioFiscal.ciudad,
            IdEstado : datosFacturacion.domicilioFiscal.estado
        } 

       return  this._http.put(this._api + "/usuario/" + idUsuario + "/" + idCliente, JSON.stringify(clienteFinal), options)
            .map(data => data.json().data)
            .catch(this.handleError);
    }

     AgregarReceptor(idUsuario : string, idCliente: string, datosFacturacion : IDatosFacturacion) : Observable<string> {
        var headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        var options = new RequestOptions({ headers : headers });

         var clienteFinal : IReceptorRegistro =  {
            Alias : datosFacturacion.datosFiscales.alias,
            IdCliente : idCliente,
            RFC : datosFacturacion.datosFiscales.RFC,
            RazonSocial : datosFacturacion.datosFiscales.razonSocial,
            Contacto : "",
            Calle : datosFacturacion.domicilioFiscal.calle,
            NumeroExterior : datosFacturacion.domicilioFiscal.numeroExterior,
            NumeroInterior : datosFacturacion.domicilioFiscal.numeroInterior,
            Colonia : datosFacturacion.domicilioFiscal.colonia,
            Localidad : datosFacturacion.domicilioFiscal.localidad,
            Pais : datosFacturacion.domicilioFiscal.pais,
            CodigoPostal : datosFacturacion.domicilioFiscal.codigoPostal,
            CorreoElectronico : datosFacturacion.emailsReceptor,
            Ciudad : datosFacturacion.domicilioFiscal.ciudad,
            IdEstado : datosFacturacion.domicilioFiscal.estado
        } 

       return  this._http.post(this._api + "/usuario/" + idUsuario, JSON.stringify(clienteFinal), options)
            .map(data => data.json().data)
            .catch(this.handleError);
    }

    ObtenerPerfilUsuario () : Observable<IUsuario>
    {
        var headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        var options = new RequestOptions({ headers : headers });

        return this._http.get(this._authApi + "/perfil", options)
            .map(this.mapUsuarioData)
            .catch(this.handleError)
    }

    ObtenerReceptoresDeUsuario(idUsuario : string) : Observable<IReceptor[]> {
          var headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        var options = new RequestOptions({ headers : headers });

        return this._http.get(this._api + "/usuario/" + idUsuario + "/cliente" , options)
            .map(this.mapReceptoresData)
            .catch(this.handleError)
    }

    ObtenerDetalleReceptor(idUsuario : string, IdCliente : string) : Observable<IReceptor> {
          var headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        var options = new RequestOptions({ headers : headers });

        return this._http.get(this._api + "/usuario/" + idUsuario + "/" + IdCliente , options)
            .map(this.mapReceptoresData)
            .catch(this.handleError);
    }

    private mapUsuarioData(response : Response){
        if (response.status === 401) {
            throw Error("Sesión expirada");
        }
        return (<IUsuario> response.json().Data) || {};
    };

    private mapReceptoresData(response : Response){
        if (response.status === 401) {
            throw Error("Sesión expirada");
        }
        return (<IReceptor[]> response.json().Data) || {};
    };

    private handleError(error : Response)
    {
        return Observable.throw(error.json() || "server error");
    }


}