System.register(["@angular/core", "./../../Global/Services/MetodoPago.services", "./../../Perfil/Services/perfil.usuario.service", "./../Services/facturacion.services", "./../../Common/Bus/MessageBus", "./../../Common/Bus/busService", "./../../Common/Modal/Components/modalmain.component"], function (exports_1, context_1) {
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
    var core_1, MetodoPago_services_1, perfil_usuario_service_1, facturacion_services_1, MessageBus_1, busService_1, modalmain_component_1, FacturacionTransaccionComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (MetodoPago_services_1_1) {
                MetodoPago_services_1 = MetodoPago_services_1_1;
            },
            function (perfil_usuario_service_1_1) {
                perfil_usuario_service_1 = perfil_usuario_service_1_1;
            },
            function (facturacion_services_1_1) {
                facturacion_services_1 = facturacion_services_1_1;
            },
            function (MessageBus_1_1) {
                MessageBus_1 = MessageBus_1_1;
            },
            function (busService_1_1) {
                busService_1 = busService_1_1;
            },
            function (modalmain_component_1_1) {
                modalmain_component_1 = modalmain_component_1_1;
            }
        ],
        execute: function () {
            FacturacionTransaccionComponent = (function () {
                function FacturacionTransaccionComponent(metodoPagoService, perfilUsuario, busService, facturacionService) {
                    this.metodoPagoService = metodoPagoService;
                    this.perfilUsuario = perfilUsuario;
                    this.busService = busService;
                    this.facturacionService = facturacionService;
                    this.contextUsuario = { IdUsuario: "", Nombre: "", ApellidoPaterno: "", ApellidoMaterno: "", Celular: "", Email: "" };
                    this.transaccionesAgrupadas = [];
                    this.metodosPago = [];
                    this.receptores = [];
                    this.selectedReceptor = { IdCliente: "", Alias: "", RFC: "", RazonSocial: "", Contacto: "", Calle: "", NumeroExterior: "",
                        NumeroInterior: "", Colonia: "", Localidad: "", Pais: "", CodigoPostal: "", CorreoElectronico: "", Ciudad: "", FechaCreacion: "",
                        FechaModificacion: "", UsuarioModificacion: "", IdEstado: 0 };
                    this.selectedMetodoPago = { ClaveMetodoPago: "", MetodoPago: 0, Nombre: "" };
                    this.MensajeBotonFacturar = "";
                    // @Output() preFacturar : EventEmitter<ITransaccion[]> =  new EventEmitter<ITransaccion[]>();
                    this.preFacturar = new core_1.EventEmitter();
                }
                FacturacionTransaccionComponent.prototype.AbrirModalEliminar = function (idGrupo, noTransaccion) {
                    this.grupoId = idGrupo;
                    this.transaccionNoTransaccionOriginal = noTransaccion;
                    this.ModalMensajeEliminar.open();
                };
                FacturacionTransaccionComponent.prototype.CerrarModalEliminar = function () {
                    this.ModalMensajeEliminar.close();
                };
                FacturacionTransaccionComponent.prototype.EliminarYCerrarModal = function () {
                    this.EliminarTransaccionPrueba();
                    this.ModalMensajeEliminar.close();
                };
                FacturacionTransaccionComponent.prototype.EliminarTransaccionPrueba = function () {
                    var _this = this;
                    var grupoTransacciones = this.transaccionesAgrupadas.find(function (item) { return item.IdGrupo == _this.grupoId; });
                    this.facturacionService.EliminarTransaccionDeBandeja(+grupoTransacciones.Estacion.NoEstacion, this.transaccionNoTransaccionOriginal)
                        .subscribe(function (data) {
                        grupoTransacciones.Transacciones = grupoTransacciones.Transacciones.filter(function (tran) { return tran.NoTransaccionOriginal != _this.transaccionNoTransaccionOriginal.toString(); });
                        if (grupoTransacciones.Transacciones.length === 0) {
                            if (_this.transaccionesAgrupadas != undefined) {
                                _this.transaccionesAgrupadas = _this.transaccionesAgrupadas.filter(function (group) { return group.IdGrupo != _this.grupoId; });
                            }
                        }
                        _this.RecalcularTotalesPorGrupo();
                    });
                };
                //Angular Pipeline
                FacturacionTransaccionComponent.prototype.ngOnInit = function () {
                    this.ObtenerMetodosDePago();
                    this.ObtenerPerfilUsuario();
                };
                //Metodos
                FacturacionTransaccionComponent.prototype.AgregarTransaccionALista = function (transacciones) {
                    this.transaccionesAgrupadas = this.RealizarCalculosPosteriores(transacciones);
                };
                // EliminarTransaccion(idGrupo: number, noTransaccion : number) {
                //   let grupoTransacciones = this.transaccionesAgrupadas.find(item => item.IdGrupo == idGrupo);
                // this.facturacionService.EliminarTransaccionDeBandeja(+grupoTransacciones.Estacion.NoEstacion, noTransaccion)
                //.subscribe(data => {
                //  grupoTransacciones.Transacciones = grupoTransacciones.Transacciones.filter(tran => tran.NoTransaccionOriginal != noTransaccion.toString());
                // if (grupoTransacciones.Transacciones.length === 0 ) {
                //   if (this.transaccionesAgrupadas != undefined ) {
                //     this.transaccionesAgrupadas = this.transaccionesAgrupadas.filter(group => group.IdGrupo != idGrupo);
                //  }
                // }
                //this.RecalcularTotalesPorGrupo();
                // });
                // }
                FacturacionTransaccionComponent.prototype.ObtenerMetodosDePago = function () {
                    var _this = this;
                    this.metodoPagoService.ObtenerMetodosDePago()
                        .subscribe(function (data) {
                        _this.metodosPago = data;
                    }, function (error) { return _this.HandleError; });
                };
                FacturacionTransaccionComponent.prototype.ObtenerMisReceptores = function (idUsuario) {
                    var _this = this;
                    this.perfilUsuario.ObtenerReceptoresDeUsuario(idUsuario)
                        .subscribe(function (data) {
                        _this.receptores = data;
                    }, function (error) { return _this.HandleError; });
                };
                FacturacionTransaccionComponent.prototype.ObtenerPerfilUsuario = function () {
                    var _this = this;
                    this.perfilUsuario.ObtenerPerfilUsuario()
                        .subscribe(function (data) {
                        _this.contextUsuario = data;
                        _this.ObtenerMisReceptores(_this.contextUsuario.IdUsuario);
                    }, function (error) { return _this.HandleError; });
                };
                FacturacionTransaccionComponent.prototype.EsCuentaMetodoPagoRequerido = function (metodoPago) {
                    if (metodoPago !== undefined) {
                        if (metodoPago.ClaveMetodoPago !== "") {
                            if (metodoPago.Nombre.toUpperCase() == "EFECTIVO" || metodoPago.Nombre.toUpperCase() == "DINERO ELECTRÓNICO" || metodoPago.Nombre.toUpperCase() == "VALES DE DESPENSA" || metodoPago.Nombre.toUpperCase() == "OTROS" || metodoPago.Nombre.toUpperCase() == "NA") {
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
                FacturacionTransaccionComponent.prototype.RealizarCalculosPosteriores = function (transacciones) {
                    var totalEnTransacciones = 0;
                    transacciones.forEach(function (grupo) {
                        grupo.Transacciones.forEach(function (transaccion) {
                            totalEnTransacciones += transaccion.Total;
                        });
                        grupo.TotalEnTransacciones = totalEnTransacciones;
                        totalEnTransacciones = 0;
                    });
                    return transacciones;
                };
                FacturacionTransaccionComponent.prototype.RecalcularTotalesPorGrupo = function () {
                    var totalEnTransacciones = 0;
                    this.transaccionesAgrupadas.forEach(function (grupo) {
                        grupo.Transacciones.forEach(function (transaccion) {
                            totalEnTransacciones += transaccion.Total;
                        });
                        grupo.TotalEnTransacciones = totalEnTransacciones;
                        totalEnTransacciones = 0;
                    });
                };
                FacturacionTransaccionComponent.prototype.SolicitarPreFactura = function (idGrupoTransacciones) {
                    var transaccionesAFacturar = this.transaccionesAgrupadas.find(function (item) { return item.IdGrupo === idGrupoTransacciones; });
                    this.preFacturar.emit(transaccionesAFacturar);
                };
                FacturacionTransaccionComponent.prototype.LimpiarPantalla = function (idGrupoTransacciones) {
                    this.contextUsuario = { IdUsuario: "", Nombre: "", ApellidoPaterno: "", ApellidoMaterno: "", Celular: "", Email: "" };
                    var index = this.transaccionesAgrupadas.findIndex(function (item) { return item.IdGrupo == idGrupoTransacciones; });
                    this.transaccionesAgrupadas.splice(index, 1);
                    //this.selectedMetodoPagoCuenta = null;
                    //     this.selectedReceptor =  { IdCliente : "", Alias : "", RFC : "", RazonSocial : "", Contacto : "", Calle: "", NumeroExterior : "",
                    // NumeroInterior : "", Colonia: "", Localidad : "", Pais :"", CodigoPostal : "", CorreoElectronico : "", Ciudad : "", FechaCreacion : "",
                    // FechaModificacion : "", UsuarioModificacion : "", IdEstado : 0 };
                    //     this.selectedMetodoPago = { ClaveMetodoPago : "", MetodoPago : 0, Nombre : "" };
                };
                FacturacionTransaccionComponent.prototype.HandleError = function (error) {
                    if (error.message.indexOf("Expirada") > -1) {
                        this.busService.channel.publish(MessageBus_1.MessageBus.Message("ISessionExpired"), function (item) { item.body = "Expirada"; });
                    }
                    ;
                };
                FacturacionTransaccionComponent.prototype.VerificarCuentaMetodoPago = function (grupoTransacciones) {
                    var result = false;
                    if (this.EsCuentaMetodoPagoRequerido(grupoTransacciones.MetodoPago)) {
                        if (grupoTransacciones.MetodoPagoCuenta != undefined) {
                            if (grupoTransacciones.MetodoPagoCuenta.toString() === "" || (grupoTransacciones.MetodoPagoCuenta.toString().length === 4 && (/^\d+$/.test(grupoTransacciones.MetodoPagoCuenta.toString())))) {
                                result = true;
                            }
                        }
                    }
                    else {
                        result = true;
                    }
                    return result;
                };
                FacturacionTransaccionComponent.prototype.VerificarSeleccion = function (grupoTransacciones) {
                    var result = true;
                    if (grupoTransacciones.MetodoPago.ClaveMetodoPago !== "" && grupoTransacciones.Receptor.RFC !== "") {
                        if (this.VerificarCuentaMetodoPago(grupoTransacciones)) {
                            result = false;
                        }
                    }
                    return result;
                };
                FacturacionTransaccionComponent.prototype.mostrarMensajePopover = function (grupoTransacciones) {
                    if (this.VerificarSeleccion(grupoTransacciones)) {
                        this.MensajeBotonFacturar = "El método de pago y el receptor son requeridos";
                    }
                    else {
                        this.MensajeBotonFacturar = "Click aqui para comenzar con el proceso de facturación";
                    }
                };
                return FacturacionTransaccionComponent;
            }());
            __decorate([
                core_1.ViewChild("ModalMensajeEliminar"),
                __metadata("design:type", modalmain_component_1.ModalComponent)
            ], FacturacionTransaccionComponent.prototype, "ModalMensajeEliminar", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], FacturacionTransaccionComponent.prototype, "preFacturar", void 0);
            FacturacionTransaccionComponent = __decorate([
                core_1.Component({
                    selector: "facturacion-transaccioncomponent",
                    templateUrl: "App/Facturacion/Views/facturacion.transacciones.component.html"
                }),
                __metadata("design:paramtypes", [MetodoPago_services_1.MetodoPagoService, perfil_usuario_service_1.PerfilUsuarioService, busService_1.BusService, facturacion_services_1.facturacionServices])
            ], FacturacionTransaccionComponent);
            exports_1("FacturacionTransaccionComponent", FacturacionTransaccionComponent);
        }
    };
});
//# sourceMappingURL=facturacion.transacciones.component.js.map