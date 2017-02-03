import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { IDatoFiscal } from "./../Interfaces/IDatoFiscal";
import { IDomicilioFiscal } from "./../Interfaces/IDomicilioFiscal";
import { IDatosFacturacion } from "./../Interfaces/IDatosFacturacion";
import { EstadoService } from "./../../Global/Services/Estado.services";
import { IEstado } from "./../../Global/Interfaces/IEstado";
import { BlockUIService } from "./../../Common/BlockUI/Service/BlockUI.Service";

@Component({
    selector: "facturacion-registroreceptores",
    templateUrl : "App/Registro/Views/RegistroReceptores.Component.html",
    providers : [EstadoService]
})
export class RegistroReceptoresComponent implements OnInit
{
    contextDatosFiscales : IDatoFiscal = { RFC : "", razonSocial : "", alias : "" };
    contextDomicilioFiscal : IDomicilioFiscal = { calle : "", numeroExterior : "", numeroInterior : "", colonia : "", codigoPostal: "", estado : "", ciudad : "", localidad : "", pais: "México", telefono : "" };
    emailRecepcion: string = "";
    datosFacturacion : IDatosFacturacion;
    estados : IEstado[];
    stateError : string;
    @Output() notificar : EventEmitter<IDatosFacturacion> = new EventEmitter<IDatosFacturacion>();
    @Output() volverPasoAnteriorReceptores : EventEmitter<string> = new EventEmitter<string>();

    constructor(private _estadoService : EstadoService, private _blockUI : BlockUIService){}

    SiguientePaso() 
    {
        this.datosFacturacion = { datosFiscales : this.contextDatosFiscales, domicilioFiscal : this.contextDomicilioFiscal, emailsReceptor : this.emailRecepcion };
        this.notificar.emit(this.datosFacturacion);
    }

    PasoAnterior() {
        this.volverPasoAnteriorReceptores.emit("RegistroUsuario");
    }

    ValidarCorreosParaEnvio()
    {
        var result = true;
        //Validar caracteres especiales en string;
        if (this.emailRecepcion !== "") {
            if (!/^[a-zA-Z0-9 @;._]*$/.test(this.emailRecepcion)) {
                result = false;
            }
            var emails = this.emailRecepcion.split(";");
            for (var i = 0; i <= emails.length -1; i++  ){
                if (!/^.+@.+/.test(emails[i])){
                    result = false;
                }
            }
        }
        return result;
    }

    ngOnInit() {
        this._blockUI.start("Cargando Información");
        this._estadoService.Estados()
            .subscribe(
                data => {
                    this.estados = data;
                },
                error => { this.stateError === error },
                () => {
                    this._blockUI.stop();
                });
    }
}
