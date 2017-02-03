import { Component, Output, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { IUsuario } from "./../Interfaces/IUsuario";
import { IReceptor } from "./../Interfaces/Receptores/IReceptor";
import { IEstado } from "./../../Global/Interfaces/IEstado";
import { IDatoFiscal } from "./../Interfaces/Receptores/IDatoFiscal";
import { IDomicilioFiscal } from "./../Interfaces/Receptores/IDomicilioFiscal";
import { IDatosFacturacion } from "./../Interfaces/Receptores/IDatosFacturacion";
import { EstadoService } from "./../../Global/Services/Estado.services";
import { PerfilUsuarioService } from "./../Services/perfil.usuario.service";
import { BlockUIService } from "./../../Common/BlockUI/Service/BlockUI.Service";
import { ModalComponent } from "./../../Common/Modal/Components/modalmain.component";
import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
    selector : "facturacion-perfilfacturacion",
    templateUrl: "App/Perfil/Views/Perfil.receptores.component.html",
    encapsulation : ViewEncapsulation.None
})
export class PerfilFacturacionComponent implements OnInit {
    @ViewChild('ReceptoresModal') modal : ModalComponent;
    @Input() inpContextUsuario : IUsuario = { IdUsuario : "", Nombre : "", ApellidoPaterno : "", ApellidoMaterno : "", Email : "", Celular : ""};

    listadoReceptores : IReceptor[] = [];
    _SelectedIdCliente : string = "";
    contextDatosFiscales : IDatoFiscal = { RFC : "", razonSocial : "", alias : "" };
    contextDomicilioFiscal : IDomicilioFiscal = { calle : "", numeroExterior : "", numeroInterior : "", colonia : "", codigoPostal: "", estado : "", ciudad : "", localidad : "", pais: "México", telefono : "" };
    estados : IEstado[] = [];
    emailRecepcion: string = "";
    modalSize : string = "lg";
    modo: string =  "Actualizar"; //Agregar


    constructor(private _perfilService: PerfilUsuarioService, private _estadoService : EstadoService, private _blockUI : BlockUIService, private _toastr : ToastsManager){}

    //Angular Pipeline
    ngOnInit () {
        this.cargarReceptores();
        this.cargarEstados();
    }

    // private methods

    private GuardarCambios(){
        if (this.modo === "Actualizar"){
            this.ActualizarReceptor();
        } 
        if (this.modo === "Agregar"){
            this.AgregarReceptor();
        }
    }

    SolcitiarAgregarReceptor(IdCliente : string) {
        this.modo = "Agregar";
        this.openModal();
    }

    SolcitiarActualizarReceptor(IdCliente : string) {
        this.modo = "Actualizar";
        this._blockUI.start("Cargando Información")
        this._SelectedIdCliente = IdCliente;
        this.cargarDetalleReceptor(IdCliente);
    }

    private ActualizarReceptor() {
        this._blockUI.start("Actualizando información");
        this.contextDatosFiscales.RFC = this.contextDatosFiscales.RFC.toUpperCase();
        this._perfilService.ActualizarReceptor(this.inpContextUsuario.IdUsuario, this._SelectedIdCliente,
        {
            datosFiscales : this.contextDatosFiscales,
            emailsReceptor : this.emailRecepcion,
            domicilioFiscal : this.contextDomicilioFiscal
        }).subscribe (
            data => {
                this.cargarReceptores();
                this.LimpiarModelo();
                this._blockUI.stop();
                this.modal.close();
                this._toastr.success("Información actualizada con éxito");
            },
            error => {
                this._blockUI.stop();
            },
            () => {});
    }

    private AgregarReceptor() {
        this.contextDatosFiscales.RFC = this.contextDatosFiscales.RFC.toUpperCase();
         this._perfilService.AgregarReceptor(this.inpContextUsuario.IdUsuario, this._SelectedIdCliente, 
        {
            datosFiscales : this.contextDatosFiscales,
            emailsReceptor : this.emailRecepcion,
            domicilioFiscal : this.contextDomicilioFiscal
        }).subscribe (
            data => {
                this.cargarReceptores();
                this.LimpiarModelo();
                this._blockUI.stop()
                this.modal.close();
                this._toastr.success("Receptor Agregado con éxito");
            },
            error => {
                this._blockUI.stop();
            },
            () => {});
    }

    private cargarReceptores() {
        if (sessionStorage.getItem("UserId") != "") {
            this._perfilService.ObtenerReceptoresDeUsuario(sessionStorage.getItem("UserId"))
                .subscribe(data => {
                    this.listadoReceptores = data;
                });
        }
    }

    cargarDetalleReceptor(idReceptor : string) {
        this._perfilService.ObtenerDetalleReceptor(sessionStorage.getItem("UserId"), idReceptor)
            .subscribe(data => {
                //Datos Fiscal
                this.contextDatosFiscales.alias = data.Alias;
                this.contextDatosFiscales.razonSocial = data.RazonSocial;
                this.contextDatosFiscales.RFC = data.RFC;
                //Domicilio Fiscal
                this.contextDomicilioFiscal.calle = data.Calle;
                this.contextDomicilioFiscal.colonia = data.Colonia;
                this.contextDomicilioFiscal.ciudad = data.Ciudad;
                this.contextDomicilioFiscal.estado = data.IdEstado == null ? null : data.IdEstado.toString();
                this.contextDomicilioFiscal.localidad = data.Localidad;
                this.contextDomicilioFiscal.codigoPostal = data.CodigoPostal;
                this.contextDomicilioFiscal.numeroInterior = data.NumeroInterior;
                this.contextDomicilioFiscal.numeroExterior = data.NumeroExterior;
                this.contextDomicilioFiscal.pais = data.Pais;
                this.emailRecepcion = data.CorreoElectronico;
                this._blockUI.stop();
                this.openModal();
            },
            () => {
                this._blockUI.stop();
            });
    }

    cargarEstados() {
        //this._blockUI.start("Cargando información de cliente");
        this._estadoService.Estados()
            .subscribe(
                data => {
                    this.estados = data;
                },
                error => {},
                () => {});
    }

    //Validaciones
    ValidarCorreosParaEnvio() {
        let result = true;
        //Validar caracteres especiales en string;
        if (this.emailRecepcion != "") {
            if (!/^[a-zA-Z0-9 @;_.]*$/.test(this.emailRecepcion)) {
                result = false;
            }
            let emails = this.emailRecepcion.split(";");
            for (var i = 0; i <= emails.length - 1; i++  ) {
                if (!/^.+@.+/.test(emails[i])) {
                    result = false;
                }
            }
        }
        return result;
    }

    //Helpers
    LimpiarModelo(){
        this.contextDatosFiscales =  { RFC : "", razonSocial : "", alias : "" };
        this.contextDomicilioFiscal = { calle : "", numeroExterior : "", numeroInterior : "", colonia : "", codigoPostal: "", estado : "", ciudad : "", localidad : "", pais: "México", telefono : "" };
        this.emailRecepcion = "";
    }

    //Modal
   closedModal() {
        //this._router.navigate(['/welcome']);
    }

    dismissedModal() {
        this.LimpiarModelo();
    }

    openedModal() {
        //this.modalOutput = '(opened)';
    }

    openModal() {
        this.modal.open();
    }
}