System.register(["@angular/core", "@angular/http", "rxjs/Observable", "./../../Global/Services/Global.services"], function (exports_1, context_1) {
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
    var core_1, http_1, Observable_1, Global_services_1, PerfilUsuarioService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Global_services_1_1) {
                Global_services_1 = Global_services_1_1;
            }
        ],
        execute: function () {
            PerfilUsuarioService = (function () {
                function PerfilUsuarioService(_http, _globalService) {
                    this._http = _http;
                    this._globalService = _globalService;
                    this._authApi = _globalService.AuthApiUrl();
                    this._api = _globalService.ApiUrl();
                }
                PerfilUsuarioService.prototype.ActualizarPerfilUsuario = function (usuario) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.put(this._authApi + "/perfil", JSON.stringify(usuario), options)
                        .map(function (data) { return data.json().Data; })
                        .catch(this.handleError);
                };
                PerfilUsuarioService.prototype.ActualizarReceptor = function (idUsuario, idCliente, datosFacturacion) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    var clienteFinal = {
                        Alias: datosFacturacion.datosFiscales.alias,
                        IdCliente: idCliente,
                        RFC: datosFacturacion.datosFiscales.RFC,
                        RazonSocial: datosFacturacion.datosFiscales.razonSocial,
                        Contacto: "",
                        Calle: datosFacturacion.domicilioFiscal.calle,
                        NumeroExterior: datosFacturacion.domicilioFiscal.numeroExterior,
                        NumeroInterior: datosFacturacion.domicilioFiscal.numeroInterior,
                        Colonia: datosFacturacion.domicilioFiscal.colonia,
                        Localidad: datosFacturacion.domicilioFiscal.localidad,
                        Pais: datosFacturacion.domicilioFiscal.pais,
                        CodigoPostal: datosFacturacion.domicilioFiscal.codigoPostal,
                        CorreoElectronico: datosFacturacion.emailsReceptor,
                        Ciudad: datosFacturacion.domicilioFiscal.ciudad,
                        IdEstado: datosFacturacion.domicilioFiscal.estado
                    };
                    return this._http.put(this._api + "/usuario/" + idUsuario + "/" + idCliente, JSON.stringify(clienteFinal), options)
                        .map(function (data) { return data.json().data; })
                        .catch(this.handleError);
                };
                PerfilUsuarioService.prototype.AgregarReceptor = function (idUsuario, idCliente, datosFacturacion) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    var clienteFinal = {
                        Alias: datosFacturacion.datosFiscales.alias,
                        IdCliente: idCliente,
                        RFC: datosFacturacion.datosFiscales.RFC,
                        RazonSocial: datosFacturacion.datosFiscales.razonSocial,
                        Contacto: "",
                        Calle: datosFacturacion.domicilioFiscal.calle,
                        NumeroExterior: datosFacturacion.domicilioFiscal.numeroExterior,
                        NumeroInterior: datosFacturacion.domicilioFiscal.numeroInterior,
                        Colonia: datosFacturacion.domicilioFiscal.colonia,
                        Localidad: datosFacturacion.domicilioFiscal.localidad,
                        Pais: datosFacturacion.domicilioFiscal.pais,
                        CodigoPostal: datosFacturacion.domicilioFiscal.codigoPostal,
                        CorreoElectronico: datosFacturacion.emailsReceptor,
                        Ciudad: datosFacturacion.domicilioFiscal.ciudad,
                        IdEstado: datosFacturacion.domicilioFiscal.estado
                    };
                    return this._http.post(this._api + "/usuario/" + idUsuario, JSON.stringify(clienteFinal), options)
                        .map(function (data) { return data.json().data; })
                        .catch(this.handleError);
                };
                PerfilUsuarioService.prototype.ObtenerPerfilUsuario = function () {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.get(this._authApi + "/perfil", options)
                        .map(this.mapUsuarioData)
                        .catch(this.handleError);
                };
                PerfilUsuarioService.prototype.ObtenerReceptoresDeUsuario = function (idUsuario) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.get(this._api + "/usuario/" + idUsuario + "/cliente", options)
                        .map(this.mapReceptoresData)
                        .catch(this.handleError);
                };
                PerfilUsuarioService.prototype.ObtenerDetalleReceptor = function (idUsuario, IdCliente) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.get(this._api + "/usuario/" + idUsuario + "/" + IdCliente, options)
                        .map(this.mapReceptoresData)
                        .catch(this.handleError);
                };
                PerfilUsuarioService.prototype.mapUsuarioData = function (response) {
                    if (response.status === 401) {
                        throw Error("Sesión expirada");
                    }
                    return response.json().Data || {};
                };
                ;
                PerfilUsuarioService.prototype.mapReceptoresData = function (response) {
                    if (response.status === 401) {
                        throw Error("Sesión expirada");
                    }
                    return response.json().Data || {};
                };
                ;
                PerfilUsuarioService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json() || "server error");
                };
                return PerfilUsuarioService;
            }());
            PerfilUsuarioService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http, Global_services_1.GlobalService])
            ], PerfilUsuarioService);
            exports_1("PerfilUsuarioService", PerfilUsuarioService);
        }
    };
});
//# sourceMappingURL=perfil.usuario.service.js.map