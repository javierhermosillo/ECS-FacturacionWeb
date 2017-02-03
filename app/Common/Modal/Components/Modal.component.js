System.register(["@angular/core", "@angular/common", "./modalmain.component", "./modalheader.component", "./modalbody.component", "./modalfooter.component", "./../Directives/autofocus", "./modal.component", "./modalinstance.component"], function (exports_1, context_1) {
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
    var core_1, common_1, modalmain_component_1, modalheader_component_1, modalbody_component_1, modalfooter_component_1, autofocus_1, Ng2ModalModule;
    var exportedNames_1 = {
        "Ng2ModalModule": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n))
                exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (modalmain_component_1_1) {
                modalmain_component_1 = modalmain_component_1_1;
            },
            function (modalheader_component_1_1) {
                modalheader_component_1 = modalheader_component_1_1;
                exportStar_1(modalheader_component_1_1);
            },
            function (modalbody_component_1_1) {
                modalbody_component_1 = modalbody_component_1_1;
                exportStar_1(modalbody_component_1_1);
            },
            function (modalfooter_component_1_1) {
                modalfooter_component_1 = modalfooter_component_1_1;
                exportStar_1(modalfooter_component_1_1);
            },
            function (autofocus_1_1) {
                autofocus_1 = autofocus_1_1;
            },
            function (modal_component_1_1) {
                exportStar_1(modal_component_1_1);
            },
            function (modalinstance_component_1_1) {
                exportStar_1(modalinstance_component_1_1);
            }
        ],
        execute: function () {
            Ng2ModalModule = (function () {
                function Ng2ModalModule() {
                }
                return Ng2ModalModule;
            }());
            Ng2ModalModule = __decorate([
                core_1.NgModule({
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        modalmain_component_1.ModalComponent,
                        modalheader_component_1.ModalHeaderComponent,
                        modalbody_component_1.ModalBodyComponent,
                        modalfooter_component_1.ModalFooterComponent,
                        autofocus_1.AutofocusDirective
                    ],
                    exports: [
                        modalmain_component_1.ModalComponent,
                        modalheader_component_1.ModalHeaderComponent,
                        modalbody_component_1.ModalBodyComponent,
                        modalfooter_component_1.ModalFooterComponent,
                        autofocus_1.AutofocusDirective
                    ]
                }),
                __metadata("design:paramtypes", [])
            ], Ng2ModalModule);
            exports_1("Ng2ModalModule", Ng2ModalModule);
        }
    };
});
//# sourceMappingURL=Modal.component.js.map