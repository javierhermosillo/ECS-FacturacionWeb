import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AutenticacionService } from "./../Services/Autenticacion.service";
import { ModalComponent } from "./../../Common/Modal/Components/modalmain.component";

@Component ({
    templateUrl: "App/Autenticacion/Views/RecuperarCuenta.component.html",
    providers : [AutenticacionService]
})
export class RecuperarCuentaComponent {
    username : string = "";
    modalMessage : string = "Se ha enviado un correo a su cuenta con la información necesaria para realizar la recuperación de su contraseña. Cualquier duda o aclaración contacte a nuestro equipo con gusto le atenderemos.";
    @ViewChild("recuperarCuentaModal") notificacionModal : ModalComponent;

    constructor(private autenticacionService : AutenticacionService, private router: Router) {
    }

    dismissedModal() {
        this.router.navigate(["/welcome"]);
    }

    RecuperarCuenta() {
        this.autenticacionService.RecuperarCuenta(this.username).subscribe (
            data => { 
                this.notificacionModal.open();
             },
            error => { 
                this.modalMessage = "Ups! ha ocurrido un error, favor de intentar de nuevo. Si el problema persiste contacte a nuestro equipo y con gusto le atenderemos.";
                this.notificacionModal.open();
             }
        )
    }
}