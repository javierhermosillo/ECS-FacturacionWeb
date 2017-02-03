System.register(["@angular/core", "@angular/router", "./../Services/contacto.service", "./../../Common/BlockUI/Service/BlockUI.Service", "./../../Common/Modal/Components/modalmain.component"], function (exports_1, context_1) {
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
    var core_1, router_1, contacto_service_1, BlockUI_Service_1, modalmain_component_1, ContactoExtComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (contacto_service_1_1) {
                contacto_service_1 = contacto_service_1_1;
            },
            function (BlockUI_Service_1_1) {
                BlockUI_Service_1 = BlockUI_Service_1_1;
            },
            function (modalmain_component_1_1) {
                modalmain_component_1 = modalmain_component_1_1;
            }
        ],
        execute: function () {
            ContactoExtComponent = (function () {
                function ContactoExtComponent(contactoService, blockUIService, router) {
                    this.contactoService = contactoService;
                    this.blockUIService = blockUIService;
                    this.router = router;
                    this.contextMensaje = { Nombre: "", CorreoElectronico: "", TelefonoContacto: "", Mensaje: "" };
                    this.celularMask = [/[1-9]/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
                }
                ContactoExtComponent.prototype.EnviarMensaje = function () {
                    var _this = this;
                    this.blockUIService.start("Enviando mensaje");
                    this.contactoService.SolicitarEnvioDeMensaje(this.contextMensaje)
                        .subscribe(function (data) {
                        _this.blockUIService.stop();
                        _this.modal.open();
                    }, function (error) { });
                };
                ContactoExtComponent.prototype.onModalDismiss = function () {
                    this.router.navigate(["/home"]);
                };
                return ContactoExtComponent;
            }());
            __decorate([
                core_1.ViewChild("contactoModal"),
                __metadata("design:type", modalmain_component_1.ModalComponent)
            ], ContactoExtComponent.prototype, "modal", void 0);
            ContactoExtComponent = __decorate([
                core_1.Component({
                    selector: "facturacion-contactoextcomponent",
                    templateUrl: "App/Contacto/Views/contactoext.component.html",
                    providers: [contacto_service_1.ContactoService]
                }),
                __metadata("design:paramtypes", [contacto_service_1.ContactoService, BlockUI_Service_1.BlockUIService, router_1.Router])
            ], ContactoExtComponent);
            exports_1("ContactoExtComponent", ContactoExtComponent);
        }
    };
});
//# sourceMappingURL=ContactoExt.Component.js.map