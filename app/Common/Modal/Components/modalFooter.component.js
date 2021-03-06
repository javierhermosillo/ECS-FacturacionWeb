System.register(["@angular/core", "./modalmain.component"], function (exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, modalmain_component_1, ModalFooterComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (modalmain_component_1_1) {
                modalmain_component_1 = modalmain_component_1_1;
            }
        ],
        execute: function () {
            ModalFooterComponent = (function () {
                function ModalFooterComponent(modal) {
                    this.modal = modal;
                    this.showDefaultButtons = false;
                    this.dismissButtonLabel = 'Dismiss';
                    this.closeButtonLabel = 'Close';
                }
                return ModalFooterComponent;
            }());
            __decorate([
                core_1.Input('show-default-buttons'),
                __metadata("design:type", Boolean)
            ], ModalFooterComponent.prototype, "showDefaultButtons", void 0);
            __decorate([
                core_1.Input('dismiss-button-label'),
                __metadata("design:type", String)
            ], ModalFooterComponent.prototype, "dismissButtonLabel", void 0);
            __decorate([
                core_1.Input('close-button-label'),
                __metadata("design:type", String)
            ], ModalFooterComponent.prototype, "closeButtonLabel", void 0);
            ModalFooterComponent = __decorate([
                core_1.Component({
                    selector: 'modal-footer',
                    template: "\n        <div class=\"modal-footer bg-primary-accent\">\n            <ng-content></ng-content>\n            <button *ngIf=\"showDefaultButtons\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"modal.dismiss()\">{{dismissButtonLabel}}</button>\n            <button *ngIf=\"showDefaultButtons\" type=\"button\" class=\"btn btn-primary\" (click)=\"modal.close()\">{{closeButtonLabel}}</button>\n        </div>\n    "
                }),
                __param(0, core_1.Inject(modalmain_component_1.ModalComponent)),
                __metadata("design:paramtypes", [modalmain_component_1.ModalComponent])
            ], ModalFooterComponent);
            exports_1("ModalFooterComponent", ModalFooterComponent);
        }
    };
});
//# sourceMappingURL=modalfooter.component.js.map