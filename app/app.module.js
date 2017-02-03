System.register(["@angular/core", "@angular/platform-browser", "./app.component", "@angular/forms", "@angular/http", "./../app/Common/Modal/Components/Modal.component", "./app.routes", "angular2-jwt", "./Common/Auth/auth.guard", "ng2-toastr/ng2-toastr", "angular2-text-mask", "./Common/Bus/busService", "./Common/SmartTable/ng2-smart-table.module", "ng2-popover", "./Welcome/Components/Welcome.component", "./Home/Components/home.component", "./../app/Shared/Menu/Components/Menu.component", "./Registro/Components/Registro.component", "./Registro/Components/RegistroConfirmacion.Component", "./Registro/Components/RegistroProgreso.Component", "./Registro/Components/RegistroReceptores.Component", "./Registro/Components/RegistroUsuario.Component", "./Autenticacion/Components/RecuperarCuenta.component", "./../app/Autenticacion/Components/Autenticacion.component", "./../app/Facturacion/Components/facturacion.component", "./../app/Facturacion/Components/facturacion.busqueda.component", "./../app/Facturacion/Components/facturacion.preFactura.component", "./../app/Facturacion/Components/facturacion.transacciones.component", "./../app/Facturacion/Components/facturacion.historial.component", "./../app/Facturacion/Components/facturacionrapida.component", "./../app/Perfil/Components/Perfil.component", "./../app/Perfil/Components/Perfil.receptores.component", "./../app/Perfil/Components/Perfil.usuario.component", "../app/Common/BlockUI/Component/BlockUI.Component", "./Contacto/Components/ContactoExt.Component", "./../app/Global/Services/Global.services", "./../app/Common/BlockUI/Service/BlockUI.Service"], function (exports_1, context_1) {
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
    var core_1, platform_browser_1, app_component_1, forms_1, http_1, Modal_component_1, app_routes_1, angular2_jwt_1, auth_guard_1, ng2_toastr_1, angular2_text_mask_1, busService_1, ng2_smart_table_module_1, ng2_popover_1, Welcome_component_1, home_component_1, Menu_component_1, Registro_component_1, RegistroConfirmacion_Component_1, RegistroProgreso_Component_1, RegistroReceptores_Component_1, RegistroUsuario_Component_1, RecuperarCuenta_component_1, Autenticacion_component_1, facturacion_component_1, facturacion_busqueda_component_1, facturacion_preFactura_component_1, facturacion_transacciones_component_1, facturacion_historial_component_1, facturacionrapida_component_1, Perfil_component_1, Perfil_receptores_component_1, Perfil_usuario_component_1, BlockUI_Component_1, ContactoExt_Component_1, Global_services_1, BlockUI_Service_1, toastOptions, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Modal_component_1_1) {
                Modal_component_1 = Modal_component_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            },
            function (ng2_toastr_1_1) {
                ng2_toastr_1 = ng2_toastr_1_1;
            },
            function (angular2_text_mask_1_1) {
                angular2_text_mask_1 = angular2_text_mask_1_1;
            },
            function (busService_1_1) {
                busService_1 = busService_1_1;
            },
            function (ng2_smart_table_module_1_1) {
                ng2_smart_table_module_1 = ng2_smart_table_module_1_1;
            },
            function (ng2_popover_1_1) {
                ng2_popover_1 = ng2_popover_1_1;
            },
            function (Welcome_component_1_1) {
                Welcome_component_1 = Welcome_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (Menu_component_1_1) {
                Menu_component_1 = Menu_component_1_1;
            },
            function (Registro_component_1_1) {
                Registro_component_1 = Registro_component_1_1;
            },
            function (RegistroConfirmacion_Component_1_1) {
                RegistroConfirmacion_Component_1 = RegistroConfirmacion_Component_1_1;
            },
            function (RegistroProgreso_Component_1_1) {
                RegistroProgreso_Component_1 = RegistroProgreso_Component_1_1;
            },
            function (RegistroReceptores_Component_1_1) {
                RegistroReceptores_Component_1 = RegistroReceptores_Component_1_1;
            },
            function (RegistroUsuario_Component_1_1) {
                RegistroUsuario_Component_1 = RegistroUsuario_Component_1_1;
            },
            function (RecuperarCuenta_component_1_1) {
                RecuperarCuenta_component_1 = RecuperarCuenta_component_1_1;
            },
            function (Autenticacion_component_1_1) {
                Autenticacion_component_1 = Autenticacion_component_1_1;
            },
            function (facturacion_component_1_1) {
                facturacion_component_1 = facturacion_component_1_1;
            },
            function (facturacion_busqueda_component_1_1) {
                facturacion_busqueda_component_1 = facturacion_busqueda_component_1_1;
            },
            function (facturacion_preFactura_component_1_1) {
                facturacion_preFactura_component_1 = facturacion_preFactura_component_1_1;
            },
            function (facturacion_transacciones_component_1_1) {
                facturacion_transacciones_component_1 = facturacion_transacciones_component_1_1;
            },
            function (facturacion_historial_component_1_1) {
                facturacion_historial_component_1 = facturacion_historial_component_1_1;
            },
            function (facturacionrapida_component_1_1) {
                facturacionrapida_component_1 = facturacionrapida_component_1_1;
            },
            function (Perfil_component_1_1) {
                Perfil_component_1 = Perfil_component_1_1;
            },
            function (Perfil_receptores_component_1_1) {
                Perfil_receptores_component_1 = Perfil_receptores_component_1_1;
            },
            function (Perfil_usuario_component_1_1) {
                Perfil_usuario_component_1 = Perfil_usuario_component_1_1;
            },
            function (BlockUI_Component_1_1) {
                BlockUI_Component_1 = BlockUI_Component_1_1;
            },
            function (ContactoExt_Component_1_1) {
                ContactoExt_Component_1 = ContactoExt_Component_1_1;
            },
            function (Global_services_1_1) {
                Global_services_1 = Global_services_1_1;
            },
            function (BlockUI_Service_1_1) {
                BlockUI_Service_1 = BlockUI_Service_1_1;
            }
        ],
        execute: function () {
            toastOptions = {
                autoDismiss: true,
                positionClass: "toast-top-right",
            };
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, Modal_component_1.Ng2ModalModule, app_routes_1.routing, ng2_toastr_1.ToastModule.forRoot(toastOptions), ng2_smart_table_module_1.Ng2SmartTableModule, ng2_popover_1.PopoverModule],
                    declarations: [
                        app_component_1.AppComponent,
                        BlockUI_Component_1.BlockUIComponent,
                        home_component_1.HomeComponent,
                        Menu_component_1.MenuComponent,
                        Welcome_component_1.WelcomeComponent,
                        Autenticacion_component_1.AutenticacionComponent,
                        RecuperarCuenta_component_1.RecuperarCuentaComponent,
                        Registro_component_1.RegistroComponent,
                        //Registro Usuario
                        RegistroUsuario_Component_1.RegistroUsuarioComponent,
                        RegistroProgreso_Component_1.RegistroProgresoComponent,
                        RegistroConfirmacion_Component_1.RegistroConfirmacionComponent,
                        RegistroReceptores_Component_1.RegistroReceptoresComponent,
                        //Facturacion
                        facturacion_component_1.FacturacionComponent,
                        facturacion_busqueda_component_1.facturacionBusquedaComponent,
                        facturacion_preFactura_component_1.FacturacionPreFacturaComponent,
                        facturacion_transacciones_component_1.FacturacionTransaccionComponent,
                        facturacion_historial_component_1.FacturacionHistorialComponent,
                        facturacionrapida_component_1.FacturacionRapidaComponent,
                        //Perfil
                        Perfil_component_1.PerfilComponent,
                        Perfil_receptores_component_1.PerfilFacturacionComponent,
                        Perfil_usuario_component_1.PerfilUsuarioComponent,
                        //Contacto
                        ContactoExt_Component_1.ContactoExtComponent,
                        //Otros
                        angular2_text_mask_1.default
                    ],
                    entryComponents: [BlockUI_Component_1.BlockUIComponent],
                    providers: [Global_services_1.GlobalService, BlockUI_Service_1.BlockUIService, angular2_jwt_1.AUTH_PROVIDERS, auth_guard_1.AuthGuard, busService_1.BusService],
                    bootstrap: [app_component_1.AppComponent]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});
//# sourceMappingURL=app.module.js.map