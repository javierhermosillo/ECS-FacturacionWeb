import { Component, ViewChild } from "@angular/core";
import { MenuComponent } from "../../Shared/Menu/Components/Menu.component";
import { FacturacionComponent } from "../../Facturacion/Components/facturacion.component";
import { ModalComponent } from "./../../Common/Modal/Components/modalmain.component";
import { Router } from "@angular/router";
import { MessageBus } from "./../../Common/Bus/MessageBus";
import { BusService } from "./../../Common/Bus/busService";
import { ISessionExpired } from "./../../Global/Messages/Session/ISessionExpiredMessage";
import { IServiceNotAvailable } from "./../../Global/Messages/Offline/IServiceNotAvailable";
import { IErrorMessage } from "./../../Global/Messages/Error/IErrorMessage";

@Component({
    templateUrl: "App/Home/Views/Home.Component.html",
    directives : [MenuComponent, FacturacionComponent]
})

export class HomeComponent {
    sessionExpired : ISessionExpired = { Status : "" };
    _router : any;
    @ViewChild("sessionModal") sessionModal : ModalComponent;
    @ViewChild("ServiceNotAvailableModal") serviceNotAvailableModal : ModalComponent;
    @ViewChild("GeneralErrorModal") generalErrorModal : ModalComponent;

    constructor(private router : Router, private busService : BusService) {
        this._router = router;
        this.subscribeToEvents();
    }

    cerrarSesion() {
        this._router.navigate(["/welcome"]);
    }

    servicioNoDisponible() {
        this.serviceNotAvailableModal.close();
    }

    GeneralError(){
        this.GeneralError.close();
    }

    subscribeToEvents () {
        this.busService.channel.on(MessageBus.Message<ISessionExpired>("ISessionExpired"), () => {
            this.sessionModal.open();
        });
        this.busService.channel.on(MessageBus.Message<IServiceNotAvailable>("IServiceNotAvailable"), () => {
            this.serviceNotAvailableModal.open();
        });
         this.busService.channel.on(MessageBus.Message<IErrorMessage>("IErrorMessage"), () => {
            this.generalErrorModal.open();
        });
    }

}