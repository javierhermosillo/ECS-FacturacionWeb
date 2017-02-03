System.register(["@angular/core", "@angular/http", "rxjs/Observable", "rxjs/add/operator/do", "rxjs/add/operator/catch", "./../../global.config"], function (exports_1, context_1) {
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
    var core_1, http_1, Observable_1, myGlobalConfig, AutenticacionService;
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
            function (_1) {
            },
            function (_2) {
            },
            function (myGlobalConfig_1) {
                myGlobalConfig = myGlobalConfig_1;
            }
        ],
        execute: function () {
            AutenticacionService = (function () {
                //Constructor
                function AutenticacionService(http) {
                    this.http = http;
                    this.api = myGlobalConfig.apiUrl;
                    this.authApi = myGlobalConfig.authApiUrl;
                }
                //Métodos
                AutenticacionService.prototype.Autenticar = function (usuario) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this.api + "/Autenticacion", JSON.stringify(usuario), options)
                        .map(this.getToken)
                        .catch(this.handleError);
                };
                AutenticacionService.prototype.ObtenerToken = function () {
                    return;
                };
                AutenticacionService.prototype.ValidarToken = function () {
                    return;
                };
                AutenticacionService.prototype.ObtenerPerfilUsuario = function () {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Authorization", "bearer " + sessionStorage.getItem("AuthToken"));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.authApi + "/perfil", options)
                        .map(this.mapUsuarioData)
                        .catch(this.handleError);
                };
                AutenticacionService.prototype.RecuperarCuenta = function (username) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.authApi + "/perfil?username=" + username, options)
                        .map(this.mapRecuperarData)
                        .catch(this.handleError);
                };
                AutenticacionService.prototype.SolicitarReenvioCorreo = function (username, idUsuario) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.authApi + "/Usuario?username=" + username + "&idUsuario=" + idUsuario + "&reenvio=true", options)
                        .map(function (response) { return response || {}; })
                        .catch(this.handleError);
                };
                //Private Methods
                AutenticacionService.prototype.getToken = function (response) {
                    return response.json() || {};
                };
                AutenticacionService.prototype.mapUsuarioData = function (response) {
                    return response.json().Data || {};
                };
                AutenticacionService.prototype.mapRecuperarData = function (response) {
                    return (response || {});
                };
                AutenticacionService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json() || "server error");
                };
                return AutenticacionService;
            }());
            AutenticacionService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], AutenticacionService);
            exports_1("AutenticacionService", AutenticacionService);
        }
    };
});
//# sourceMappingURL=Autenticacion.service.js.map