import { Injectable, EventEmitter } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from  "@angular/http";
import { GlobalService } from "./../../Global/Services/Global.services";
import { ITransaccion } from "./../Interfaces/ITransaccion";
import { IParametrosBusqueda } from "./../Interfaces/IParametrosBusqueda";
import { IMensajeBitacora } from "./../Interfaces/IMensajeBitacora";
import { IFacturaRegistro } from "./../Interfaces/IFacturaRegistro";
import { IFacturaHistorial } from "./../Interfaces/IFacturaHistorial";
import { IIEPS } from "./../Interfaces/IIEPS";
import { Observable } from "rxjs/Observable";

@Injectable()
export class facturacionServices {

    constructor (private _http : Http, private _globalService : GlobalService) {
    }

    BuscarComprobante(folio : string, serie : string, rfcEmisor : string, idCliente : string) : Observable<string> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        let options = new RequestOptions({ headers : headers });

        return this._http.get(this._globalService.ApiUrl() + "/facturacion?Serie=" + serie + "&folio=" + folio + "&rfcEmisor=" + rfcEmisor + "&IdCliente=" + idCliente, options)
            .map(response => response.json().Data || {})
            .catch(this.handleError);
    }

    BuscarDetalleTransaccion(parametrosBusqueda : IParametrosBusqueda ) : Observable<ITransaccion> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        let options = new RequestOptions({ headers : headers });

        return this._http.get(this._globalService.ApiUrl() + "/Transaccion?NoTicket=" + parametrosBusqueda.NoTicket + "&NoEstacion=" + parametrosBusqueda.NoEstacion, options)
            .map(response => response.json().Data)
            .catch(this.handleError);
    }

    BuscarMensajesEnBitacora(parametrosBusqueda : IParametrosBusqueda) : Observable<IMensajeBitacora[]> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        let options = new RequestOptions({ headers : headers });

        return this._http.get(this._globalService.ApiUrl() + "/Transaccion/Bitacora?NoTicket=" + parametrosBusqueda.NoTicket + "&NoEstacion=" + parametrosBusqueda.NoEstacion + "&NoVerificador=" + parametrosBusqueda.NoVerificador, options)
            .map(this.getMensajeBitacora)
            .catch(this.handleError);
    }

    BuscarTransaccionesPendientes() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization","bearer " + sessionStorage.getItem("AuthToken"));
        let options = new RequestOptions({ headers : headers });

        return this._http.get(this._globalService.ApiUrl() + "/Transaccion", options)
            .map(this.getTransaccionesPendientes)
            .catch(this.handleError);
    }

    DescargarFacturaXML(serie : string, folio : string, rfcEmisor : string) {
        let headers = new Headers();
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        let options = new RequestOptions({ headers : headers });

        return this._http.get(this._globalService.ApiUrl() + "/facturacion/XML?Serie=" + serie + "&folio=" + folio + "&rfcEmisor=" + rfcEmisor, options)
            .map(response => response)
            .catch(this.handleError);
    }

    DescargarFacturaRapidaXML(serie : string, folio : string, rfcEmisor : string) {
        let headers = new Headers();
        let options = new RequestOptions({ headers : headers });

        return this._http.get(this._globalService.ApiUrl() + "/facturacionRapida/XML?Serie=" + serie + "&folio=" + folio + "&rfcEmisor=" + rfcEmisor, options)
            .map(response => response)
            .catch(this.handleError);
    }

    DescargarFacturaPDF(serie : string, folio : string, rfcEmisor : string) {
        let headers = new Headers();
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        let options = new RequestOptions({ headers : headers });

        return this._http.get(this._globalService.ApiUrl() + "/facturacion/PDF?Serie=" + serie + "&folio=" + folio + "&rfcEmisor=" + rfcEmisor, options)
            .map(this.getResponseBuffer)
            .catch(this.handleError);
    }

    EliminarTransaccionDeBandeja(noEstacion : number, noTransaccion : number) {
         let headers = new Headers();
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        let options = new RequestOptions({ headers : headers });

        return this._http.delete(this._globalService.ApiUrl() + "/Transaccion?NoEstacion=" + noEstacion + "&NoTransaccionOriginal=" + noTransaccion, options)
            .map(response => response)
            .catch(this.handleError);
    }

    ObtenerHistorialDeFacturacion() : Observable<any[]> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        let options = new RequestOptions({ headers : headers });

        return this._http.get(this._globalService.ApiUrl() + "/Facturacion", options)
            .map(this.getHistorialFacturacion)
            .catch(this.handleError);
    }

    SolicitarBusquedaTransaccion(parametrosBusqueda : IParametrosBusqueda ) : Observable<string> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization","bearer " + sessionStorage.getItem("AuthToken"));
        let options = new RequestOptions({ headers : headers });

        return this._http.post(this._globalService.ApiUrl() + "/Transaccion/Busqueda", JSON.stringify(parametrosBusqueda), options)
            .map(response => response)
            .catch(this.handleError);
    }

     SolicitarFacturacion(comprobante : any) : Observable<IFacturaRegistro> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json" );
        headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
        let options = new RequestOptions({ headers : headers });

        return this._http.post(this._globalService.ApiUrl() + "/facturacion", JSON.stringify(comprobante), options)
            .map(response => response.json().Data || {})
            .catch(this.handleErrorRaw);
            //.finally(this.handleResponseStatus);
    }

    SolicitarFacturacionRapida(comprobante: any) : Observable<any> {
         let headers = new Headers();
        headers.append("Content-Type", "application/json" );
        let options = new RequestOptions({ headers : headers });

        return this._http.post(this._globalService.ApiUrl() + "/FacturacionRapida", JSON.stringify(comprobante), options)
            .map(response => response.json().Data || {})
            .catch(this.handleErrorRaw);
    }

    private getHistorialFacturacion(response : Response) {
        return (<IFacturaHistorial[]> response.json().Data) || {};
    }

    private getMensajeBitacora(response : Response) {
        return (<IMensajeBitacora[]> response.json().Data) || {};
    }

    private getMensajeSolicitudTransaccion(response : Response) {
        return (response =  response.json().Data) || {};
    }

    private getTransaccionesPendientes (response : Response) {
        return (<ITransaccion[]> response.json().Data || {})
    }

    private getResponseBuffer(response : Response){
        return (response.arrayBuffer());
    }

    private handleError(response : Response) {
        if (response.status === 401 ) {
            return Observable.throw("Sesion Expirada");
        }
        if (response.status === 503 ) {
            return Observable.throw("Servicio facturación no disponible");
        }
        if (response.status === 500 ) {
            return Observable.throw("Fatal Error");
        } 
        else {
            return Observable.throw("Not handled error");
        }
    }

    private handleErrorRaw(response : Response) {
        return Observable.throw(response.json());
    }

}