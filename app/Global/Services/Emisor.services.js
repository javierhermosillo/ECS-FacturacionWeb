System.register(["@angular/core", "@angular/http", "./Global.services", "./../../global.config", "rxjs/Observable"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, Global_services_1, myGlobalConfig, Observable_1, EmisorService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Global_services_1_1) {
                Global_services_1 = Global_services_1_1;
            },
            function (myGlobalConfig_1) {
                myGlobalConfig = myGlobalConfig_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }
        ],
        execute: function () {
            EmisorService = (function () {
                function EmisorService(_http, _globalService) {
                    this._http = _http;
                    this._globalService = _globalService;
                }
                EmisorService.prototype.ObtenerEstaciones = function () {
                    var customHeaders = new http_1.Headers({ "content-type": "application/json" });
                    var options = new http_1.RequestOptions({ headers: customHeaders });
                    options.headers.append("content-type", "application/json");
                    return this._http.get(myGlobalConfig.apiUrl + "/Estacion", options)
                        .map(this.getEstaciones)
                        .catch(this.handleError);
                };
                EmisorService.prototype.getEstaciones = function (response) {
                    return response.json().Data || {};
                };
                EmisorService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json() || "server error");
                };
                return EmisorService;
            }());
            EmisorService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http, Global_services_1.GlobalService])
            ], EmisorService);
            exports_1("EmisorService", EmisorService);
        }
    };
});
//# sourceMappingURL=Emisor.services.js.map