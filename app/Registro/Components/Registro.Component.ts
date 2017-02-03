import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { RegistroProgresoComponent } from "../Components/RegistroProgreso.Component";
import { RegistroUsuarioComponent } from "../Components/RegistroUsuario.Component";
import { RegistroReceptoresComponent } from "../Components/RegistroReceptores.Component";
import { RegistroConfirmacionComponent } from "../Components/RegistroConfirmacion.Component";
import { IDatosFacturacion } from "./../Interfaces/IDatosFacturacion";
import { IDatosUsuario } from "./../Interfaces/IDatosUsuario";
import { IRegistroUsuario } from "./../Interfaces/IRegistroUsuario";
import { RegistroService } from "./../Services/Registro.service";
import { BlockUIService } from "./../../Common/BlockUI/Service/BlockUI.Service";
import { ModalComponent } from "./../../Common/Modal/Components/modal.component";

@Component({
    templateUrl : "App/Registro/Views/Registro.Component.html",
    //directives: [MODAL_DIRECTIVES, ModalComponent],
    providers : [RegistroService]
})
export class RegistroComponent
{
    public _WizardStep : string = "RegistroUsuario";
    public _datosRegistro : IRegistroUsuario = { 
        datosUsuario : { nombre : "", apellidoPaterno : "", apellidoMaterno : "", email : "", emailConfirmacion : "", celular : "", metodosAutenticacion : []},
        datosFacturacion : {
            datosFiscales : { RFC : "", razonSocial : "", alias : "" }, 
            domicilioFiscal : { calle : "", numeroExterior : "", numeroInterior : "", colonia : "", codigoPostal: "", estado : "", ciudad : "", localidad : "", pais: "México", telefono : "" }, 
            emailsReceptor : ""}
    };
    @ViewChild('registroModal') modal : ModalComponent;
    modalOutput: string;

    constructor(private _router: Router, private _registroService : RegistroService, private _blockUI : BlockUIService){}

    VerificarPasoActual(paso : string) {
        var result : Boolean = true;
        if (this._WizardStep == paso) {
            return false;
        }
        return result;
    }

    VolverPasoAnterior(paso : string) {
        var result : Boolean = true;
        this._WizardStep = paso;
    }

    AlmacenarDatosUsuario(datosUsuario : IDatosUsuario)
    {
        this._datosRegistro.datosUsuario = datosUsuario;
        this._WizardStep ="RegistroReceptores";
    }

    AlmacenarDatosFacturacion(datosFacturacion : IDatosFacturacion)
    {
        this._datosRegistro.datosFacturacion = datosFacturacion;
        this._datosRegistro.datosFacturacion.datosFiscales.RFC = this._datosRegistro.datosFacturacion.datosFiscales.RFC.toUpperCase();
        this._WizardStep = "Confirmacion";
    }

    RegistrarUsuario () {
        this.RegistrarUsuarioIdSvr();
    }

    private RegistrarUsuarioIdSvr(){
        this._blockUI.start("Registrando Usuario");
        this._registroService.RegistroUsuario(this._datosRegistro.datosUsuario)
            .subscribe(
            data => {
                    this._registroService.RegistroDatosFiscales(this._datosRegistro.datosFacturacion, data)
                        .subscribe(
                            data => { 
                                //Show Popup
                                this.openModal();
                                //this._router.navigate(['/welcome']);
                            },
                            error => {},
                            () => {
                                this._blockUI.stop();
                            }
                        );
                
            }, error => {
                this._blockUI.stop();
            });
    }

    closedModal() {}

    dismissedModal() {
       this.modal.dismiss();
       this._router.navigate(["/welcome"]);
    }

    openedModal() {
        this.modalOutput = "(opened)";
    }

    openModal() {
        this.modal.open();
    }
}