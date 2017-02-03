System.register(["@angular/core", "./../../Global/Services/Estado.services", "./../../Common/BlockUI/Service/BlockUI.Service", "./../Services/perfil.usuario.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Estado_services_1, BlockUI_Service_1, perfil_usuario_service_1;
    var PerfilReceptoresActualizarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Estado_services_1_1) {
                Estado_services_1 = Estado_services_1_1;
            },
            function (BlockUI_Service_1_1) {
                BlockUI_Service_1 = BlockUI_Service_1_1;
            },
            function (perfil_usuario_service_1_1) {
                perfil_usuario_service_1 = perfil_usuario_service_1_1;
            }],
        execute: function() {
            PerfilReceptoresActualizarComponent = (function () {
                function PerfilReceptoresActualizarComponent(_estadoService, _blockUI, _perfilUsuarioService) {
                    this._estadoService = _estadoService;
                    this._blockUI = _blockUI;
                    this._perfilUsuarioService = _perfilUsuarioService;
                    this.contextDatosFiscales = { RFC: "", razonSocial: "", alias: "" };
                    this.contextDomicilioFiscal = { calle: "", numeroExterior: "", numeroInterior: "", colonia: "", codigoPostal: "", estado: "", ciudad: "", localidad: "", pais: "México", telefono: "" };
                    this.emailRecepcion = "";
                }
                //Angular Pipeline
                PerfilReceptoresActualizarComponent.prototype.ngOnInit = function () {
                    this._blockUI.start("Cargando Información");
                    //Cuando la carga de estados es exitosa comenzará la carga de los datos de usuario (Los estados son requeridos)
                    this.cargarEstados();
                };
                PerfilReceptoresActualizarComponent.prototype.cargarEstados = function () {
                    var _this = this;
                    if (this.idCliente != "") {
                        //this._blockUI.start("Cargando información de cliente");
                        this._estadoService.Estados()
                            .subscribe(function (data) {
                            _this.estados = data;
                            _this.cargarReceptor(_this.idCliente);
                        }, function (error) { _this.stateError == error; }, function () {
                        });
                    }
                };
                PerfilReceptoresActualizarComponent.prototype.cargarReceptor = function (idReceptor) {
                    var _this = this;
                    this._perfilUsuarioService.ObtenerDetalleReceptor(localStorage.getItem("UserId"), idReceptor)
                        .subscribe(function (data) {
                        //Datos Fiscal
                        _this.contextDatosFiscales.alias = data.Alias;
                        _this.contextDatosFiscales.razonSocial = data.RazonSocial;
                        _this.contextDatosFiscales.RFC = data.RFC;
                        //Domicilio Fiscal
                        _this.contextDomicilioFiscal.calle = data.Calle;
                        _this.contextDomicilioFiscal.colonia = data.Colonia;
                        _this.contextDomicilioFiscal.ciudad = data.Ciudad;
                        _this.contextDomicilioFiscal.estado = data.IdEstado.toString();
                        _this.contextDomicilioFiscal.localidad = data.Localidad;
                        _this.contextDomicilioFiscal.numeroInterior = data.NumeroInterior;
                        _this.contextDomicilioFiscal.numeroExterior = data.NumeroExterior;
                        _this.contextDomicilioFiscal.pais = data.Pais;
                    }, function () {
                        _this._blockUI.stop();
                    });
                };
                PerfilReceptoresActualizarComponent.prototype.ValidarCorreosParaEnvio = function () {
                    var result = true;
                    //Validar caracteres especiales en string;
                    if (this.emailRecepcion != "") {
                        if (!/^[a-zA-Z0-9 @;.]*$/.test(this.emailRecepcion)) {
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
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PerfilReceptoresActualizarComponent.prototype, "idCliente", void 0);
                PerfilReceptoresActualizarComponent = __decorate([
                    core_1.Component({
                        selector: "facturacion-perfilreceptoresactualizar",
                        templateUrl: "App/Perfil/Views/Perfil.receptores.actualizar.component.html"
                    }), 
                    __metadata('design:paramtypes', [Estado_services_1.EstadoService, BlockUI_Service_1.BlockUIService, perfil_usuario_service_1.PerfilUsuarioService])
                ], PerfilReceptoresActualizarComponent);
                return PerfilReceptoresActualizarComponent;
            }());
            exports_1("PerfilReceptoresActualizarComponent", PerfilReceptoresActualizarComponent);
        }
    }
});
//# sourceMappingURL=Perfil.receptores.actualizar.component.js.map