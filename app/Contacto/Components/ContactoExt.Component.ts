import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { IMensajeContacto } from "./../Interfaces/IMensajeContacto";
import { ContactoService } from "./../Services/contacto.service";
import { BlockUIService } from "./../../Common/BlockUI/Service/BlockUI.Service";
import { ModalComponent } from "./../../Common/Modal/Components/modalmain.component";

@Component({
    selector: "facturacion-contactoextcomponent",
    templateUrl : "App/Contacto/Views/contactoext.component.html",
    providers: [ContactoService]
})
export class ContactoExtComponent{
    contextMensaje : IMensajeContacto = { Nombre : "", CorreoElectronico : "", TelefonoContacto : "", Mensaje: ""};
    celularMask : any[] = [/[1-9]/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

    @ViewChild("contactoModal") modal : ModalComponent;
    constructor(private contactoService : ContactoService, private blockUIService : BlockUIService, private router: Router) {}

    EnviarMensaje() {
        this.blockUIService.start("Enviando mensaje");
        this.contactoService.SolicitarEnvioDeMensaje(this.contextMensaje)
            .subscribe(data => {
                this.blockUIService.stop();
                this.modal.open();
            }, error => {});
    }
    onModalDismiss(){
        this.router.navigate(["/home"]);
    }

}