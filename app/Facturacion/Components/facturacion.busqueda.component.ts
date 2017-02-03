import { Component, Output, EventEmitter, ViewChild, OnInit } from "@angular/core";
import { facturacionServices } from "./../Services/facturacion.services";
import { IParametrosBusqueda } from "./../Interfaces/IParametrosBusqueda";
import { ITransaccion } from "./../Interfaces/ITransaccion";
import { ITransaccionesEstacion } from "./../Interfaces/ITransaccionesEstacion";
import { IEstacion } from "./../Interfaces/IEstacion";
import { BlockUIService } from "./../../Common/BlockUI/Service/BlockUI.Service";
import { ModalComponent } from "./../../Common/Modal/Components/modalmain.component";
import { EmisorService } from "./../../Global/Services/Emisor.services";
import { MessageBus } from "./../../Common/Bus/MessageBus";
import { BusService } from "./../../Common/Bus/busService";
import { ISessionExpired } from "./../../Global/Messages/Session/ISessionExpiredMessage";
import { IServiceNotAvailable } from "./../../Global/Messages/Offline/IServiceNotAvailable";

@Component({
    selector : "facturacion-busquedacomponent",
    templateUrl: "App/Facturacion/Views/facturacion.busqueda.component.html"  
})
export class facturacionBusquedaComponent implements OnInit {
    @ViewChild("busquedaTransaccionModal") modal : ModalComponent;
    @Output() transaccionEncontrada : EventEmitter<ITransaccionesEstacion[]> = new EventEmitter<ITransaccionesEstacion[]>();

    agrupacionTransacciones : ITransaccionesEstacion[] = [];
    currentRetry : number = 0;
    estaciones : IEstacion[];
    mensajeServicio : string = "";
    parametrosBusqueda : IParametrosBusqueda = { NoEstacion : "", NoTicket : "", NoVerificador : ""};
    retries : number = 25;
    transaccion : ITransaccion = {
        IdTransaccion : "",
        NoTransaccionOriginal : "",
        Cantidad : 0,
        Precio : 0,
        IVA : 0,
        IEPS: 0,
        Total : 0,
        FechaCreacion : new Date() ,
        Productos : [],
        Estacion :
            {
                IdEstacion : "",
                Nombre : "",
                NoEstacion : "",
                RFCEmisor : ""
            }
    };

    constructor(private _facturacionService : facturacionServices, private _emisorService : EmisorService, private busService : BusService, private _blockUI : BlockUIService) {}

    //Angular Pipeline
    ngOnInit() {
        this.ObtenerDatosDeTransaccionesPendientes();
        this.ObtenerDatosDeEstaciones();
    }

    //Metodos
    private AlmacenarDatosEnAgrupaciones(transaccion : ITransaccion) {
        let agrupacion : ITransaccionesEstacion = { 
            IdGrupo : 0, 
            Estacion : {IdEstacion : "", NoEstacion : "", Nombre : "", RFCEmisor : "" },
            MetodoPago : { MetodoPago: 0, ClaveMetodoPago: "", Nombre : ""},
            MetodoPagoCuenta : "",
            Receptor: { IdCliente : "", Alias : "", RFC : "", RazonSocial : "", Contacto : "", Calle : "", NumeroExterior : "",
            NumeroInterior : "", Colonia : "", Localidad : "", Pais : "", CodigoPostal : "", CorreoElectronico : "",
            Ciudad : "", FechaCreacion : "", FechaModificacion : "", UsuarioModificacion : "", IdEstado : 0 },
            Transacciones : [],
            TotalEnTransacciones : 0 };
        let agrupacionExistente = this.agrupacionTransacciones.find(item => item.Estacion.IdEstacion === transaccion.Estacion.IdEstacion);

        if (agrupacionExistente === undefined || agrupacionExistente == null) {
            agrupacion.IdGrupo = Math.floor(Math.random() * 10000000) + 1;
            agrupacion.Estacion = transaccion.Estacion;
            agrupacion.Transacciones.push(transaccion);
            this.agrupacionTransacciones.push(agrupacion);
        } else {
            agrupacionExistente.Transacciones.push(transaccion);
        }
    }

    private AlmacenarListaDeDatosEnAgrupaciones(transacciones : ITransaccion[]) {
        let agrupacion : ITransaccionesEstacion[] = [];

        transacciones.forEach(item => {
            let nuevaAgrupacion : ITransaccionesEstacion = {
            IdGrupo : 0, 
            Estacion : {IdEstacion : "", NoEstacion : "", Nombre : "", RFCEmisor : "" },
            MetodoPago : { MetodoPago: 0, ClaveMetodoPago: "", Nombre : ""},
            MetodoPagoCuenta : "",
            Receptor: { IdCliente : "", Alias : "", RFC : "", RazonSocial : "", Contacto : "", Calle : "", NumeroExterior : "",
            NumeroInterior : "", Colonia : "", Localidad : "", Pais : "", CodigoPostal : "", CorreoElectronico : "",
            Ciudad : "", FechaCreacion : "", FechaModificacion : "", UsuarioModificacion : "", IdEstado : 0 },
            Transacciones : [],
            TotalEnTransacciones : 0 };
            let agrupacionExistente = agrupacion.find(element => element.Estacion.IdEstacion === item.Estacion.IdEstacion);

            if (agrupacionExistente !== undefined){
                agrupacionExistente.Transacciones.push(item);
            } else {
                nuevaAgrupacion.IdGrupo = Math.floor(Math.random() * 10000000) + 1;
                nuevaAgrupacion.Estacion = item.Estacion;
                nuevaAgrupacion.Transacciones.push(item);
                agrupacion.push(nuevaAgrupacion);
            }
        });
        this.agrupacionTransacciones = agrupacion;
    }

