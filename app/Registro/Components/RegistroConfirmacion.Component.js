System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, RegistroConfirmacionComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            RegistroConfirmacionComponent = (function () {
                function RegistroConfirmacionComponent() {
                    this.notificarRegistro = new core_1.EventEmitter();
                    this.volverPasoAnteriorConfirmacion = new core_1.EventEmitter();
                    this.DatosRegistro = {
                        datosUsuario: { nombre: "", apellidoPaterno: "", apellidoMaterno: "", email: "", emailConfirmacion: "", celular: "", metodosAutenticacion: [{ username: "", password: "", metodo: "" }, { username: "", password: "", metodo: "" }] },
                        datosFacturacion: {
                            datosFiscales: { RFC: "", razonSocial: "", alias: "" },
                            domicilioFiscal: { calle: "", numeroExterior: "", numeroInterior: "", colonia: "", codigoPostal: "", estado: "", ciudad: "", localidad: "", pais: "México", telefono: "" },
                            emailsReceptor: ""
                        }
                    };
                }
                RegistroConfirmacionComponent.prototype.PasoAnterior = function () {
                    this.volverPasoAnteriorConfirmacion.emit("RegistroReceptores");
                };
                RegistroConfirmacionComponent.prototype.RegistrarUsuario = function (registroUsuario) {
                    this.notificarRegistro.emit("registrarUsuario");
                };
                RegistroConfirmacionComponent.prototype.ngOnInit = function () {
                    this.DatosRegistro.datosUsuario.metodosAutenticacion = [{ username: "", password: "", metodo: "" }, { username: "", password: "", metodo: "" }];
                };
                return RegistroConfirmacionComponent;
            }());
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], RegistroConfirmacionComponent.prototype, "notificarRegistro", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], RegistroConfirmacionComponent.prototype, "volverPasoAnteriorConfirmacion", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], RegistroConfirmacionComponent.prototype, "DatosRegistro", void 0);
            RegistroConfirmacionComponent = __decorate([
                core_1.Component({
                    selector: "facturacion-registroconfirmacion",
                    templateUrl: "app/Registro/Views/RegistroConfirmacion.Component.html"
                }),
                __metadata("design:paramtypes", [])
            ], RegistroConfirmacionComponent);
            exports_1("RegistroConfirmacionComponent", RegistroConfirmacionComponent);
        }
    };
});
//# sourceMappingURL=RegistroConfirmacion.Component.js.map