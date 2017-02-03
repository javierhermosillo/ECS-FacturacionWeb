System.register(["@angular/core", "./../Services/perfil.usuario.service", "./../../Common/BlockUI/Service/BlockUI.Service", "./../../Registro/Services/Registro.service", "ng2-toastr/ng2-toastr"], function (exports_1, context_1) {
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
    var core_1, perfil_usuario_service_1, BlockUI_Service_1, Registro_service_1, ng2_toastr_1, PerfilUsuarioComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (perfil_usuario_service_1_1) {
                perfil_usuario_service_1 = perfil_usuario_service_1_1;
            },
            function (BlockUI_Service_1_1) {
                BlockUI_Service_1 = BlockUI_Service_1_1;
            },
            function (Registro_service_1_1) {
                Registro_service_1 = Registro_service_1_1;
            },
            function (ng2_toastr_1_1) {
                ng2_toastr_1 = ng2_toastr_1_1;
            }
        ],
        execute: function () {
            PerfilUsuarioComponent = (function () {
                function PerfilUsuarioComponent(_perfilUsuarioService, _blockUI, _registroService, _toastr) {
                    this._perfilUsuarioService = _perfilUsuarioService;
                    this._blockUI = _blockUI;
                    this._registroService = _registroService;
                    this._toastr = _toastr;
                    this.contextUsuario = { IdUsuario: "", Nombre: "", ApellidoPaterno: "", ApellidoMaterno: "", Email: "", Celular: "" };
                    this.usuarioLoadedEvent = new core_1.EventEmitter();
                    this.contextActualizacionUsuario = { nombre: "", apellidoPaterno: "", apellidoMaterno: "", email: "", emailConfirmacion: "", celular: "", metodosAutenticacion: [] };
                    this.celularMask = [/[1-9]/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
                    this.ExisteUsuario = false;
                }
                //Angular pipeline
                PerfilUsuarioComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._perfilUsuarioService.ObtenerPerfilUsuario();
                    this._blockUI.start("Cargando información de usuario");
                    this._perfilUsuarioService.ObtenerPerfilUsuario()
                        .subscribe(function (data) {
                        _this.contextUsuario = data;
                        _this.username = _this.contextUsuario.Email;
                        _this.usernameConfirmacion = _this.contextUsuario.Email;
                        _this.celular = _this.contextUsuario.Celular;
                        _this.celularConfirmacion = _this.contextUsuario.Celular;
                        _this.usuarioLoadedEvent.emit(_this.contextUsuario);
                    }, function (error) { }, function () {
                        _this._blockUI.stop();
                    });
                };
                //Methods
                PerfilUsuarioComponent.prototype.ActualizarUsuario = function (usuario) {
                    var _this = this;
                    this.contextActualizacionUsuario.nombre = this.contextUsuario.Nombre;
                    this.contextActualizacionUsuario.apellidoPaterno = this.contextUsuario.ApellidoPaterno;
                    this.contextActualizacionUsuario.apellidoMaterno = this.contextUsuario.ApellidoMaterno;
                    this.contextActualizacionUsuario.metodosAutenticacion.push({ metodo: "Email", username: this.username, password: this.contrasena });
                    this.contextActualizacionUsuario.email = this.username;
                    if (this.celular !== undefined) {
                        this.contextActualizacionUsuario.metodosAutenticacion.push({ metodo: "Celular", username: this.celular.split("-").join(""), password: this.nip });
                        this.contextActualizacionUsuario.celular = this.celular;
                    }
                    this._perfilUsuarioService.ActualizarPerfilUsuario(this.contextActualizacionUsuario)
                        .subscribe(function (data) {
                        _this._toastr.info("Perfil actualizado con éxito");
                        _this.contextActualizacionUsuario.metodosAutenticacion = [];
                    }, function (error) { console.log(error); }, function () { });
                };
                //Validations
                PerfilUsuarioComponent.prototype.ValidarUsuarioExistente = function () {
                    var _this = this;
                    if (this.username !== this.contextUsuario.Email) {
                        this._registroService.VerificarUsuarioExistente(this.username)
                            .subscribe(function (data) {
                            if (data.toUpperCase() === "EXISTENTE") {
                                _this.ExisteUsuario = true;
                            }
                            else {
                                _this.ExisteUsuario = false;
                            }
                        }, function (error) { });
                    }
                };
                PerfilUsuarioComponent.prototype.CompareEmailFields = function () {
                    var result = false;
                    if (this.username === this.usernameConfirmacion) {
                        return true;
                    }
                    return result;
                };
                PerfilUsuarioComponent.prototype.ComparePasswordFields = function () {
                    var result = false;
                    if (this.contrasena === this.contrasenaConfirmacion) {
                        return true;
                    }
                    return result;
                };
                PerfilUsuarioComponent.prototype.CompareCelularFields = function () {
                    var result = false;
                    if (this.celular === this.celularConfirmacion) {
                        return true;
                    }
                    return result;
                };
                PerfilUsuarioComponent.prototype.CompareNipFields = function () {
                    var result = false;
                    if (this.nip === this.nipConfirmacion) {
                        return true;
                    }
                    return result;
                };
                return PerfilUsuarioComponent;
            }());
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], PerfilUsuarioComponent.prototype, "usuarioLoadedEvent", void 0);
            PerfilUsuarioComponent = __decorate([
                core_1.Component({
                    selector: "facturacion-perfilusuario",
                    templateUrl: "App/Perfil/Views/Perfil.usuario.component.html",
                    styles: ["./../Styles/Perfil.component.css"],
                    providers: [Registro_service_1.RegistroService]
                }),
                __metadata("design:paramtypes", [perfil_usuario_service_1.PerfilUsuarioService, BlockUI_Service_1.BlockUIService, Registro_service_1.RegistroService, ng2_toastr_1.ToastsManager])
            ], PerfilUsuarioComponent);
            exports_1("PerfilUsuarioComponent", PerfilUsuarioComponent);
        }
    };
});
//# sourceMappingURL=Perfil.usuario.component.js.map