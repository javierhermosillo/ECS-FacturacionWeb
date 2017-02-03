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
    var __moduleName = context_1 && context_1.id;
    var core_1, modalmain_component_1, ModalHeaderComponent;
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
            ModalHeaderComponent = (function () {
                function ModalHeaderComponent(modal) {
                    this.modal = modal;
                    this.showClose = false;
                }
                return ModalHeaderComponent;
            }());
            __decorate([
                core_1.Input('show-close'),
                __metadata("design:type", Boolean)
            ], ModalHeaderComponent.prototype, "showClose", void 0);
            ModalHeaderComponent = __decorate([
                core_1.Component({
                    selector: 'modal-header',
                    template: "\n        <div class=\"modal-header bg-primary-accent\">\n            <button *ngIf=\"showClose\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"modal.dismiss()\">\n                <span aria-hidden=\"true\" class=\"fa fa-times-circle fa-lg text-white\"></span>\n            </button>\n            <ng-content></ng-content>\n        </div>\n    "
                }),
                __metadata("design:paramtypes", [modalmain_component_1.ModalComponent])
            ], ModalHeaderComponent);
            exports_1("ModalHeaderComponent", ModalHeaderComponent);
        }
    };
});
//# sourceMappingURL=modalheader.component.js.map