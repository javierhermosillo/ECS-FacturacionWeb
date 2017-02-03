System.register(["@angular/core", "./../Services/perfil.usuario.service", "./../../Global/Services/Estado.services"], function (exports_1, context_1) {
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
    var core_1, perfil_usuario_service_1, Estado_services_1, PerfilComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (perfil_usuario_service_1_1) {
                perfil_usuario_service_1 = perfil_usuario_service_1_1;
            },
            function (Estado_services_1_1) {
                Estado_services_1 = Estado_services_1_1;
            }
        ],
        execute: function () {
            PerfilComponent = (function () {
                function PerfilComponent() {
                    this._contextUsuario = { IdUsuario: "", Nombre: "", ApellidoPaterno: "", ApellidoMaterno: "", Celular: "", Email: "" };
                    this.PosicionamientoPerfilUsuario = true;
                    this.PosicionamientoPerfilFacturacion = true;
                }
                PerfilComponent.prototype.RegistrarDatosUsuario = function (usuario) {
                    this._contextUsuario = usuario;
                };
                return PerfilComponent;
            }());
            PerfilComponent = __decorate([
                core_1.Component({
                    templateUrl: "App/Perfil/Views/Perfil.component.html",
                    //directives : [PerfilUsuarioComponent, PerfilFacturacionComponent],
                    providers: [perfil_usuario_service_1.PerfilUsuarioService, Estado_services_1.EstadoService],
                    styleUrls: ["app/Perfil/Styles/Perfil.component.css"]
                }),
                __metadata("design:paramtypes", [])
            ], PerfilComponent);
            exports_1("PerfilComponent", PerfilComponent);
        }
    };
});
//# sourceMappingURL=Perfil.component.js.map