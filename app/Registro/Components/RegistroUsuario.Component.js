System.register(["@angular/core", "./../../Global/Services/Global.services", "./../Services/Registro.service"], function (exports_1, context_1) {
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
    var core_1, Global_services_1, Registro_service_1, RegistroUsuarioComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Global_services_1_1) {
                Global_services_1 = Global_services_1_1;
            },
            function (Registro_service_1_1) {
                Registro_service_1 = Registro_service_1_1;
            }
        ],
        execute: function () {
            RegistroUsuarioComponent = (function () {
                //Events
                function RegistroUsuarioComponent(_globalService, _registroService) {
                    this._globalService = _globalService;
                    this._registroService = _registroService;
                    this.notificar = new core_1.EventEmitter();
                    this.celularMask = [/[1-9]/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
                    this.contextUsuario = { nombre: "", apellidoPaterno: "", apellidoMaterno: "", email: "", emailConfirmacion: "", celular: "", metodosAutenticacion: [] };
                    this.ExisteUsuario = false;
                }
                RegistroUsuarioComponent.prototype.SiguientePaso = function () {
                    this.contextUsuario.metodosAutenticacion.push({ metodo: "Email", username: this.username, password: this.contrasena });
                    this.contextUsuario.email = this.username;
                    if (this.celular !== undefined) {
                        this.contextUsuario.metodosAutenticacion.push({ metodo: "Celular", username: this.celular.split("-").join(""), password: this.nip });
                        this.contextUsuario.celular = this.celular;
                    }
                    this.notificar.emit(this.contextUsuario);
                };
                //Validations
                RegistroUsuarioComponent.prototype.ValidarUsuarioExistente = function () {
                    var _this = this;
                    this._registroService.VerificarUsuarioExistente(this.username)
                        .subscribe(function (data) {
                        if (data.toUpperCase() === "EXISTENTE") {
                            _this.ExisteUsuario = true;
                        }
                        else {
                            _this.ExisteUsuario = false;
                        }
                    });
                };
                RegistroUsuarioComponent.prototype.CompareEmailFields = function () {
                    var result = false;
                    if (this.username === this.usernameConfirmacion) {
                        return true;
                    }
                    return result;
                };
                RegistroUsuarioComponent.prototype.ComparePasswordFields = function () {
                    var result = false;
                    if (this.contrasena === this.contrasenaConfirmacion) {
                        return true;
                    }
                    return result;
                };
                RegistroUsuarioComponent.prototype.CompareCelularFields = function () {
                    var result = false;
                    if (this.celular === this.celularConfirmacion) {
                        return true;
                    }
                    return result;
                };
                RegistroUsuarioComponent.prototype.CompareNipFields = function () {
                    var result = false;
                    if (this.nip === this.nipConfirmacion) {
                        return true;
                    }
                    return result;
                };
                return RegistroUsuarioComponent;
            }());
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], RegistroUsuarioComponent.prototype, "notificar", void 0);
            RegistroUsuarioComponent = __decorate([
                core_1.Component({
                    selector: "facturacion-registrousuario",
                    templateUrl: "app/Registro/Views/RegistroUsuario.Component.html"
                }),
                __metadata("design:paramtypes", [Global_services_1.GlobalService, Registro_service_1.RegistroService])
            ], RegistroUsuarioComponent);
            exports_1("RegistroUsuarioComponent", RegistroUsuarioComponent);
        }
    };
});
//# sourceMappingURL=RegistroUsuario.Component.js.map