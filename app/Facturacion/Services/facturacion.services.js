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
    var core_1, http_1, Global_services_1, Observable_1, facturacionServices;
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
            facturacionServices = (function () {
                function facturacionServices(_http, _globalService) {
                    this._http = _http;
                    this._globalService = _globalService;
                }
                facturacionServices.prototype.BuscarComprobante = function (folio, serie, rfcEmisor, idCliente) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.get(this._globalService.ApiUrl() + "/facturacion?Serie=" + serie + "&folio=" + folio + "&rfcEmisor=" + rfcEmisor + "&IdCliente=" + idCliente, options)
                        .map(function (response) { return response.json().Data || {}; })
                        .catch(this.handleError);
                };
                facturacionServices.prototype.BuscarDetalleTransaccion = function (parametrosBusqueda) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.get(this._globalService.ApiUrl() + "/Transaccion?NoTicket=" + parametrosBusqueda.NoTicket + "&NoEstacion=" + parametrosBusqueda.NoEstacion, options)
                        .map(function (response) { return response.json().Data; })
                        .catch(this.handleError);
                };
                facturacionServices.prototype.BuscarMensajesEnBitacora = function (parametrosBusqueda) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.get(this._globalService.ApiUrl() + "/Transaccion/Bitacora?NoTicket=" + parametrosBusqueda.NoTicket + "&NoEstacion=" + parametrosBusqueda.NoEstacion + "&NoVerificador=" + parametrosBusqueda.NoVerificador, options)
                        .map(this.getMensajeBitacora)
                        .catch(this.handleError);
                };
                facturacionServices.prototype.BuscarTransaccionesPendientes = function () {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.get(this._globalService.ApiUrl() + "/Transaccion", options)
                        .map(this.getTransaccionesPendientes)
                        .catch(this.handleError);
                };
                facturacionServices.prototype.DescargarFacturaXML = function (serie, folio, rfcEmisor) {
                    var headers = new http_1.Headers();
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.get(this._globalService.ApiUrl() + "/facturacion/XML?Serie=" + serie + "&folio=" + folio + "&rfcEmisor=" + rfcEmisor, options)
                        .map(function (response) { return response; })
                        .catch(this.handleError);
                };
                facturacionServices.prototype.DescargarFacturaRapidaXML = function (serie, folio, rfcEmisor) {
                    var headers = new http_1.Headers();
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.get(this._globalService.ApiUrl() + "/facturacionRapida/XML?Serie=" + serie + "&folio=" + folio + "&rfcEmisor=" + rfcEmisor, options)
                        .map(function (response) { return response; })
                        .catch(this.handleError);
                };
                facturacionServices.prototype.DescargarFacturaPDF = function (serie, folio, rfcEmisor) {
                    var headers = new http_1.Headers();
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.get(this._globalService.ApiUrl() + "/facturacion/PDF?Serie=" + serie + "&folio=" + folio + "&rfcEmisor=" + rfcEmisor, options)
                        .map(this.getResponseBuffer)
                        .catch(this.handleError);
                };
                facturacionServices.prototype.EliminarTransaccionDeBandeja = function (noEstacion, noTransaccion) {
                    var headers = new http_1.Headers();
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.delete(this._globalService.ApiUrl() + "/Transaccion?NoEstacion=" + noEstacion + "&NoTransaccionOriginal=" + noTransaccion, options)
                        .map(function (response) { return response; })
                        .catch(this.handleError);
                };
                facturacionServices.prototype.ObtenerHistorialDeFacturacion = function () {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.get(this._globalService.ApiUrl() + "/Facturacion", options)
                        .map(this.getHistorialFacturacion)
                        .catch(this.handleError);
                };
                facturacionServices.prototype.SolicitarBusquedaTransaccion = function (parametrosBusqueda) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.post(this._globalService.ApiUrl() + "/Transaccion/Busqueda", JSON.stringify(parametrosBusqueda), options)
                        .map(function (response) { return response; })
                        .catch(this.handleError);
                };
                facturacionServices.prototype.SolicitarFacturacion = function (comprobante) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.post(this._globalService.ApiUrl() + "/facturacion", JSON.stringify(comprobante), options)
                        .map(function (response) { return response.json().Data || {}; })
                        .catch(this.handleErrorRaw);
                    //.finally(this.handleResponseStatus);
                };
                facturacionServices.prototype.SolicitarFacturacionRapida = function (comprobante) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.post(this._globalService.ApiUrl() + "/FacturacionRapida", JSON.stringify(comprobante), options)
                        .map(function (response) { return response.json().Data || {}; })
                        .catch(this.handleErrorRaw);
                };
                facturacionServices.prototype.getHistorialFacturacion = function (response) {
                    return response.json().Data || {};
                };
                facturacionServices.prototype.getMensajeBitacora = function (response) {
                    return response.json().Data || {};
                };
                facturacionServices.prototype.getMensajeSolicitudTransaccion = function (response) {
                    return (response = response.json().Data) || {};
                };
                facturacionServices.prototype.getTransaccionesPendientes = function (response) {
                    return (response.json().Data || {});
                };
                facturacionServices.prototype.getResponseBuffer = function (response) {
                    return (response.arrayBuffer());
                };
                facturacionServices.prototype.handleError = function (response) {
                    if (response.status === 401) {
                        return Observable_1.Observable.throw("Sesion Expirada");
                    }
                    if (response.status === 503) {
                        return Observable_1.Observable.throw("Servicio facturación no disponible");
                    }
                    if (response.status === 500) {
                        return Observable_1.Observable.throw("Fatal Error");
                    }
                    else {
                        return Observable_1.Observable.throw("Not handled error");
                    }
                };
                facturacionServices.prototype.handleErrorRaw = function (response) {
                    return Observable_1.Observable.throw(response.json());
                };
                return facturacionServices;
            }());
            facturacionServices = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http, Global_services_1.GlobalService])
            ], facturacionServices);
            exports_1("facturacionServices", facturacionServices);
        }
    };
});
//# sourceMappingURL=facturacion.services.js.map