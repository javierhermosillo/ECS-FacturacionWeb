System.register(["@angular/core", "../../Shared/Menu/Components/Menu.component", "../../Facturacion/Components/facturacion.component", "./../../Common/Modal/Components/modalmain.component", "@angular/router", "./../../Common/Bus/MessageBus", "./../../Common/Bus/busService"], function (exports_1, context_1) {
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
    var core_1, Menu_component_1, facturacion_component_1, modalmain_component_1, router_1, MessageBus_1, busService_1, HomeComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Menu_component_1_1) {
                Menu_component_1 = Menu_component_1_1;
            },
            function (facturacion_component_1_1) {
                facturacion_component_1 = facturacion_component_1_1;
            },
            function (modalmain_component_1_1) {
                modalmain_component_1 = modalmain_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (MessageBus_1_1) {
                MessageBus_1 = MessageBus_1_1;
            },
            function (busService_1_1) {
                busService_1 = busService_1_1;
            }
        ],
        execute: function () {
            HomeComponent = (function () {
                function HomeComponent(router, busService) {
                    this.router = router;
                    this.busService = busService;
                    this.sessionExpired = { Status: "" };
                    this._router = router;
                    this.subscribeToEvents();
                }
                HomeComponent.prototype.cerrarSesion = function () {
                    this._router.navigate(["/welcome"]);
                };
                HomeComponent.prototype.servicioNoDisponible = function () {
                    this.serviceNotAvailableModal.close();
                };
                HomeComponent.prototype.GeneralError = function () {
                    this.GeneralError.close();
                };
                HomeComponent.prototype.subscribeToEvents = function () {
                    var _this = this;
                    this.busService.channel.on(MessageBus_1.MessageBus.Message("ISessionExpired"), function () {
                        _this.sessionModal.open();
                    });
                    this.busService.channel.on(MessageBus_1.MessageBus.Message("IServiceNotAvailable"), function () {
                        _this.serviceNotAvailableModal.open();
                    });
                    this.busService.channel.on(MessageBus_1.MessageBus.Message("IErrorMessage"), function () {
                        _this.generalErrorModal.open();
                    });
                };
                return HomeComponent;
            }());
            __decorate([
                core_1.ViewChild("sessionModal"),
                __metadata("design:type", modalmain_component_1.ModalComponent)
            ], HomeComponent.prototype, "sessionModal", void 0);
            __decorate([
                core_1.ViewChild("ServiceNotAvailableModal"),
                __metadata("design:type", modalmain_component_1.ModalComponent)
            ], HomeComponent.prototype, "serviceNotAvailableModal", void 0);
            __decorate([
                core_1.ViewChild("GeneralErrorModal"),
                __metadata("design:type", modalmain_component_1.ModalComponent)
            ], HomeComponent.prototype, "generalErrorModal", void 0);
            HomeComponent = __decorate([
                core_1.Component({
                    templateUrl: "App/Home/Views/Home.Component.html",
                    directives: [Menu_component_1.MenuComponent, facturacion_component_1.FacturacionComponent]
                }),
                __metadata("design:paramtypes", [router_1.Router, busService_1.BusService])
            ], HomeComponent);
            exports_1("HomeComponent", HomeComponent);
        }
    };
});
//# sourceMappingURL=home.component.js.map