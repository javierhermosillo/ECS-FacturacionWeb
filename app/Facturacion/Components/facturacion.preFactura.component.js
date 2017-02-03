System.register(["@angular/core", "./../../Perfil/Services/perfil.usuario.service", "./../Services/facturacion.services", "./../../Common/BlockUI/Service/BlockUI.Service", "./../../Common/Modal/Components/modalmain.component", "./../../Global/Services/Global.services", "./../../Common/Bus/MessageBus", "./../../Common/Bus/busService", "rxjs/Rx"], function (exports_1, context_1) {
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
    var core_1, perfil_usuario_service_1, facturacion_services_1, BlockUI_Service_1, modalmain_component_1, Global_services_1, MessageBus_1, busService_1, FacturacionPreFacturaComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (perfil_usuario_service_1_1) {
                perfil_usuario_service_1 = perfil_usuario_service_1_1;
            },
            function (facturacion_services_1_1) {
                facturacion_services_1 = facturacion_services_1_1;
            },
            function (BlockUI_Service_1_1) {
                BlockUI_Service_1 = BlockUI_Service_1_1;
            },
            function (modalmain_component_1_1) {
                modalmain_component_1 = modalmain_component_1_1;
            },
            function (Global_services_1_1) {
                Global_services_1 = Global_services_1_1;
            },
            function (MessageBus_1_1) {
                MessageBus_1 = MessageBus_1_1;
            },
            function (busService_1_1) {
                busService_1 = busService_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            FacturacionPreFacturaComponent = (function () {
                function FacturacionPreFacturaComponent(usuarioService, facturacionService, blockUI, globalService, busService) {
                    this.usuarioService = usuarioService;
                    this.facturacionService = facturacionService;
                    this.blockUI = blockUI;
                    this.globalService = globalService;
                    this.busService = busService;
                    this.facturacionCompletada = new core_1.EventEmitter();
                    this.facturacionCompleta = false;
                    this.partidas = [];
                    this.transaccionesOriginales = [];
                    this.partidasSubtotal = 0;
                    this.partidasIVA = 0;
                    this.partidasIEPS = 0;
                    this.partidasTotal = 0;
                    this.metodoPagoCuenta = "";
                    this.receptor = {
                        IdCliente: "", Alias: "", RFC: "", RazonSocial: "", Contacto: "", Calle: "", NumeroExterior: "",
                        NumeroInterior: "", Colonia: "", Localidad: "", Pais: "", CodigoPostal: "", CorreoElectronico: "",
                        Ciudad: "", FechaCreacion: "", FechaModificacion: "", UsuarioModificacion: "", IdEstado: 0
                    };
                    this.serieFactura = "";
                    this.folioFactura = "";
                }
                FacturacionPreFacturaComponent.prototype.AcomodarTransaccionesEnPartidas = function (transacciones) {
                    var _this = this;
                    var productos = [];
                    this.limpiarForma();
                    //Obtener todos los productos y sus precios en las transacciones
                    transacciones.forEach(function (tran) {
                        if (productos.find(function (prod) { return prod[0] === tran.Productos[0].Nombre && prod[1] === tran.Precio; }) === undefined) {
                            productos.push([tran.Productos[0].Nombre, tran.Precio]);
                        }
                    });
                    productos.forEach(function (prod) {
                        var items = transacciones.filter(function (tran) { return tran.Productos[0].Nombre === prod[0] && tran.Precio === prod[1]; });
                        var partida = { Producto: "", Precio: 0, Cantidad: 0, IVA: 0, IEPS: 0, Total: 0 };
                        if (items !== undefined) {
                            partida.Producto = prod[0];
                            items.forEach(function (item) {
                                partida.Cantidad += item.Cantidad;
                                partida.IEPS += item.IEPS;
                                partida.IVA += item.IVA;
                            });
                            partida.Total += +((partida.Cantidad * prod[1]) - partida.IVA).toFixed(6);
                            partida.Precio = (partida.Total - partida.IVA) / partida.Cantidad;
                            _this.partidasTotal += partida.Total + partida.IVA;
                            _this.partidasIVA += partida.IVA;
                            _this.partidasIEPS += partida.IEPS;
                            _this.partidas.push(partida);
                        }
                    });
                    this.partidasSubtotal = (this.partidasTotal - this.partidasIVA);
                    this.modal.open();
                };
                FacturacionPreFacturaComponent.prototype.CorreoConfirmado = function () {
                    var result = true;
                    if (sessionStorage.getItem("CorreoConfirmado") != null) {
                        result = false;
                    }
                    return result;
                };
                // CargarPreFacturacion(transacciones : ITransaccion[], receptor: IReceptor, metodoPago : IMetodoPago, metodoPagoCuenta : string) {
                //     this.transaccionesOriginales = transacciones;
                //     this.AcomodarTransaccionesEnPartidas(transacciones);
                //     this.receptor = receptor;
                //     this.metodoPago = metodoPago;
                //     this.metodoPagoCuenta = metodoPagoCuenta;
                // }
                FacturacionPreFacturaComponent.prototype.CargarPreFacturacion = function (agrupacionTransacciones) {
                    this.transaccionesOriginales = agrupacionTransacciones.Transacciones;
                    this.AcomodarTransaccionesEnPartidas(agrupacionTransacciones.Transacciones);
                    this.receptor = agrupacionTransacciones.Receptor;
                    this.metodoPago = agrupacionTransacciones.MetodoPago;
                    this.metodoPagoCuenta = agrupacionTransacciones.MetodoPagoCuenta === undefined ? "" : agrupacionTransacciones.MetodoPagoCuenta.toString();
                    this.idGrupoTransacciones = agrupacionTransacciones.IdGrupo;
                };
                FacturacionPreFacturaComponent.prototype.DescargarPDF = function () {
                    // this.facturacionService.DescargarFacturaPDF(this.serieFactura, this.folioFactura, this.transaccionesOriginales[0].Estacion.RFCEmisor)
                    //     .subscribe(data => {
                    //         let byteArray = new Uint8Array(data);
                    //          window['saveAs'](new Blob([byteArray], { type : "application/pdf" }), "test.pdf");
                    //         this.downloadFile(data._body, "Factura-" + this.serieFactura + "-" + this.folioFactura.toString() + ".pdf", "text/pdf");
                    //     }, 
                    //     error => {});
                    window.open(this.globalService.ApiUrl() + "/facturacion/PDF?Serie=" + this.serieFactura + "&folio=" + this.folioFactura + "&rfcEmisor=" + this.transaccionesOriginales[0].Estacion.RFCEmisor, "_blank");
                };
                FacturacionPreFacturaComponent.prototype.DescargarXML = function () {
                    var _this = this;
                    this.facturacionService.DescargarFacturaXML(this.serieFactura, this.folioFactura, this.transaccionesOriginales[0].Estacion.RFCEmisor)
                        .subscribe(function (data) {
                        _this.downloadFile(data._body, "Factura-" + _this.serieFactura + "-" + _this.folioFactura.toString() + ".xml", "application/xml");
                    }, function (error) { return _this.HandleError; });
                };
                FacturacionPreFacturaComponent.prototype.limpiarForma = function () {
                    this.partidas = [];
                    this.partidasSubtotal = 0;
                    this.partidasIVA = 0;
                    this.partidasIEPS = 0;
                    this.partidasTotal = 0;
                };
                FacturacionPreFacturaComponent.prototype.downloadFile = function (data, fileName, contentType) {
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style.display = "none";
                    var blob = new Blob([data], { type: contentType }), url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.setAttribute("download", fileName);
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
                FacturacionPreFacturaComponent.prototype.SolicitarFacturacion = function () {
                    var _this = this;
                    //Llamar Servicio para facturar.
                    this.blockUI.start("Solicitando Factura");
                    var solicitudComprobante = {};
                    solicitudComprobante.Transacciones = [];
                    //Transacciones
                    this.transaccionesOriginales.forEach(function (tran) {
                        solicitudComprobante.Transacciones.push(tran.IdTransaccion);
                    });
                    //receptor
                    solicitudComprobante.IdReceptor = this.receptor.IdCliente;
                    solicitudComprobante.MetodosPago = this.metodoPago.ClaveMetodoPago;
                    solicitudComprobante.MetodosPagoDescripcion = this.metodoPago.Nombre;
                    solicitudComprobante.MetodosPagoCuentas = this.metodoPagoCuenta;
                    solicitudComprobante.NoEstacion = this.transaccionesOriginales[0].Estacion.NoEstacion;
                    solicitudComprobante.RFCEmisor = this.transaccionesOriginales[0].Estacion.RFCEmisor;
                    this.facturacionService.SolicitarFacturacion(solicitudComprobante)
                        .subscribe(function (data) {
                        _this.folioFactura = data.Folio;
                        _this.serieFactura = data.Serie;
                        _this.facturacionService.BuscarComprobante(data.Folio, data.Serie, _this.transaccionesOriginales[0].Estacion.RFCEmisor, _this.receptor.IdCliente)
                            .subscribe(function (data) {
                            if (data === "Comprobante generado con éxito") {
                                _this.blockUI.changeMessage("Listo!");
                                _this.blockUI.stop();
                                _this.facturacionCompleta = true;
                            }
                            if (data === "El comprobante no ha sido generado o hubo un error en su procesamiento") {
                                _this.blockUI.changeMessage("Listo!");
                                _this.blockUI.stop();
                                _this.facturacionCompleta = false;
                                _this.HandleError("FATAL");
                            }
                        }, function (error) { return _this.HandleError; });
                    }, function (error) {
                        _this.blockUI.changeMessage("Error!");
                        _this.blockUI.stop();
                        _this.HandleError(error);
                    });
                };
                FacturacionPreFacturaComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.usuarioService.ObtenerPerfilUsuario()
                        .subscribe(function (data) {
                        _this.contextUsuario = data;
                    });
                };
                FacturacionPreFacturaComponent.prototype.modalOnDismiss = function () {
                    if (this.facturacionCompleta == true) {
                        this.contextUsuario = null;
                        this.facturacionCompleta = false;
                        this.partidas = [];
                        this.transaccionesOriginales = [];
                        this.partidasSubtotal = 0;
                        this.partidasIEPS = 0;
                        this.partidasIVA = 0;
                        this.partidasTotal = 0;
                        this.metodoPago = null;
                        this.receptor = {
                            IdCliente: "", Alias: "", RFC: "", RazonSocial: "", Contacto: "", Calle: "", NumeroExterior: "",
                            NumeroInterior: "", Colonia: "", Localidad: "", Pais: "", CodigoPostal: "", CorreoElectronico: "",
                            Ciudad: "", FechaCreacion: "", FechaModificacion: "", UsuarioModificacion: "", IdEstado: 0
                        };
                        this.serieFactura = "";
                        this.folioFactura = "";
                        this.facturacionCompletada.emit(this.idGrupoTransacciones.toString());
                    }
                };
                FacturacionPreFacturaComponent.prototype.HandleError = function (error) {
                    if (error.toUpperCase().indexOf("EXPIRADA") > -1) {
                        this.modal.close();
                        this.busService.channel.publish(MessageBus_1.MessageBus.Message("ISessionExpired"), function (item) { item.body = "Expirada"; });
                    }
                    if (error.toUpperCase().indexOf("NO DISPONIBLE") > -1) {
                        this.modal.close();
                        this.busService.channel.publish(MessageBus_1.MessageBus.Message("IServiceNotAvailable"), function (item) { item.body = "Servicio no disponible"; });
                    }
                    if (error.toUpperCase().indexOf("FATAL") > -1) {
                        this.modal.close();
                        this.busService.channel.publish(MessageBus_1.MessageBus.Message("IErrorMessage"), function (item) { item.body = "Ha ocurrido un error, favor de intentar de nuevo"; });
                    }
                    else {
                    }
                };
                return FacturacionPreFacturaComponent;
            }());
            __decorate([
                core_1.ViewChild("preFacturaModal"),
                __metadata("design:type", modalmain_component_1.ModalComponent)
            ], FacturacionPreFacturaComponent.prototype, "modal", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], FacturacionPreFacturaComponent.prototype, "facturacionCompletada", void 0);
            FacturacionPreFacturaComponent = __decorate([
                core_1.Component({
                    selector: "facturacion-prefacturacomponent",
                    templateUrl: "App/Facturacion/Views/facturacion.preFactura.component.html"
                }),
                __metadata("design:paramtypes", [perfil_usuario_service_1.PerfilUsuarioService, facturacion_services_1.facturacionServices, BlockUI_Service_1.BlockUIService, Global_services_1.GlobalService, busService_1.BusService])
            ], FacturacionPreFacturaComponent);
            exports_1("FacturacionPreFacturaComponent", FacturacionPreFacturaComponent);
        }
    };
});
//# sourceMappingURL=facturacion.preFactura.component.js.map