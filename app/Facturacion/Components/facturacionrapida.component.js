System.register(["@angular/core", "@angular/router", "./../../Global/Services/Emisor.services", "./../../Facturacion/Services/facturacion.services", "./../../Global/Services/MetodoPago.services", "./../../Global/Services/Global.services", "./../../Common/Modal/Components/modalmain.component", "./../../Common/BlockUI/Service/BlockUI.Service"], function (exports_1, context_1) {
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
    var core_1, router_1, Emisor_services_1, facturacion_services_1, MetodoPago_services_1, Global_services_1, modalmain_component_1, BlockUI_Service_1, FacturacionRapidaComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Emisor_services_1_1) {
                Emisor_services_1 = Emisor_services_1_1;
            },
            function (facturacion_services_1_1) {
                facturacion_services_1 = facturacion_services_1_1;
            },
            function (MetodoPago_services_1_1) {
                MetodoPago_services_1 = MetodoPago_services_1_1;
            },
            function (Global_services_1_1) {
                Global_services_1 = Global_services_1_1;
            },
            function (modalmain_component_1_1) {
                modalmain_component_1 = modalmain_component_1_1;
            },
            function (BlockUI_Service_1_1) {
                BlockUI_Service_1 = BlockUI_Service_1_1;
            }
        ],
        execute: function () {
            FacturacionRapidaComponent = (function () {
                function FacturacionRapidaComponent(emisorService, blockUI, facturacionService, metodoPagoService, globalService, router) {
                    this.emisorService = emisorService;
                    this.blockUI = blockUI;
                    this.facturacionService = facturacionService;
                    this.metodoPagoService = metodoPagoService;
                    this.globalService = globalService;
                    this.router = router;
                    this.estaciones = [];
                    this.modalMessage = "";
                    this.estacion = null;
                    this.ticket = null;
                    this.noVerificador = "";
                    this.emailUsuario = "";
                    this.metodosPago = [];
                    this.metodoPago = null;
                    this.metodoPagoCuenta = null;
                    this.rfcReceptor = "";
                    this.serieFactura = "";
                    this.folioFactura = "";
                }
                FacturacionRapidaComponent.prototype.EsCuentaMetodoPagoRequerido = function () {
                    if (this.metodoPago !== null) {
                        if (this.metodoPago.ClaveMetodoPago !== "") {
                            if (this.metodoPago.Nombre.toUpperCase() == "EFECTIVO" || this.metodoPago.Nombre.toUpperCase() == "DINERO ELECTRÓNICO" || this.metodoPago.Nombre.toUpperCase() == "VALES DE DESPENSA" || this.metodoPago.Nombre.toUpperCase() == "OTROS" || this.metodoPago.Nombre.toUpperCase() == "NA") {
                                return false;
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                };
                FacturacionRapidaComponent.prototype.DescargarPDF = function () {
                    window.open(this.globalService.ApiUrl() + "/facturacionRapida/PDF?Serie=" + this.serieFactura + "&folio=" + this.folioFactura + "&rfcEmisor=" + this.estacion.RFCEmisor, "_blank");
                };
                FacturacionRapidaComponent.prototype.DescargarXML = function () {
                    var _this = this;
                    this.facturacionService.DescargarFacturaRapidaXML(this.serieFactura, this.folioFactura, this.estacion.RFCEmisor)
                        .subscribe(function (data) {
                        _this.downloadFile(data._body, "Factura-" + _this.serieFactura + "-" + _this.folioFactura.toString() + ".xml", "application/xml");
                    }, function (error) { });
                };
                FacturacionRapidaComponent.prototype.dismissedModal = function () {
                    this.router.navigate(["/welcome"]);
                };
                FacturacionRapidaComponent.prototype.dismissedErrorModal = function () {
                    this.facturacionRapidaErrorModal.close();
                };
                FacturacionRapidaComponent.prototype.downloadFile = function (data, fileName, contentType) {
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style.display = "none";
                    var blob = new Blob([data], { type: contentType }), url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.setAttribute("download", fileName);
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
                FacturacionRapidaComponent.prototype.Facturar = function () {
                    var _this = this;
                    this.blockUI.start("Solicitando Factura");
                    this.ticket = +this.ticket.toString().replace(/^0+/, "");
                    this.facturacionService.SolicitarFacturacionRapida({ NoEstacion: this.estacion.NoEstacion, NoTicket: this.ticket, noVerificador: this.noVerificador, RFCEmisor: this.estacion.RFCEmisor, EmailReceptor: this.emailUsuario, MetodoPago: this.metodoPago.ClaveMetodoPago, MetodoPagoCuenta: this.metodoPagoCuenta, MetodoPagoDescripcion: this.metodoPago.Nombre, RFCReceptor: this.rfcReceptor.toUpperCase() })
                        .subscribe(function (data) {
                        _this.blockUI.stop();
                        //Mensaje esperado
                        if (data.Serie === undefined) {
                            _this.modalMessage = data;
                            _this.facturacionRapidaErrorModal.open();
                            return;
                        }
                        _this.serieFactura = data.Serie;
                        _this.folioFactura = data.Folio;
                        _this.facturacionRapidaModal.open();
                    }, function (error) {
                        _this.blockUI.stop();
                        _this.modalMessage = "Registro no encontrado";
                        _this.facturacionRapidaErrorModal.open();
                    });
                };
                FacturacionRapidaComponent.prototype.ObtenerDatosDeEstaciones = function () {
                    var _this = this;
                    this.emisorService.ObtenerEstaciones()
                        .subscribe(function (data) {
                        _this.estaciones = data;
                        _this.estacion = data[0];
                    }, function (error) {
                        _this.modalMessage = error;
                    });
                };
                FacturacionRapidaComponent.prototype.ObtenerMetodosDePago = function () {
                    var _this = this;
                    this.metodoPagoService.ObtenerMetodosDePago()
                        .subscribe(function (data) {
                        _this.metodosPago = data;
                        _this.metodoPago = data[0];
                    }, function (error) {
                        _this.modalMessage = error;
                    });
                };
                FacturacionRapidaComponent.prototype.volverHome = function () {
                    this.router.navigate(["/welcome"]);
                };
                // private LimpiarPantalla() {
                //     this.estacion = null;
                //     this.ticket = null;
                //     this.noVerificador = "";
                //     this.emailUsuario = "";
                //     this.metodosPago = [];
                //     this.metodoPago = null;
                //     this.metodoPagoCuenta = null;
                //     this.rfcReceptor = "";
                //     this.serieFactura = "";
                //     this.folioFactura = "";
                // }
                FacturacionRapidaComponent.prototype.ngOnInit = function () {
                    this.ObtenerDatosDeEstaciones();
                    this.ObtenerMetodosDePago();
                    this.ModalMensaje.open();
                };
                //Micodigo De Modal
                FacturacionRapidaComponent.prototype.MensajeModalCerrar = function () {
                    this.ModalMensaje.close();
                };
                return FacturacionRapidaComponent;
            }());
            __decorate([
                core_1.ViewChild("facturacionRapidaModal"),
                __metadata("design:type", modalmain_component_1.ModalComponent)
            ], FacturacionRapidaComponent.prototype, "facturacionRapidaModal", void 0);
            __decorate([
                core_1.ViewChild("facturacionRapidaErrorModal"),
                __metadata("design:type", modalmain_component_1.ModalComponent)
            ], FacturacionRapidaComponent.prototype, "facturacionRapidaErrorModal", void 0);
            __decorate([
                core_1.ViewChild("ModalMensaje"),
                __metadata("design:type", modalmain_component_1.ModalComponent)
            ], FacturacionRapidaComponent.prototype, "ModalMensaje", void 0);
            FacturacionRapidaComponent = __decorate([
                core_1.Component({
                    templateUrl: "App/Facturacion/Views/FacturacionRapida.component.html",
                    providers: [Emisor_services_1.EmisorService, facturacion_services_1.facturacionServices, MetodoPago_services_1.MetodoPagoService]
                }),
                __metadata("design:paramtypes", [Emisor_services_1.EmisorService, BlockUI_Service_1.BlockUIService, facturacion_services_1.facturacionServices, MetodoPago_services_1.MetodoPagoService, Global_services_1.GlobalService, router_1.Router])
            ], FacturacionRapidaComponent);
            exports_1("FacturacionRapidaComponent", FacturacionRapidaComponent);
        }
    };
});
//# sourceMappingURL=facturacionrapida.component.js.map