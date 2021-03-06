System.register(["@angular/core", "@angular/http", "./../../Global/Services/Global.services", "rxjs/Observable"], function (exports_1, context_1) {
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
    var core_1, http_1, Global_services_1, Observable_1, ContactoService;
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
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }
        ],
        execute: function () {
            ContactoService = (function () {
                function ContactoService(http, globalService) {
                    this.http = http;
                    this.globalService = globalService;
                }
                ContactoService.prototype.SolicitarEnvioDeMensaje = function (mensaje) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this.globalService.ApiUrl() + "/Contacto", mensaje, options)
                        .map(function (response) { return response.json().Data || {}; })
                        .catch(this.handleError);
                };
                ContactoService.prototype.handleError = function (error) {
                    if (error.status === 401) {
                        throw Error("Sesion Expirada");
                    }
                    ;
                    return Observable_1.Observable.throw(error.json() || "server error");
                };
                return ContactoService;
            }());
            ContactoService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http, Global_services_1.GlobalService])
            ], ContactoService);
            exports_1("ContactoService", ContactoService);
        }
    };
});
//# sourceMappingURL=contacto.service.js.map