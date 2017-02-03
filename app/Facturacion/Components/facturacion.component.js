System.register(["@angular/core", "./../Services/facturacion.services", "./../../Global/Services/Emisor.services", "./../../Global/Services/MetodoPago.services", "./../../Autenticacion/Services/Autenticacion.service", "./../../Perfil/Services/perfil.usuario.service", "./../../Common/Modal/Components/modalmain.component"], function (exports_1, context_1) {
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
    var core_1, facturacion_services_1, Emisor_services_1, MetodoPago_services_1, Autenticacion_service_1, perfil_usuario_service_1, modalmain_component_1, FacturacionComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (facturacion_services_1_1) {
                facturacion_services_1 = facturacion_services_1_1;
            },
            function (Emisor_services_1_1) {
                Emisor_services_1 = Emisor_services_1_1;
            },
            function (MetodoPago_services_1_1) {
                MetodoPago_services_1 = MetodoPago_services_1_1;
            },
            function (Autenticacion_service_1_1) {
                Autenticacion_service_1 = Autenticacion_service_1_1;
            },
            function (perfil_usuario_service_1_1) {
                perfil_usuario_service_1 = perfil_usuario_service_1_1;
            },
            function (modalmain_component_1_1) {
                modalmain_component_1 = modalmain_component_1_1;
            }
        ],
        execute: function () {
            FacturacionComponent = (function () {
                function FacturacionComponent(autenticacionService) {
                    this.autenticacionService = autenticacionService;
                    this.transaccion = { IdTransaccion: "", NoTransaccionOriginal: "", Cantidad: 0, Precio: 0, IVA: 0, IEPS: 0, Total: 0, FechaCreacion: new Date(), Productos: [], Estacion: { IdEstacion: "", Nombre: "", NoEstacion: "", RFCEmisor: "" } };
                    this.transaccionesPreFactura = [];
                }
                FacturacionComponent.prototype.dismissedGeneralModal = function () {
                    this.facturacionGeneralModal.close();
                };
                FacturacionComponent.prototype.RegistrarTransaccionEncontrada = function (transaccion) {
                    this.transaccion = transaccion;
                };
                FacturacionComponent.prototype.RegistrarTransaccionesPreFactura = function (transacciones) {
                    this.transaccionesPreFactura = transacciones;
                };
                FacturacionComponent.prototype.validarCorreoConfirmado = function () {
                    var result = true;
                    if (sessionStorage.getItem("CorreoConfirmado") != null) {
                        result = false;
                    }
                    return result;
                };
                FacturacionComponent.prototype.reenviarCorreoConfirmacion = function () {
                    var _this = this;
                    this.autenticacionService.SolicitarReenvioCorreo(sessionStorage.getItem("UserEmail"), sessionStorage.getItem("UserId"))
                        .subscribe(function (data) {
                        _this.facturacionGeneralModal.open();
                        _this.validarCorreoConfirmado();
                    });
                };
                return FacturacionComponent;
            }());
            __decorate([
                core_1.ViewChild("facturacionGeneralModal"),
                __metadata("design:type", modalmain_component_1.ModalComponent)
            ], FacturacionComponent.prototype, "facturacionGeneralModal", void 0);
            FacturacionComponent = __decorate([
                core_1.Component({
                    selector: "facturacion-principal",
                    templateUrl: "App/Facturacion/Views/Facturacion.component.html",
                    //directives: [facturacionBusquedaComponent, FacturacionTransaccionComponent, FacturacionPreFacturaComponent],
                    providers: [facturacion_services_1.facturacionServices, MetodoPago_services_1.MetodoPagoService, Emisor_services_1.EmisorService, perfil_usuario_service_1.PerfilUsuarioService, Autenticacion_service_1.AutenticacionService]
                }),
                __metadata("design:paramtypes", [Autenticacion_service_1.AutenticacionService])
            ], FacturacionComponent);
            exports_1("FacturacionComponent", FacturacionComponent);
        }
    };
});
//# sourceMappingURL=facturacion.component.js.map