//Imports
import { Component } from "@angular/core";
// import { HTTP_PROVIDERS } from "@angular/http";
// import { ROUTER_DIRECTIVES } from "@angular/router";
// import { AutenticacionService } from "./Autenticacion/Services/Autenticacion.service";
// import { SessionService } from "./Global/Services/Session.service";
// import { GlobalService } from "./Global/Services/Global.services";
// // import {ModalComponent, MODAL_DIRECTIVES } from "./Common/Modal/Components/modal.component"
// import { BlockUIService } from "./Common/BlockUI/Service/BlockUI.Service";
// import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component ({
    selector: "facturacion-app",
    template: "<router-outlet></router-outlet>"
    // template: "<h5>Hello World</h5>",
    // directives : [ROUTER_DIRECTIVES],
    //providers : [HTTP_PROVIDERS, AutenticacionService, GlobalService, BlockUIService, ToastsManager, SessionService]
    // providers : [AutenticacionService, GlobalService, BlockUIService, ToastsManager, SessionService]
})
export class AppComponent {
    //tituloApp: string = "Facturación Web";

    //Constructor
    // constructor (private _autenticacionService : AutenticacionService)
    // {

    // }


}