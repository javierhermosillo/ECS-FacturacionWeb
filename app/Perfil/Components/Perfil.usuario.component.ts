import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { IUsuario } from "./../Interfaces/IUsuario";
import { IDatosActualizacionUsuario } from "./../Interfaces/IDatosActualizacionUsuario";
import { PerfilUsuarioService } from "./../Services/perfil.usuario.service";
import { BlockUIService } from "./../../Common/BlockUI/Service/BlockUI.Service";
import { RegistroService } from "./../../Registro/Services/Registro.service"; 
import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
    selector : "facturacion-perfilusuario",
    templateUrl : "App/Perfil/Views/Perfil.usuario.component.html",
    styles : ["./../Styles/Perfil.component.css"],
    providers : [RegistroService]
})
export class PerfilUsuarioComponent implements OnInit {
    contextUsuario : IUsuario = { IdUsuario: "", Nombre : "", ApellidoPaterno : "", ApellidoMaterno : "", Email : "", Celular : ""};
    @Output() usuarioLoadedEvent : EventEmitter<IUsuario> = new EventEmitter<IUsuario>(); 
    contextActualizacionUsuario : IDatosActualizacionUsuario = { nombre : "", apellidoPaterno : "", apellidoMaterno : "", email : "", emailConfirmacion : "", celular : "", metodosAutenticacion : []}; 
    username: string;
    usernameConfirmacion: string;
    contrasena : string;
    contrasenaConfirmacion : string;
    celular: string;
    celularConfirmacion: string;
    nip: string;
    nipConfirmacion : string;
    celularMask : any[] = [/[1-9]/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
    ExisteUsuario : boolean = false;

    constructor(private _perfilUsuarioService : PerfilUsuarioService, private _blockUI : BlockUIService, private _registroService : RegistroService, private _toastr : ToastsManager) {}

    //Angular pipeline
    ngOnInit(){
        this._perfilUsuarioService.ObtenerPerfilUsuario()
            this._blockUI.start("Cargando información de usuario");
            this._perfilUsuarioService.ObtenerPerfilUsuario()
                .subscribe (
                data => {
                    this.contextUsuario = data;
                    this.username = this.contextUsuario.Email;
                    this.usernameConfirmacion = this.contextUsuario.Email;
                    this.celular = this.contextUsuario.Celular;
                    this.celularConfirmacion = this.contextUsuario.Celular;
                    this.usuarioLoadedEvent.emit(this.contextUsuario);
                },
                error => {},
                () => {
                    this._blockUI.stop();
                }
            );
    }

    //Methods

    ActualizarUsuario(usuario : IDatosActualizacionUsuario) {
        this.contextActualizacionUsuario.nombre = this.contextUsuario.Nombre;
        this.contextActualizacionUsuario.apellidoPaterno = this.contextUsuario.ApellidoPaterno;
        this.contextActualizacionUsuario.apellidoMaterno = this.contextUsuario.ApellidoMaterno;
        this.contextActualizacionUsuario.metodosAutenticacion.push({metodo : "Email", username: this.username, password : this.contrasena});
        this.contextActualizacionUsuario.email = this.username;
        if (this.celular !== undefined)
        {
            this.contextActualizacionUsuario.metodosAutenticacion.push({metodo : "Celular", username: this.celular.split("-").join(""), password : this.nip});
            this.contextActualizacionUsuario.celular = this.celular;
        }
        this._perfilUsuarioService.ActualizarPerfilUsuario(this.contextActualizacionUsuario)
                .subscribe(
                    data => {
                        this._toastr.info("Perfil actualizado con éxito");
                        this.contextActualizacionUsuario.metodosAutenticacion = [];
                    },
                    error => { console.log(error); },
                    () => {}
                );
    }

    //Validations
    ValidarUsuarioExistente () {
        if (this.username !== this.contextUsuario.Email) {
        this._registroService.VerificarUsuarioExistente(this.username)
                .subscribe( data => {
                    if (data.toUpperCase() === "EXISTENTE") {
                        this.ExisteUsuario = true;
                    } else {
                        this.ExisteUsuario = false;
                    }
                }, error => {});
        }
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