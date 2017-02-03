System.register(["@angular/core", "@angular/router", "./../Services/Registro.service", "./../../Common/BlockUI/Service/BlockUI.Service", "./../../Common/Modal/Components/modal.component"], function (exports_1, context_1) {
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
    var core_1, router_1, Registro_service_1, BlockUI_Service_1, modal_component_1, RegistroComponent, _a;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Registro_service_1_1) {
                Registro_service_1 = Registro_service_1_1;
            },
            function (BlockUI_Service_1_1) {
                BlockUI_Service_1 = BlockUI_Service_1_1;
            },
            function (modal_component_1_1) {
                modal_component_1 = modal_component_1_1;
            }
        ],
        execute: function () {
            RegistroComponent = (function () {
                function RegistroComponent(_router, _registroService, _blockUI) {
                    this._router = _router;
                    this._registroService = _registroService;
                    this._blockUI = _blockUI;
                    this._WizardStep = "RegistroUsuario";
                    this._datosRegistro = {
                        datosUsuario: { nombre: "", apellidoPaterno: "", apellidoMaterno: "", email: "", emailConfirmacion: "", celular: "", metodosAutenticacion: [] },
                        datosFacturacion: {
                            datosFiscales: { RFC: "", razonSocial: "", alias: "" },
                            domicilioFiscal: { calle: "", numeroExterior: "", numeroInterior: "", colonia: "", codigoPostal: "", estado: "", ciudad: "", localidad: "", pais: "México", telefono: "" },
                            emailsReceptor: ""
                        }
                    };
                }
                RegistroComponent.prototype.VerificarPasoActual = function (paso) {
                    var result = true;
                    if (this._WizardStep == paso) {
                        return false;
                    }
                    return result;
                };
                RegistroComponent.prototype.VolverPasoAnterior = function (paso) {
                    var result = true;
                    this._WizardStep = paso;
                };
                RegistroComponent.prototype.AlmacenarDatosUsuario = function (datosUsuario) {
                    this._datosRegistro.datosUsuario = datosUsuario;
                    this._WizardStep = "RegistroReceptores";
                };
                RegistroComponent.prototype.AlmacenarDatosFacturacion = function (datosFacturacion) {
                    this._datosRegistro.datosFacturacion = datosFacturacion;
                    this._datosRegistro.datosFacturacion.datosFiscales.RFC = this._datosRegistro.datosFacturacion.datosFiscales.RFC.toUpperCase();
                    this._WizardStep = "Confirmacion";
                };
                RegistroComponent.prototype.RegistrarUsuario = function () {
                    this.RegistrarUsuarioIdSvr();
                };
                RegistroComponent.prototype.RegistrarUsuarioIdSvr = function () {
                    var _this = this;
                    this._blockUI.start("Registrando Usuario");
                    this._registroService.RegistroUsuario(this._datosRegistro.datosUsuario)
                        .subscribe(function (data) {
                        _this._registroService.RegistroDatosFiscales(_this._datosRegistro.datosFacturacion, data)
                            .subscribe(function (data) {
                            //Show Popup
                            _this.openModal();
                            //this._router.navigate(['/welcome']);
                        }, function (error) { }, function () {
                            _this._blockUI.stop();
                        });
                    }, function (error) {
                        _this._blockUI.stop();
                    });
                };
                RegistroComponent.prototype.closedModal = function () { };
                RegistroComponent.prototype.dismissedModal = function () {
                    this.modal.dismiss();
                    this._router.navigate(["/welcome"]);
                };
                RegistroComponent.prototype.openedModal = function () {
                    this.modalOutput = "(opened)";
                };
                RegistroComponent.prototype.openModal = function () {
                    this.modal.open();
                };
                return RegistroComponent;
            }());
            __decorate([
                core_1.ViewChild('registroModal'),
                __metadata("design:type", typeof (_a = typeof modal_component_1.ModalComponent !== "undefined" && modal_component_1.ModalComponent) === "function" && _a || Object)
            ], RegistroComponent.prototype, "modal", void 0);
            RegistroComponent = __decorate([
                core_1.Component({
                    templateUrl: "App/Registro/Views/Registro.Component.html",
                    //directives: [MODAL_DIRECTIVES, ModalComponent],
                    providers: [Registro_service_1.RegistroService]
                }),
                __metadata("design:paramtypes", [router_1.Router, Registro_service_1.RegistroService, BlockUI_Service_1.BlockUIService])
            ], RegistroComponent);
            exports_1("RegistroComponent", RegistroComponent);
        }
    };
});
//# sourceMappingURL=Registro.component.js.map