import { Component, Output, EventEmitter } from "@angular/core";
import { IDatosUsuario } from "./../Interfaces/IDatosUsuario"
import { IMetodoAutenticacion } from "./../Interfaces/IMetodoAutenticacion"
import { GlobalService } from "./../../Global/Services/Global.services";
import { RegistroService } from "./../Services/Registro.service";

@Component({
    selector : "facturacion-registrousuario",
    templateUrl: "app/Registro/Views/RegistroUsuario.Component.html"
})
export class RegistroUsuarioComponent
{
    @Output() notificar : EventEmitter<IDatosUsuario> = new EventEmitter<IDatosUsuario>();
    celularMask : any[] = [/[1-9]/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
    contextUsuario : IDatosUsuario = { nombre : "", apellidoPaterno : "", apellidoMaterno : "", email : "", emailConfirmacion : "", celular : "", metodosAutenticacion : []};
    username: string;
    usernameConfirmacion: string;
    contrasena : string;
    contrasenaConfirmacion : string;
    celular: string;
    celularConfirmacion: string;
    nip: string;
    nipConfirmacion : string;
    ExisteUsuario : boolean = false;

    //Events
    constructor(private _globalService : GlobalService, private _registroService : RegistroService) {}

    SiguientePaso() {
        this.contextUsuario.metodosAutenticacion.push({metodo : "Email", username: this.username, password : this.contrasena});
        this.contextUsuario.email = this.username;
        if (this.celular !== undefined) {
            this.contextUsuario.metodosAutenticacion.push({metodo : "Celular", username: this.celular.split("-").join(""), password : this.nip});
            this.contextUsuario.celular = this.celular;
        }
        this.notificar.emit(this.contextUsuario);
    }

    //Validations
    ValidarUsuarioExistente () {
        this._registroService.VerificarUsuarioExistente(this.username)
            .subscribe( data => {
                if (data.toUpperCase() === "EXISTENTE") {
                    this.ExisteUsuario = true;
                } else {
                    this.ExisteUsuario = false;
                }
            });
    }

    CompareEmailFields() {
        var result : Boolean = false;
        if (this.username === this.usernameConfirmacion) {
            return true;
        }
        return result;
    }

    ComparePasswordFields() {
        var result : Boolean = false;
        if (this.contrasena === this.contrasenaConfirmacion) {
            return true;
        }
        return result;
    }

    CompareCelularFields(){
        var result : Boolean = false;
        if (this.celular === this.celularConfirmacion){
            return true;
        }
        return result;
    }

    CompareNipFields(){
        var result : Boolean = false;
        if (this.nip === this.nipConfirmacion){
            return true;
        }
        return result;
    }
}