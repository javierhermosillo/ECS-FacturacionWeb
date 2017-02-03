System.register(["@angular/core", "./../../Global/Services/Estado.services", "./../Services/perfil.usuario.service", "./../../Common/BlockUI/Service/BlockUI.Service", "./../../Common/Modal/Components/modalmain.component", "ng2-toastr/ng2-toastr"], function (exports_1, context_1) {
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
    var core_1, Estado_services_1, perfil_usuario_service_1, BlockUI_Service_1, modalmain_component_1, ng2_toastr_1, PerfilFacturacionComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Estado_services_1_1) {
                Estado_services_1 = Estado_services_1_1;
            },
            function (perfil_usuario_service_1_1) {
                perfil_usuario_service_1 = perfil_usuario_service_1_1;
            },
            function (BlockUI_Service_1_1) {
                BlockUI_Service_1 = BlockUI_Service_1_1;
            },
            function (modalmain_component_1_1) {
                modalmain_component_1 = modalmain_component_1_1;
            },
            function (ng2_toastr_1_1) {
                ng2_toastr_1 = ng2_toastr_1_1;
            }
        ],
        execute: function () {
            PerfilFacturacionComponent = (function () {
                function PerfilFacturacionComponent(_perfilService, _estadoService, _blockUI, _toastr) {
                    this._perfilService = _perfilService;
                    this._estadoService = _estadoService;
                    this._blockUI = _blockUI;
                    this._toastr = _toastr;
                    this.inpContextUsuario = { IdUsuario: "", Nombre: "", ApellidoPaterno: "", ApellidoMaterno: "", Email: "", Celular: "" };
                    this.listadoReceptores = [];
                    this._SelectedIdCliente = "";
                    this.contextDatosFiscales = { RFC: "", razonSocial: "", alias: "" };
                    this.contextDomicilioFiscal = { calle: "", numeroExterior: "", numeroInterior: "", colonia: "", codigoPostal: "", estado: "", ciudad: "", localidad: "", pais: "México", telefono: "" };
                    this.estados = [];
                    this.emailRecepcion = "";
                    this.modalSize = "lg";
                    this.modo = "Actualizar"; //Agregar
                }
                //Angular Pipeline
                PerfilFacturacionComponent.prototype.ngOnInit = function () {
                    this.cargarReceptores();
                    this.cargarEstados();
                };
                // private methods
                PerfilFacturacionComponent.prototype.GuardarCambios = function () {
                    if (this.modo === "Actualizar") {
                        this.ActualizarReceptor();
                    }
                    if (this.modo === "Agregar") {
                        this.AgregarReceptor();
                    }
                };
                PerfilFacturacionComponent.prototype.SolcitiarAgregarReceptor = function (IdCliente) {
                    this.modo = "Agregar";
                    this.openModal();
                };
                PerfilFacturacionComponent.prototype.SolcitiarActualizarReceptor = function (IdCliente) {
                    this.modo = "Actualizar";
                    this._blockUI.start("Cargando Información");
                    this._SelectedIdCliente = IdCliente;
                    this.cargarDetalleReceptor(IdCliente);
                };
                PerfilFacturacionComponent.prototype.ActualizarReceptor = function () {
                    var _this = this;
                    this._blockUI.start("Actualizando información");
                    this.contextDatosFiscales.RFC = this.contextDatosFiscales.RFC.toUpperCase();
                    this._perfilService.ActualizarReceptor(this.inpContextUsuario.IdUsuario, this._SelectedIdCliente, {
                        datosFiscales: this.contextDatosFiscales,
                        emailsReceptor: this.emailRecepcion,
                        domicilioFiscal: this.contextDomicilioFiscal
                    }).subscribe(function (data) {
                        _this.cargarReceptores();
                        _this.LimpiarModelo();
                        _this._blockUI.stop();
                        _this.modal.close();
                        _this._toastr.success("Información actualizada con éxito");
                    }, function (error) {
                        _this._blockUI.stop();
                    }, function () { });
                };
                PerfilFacturacionComponent.prototype.AgregarReceptor = function () {
                    var _this = this;
                    this.contextDatosFiscales.RFC = this.contextDatosFiscales.RFC.toUpperCase();
                    this._perfilService.AgregarReceptor(this.inpContextUsuario.IdUsuario, this._SelectedIdCliente, {
                        datosFiscales: this.contextDatosFiscales,
                        emailsReceptor: this.emailRecepcion,
                        domicilioFiscal: this.contextDomicilioFiscal
                    }).subscribe(function (data) {
                        _this.cargarReceptores();
                        _this.LimpiarModelo();
                        _this._blockUI.stop();
                        _this.modal.close();
                        _this._toastr.success("Receptor Agregado con éxito");
                    }, function (error) {
                        _this._blockUI.stop();
                    }, function () { });
                };
                PerfilFacturacionComponent.prototype.cargarReceptores = function () {
                    var _this = this;
                    if (sessionStorage.getItem("UserId") != "") {
                        this._perfilService.ObtenerReceptoresDeUsuario(sessionStorage.getItem("UserId"))
                            .subscribe(function (data) {
                            _this.listadoReceptores = data;
                        });
                    }
                };
                PerfilFacturacionComponent.prototype.cargarDetalleReceptor = function (idReceptor) {
                    var _this = this;
                    this._perfilService.ObtenerDetalleReceptor(sessionStorage.getItem("UserId"), idReceptor)
                        .subscribe(function (data) {
                        //Datos Fiscal
                        _this.contextDatosFiscales.alias = data.Alias;
                        _this.contextDatosFiscales.razonSocial = data.RazonSocial;
                        _this.contextDatosFiscales.RFC = data.RFC;
                        //Domicilio Fiscal
                        _this.contextDomicilioFiscal.calle = data.Calle;
                        _this.contextDomicilioFiscal.colonia = data.Colonia;
                        _this.contextDomicilioFiscal.ciudad = data.Ciudad;
                        _this.contextDomicilioFiscal.estado = data.IdEstado == null ? null : data.IdEstado.toString();
                        _this.contextDomicilioFiscal.localidad = data.Localidad;
                        _this.contextDomicilioFiscal.codigoPostal = data.CodigoPostal;
                        _this.contextDomicilioFiscal.numeroInterior = data.NumeroInterior;
                        _this.contextDomicilioFiscal.numeroExterior = data.NumeroExterior;
                        _this.contextDomicilioFiscal.pais = data.Pais;
                        _this.emailRecepcion = data.CorreoElectronico;
                        _this._blockUI.stop();
                        _this.openModal();
                    }, function () {
                        _this._blockUI.stop();
                    });
                };
                PerfilFacturacionComponent.prototype.cargarEstados = function () {
                    var _this = this;
                    //this._blockUI.start("Cargando información de cliente");
                    this._estadoService.Estados()
                        .subscribe(function (data) {
                        _this.estados = data;
                    }, function (error) { }, function () { });
                };
                //Validaciones
                PerfilFacturacionComponent.prototype.ValidarCorreosParaEnvio = function () {
                    var result = true;
                    //Validar caracteres especiales en string;
                    if (this.emailRecepcion != "") {
                        if (!/^[a-zA-Z0-9 @;_.]*$/.test(this.emailRecepcion)) {
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
                //Helpers
                PerfilFacturacionComponent.prototype.LimpiarModelo = function () {
                    this.contextDatosFiscales = { RFC: "", razonSocial: "", alias: "" };
                    this.contextDomicilioFiscal = { calle: "", numeroExterior: "", numeroInterior: "", colonia: "", codigoPostal: "", estado: "", ciudad: "", localidad: "", pais: "México", telefono: "" };
                    this.emailRecepcion = "";
                };
                //Modal
                PerfilFacturacionComponent.prototype.closedModal = function () {
                    //this._router.navigate(['/welcome']);
                };
                PerfilFacturacionComponent.prototype.dismissedModal = function () {
                    this.LimpiarModelo();
                };
                PerfilFacturacionComponent.prototype.openedModal = function () {
                    //this.modalOutput = '(opened)';
                };
                PerfilFacturacionComponent.prototype.openModal = function () {
                    this.modal.open();
                };
                return PerfilFacturacionComponent;
            }());
            __decorate([
                core_1.ViewChild('ReceptoresModal'),
                __metadata("design:type", modalmain_component_1.ModalComponent)
            ], PerfilFacturacionComponent.prototype, "modal", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], PerfilFacturacionComponent.prototype, "inpContextUsuario", void 0);
            PerfilFacturacionComponent = __decorate([
                core_1.Component({
                    selector: "facturacion-perfilfacturacion",
                    templateUrl: "App/Perfil/Views/Perfil.receptores.component.html",
                    encapsulation: core_1.ViewEncapsulation.None
                }),
                __metadata("design:paramtypes", [perfil_usuario_service_1.PerfilUsuarioService, Estado_services_1.EstadoService, BlockUI_Service_1.BlockUIService, ng2_toastr_1.ToastsManager])
            ], PerfilFacturacionComponent);
            exports_1("PerfilFacturacionComponent", PerfilFacturacionComponent);
        }
    };
});
//# sourceMappingURL=Perfil.receptores.component.js.map