    private ObtenerDatosDeTransacciones() {
        if (this.agrupacionTransacciones.length === 0 || !this.VerificarTransaccionAgregada(this.parametrosBusqueda.NoTicket))
        {
            this._blockUI.stop();
            this._blockUI.start("Buscando Transaccion");
            this._facturacionService.BuscarDetalleTransaccion(this.parametrosBusqueda)
            .subscribe(data => {
                if (data != null)
                {
                    this.currentRetry = 0;
                    this.AlmacenarDatosEnAgrupaciones(data);
                    this.parametrosBusqueda = { NoEstacion : "", NoTicket : "", NoVerificador : ""};
                    this.transaccionEncontrada.emit(this.agrupacionTransacciones);
                    this._blockUI.stop();
                } else { //Si los datos no existen
                    //Buscar en Bitacora por errores
                        this._facturacionService.BuscarMensajesEnBitacora(this.parametrosBusqueda)
                        .subscribe(data => {
                            if (data.length > 0) {
                                //Mostrar mensaje de bitacora
                                this._blockUI.stop();
                                this.mensajeServicio = data[0].Mensaje;
                                this.modal.open();
                                this.currentRetry = 0;
                            } else {
                                //No hay errores, reintentar busqueda
                                if (this.currentRetry <= this.retries) {
                                    this.currentRetry += 1;
                                    this.ObtenerDatosDeTransacciones();
                                } else {
                                    //Se han agotado los reintentos enviar mensaje de intentar de nuevo
                                    this._blockUI.stop();
                                    this.currentRetry = 0;
                                    this.mensajeServicio = "No hemos encontrado información de su transacción, favor de intentar de nuevo en un momento.";
                                    this.modal.open();
                                }
                            }
                            }, error => this.HandleError)
                }
            }, error => this.HandleError);
        } else {
            this.mensajeServicio = "Ya existe la transacción en tu bandeja";
            this.modal.open();
        }
    }

    private ObtenerDatosDeEstaciones(){
        this._emisorService.ObtenerEstaciones()
            .subscribe(data => {
                this.estaciones = data;
                this.parametrosBusqueda.NoEstacion = data[0].NoEstacion;
            }, error => this.HandleError)
    }

    private ObtenerDatosDeTransaccionesPendientes() {
        this._facturacionService.BuscarTransaccionesPendientes()
        .subscribe(data => {
            if (data.length > 0) {
                this.AlmacenarListaDeDatosEnAgrupaciones(data);
                this.transaccionEncontrada.emit(this.agrupacionTransacciones);
            }
        }, error => this.HandleError);

    }

    private SolicitarLocalizacionDeTransaccion() {
        //Solicitar busqueda
        this.parametrosBusqueda.NoTicket = this.parametrosBusqueda.NoTicket.replace(/^0+/, "");
        this._facturacionService.SolicitarBusquedaTransaccion(this.parametrosBusqueda)
            .subscribe(data => {
                this.ObtenerDatosDeTransacciones();
            }, error => this.HandleError );
    }

    //Modal Popup
    closedModal() {}

    dismissedModal() {
       this.modal.dismiss();
    }

    openedModal() {}

    openModal() {
        this.modal.open();
    }

    //Helpers
    HandleError(error : any) {
        if (error.indexOf("Expirada") > -1) {
            this.modal.close();
            this.busService.channel.publish(MessageBus.Message<ISessionExpired>("ISessionExpired"), (item : ISessionExpired) => { item.body = "Expirada"; });
        } 
        if (error.indexOf("No disponible") > -1) {
            this.modal.close();
            this.busService.channel.publish(MessageBus.Message<IServiceNotAvailable>("IServiceNotAvailable"), (item : ISessionExpired) => { item.body = "Servicio no disponible"; });
        } 
        else {
            this.mensajeServicio = error;
            this.modal.open();
        }
    }

    LimpiarPantalla() {
        this.parametrosBusqueda = { NoEstacion : "", NoTicket : "", NoVerificador : ""};
        this.agrupacionTransacciones = [];
        this.transaccion = {
        IdTransaccion : "",
        NoTransaccionOriginal : "",
        Cantidad : 0,
        Precio : 0,
        IVA : 0,
        IEPS: 0,
        Total : 0,
        FechaCreacion : new Date() ,
        Productos : [],
        Estacion :
            {
                IdEstacion : "",
                Nombre : "",
                NoEstacion : "",
                RFCEmisor : ""
            }
        };
    }

    VerificarTransaccionAgregada(noTicket : any) : boolean {
        let existeTransaccion = false;
        this.agrupacionTransacciones.forEach(item => {
            if (item.Transacciones.find( tran => tran.NoTransaccionOriginal.toString() === noTicket.toString()) !== undefined) {
                existeTransaccion = true;
            }
        });
        return existeTransaccion;
    }
}