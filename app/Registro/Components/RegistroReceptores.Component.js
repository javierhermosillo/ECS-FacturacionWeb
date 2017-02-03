System.register(["@angular/core", "./../../Global/Services/Estado.services", "./../../Common/BlockUI/Service/BlockUI.Service"], function (exports_1, context_1) {
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
    var core_1, Estado_services_1, BlockUI_Service_1, RegistroReceptoresComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Estado_services_1_1) {
                Estado_services_1 = Estado_services_1_1;
            },
            function (BlockUI_Service_1_1) {
                BlockUI_Service_1 = BlockUI_Service_1_1;
            }
        ],
        execute: function () {
            RegistroReceptoresComponent = (function () {
                function RegistroReceptoresComponent(_estadoService, _blockUI) {
                    this._estadoService = _estadoService;
                    this._blockUI = _blockUI;
                    this.contextDatosFiscales = { RFC: "", razonSocial: "", alias: "" };
                    this.contextDomicilioFiscal = { calle: "", numeroExterior: "", numeroInterior: "", colonia: "", codigoPostal: "", estado: "", ciudad: "", localidad: "", pais: "México", telefono: "" };
                    this.emailRecepcion = "";
                    this.notificar = new core_1.EventEmitter();
                    this.volverPasoAnteriorReceptores = new core_1.EventEmitter();
                }
                RegistroReceptoresComponent.prototype.SiguientePaso = function () {
                    this.datosFacturacion = { datosFiscales: this.contextDatosFiscales, domicilioFiscal: this.contextDomicilioFiscal, emailsReceptor: this.emailRecepcion };
                    this.notificar.emit(this.datosFacturacion);
                };
                RegistroReceptoresComponent.prototype.PasoAnterior = function () {
                    this.volverPasoAnteriorReceptores.emit("RegistroUsuario");
                };
                RegistroReceptoresComponent.prototype.ValidarCorreosParaEnvio = function () {
                    var result = true;
                    //Validar caracteres especiales en string;
                    if (this.emailRecepcion !== "") {
                        if (!/^[a-zA-Z0-9 @;._]*$/.test(this.emailRecepcion)) {
                            result = false;
                        }
                        var emails = this.emailRecepcion.split(";");
                        for (var i = 0; i <= emails.length - 1; i++) {
                            if (!/^.+@.+/.test(emails[i])) {
                                result = false;
                            }
                        }
                    }
                    return result;
                };
                RegistroReceptoresComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._blockUI.start("Cargando Información");
                    this._estadoService.Estados()
                        .subscribe(function (data) {
                        _this.estados = data;
                    }, function (error) { _this.stateError === error; }, function () {
                        _this._blockUI.stop();
                    });
                };
                return RegistroReceptoresComponent;
            }());
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], RegistroReceptoresComponent.prototype, "notificar", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], RegistroReceptoresComponent.prototype, "volverPasoAnteriorReceptores", void 0);
            RegistroReceptoresComponent = __decorate([
                core_1.Component({
                    selector: "facturacion-registroreceptores",
                    templateUrl: "App/Registro/Views/RegistroReceptores.Component.html",
                    providers: [Estado_services_1.EstadoService]
                }),
                __metadata("design:paramtypes", [Estado_services_1.EstadoService, BlockUI_Service_1.BlockUIService])
            ], RegistroReceptoresComponent);
            exports_1("RegistroReceptoresComponent", RegistroReceptoresComponent);
        }
    };
});
//# sourceMappingURL=RegistroReceptores.Component.js.map