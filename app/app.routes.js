System.register(["@angular/router", "./Welcome/Components/Welcome.component", "./Home/Components/home.component", "./Registro/Components/Registro.component", "./Perfil/Components/Perfil.component", "./../app/Facturacion/Components/facturacion.component", "./../app/Facturacion/Components/facturacionrapida.component", "./../app/Facturacion/Components/facturacion.historial.component", "./Contacto/Components/ContactoExt.Component", "./Autenticacion/Components/RecuperarCuenta.component", "./Common/Auth/auth.guard"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, Welcome_component_1, home_component_1, Registro_component_1, Perfil_component_1, facturacion_component_1, facturacionrapida_component_1, facturacion_historial_component_1, ContactoExt_Component_1, RecuperarCuenta_component_1, auth_guard_1, appRoutes, routing;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Welcome_component_1_1) {
                Welcome_component_1 = Welcome_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (Registro_component_1_1) {
                Registro_component_1 = Registro_component_1_1;
            },
            function (Perfil_component_1_1) {
                Perfil_component_1 = Perfil_component_1_1;
            },
            function (facturacion_component_1_1) {
                facturacion_component_1 = facturacion_component_1_1;
            },
            function (facturacionrapida_component_1_1) {
                facturacionrapida_component_1 = facturacionrapida_component_1_1;
            },
            function (facturacion_historial_component_1_1) {
                facturacion_historial_component_1 = facturacion_historial_component_1_1;
            },
            function (ContactoExt_Component_1_1) {
                ContactoExt_Component_1 = ContactoExt_Component_1_1;
            },
            function (RecuperarCuenta_component_1_1) {
                RecuperarCuenta_component_1 = RecuperarCuenta_component_1_1;
            },
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            }
        ],
        execute: function () {
            appRoutes = [
                { path: "", redirectTo: "/welcome", pathMatch: "full" },
                { path: "welcome", component: Welcome_component_1.WelcomeComponent },
                { path: "Welcome", component: Welcome_component_1.WelcomeComponent },
                { path: "home", component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard],
                    children: [
                        { path: "", component: facturacion_component_1.FacturacionComponent },
                        { path: "perfil", component: Perfil_component_1.PerfilComponent },
                        { path: "facturacion", component: facturacion_component_1.FacturacionComponent },
                        { path: "historial", component: facturacion_historial_component_1.FacturacionHistorialComponent },
                        { path: "contacto", component: ContactoExt_Component_1.ContactoExtComponent }
                    ]
                },
                { path: "Home", component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard],
                    children: [
                        { path: "", component: facturacion_component_1.FacturacionComponent },
                        { path: "Perfil", component: Perfil_component_1.PerfilComponent },
                        { path: "Facturacion", component: facturacion_component_1.FacturacionComponent },
                        { path: "Historial", component: facturacion_historial_component_1.FacturacionHistorialComponent },
                        { path: "Contacto", component: ContactoExt_Component_1.ContactoExtComponent }
                    ]
                },
                { path: "registro", component: Registro_component_1.RegistroComponent },
                { path: "Registro", component: Registro_component_1.RegistroComponent },
                { path: "recuperarcuenta", component: RecuperarCuenta_component_1.RecuperarCuentaComponent },
                { path: "RecuperarCuenta", component: RecuperarCuenta_component_1.RecuperarCuentaComponent },
                { path: "facturacionrapida", component: facturacionrapida_component_1.FacturacionRapidaComponent },
                { path: "FacturacionRapida", component: facturacionrapida_component_1.FacturacionRapidaComponent }
            ];
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    };
});
//# sourceMappingURL=app.routes.js.map