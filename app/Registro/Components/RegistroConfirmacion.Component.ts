import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { IRegistroUsuario } from "./../Interfaces/IRegistroUsuario";

@Component({
    selector : "facturacion-registroconfirmacion",
    templateUrl : "app/Registro/Views/RegistroConfirmacion.Component.html"
})
export class RegistroConfirmacionComponent implements OnInit {
    @Output() notificarRegistro : EventEmitter<string>  = new EventEmitter<string>();
    @Output() volverPasoAnteriorConfirmacion : EventEmitter<string> = new EventEmitter<string>();
    @Input() DatosRegistro : IRegistroUsuario = {
        datosUsuario : { nombre : "", apellidoPaterno : "", apellidoMaterno : "", email : "", emailConfirmacion : "", celular : "", metodosAutenticacion : [{username : "", password : "", metodo : ""}, {username : "", password : "", metodo : ""}]},
        datosFacturacion : {
            datosFiscales : { RFC : "", razonSocial : "", alias : "" }, 
            domicilioFiscal : { calle : "", numeroExterior : "", numeroInterior : "", colonia : "", codigoPostal: "", estado : "", ciudad : "", localidad : "", pais: "México", telefono : "" }, 
            emailsReceptor : ""}
    };

    PasoAnterior() {
        this.volverPasoAnteriorConfirmacion.emit("RegistroReceptores");
    }

    RegistrarUsuario(registroUsuario : IRegistroUsuario) {
        this.notificarRegistro.emit("registrarUsuario");
    }

    ngOnInit(){
        this.DatosRegistro.datosUsuario.metodosAutenticacion = [{username : "", password : "", metodo : ""}, {username : "", password : "", metodo : ""}];
    }

}