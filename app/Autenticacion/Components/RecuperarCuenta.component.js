System.register(["@angular/core", "@angular/router", "./../Services/Autenticacion.service", "./../../Common/Modal/Components/modalmain.component"], function (exports_1, context_1) {
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
    var core_1, router_1, Autenticacion_service_1, modalmain_component_1, RecuperarCuentaComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Autenticacion_service_1_1) {
                Autenticacion_service_1 = Autenticacion_service_1_1;
            },
            function (modalmain_component_1_1) {
                modalmain_component_1 = modalmain_component_1_1;
            }
        ],
        execute: function () {
            RecuperarCuentaComponent = (function () {
                function RecuperarCuentaComponent(autenticacionService, router) {
                    this.autenticacionService = autenticacionService;
                    this.router = router;
                    this.username = "";
                    this.modalMessage = "Se ha enviado un correo a su cuenta con la información necesaria para realizar la recuperación de su contraseña. Cualquier duda o aclaración contacte a nuestro equipo con gusto le atenderemos.";
                }
                RecuperarCuentaComponent.prototype.dismissedModal = function () {
                    this.router.navigate(["/welcome"]);
                };
                RecuperarCuentaComponent.prototype.RecuperarCuenta = function () {
                    var _this = this;
                    this.autenticacionService.RecuperarCuenta(this.username).subscribe(function (data) {
                        _this.notificacionModal.open();
                    }, function (error) {
                        _this.modalMessage = "Ups! ha ocurrido un error, favor de intentar de nuevo. Si el problema persiste contacte a nuestro equipo y con gusto le atenderemos.";
                        _this.notificacionModal.open();
                    });
                };
                return RecuperarCuentaComponent;
            }());
            __decorate([
                core_1.ViewChild("recuperarCuentaModal"),
                __metadata("design:type", modalmain_component_1.ModalComponent)
            ], RecuperarCuentaComponent.prototype, "notificacionModal", void 0);
            RecuperarCuentaComponent = __decorate([
                core_1.Component({
                    templateUrl: "App/Autenticacion/Views/RecuperarCuenta.component.html",
                    providers: [Autenticacion_service_1.AutenticacionService]
                }),
                __metadata("design:paramtypes", [Autenticacion_service_1.AutenticacionService, router_1.Router])
            ], RecuperarCuentaComponent);
            exports_1("RecuperarCuentaComponent", RecuperarCuentaComponent);
        }
    };
});
//# sourceMappingURL=RecuperarCuenta.component.js.map