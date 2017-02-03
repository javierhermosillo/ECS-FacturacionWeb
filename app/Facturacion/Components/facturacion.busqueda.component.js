System.register(["@angular/core", "./../Services/facturacion.services", "./../../Common/BlockUI/Service/BlockUI.Service", "./../../Common/Modal/Components/modalmain.component", "./../../Global/Services/Emisor.services", "./../../Common/Bus/MessageBus", "./../../Common/Bus/busService"], function (exports_1, context_1) {
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
    var core_1, facturacion_services_1, BlockUI_Service_1, modalmain_component_1, Emisor_services_1, MessageBus_1, busService_1, facturacionBusquedaComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
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
            function (Emisor_services_1_1) {
                Emisor_services_1 = Emisor_services_1_1;
            },
            function (MessageBus_1_1) {
                MessageBus_1 = MessageBus_1_1;
            },
            function (busService_1_1) {
                busService_1 = busService_1_1;
            }
        ],
        execute: function () {
            facturacionBusquedaComponent = (function () {
                function facturacionBusquedaComponent(_facturacionService, _emisorService, busService, _blockUI) {
                    this._facturacionService = _facturacionService;
                    this._emisorService = _emisorService;
                    this.busService = busService;
                    this._blockUI = _blockUI;
                    this.transaccionEncontrada = new core_1.EventEmitter();
                    this.agrupacionTransacciones = [];
                    this.currentRetry = 0;
                    this.mensajeServicio = "";
                    this.parametrosBusqueda = { NoEstacion: "", NoTicket: "", NoVerificador: "" };
                    this.retries = 25;
                    this.transaccion = {
                        IdTransaccion: "",
                        NoTransaccionOriginal: "",
                        Cantidad: 0,
                        Precio: 0,
                        IVA: 0,
                        IEPS: 0,
                        Total: 0,
                        FechaCreacion: new Date(),
                        Productos: [],
                        Estacion: {
                            IdEstacion: "",
                            Nombre: "",
                            NoEstacion: "",
                            RFCEmisor: ""
                        }
                    };
                }
                //Angular Pipeline
                facturacionBusquedaComponent.prototype.ngOnInit = function () {
                    this.ObtenerDatosDeTransaccionesPendientes();
                    this.ObtenerDatosDeEstaciones();
                };
                //Metodos
                facturacionBusquedaComponent.prototype.AlmacenarDatosEnAgrupaciones = function (transaccion) {
                    var agrupacion = {
                        IdGrupo: 0,
                        Estacion: { IdEstacion: "", NoEstacion: "", Nombre: "", RFCEmisor: "" },
                        MetodoPago: { MetodoPago: 0, ClaveMetodoPago: "", Nombre: "" },
                        MetodoPagoCuenta: "",
                        Receptor: { IdCliente: "", Alias: "", RFC: "", RazonSocial: "", Contacto: "", Calle: "", NumeroExterior: "",
                            NumeroInterior: "", Colonia: "", Localidad: "", Pais: "", CodigoPostal: "", CorreoElectronico: "",
                            Ciudad: "", FechaCreacion: "", FechaModificacion: "", UsuarioModificacion: "", IdEstado: 0 },
                        Transacciones: [],
                        TotalEnTransacciones: 0
                    };
                    var agrupacionExistente = this.agrupacionTransacciones.find(function (item) { return item.Estacion.IdEstacion === transaccion.Estacion.IdEstacion; });
                    if (agrupacionExistente === undefined || agrupacionExistente == null) {
                        agrupacion.IdGrupo = Math.floor(Math.random() * 10000000) + 1;
                        agrupacion.Estacion = transaccion.Estacion;
                        agrupacion.Transacciones.push(transaccion);
                        this.agrupacionTransacciones.push(agrupacion);
                    }
                    else {
                        agrupacionExistente.Transacciones.push(transaccion);
                    }
                };
                facturacionBusquedaComponent.prototype.AlmacenarListaDeDatosEnAgrupaciones = function (transacciones) {
                    var agrupacion = [];
                    transacciones.forEach(function (item) {
                        var nuevaAgrupacion = {
                            IdGrupo: 0,
                            Estacion: { IdEstacion: "", NoEstacion: "", Nombre: "", RFCEmisor: "" },
                            MetodoPago: { MetodoPago: 0, ClaveMetodoPago: "", Nombre: "" },
                            MetodoPagoCuenta: "",
                            Receptor: { IdCliente: "", Alias: "", RFC: "", RazonSocial: "", Contacto: "", Calle: "", NumeroExterior: "",
                                NumeroInterior: "", Colonia: "", Localidad: "", Pais: "", CodigoPostal: "", CorreoElectronico: "",
                                Ciudad: "", FechaCreacion: "", FechaModificacion: "", UsuarioModificacion: "", IdEstado: 0 },
                            Transacciones: [],
                            TotalEnTransacciones: 0
                        };
                        var agrupacionExistente = agrupacion.find(function (element) { return element.Estacion.IdEstacion === item.Estacion.IdEstacion; });
                        if (agrupacionExistente !== undefined) {
                            agrupacionExistente.Transacciones.push(item);
                        }
                        else {
                            nuevaAgrupacion.IdGrupo = Math.floor(Math.random() * 10000000) + 1;
                            nuevaAgrupacion.Estacion = item.Estacion;
                            nuevaAgrupacion.Transacciones.push(item);
                            agrupacion.push(nuevaAgrupacion);
                        }
                    });
                    this.agrupacionTransacciones = agrupacion;
                };
                facturacionBusquedaComponent.prototype.ObtenerDatosDeTransacciones = function () {
                    var _this = this;
                    if (this.agrupacionTransacciones.length === 0 || !this.VerificarTransaccionAgregada(this.parametrosBusqueda.NoTicket)) {
                        this._blockUI.stop();
                        this._blockUI.start("Buscando Transaccion");
                        this._facturacionService.BuscarDetalleTransaccion(this.parametrosBusqueda)
                            .subscribe(function (data) {
                            if (data != null) {
                                _this.currentRetry = 0;
                                _this.AlmacenarDatosEnAgrupaciones(data);
                                _this.parametrosBusqueda = { NoEstacion: "", NoTicket: "", NoVerificador: "" };
                                _this.transaccionEncontrada.emit(_this.agrupacionTransacciones);
                                _this._blockUI.stop();
                            }
                            else {
                                //Buscar en Bitacora por errores
                                _this._facturacionService.BuscarMensajesEnBitacora(_this.parametrosBusqueda)
                                    .subscribe(function (data) {
                                    if (data.length > 0) {
                                        //Mostrar mensaje de bitacora
                                        _this._blockUI.stop();
                                        _this.mensajeServicio = data[0].Mensaje;
                                        _this.modal.open();
                                        _this.currentRetry = 0;
                                    }
                                    else {
                                        //No hay errores, reintentar busqueda
                                        if (_this.currentRetry <= _this.retries) {
                                            _this.currentRetry += 1;
                                            _this.ObtenerDatosDeTransacciones();
                                        }
                                        else {
                                            //Se han agotado los reintentos enviar mensaje de intentar de nuevo
                                            _this._blockUI.stop();
                                            _this.currentRetry = 0;
                                            _this.mensajeServicio = "No hemos encontrado información de su transacción, favor de intentar de nuevo en un momento.";
                                            _this.modal.open();
                                        }
                                    }
                                }, function (error) { return _this.HandleError; });
                            }
                        }, function (error) { return _this.HandleError; });
                    }
                    else {
                        this.mensajeServicio = "Ya existe la transacción en tu bandeja";
                        this.modal.open();
                    }
                };
                facturacionBusquedaComponent.prototype.ObtenerDatosDeEstaciones = function () {
                    var _this = this;
                    this._emisorService.ObtenerEstaciones()
                        .subscribe(function (data) {
                        _this.estaciones = data;
                        _this.parametrosBusqueda.NoEstacion = data[0].NoEstacion;
                    }, function (error) { return _this.HandleError; });
                };
                facturacionBusquedaComponent.prototype.ObtenerDatosDeTransaccionesPendientes = function () {
                    var _this = this;
                    this._facturacionService.BuscarTransaccionesPendientes()
                        .subscribe(function (data) {
                        if (data.length > 0) {
                            _this.AlmacenarListaDeDatosEnAgrupaciones(data);
                            _this.transaccionEncontrada.emit(_this.agrupacionTransacciones);
                        }
                    }, function (error) { return _this.HandleError; });
                };
                facturacionBusquedaComponent.prototype.SolicitarLocalizacionDeTransaccion = function () {
                    var _this = this;
                    //Solicitar busqueda
                    this.parametrosBusqueda.NoTicket = this.parametrosBusqueda.NoTicket.replace(/^0+/, "");
                    this._facturacionService.SolicitarBusquedaTransaccion(this.parametrosBusqueda)
                        .subscribe(function (data) {
                        _this.ObtenerDatosDeTransacciones();
                    }, function (error) { return _this.HandleError; });
                };
                //Modal Popup
                facturacionBusquedaComponent.prototype.closedModal = function () { };
                facturacionBusquedaComponent.prototype.dismissedModal = function () {
                    this.modal.dismiss();
                };
                facturacionBusquedaComponent.prototype.openedModal = function () { };
                facturacionBusquedaComponent.prototype.openModal = function () {
                    this.modal.open();
                };
                //Helpers
                facturacionBusquedaComponent.prototype.HandleError = function (error) {
                    if (error.indexOf("Expirada") > -1) {
                        this.modal.close();
                        this.busService.channel.publish(MessageBus_1.MessageBus.Message("ISessionExpired"), function (item) { item.body = "Expirada"; });
                    }
                    if (error.indexOf("No disponible") > -1) {
                        this.modal.close();
                        this.busService.channel.publish(MessageBus_1.MessageBus.Message("IServiceNotAvailable"), function (item) { item.body = "Servicio no disponible"; });
                    }
                    else {
                        this.mensajeServicio = error;
                        this.modal.open();
                    }
                };
                facturacionBusquedaComponent.prototype.LimpiarPantalla = function () {
                    this.parametrosBusqueda = { NoEstacion: "", NoTicket: "", NoVerificador: "" };
                    this.agrupacionTransacciones = [];
                    this.transaccion = {
                        IdTransaccion: "",
                        NoTransaccionOriginal: "",
                        Cantidad: 0,
                        Precio: 0,
                        IVA: 0,
                        IEPS: 0,
                        Total: 0,
                        FechaCreacion: new Date(),
                        Productos: [],
                        Estacion: {
                            IdEstacion: "",
                            Nombre: "",
                            NoEstacion: "",
                            RFCEmisor: ""
                        }
                    };
                };
                facturacionBusquedaComponent.prototype.VerificarTransaccionAgregada = function (noTicket) {
                    var existeTransaccion = false;
                    this.agrupacionTransacciones.forEach(function (item) {
                        if (item.Transacciones.find(function (tran) { return tran.NoTransaccionOriginal.toString() === noTicket.toString(); }) !== undefined) {
                            existeTransaccion = true;
                        }
                    });
                    return existeTransaccion;
                };
                return facturacionBusquedaComponent;
            }());
            __decorate([
                core_1.ViewChild("busquedaTransaccionModal"),
                __metadata("design:type", modalmain_component_1.ModalComponent)
            ], facturacionBusquedaComponent.prototype, "modal", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], facturacionBusquedaComponent.prototype, "transaccionEncontrada", void 0);
            facturacionBusquedaComponent = __decorate([
                core_1.Component({
                    selector: "facturacion-busquedacomponent",
                    templateUrl: "App/Facturacion/Views/facturacion.busqueda.component.html"
                }),
                __metadata("design:paramtypes", [facturacion_services_1.facturacionServices, Emisor_services_1.EmisorService, busService_1.BusService, BlockUI_Service_1.BlockUIService])
            ], facturacionBusquedaComponent);
            exports_1("facturacionBusquedaComponent", facturacionBusquedaComponent);
        }
    };
});
//# sourceMappingURL=facturacion.busqueda.component.js.map