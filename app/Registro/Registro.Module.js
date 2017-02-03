System.register(["@angular/core", "@angular/forms", "@angular/common", "./Components/Registro.Component", "./Components/RegistroConfirmacion.Component", "./Components/RegistroProgreso.Component", "./Components/RegistroUsuario.Component", "./Components/RegistroReceptores.Component", "./../Common/Modal/Components/modal.component", "angular2-text-mask"], function (exports_1, context_1) {
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
    var core_1, forms_1, common_1, Registro_Component_1, RegistroConfirmacion_Component_1, RegistroProgreso_Component_1, RegistroUsuario_Component_1, RegistroReceptores_Component_1, modal_component_1, angular2_text_mask_1, RegistroModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (Registro_Component_1_1) {
                Registro_Component_1 = Registro_Component_1_1;
            },
            function (RegistroConfirmacion_Component_1_1) {
                RegistroConfirmacion_Component_1 = RegistroConfirmacion_Component_1_1;
            },
            function (RegistroProgreso_Component_1_1) {
                RegistroProgreso_Component_1 = RegistroProgreso_Component_1_1;
            },
            function (RegistroUsuario_Component_1_1) {
                RegistroUsuario_Component_1 = RegistroUsuario_Component_1_1;
            },
            function (RegistroReceptores_Component_1_1) {
                RegistroReceptores_Component_1 = RegistroReceptores_Component_1_1;
            },
            function (modal_component_1_1) {
                modal_component_1 = modal_component_1_1;
            },
            function (angular2_text_mask_1_1) {
                angular2_text_mask_1 = angular2_text_mask_1_1;
            }
        ],
        execute: function () {
            RegistroModule = (function () {
                function RegistroModule() {
                }
                return RegistroModule;
            }());
            RegistroModule = __decorate([
                core_1.NgModule({
                    imports: [common_1.CommonModule, modal_component_1.Ng2ModalModule, forms_1.FormsModule],
                    declarations: [Registro_Component_1.RegistroComponent, RegistroConfirmacion_Component_1.RegistroConfirmacionComponent, RegistroProgreso_Component_1.RegistroProgresoComponent, RegistroUsuario_Component_1.RegistroUsuarioComponent, RegistroReceptores_Component_1.RegistroReceptoresComponent, angular2_text_mask_1.default],
                    exports: [Registro_Component_1.RegistroComponent, RegistroConfirmacion_Component_1.RegistroConfirmacionComponent, RegistroProgreso_Component_1.RegistroProgresoComponent, RegistroUsuario_Component_1.RegistroUsuarioComponent, RegistroReceptores_Component_1.RegistroReceptoresComponent]
                }),
                __metadata("design:paramtypes", [])
            ], RegistroModule);
            exports_1("RegistroModule", RegistroModule);
        }
    };
});
//# sourceMappingURL=Registro.Module.js.map