import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { GlobalService } from "./../../Global/Services/Global.services";
import { IMensajeContacto } from "./../Interfaces/IMensajeContacto";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ContactoService {

    constructor(private http : Http, private globalService: GlobalService) {}

    SolicitarEnvioDeMensaje(mensaje : IMensajeContacto) {
         let headers = new Headers();
        headers.append("Content-Type", "application/json" );
        let options = new RequestOptions({ headers : headers });

        return this.http.post(this.globalService.ApiUrl() + "/Contacto", mensaje, options)
            .map(response => response.json().Data || {})
            .catch(this.handleError);
    }

     private handleError(error : Response) {
        if (error.status === 401 ) {
            throw Error("Sesion Expirada");
        };
        return Observable.throw(error.json() || "server error");
    }

}