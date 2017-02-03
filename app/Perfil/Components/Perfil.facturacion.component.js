System.register(["@angular/core", "./../Services/perfil.usuario.service"], function(exports_1, context_1) {
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
    var core_1, perfil_usuario_service_1;
    var PerfilFacturacionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (perfil_usuario_service_1_1) {
                perfil_usuario_service_1 = perfil_usuario_service_1_1;
            }],
        execute: function() {
            PerfilFacturacionComponent = (function () {
                function PerfilFacturacionComponent(_perfilService) {
                    this._perfilService = _perfilService;
                    this.inpContextUsuario = { IdUsuario: "", Nombre: "", ApellidoPaterno: "", ApellidoMaterno: "", Email: "", Celular: "" };
                    this.receptores = [];
                }
                //Angular Pipeline
                PerfilFacturacionComponent.prototype.ngOnInit = function () {
                    this.cargarReceptores();
                };
                // private methods
                PerfilFacturacionComponent.prototype.cargarReceptores = function () {
                    var _this = this;
                    if (localStorage.getItem("UserId") != "") {
                        this._perfilService.ObtenerReceptoresDeUsuario(localStorage.getItem("UserId"))
                            .subscribe(function (data) {
                            _this.receptores = data;
                        });
                    }
                };
                PerfilFacturacionComponent.prototype.ActualizarReceptor = function (IdCliente) {
                    console.log(IdCliente);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], PerfilFacturacionComponent.prototype, "inpContextUsuario", void 0);
                PerfilFacturacionComponent = __decorate([
                    core_1.Component({
                        selector: "facturacion-perfilfacturacion",
                        templateUrl: "App/Perfil/Views/Perfil.facturacion.component.html"
                    }), 
                    __metadata('design:paramtypes', [perfil_usuario_service_1.PerfilUsuarioService])
                ], PerfilFacturacionComponent);
                return PerfilFacturacionComponent;
            }());
            exports_1("PerfilFacturacionComponent", PerfilFacturacionComponent);
        }
    }
});
//# sourceMappingURL=Perfil.facturacion.component.js.map