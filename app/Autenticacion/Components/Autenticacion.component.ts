import { Component , ViewChild, ViewEncapsulation, OnInit } from "@angular/core";
import { IUsuario } from "../../Autenticacion/Interfaces/IUsuario";
import { Router } from "@angular/router";
import { AutenticacionService } from "./../Services/Autenticacion.service";
import { BlockUIService } from "./../../Common/BlockUI/Service/BlockUI.Service";

@Component({
    selector: "facturacion-autenticacion",
    templateUrl: "app/Autenticacion/Views/Autenticacion.component.html",
    styleUrls : ["app/Autenticacion/Styles/Autenticacion.component.css"],
    providers : [AutenticacionService],
    encapsulation: ViewEncapsulation.None
})

export class AutenticacionComponent implements OnInit
{
    tituloPanel : string = "Autenticación";
    contextUsuario: IUsuario = {username : "", password : ""};
    _router: any;
    errorMessage : string;

    constructor(private router: Router, private _autenticacionService : AutenticacionService, private _blockUI: BlockUIService)
    {
        this._router = router;
    }

    //Metodos
    Autenticar() : void {
        this._blockUI.start("Autenticando Usuario");
        this._autenticacionService.Autenticar(this.contextUsuario)
                .subscribe(
                    data => {
                        sessionStorage.setItem("AuthToken", data.AccessToken);
                        //localStorage.setItem("AuthToken", data.AccessToken);
                        this._autenticacionService.ObtenerPerfilUsuario()
                            .subscribe( perfil => {
                                sessionStorage.setItem("UserId", perfil.IdUsuario);
                                sessionStorage.setItem("UserEmail", perfil.Email);
                                if (perfil.CorreoConfirmado === false ) {
                                    sessionStorage.setItem("CorreoConfirmado", "false");
                                }
                                this._router.navigate(["/home"]);
                                this._blockUI.stop();
                            })
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this._blockUI.stop();
                    },
                    () => {});
    }

    //Eventos
    onUsuarioChanged() {
        this.errorMessage = null;
    }

    onPasswordChanged() {
        this.errorMessage = null;
    }

    ngOnInit() {
        
    }
}
