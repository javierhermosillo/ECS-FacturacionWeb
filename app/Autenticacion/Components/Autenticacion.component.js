System.register(["@angular/core", "@angular/router", "./../Services/Autenticacion.service", "./../../Common/BlockUI/Service/BlockUI.Service"], function (exports_1, context_1) {
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
    var core_1, router_1, Autenticacion_service_1, BlockUI_Service_1, AutenticacionComponent;
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
            function (BlockUI_Service_1_1) {
                BlockUI_Service_1 = BlockUI_Service_1_1;
            }
        ],
        execute: function () {
            AutenticacionComponent = (function () {
                function AutenticacionComponent(router, _autenticacionService, _blockUI) {
                    this.router = router;
                    this._autenticacionService = _autenticacionService;
                    this._blockUI = _blockUI;
                    this.tituloPanel = "Autenticación";
                    this.contextUsuario = { username: "", password: "" };
                    this._router = router;
                }
                //Metodos
                AutenticacionComponent.prototype.Autenticar = function () {
                    var _this = this;
                    this._blockUI.start("Autenticando Usuario");
                    this._autenticacionService.Autenticar(this.contextUsuario)
                        .subscribe(function (data) {
                        sessionStorage.setItem("AuthToken", data.AccessToken);
                        //localStorage.setItem("AuthToken", data.AccessToken);
                        _this._autenticacionService.ObtenerPerfilUsuario()
                            .subscribe(function (perfil) {
                            sessionStorage.setItem("UserId", perfil.IdUsuario);
                            sessionStorage.setItem("UserEmail", perfil.Email);
                            if (perfil.CorreoConfirmado === false) {
                                sessionStorage.setItem("CorreoConfirmado", "false");
                            }
                            _this._router.navigate(["/home"]);
                            _this._blockUI.stop();
                        });
                    }, function (error) {
                        _this.errorMessage = error;
                        _this._blockUI.stop();
                    }, function () { });
                };
                //Eventos
                AutenticacionComponent.prototype.onUsuarioChanged = function () {
                    this.errorMessage = null;
                };
                AutenticacionComponent.prototype.onPasswordChanged = function () {
                    this.errorMessage = null;
                };
                AutenticacionComponent.prototype.ngOnInit = function () {
                };
                return AutenticacionComponent;
            }());
            AutenticacionComponent = __decorate([
                core_1.Component({
                    selector: "facturacion-autenticacion",
                    templateUrl: "app/Autenticacion/Views/Autenticacion.component.html",
                    styleUrls: ["app/Autenticacion/Styles/Autenticacion.component.css"],
                    providers: [Autenticacion_service_1.AutenticacionService],
                    encapsulation: core_1.ViewEncapsulation.None
                }),
                __metadata("design:paramtypes", [router_1.Router, Autenticacion_service_1.AutenticacionService, BlockUI_Service_1.BlockUIService])
            ], AutenticacionComponent);
            exports_1("AutenticacionComponent", AutenticacionComponent);
        }
    };
});
//# sourceMappingURL=Autenticacion.component.js.map