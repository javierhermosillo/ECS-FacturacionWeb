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
    var core_1, http_1, Global_services_1, Observable_1, RegistroService;
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
            RegistroService = (function () {
                function RegistroService(_http, _global) {
                    this._http = _http;
                    this._global = _global;
                    this._AuthApiUrl = this._global.AuthApiUrl();
                    this._ApiUrl = this._global.ApiUrl();
                }
                RegistroService.prototype.RegistroUsuario = function (registro) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.post(this._AuthApiUrl + "/Usuario", JSON.stringify(registro), options)
                        .map(this.GetUserId)
                        .catch(this.handleError);
                };
                RegistroService.prototype.RegistroDatosFiscales = function (registro, idUsuario) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    var options = new http_1.RequestOptions({ headers: headers });
                    var clienteFinal = {
                        Alias: registro.datosFiscales.alias,
                        RFC: registro.datosFiscales.RFC,
                        RazonSocial: registro.datosFiscales.razonSocial,
                        Contacto: "",
                        Calle: registro.domicilioFiscal.calle,
                        NumeroExterior: registro.domicilioFiscal.numeroExterior,
                        NumeroInterior: registro.domicilioFiscal.numeroInterior,
                        Colonia: registro.domicilioFiscal.colonia,
                        Localidad: registro.domicilioFiscal.localidad,
                        Pais: registro.domicilioFiscal.pais,
                        CodigoPostal: registro.domicilioFiscal.codigoPostal,
                        CorreoElectronico: registro.emailsReceptor,
                        Ciudad: registro.domicilioFiscal.ciudad,
                        IdEstado: registro.domicilioFiscal.estado
                    };
                    return this._http.post(this._ApiUrl + "/usuario/" + idUsuario + "/cliente", JSON.stringify(clienteFinal), options)
                        .catch(this.handleError);
                };
                RegistroService.prototype.VerificarUsuarioExistente = function (username) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.get(this._AuthApiUrl + "/usuario?username=" + username, options)
                        .map(function (response) { return response.json().Data; })
                        .catch(this.handleError);
                };
                RegistroService.prototype.GetUserId = function (response) {
                    return response.json().Data || "";
                };
                RegistroService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json() || "server error");
                };
                return RegistroService;
            }());
            RegistroService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http, Global_services_1.GlobalService])
            ], RegistroService);
            exports_1("RegistroService", RegistroService);
        }
    };
});
//# sourceMappingURL=Registro.service.js.map