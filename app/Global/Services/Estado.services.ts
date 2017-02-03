import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from  "@angular/http";
import myGlobalConfig = require("./../../global.config");
import { IEstado } from "./../Interfaces/IEstado";
import { Observable } from "rxjs/Observable";


@Injectable()
export class EstadoService {

    constructor (private _http : Http) {}

    Estados() : Observable<IEstado[]> {
        var customHeaders = new Headers({"content-type" : "application/json"});
        var options = new RequestOptions({ headers : customHeaders });
        options.headers.append("content-type", "application/json");

        return this._http.get(myGlobalConfig.apiUrl + "/Estado", options)
            .map(this.getEstados)
            .catch(this.handleError);
    }

    private getEstados(response : Response) {
        return (<IEstado[]> response.json().Data) || {};
    }

    private handleError(error : Response){
        return Observable.throw(error.json() || "server error");
    }

}