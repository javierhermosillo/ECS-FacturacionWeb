import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from  "@angular/http";
import myGlobalConfig = require("./../../global.config");
import { IMetodoPago } from "./../Interfaces/IMetodoPago";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MetodoPagoService {

     constructor (private _http : Http) {}

    ObtenerMetodosDePago() : Observable<IMetodoPago[]> {
        var customHeaders = new Headers({"content-type" : "application/json"});
        var options = new RequestOptions({ headers : customHeaders });
        options.headers.append("content-type", "application/json");

        return this._http.get(myGlobalConfig.apiUrl + "/MetodoPago", options)
            .map(this.getMetodosPago)
            .catch(this.handleError);
    }

    private getMetodosPago(response : Response) {
        return (<IMetodoPago[]> response.json().Data) || {};
    }

    private handleError(error : Response){
        return Observable.throw(error.json() || "server error");
    }

}