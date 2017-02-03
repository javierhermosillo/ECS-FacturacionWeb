System.register(["@angular/core", "./../../Common/BlockUI/Service/BlockUI.Service", "./../Services/facturacion.services", "./../../Global/Services/Global.services"], function (exports_1, context_1) {
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
    var core_1, BlockUI_Service_1, facturacion_services_1, Global_services_1, FacturacionHistorialComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (BlockUI_Service_1_1) {
                BlockUI_Service_1 = BlockUI_Service_1_1;
            },
            function (facturacion_services_1_1) {
                facturacion_services_1 = facturacion_services_1_1;
            },
            function (Global_services_1_1) {
                Global_services_1 = Global_services_1_1;
            }
        ],
        execute: function () {
            FacturacionHistorialComponent = (function () {
                // tableSettings = {
                //     actions : {
                //          add: false,
                //          edit: false,
                //          delete: false
                //     },
                //     columns: {
                //         Fecha: {
                //             title: "Fecha"
                //         },
                //         Serie: {
                //             title: "Serie"
                //         },
                //         Folio: {
                //             title: "Folio"
                //         },
                //         RFC: {
                //             title: "RFC"
                //         },
                //         Cliente: {
                //             title: "Cliente"
                //         },
                //         Total: {
                //             title: "Total"
                //         },
                //         Descargas : {
                //             title: "Descargas",
                //             valuePrepareFunction : (value) => { return "<a>XML</a>&nbsp;<a>PDF</a>"}
                //         }
                //     },
                //     pager : {
                //         perPage : 10
                //     },
                //     hideSubHeader : true,
                //     noDataMessage : "No hay datos de facturas disponibles",
                // };
                function FacturacionHistorialComponent(blockUiService, facturacionService, globalService) {
                    this.blockUiService = blockUiService;
                    this.facturacionService = facturacionService;
                    this.globalService = globalService;
                    // historialSource : LocalDataSource = new LocalDataSource();
                    this.historial = [];
                }
                FacturacionHistorialComponent.prototype.cargarHistorialDeFacturacion = function () {
                    var _this = this;
                    this.blockUiService.start("Cargando información");
                    this.facturacionService.ObtenerHistorialDeFacturacion()
                        .subscribe(function (data) {
                        data.forEach(function (item) {
                            _this.historial.push({ Fecha: item.Fecha, Serie: item.Serie, Folio: item.Folio, RFC: item.RFC, Cliente: item.Cliente, Total: item.Total, Descargas: item.Serie, RFCEmisor: item.RFCEmisor });
                        });
                        _this.contextHistorial = _this.historial;
                        _this.blockUiService.stop();
                        // this.historialSource.load(this.historial);
                    }, function (error) {
                        console.log(error);
                    });
                };
                FacturacionHistorialComponent.prototype.descargarPDF = function (serieFactura, folioFactura, rfcEmisor) {
                    window.open(this.globalService.ApiUrl() + "/facturacion/PDF?Serie=" + serieFactura + "&folio=" + folioFactura + "&rfcEmisor=" + rfcEmisor, "_blank");
                };
                FacturacionHistorialComponent.prototype.descargarXML = function (serieFactura, folioFactura, rfcEmisor) {
                    var _this = this;
                    this.facturacionService.DescargarFacturaXML(serieFactura, folioFactura, rfcEmisor)
                        .subscribe(function (data) {
                        _this.downloadFile(data._body, "Factura-" + serieFactura + "-" + folioFactura.toString() + ".xml", "application/xml");
                    }, function (error) { return _this.HandleError; });
                };
                // filtrarResultados(query : string) {
                //      this.historialSource.setFilter([
                //         {
                //             field: "Fecha",
                //             search: query
                //         },
                //         {
                //             field: "Serie",
                //             search: query
                //         },
                //         {
                //             field: "Folio",
                //             search: query
                //         },
                //         {
                //             field: "RFC",
                //             search: query
                //         },
                //         {
                //             field: "Cliente",
                //             search: query
                //         },
                //         {
                //             field: "Total",
                //             search: query
                //         }
                //     ], false);
                // }
                FacturacionHistorialComponent.prototype.filtrarResultados = function (query) {
                    if (query == "") {
                        this.contextHistorial = this.historial;
                    }
                    else {
                        this.contextHistorial = this.historial.filter(function (item) { return item.Fecha.toString().toUpperCase().indexOf(query.toUpperCase()) >= 0
                            || (item.Fecha).toString().toUpperCase().indexOf(query.toUpperCase()) >= 0
                            || (item.Serie).toString().toUpperCase().indexOf(query.toUpperCase()) >= 0
                            || (item.Folio).toString().toUpperCase().indexOf(query.toUpperCase()) >= 0
                            || (item.RFC).toString().toUpperCase().indexOf(query.toUpperCase()) >= 0
                            || (item.Cliente).toString().toUpperCase().indexOf(query.toUpperCase()) >= 0
                            || (item.Total).toString().toUpperCase().indexOf(query.toUpperCase()) >= 0; });
                    }
                };
                FacturacionHistorialComponent.prototype.downloadFile = function (data, fileName, contentType) {
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style.display = "none";
                    var blob = new Blob([data], { type: contentType }), url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.setAttribute("download", fileName);
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
                FacturacionHistorialComponent.prototype.HandleError = function (error) {
                    if (error.message.indexOf("Expirada") > -1) {
                    }
                    ;
                };
                //Angular Pipeline
                FacturacionHistorialComponent.prototype.ngOnInit = function () {
                    this.cargarHistorialDeFacturacion();
                };
                return FacturacionHistorialComponent;
            }());
            FacturacionHistorialComponent = __decorate([
                core_1.Component({
                    selector: "facturacion-facturacionhistorialcomponent",
                    templateUrl: "app/facturacion/views/facturacion.historial.component.html",
                    providers: [facturacion_services_1.facturacionServices]
                }),
                __metadata("design:paramtypes", [BlockUI_Service_1.BlockUIService, facturacion_services_1.facturacionServices, Global_services_1.GlobalService])
            ], FacturacionHistorialComponent);
            exports_1("FacturacionHistorialComponent", FacturacionHistorialComponent);
        }
    };
});
//# sourceMappingURL=facturacion.historial.component.js.map