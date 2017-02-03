import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from  "@angular/http";
import { GlobalService } from "./Global.services";
import myGlobalConfig = require("./../../global.config");
import { IEstacion } from "./../Interfaces/IEstacion";
import { Observable } from "rxjs/Observable";

@Injectable()
export class EmisorService {

     constructor (private _http : Http, private _globalService : GlobalService) {}

    ObtenerEstaciones() : Observable<IEstacion[]> {
        let customHeaders = new Headers({"content-type" : "application/json"});
        let options = new RequestOptions({ headers : customHeaders });
        options.headers.append("content-type", "application/json");

        return this._http.get(myGlobalConfig.apiUrl + "/Estacion", options)
            .map(this.getEstaciones)
            .catch(this.handleError);
    }

    private getEstaciones(response : Response) {
        return (<IEstacion[]> response.json().Data) || {};
    }

    private handleError(error : Response){
        return Observable.throw(error.json() || "server error");
    }

}