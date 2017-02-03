import { Component, ViewChild, OnInit, Output, EventEmitter } from "@angular/core";
import { ITransaccion } from "./../Interfaces/ITransaccion";
import { IFactura } from "./../Interfaces/IFactura";
import { IFacturaPartida } from "./../Interfaces/IFacturaPartida";
import { ITransaccionesEstacion } from "./../Interfaces/ITransaccionesEstacion";
import { IUsuario } from "./../Interfaces/IUsuario";
import { IReceptor } from "./../Interfaces/IReceptor";
import { IMetodoPago } from "./../../Global/Interfaces/IMetodoPago";
import { PerfilUsuarioService } from "./../../Perfil/Services/perfil.usuario.service";
import { facturacionServices } from "./../Services/facturacion.services";
import { BlockUIService } from "./../../Common/BlockUI/Service/BlockUI.Service";
import { ModalComponent } from "./../../Common/Modal/Components/modalmain.component";
import { GlobalService } from "./../../Global/Services/Global.services";
import { MessageBus } from "./../../Common/Bus/MessageBus";
import { BusService } from "./../../Common/Bus/busService";
import { ISessionExpired } from "./../../Global/Messages/Session/ISessionExpiredMessage";
import { IServiceNotAvailable } from "./../../Global/Messages/Offline/IServiceNotAvailable";
import { IErrorMessage } from "./../../Global/Messages/Error/IErrorMessage";
import myGlobalConfig = require("./../../global.config");
import * as _ from "lodash";
import "rxjs/Rx";

@Component({
    selector : "facturacion-prefacturacomponent",
    templateUrl : "App/Facturacion/Views/facturacion.preFactura.component.html"
})
export class FacturacionPreFacturaComponent implements OnInit {
  
    @ViewChild("preFacturaModal") modal : ModalComponent;
    @Output() facturacionCompletada : EventEmitter<string> = new EventEmitter<string>();
    contextUsuario : IUsuario;
    facturacionCompleta : boolean = false;
    idGrupoTransacciones : number;
    partidas : IFacturaPartida[] = [];
    transaccionesOriginales : ITransaccion[] = [];
    partidasSubtotal: number = 0;
    partidasIVA: number = 0;
    partidasIEPS: number = 0;
    partidasTotal: number = 0;
    metodoPago : IMetodoPago;
    metodoPagoCuenta : string = "";
    receptor : IReceptor = {
        IdCliente : "", Alias : "", RFC : "", RazonSocial : "", Contacto : "", Calle : "", NumeroExterior : "",
        NumeroInterior : "", Colonia : "", Localidad : "", Pais : "", CodigoPostal : "", CorreoElectronico : "",
        Ciudad : "", FechaCreacion : "", FechaModificacion : "", UsuarioModificacion : "", IdEstado : 0 };
    serieFactura : string = "";
    folioFactura: string = "";

    constructor(private usuarioService : PerfilUsuarioService, private facturacionService : facturacionServices, private blockUI : BlockUIService, private globalService : GlobalService, private busService : BusService) {}

    AcomodarTransaccionesEnPartidas(transacciones : ITransaccion[]) {
         let productos : [string, number][] = [];
         this.limpiarForma();
         //Obtener todos los productos y sus precios en las transacciones
         transacciones.forEach(tran => {
             if (productos.find(prod => prod[0] === tran.Productos[0].Nombre && prod[1] === tran.Precio) === undefined) {
                 productos.push([tran.Productos[0].Nombre, tran.Precio]);
             }
         });

         productos.forEach( prod => {
             let items = transacciones.filter(tran => tran.Productos[0].Nombre === prod[0] && tran.Precio === prod[1]);
             let partida : IFacturaPartida = { Producto : "", Precio : 0, Cantidad : 0, IVA : 0, IEPS: 0, Total : 0};
             if (items !== undefined) {
                 partida.Producto = prod[0];
                 items.forEach(item => {
                     partida.Cantidad += item.Cantidad;
                     partida.IEPS += item.IEPS;
                     partida.IVA += item.IVA;
                 });
                 partida.Total += +((partida.Cantidad * prod[1]) - partida.IVA).toFixed(6);
                 partida.Precio = (partida.Total - partida.IVA) / partida.Cantidad;
                 this.partidasTotal += partida.Total + partida.IVA;
                 this.partidasIVA += partida.IVA;
                 this.partidasIEPS += partida.IEPS;
                 this.partidas.push(partida);
            }
         });

         this.partidasSubtotal = (this.partidasTotal - this.partidasIVA);
         this.modal.open();
    }

    CorreoConfirmado() {
        let result = true;
        if (sessionStorage.getItem("CorreoConfirmado") != null ) {
            result = false;
        }
        return result;
    }
    // CargarPreFacturacion(transacciones : ITransaccion[], receptor: IReceptor, metodoPago : IMetodoPago, metodoPagoCuenta : string) {
    //     this.transaccionesOriginales = transacciones;
    //     this.AcomodarTransaccionesEnPartidas(transacciones);
    //     this.receptor = receptor;
    //     this.metodoPago = metodoPago;
    //     this.metodoPagoCuenta = metodoPagoCuenta;
    // }

    CargarPreFacturacion(agrupacionTransacciones : ITransaccionesEstacion) {
        this.transaccionesOriginales = agrupacionTransacciones.Transacciones;
        this.AcomodarTransaccionesEnPartidas(agrupacionTransacciones.Transacciones);
        this.receptor = agrupacionTransacciones.Receptor;
        this.metodoPago = agrupacionTransacciones.MetodoPago;
        this.metodoPagoCuenta = agrupacionTransacciones.MetodoPagoCuenta === undefined ? "" : agrupacionTransacciones.MetodoPagoCuenta.toString();
        this.idGrupoTransacciones = agrupacionTransacciones.IdGrupo;
    }

    DescargarPDF() {
        // this.facturacionService.DescargarFacturaPDF(this.serieFactura, this.folioFactura, this.transaccionesOriginales[0].Estacion.RFCEmisor)
        //     .subscribe(data => {
        //         let byteArray = new Uint8Array(data);
        //          window['saveAs'](new Blob([byteArray], { type : "application/pdf" }), "test.pdf");
        //         this.downloadFile(data._body, "Factura-" + this.serieFactura + "-" + this.folioFactura.toString() + ".pdf", "text/pdf");
        //     }, 
        //     error => {});
        window.open(this.globalService.ApiUrl() + "/facturacion/PDF?Serie=" + this.serieFactura + "&folio=" + this.folioFactura + "&rfcEmisor=" + this.transaccionesOriginales[0].Estacion.RFCEmisor, "_blank");
    }

    DescargarXML() {
        this.facturacionService.DescargarFacturaXML(this.serieFactura, this.folioFactura, this.transaccionesOriginales[0].Estacion.RFCEmisor)
            .subscribe(data => {
                this.downloadFile(data._body, "Factura-" + this.serieFactura + "-" + this.folioFactura.toString() + ".xml", "application/xml");
            }, 
            error => this.HandleError);
    }

    limpiarForma() {
        this.partidas = [];
        this.partidasSubtotal = 0;
        this.partidasIVA = 0;
        this.partidasIEPS = 0;
        this.partidasTotal = 0;
    }

    private downloadFile (data : any, fileName: string, contentType : string) {
         let a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";
        let blob = new Blob([data], {type: contentType}),
        url = window.URL.createObjectURL(blob);
        a.href = url;
        a.setAttribute("download", fileName);
        a.click();
        window.URL.revokeObjectURL(url);
    }

    SolicitarFacturacion() {
        //Llamar Servicio para facturar.
        this.blockUI.start("Solicitando Factura");
        let solicitudComprobante : any = {};
        solicitudComprobante.Transacciones = [];
        //Transacciones
        this.transaccionesOriginales.forEach(tran => {
            solicitudComprobante.Transacciones.push(tran.IdTransaccion);
        });
        
        //receptor
        solicitudComprobante.IdReceptor = this.receptor.IdCliente;
        solicitudComprobante.MetodosPago = this.metodoPago.ClaveMetodoPago;
        solicitudComprobante.MetodosPagoDescripcion = this.metodoPago.Nombre;
        solicitudComprobante.MetodosPagoCuentas = this.metodoPagoCuenta;
        solicitudComprobante.NoEstacion = this.transaccionesOriginales[0].Estacion.NoEstacion;
        solicitudComprobante.RFCEmisor = this.transaccionesOriginales[0].Estacion.RFCEmisor;
        this.facturacionService.SolicitarFacturacion(solicitudComprobante)
            .subscribe(data => {
                this.folioFactura = data.Folio;
                this.serieFactura = data.Serie;
                this.facturacionService.BuscarComprobante(data.Folio, data.Serie, this.transaccionesOriginales[0].Estacion.RFCEmisor, this.receptor.IdCliente)
                    .subscribe(data => {
                        if (data === "Comprobante generado con éxito") {
                            this.blockUI.changeMessage("Listo!");
                            this.blockUI.stop();
                            this.facturacionCompleta = true;
                       
                        }
                        if (data === "El comprobante no ha sido generado o hubo un error en su procesamiento") {
                            this.blockUI.changeMessage("Listo!");
                            this.blockUI.stop();
                            this.facturacionCompleta = false;
                            this.HandleError("FATAL");
                        }
                    },
                    error => this.HandleError);
            },
            error => {
                this.blockUI.changeMessage("Error!");
                this.blockUI.stop();
                this.HandleError(error);
            });
    }

    ngOnInit() {
        this.usuarioService.ObtenerPerfilUsuario()
            .subscribe(data => {
                this.contextUsuario = data;
            });
    }

    modalOnDismiss() {
         if (this.facturacionCompleta == true) {
             this.contextUsuario = null;
            this.facturacionCompleta = false;
            this.partidas = [];
            this.transaccionesOriginales = [];
            this.partidasSubtotal = 0;
            this.partidasIEPS = 0;
            this.partidasIVA = 0;
            this.partidasTotal = 0;
            this.metodoPago = null;
            this.receptor = {
            IdCliente : "", Alias : "", RFC : "", RazonSocial : "", Contacto : "", Calle : "", NumeroExterior : "",
            NumeroInterior : "", Colonia : "", Localidad : "", Pais : "", CodigoPostal : "", CorreoElectronico : "",
            Ciudad : "", FechaCreacion : "", FechaModificacion : "", UsuarioModificacion : "", IdEstado : 0 };
            this.serieFactura = "";
            this.folioFactura = "";
            this.facturacionCompletada.emit(this.idGrupoTransacciones.toString());
         }
    }

    HandleError(error : any) {
        if (error.toUpperCase().indexOf("EXPIRADA") > -1) {
            this.modal.close();
            this.busService.channel.publish(MessageBus.Message<ISessionExpired>("ISessionExpired"), (item : ISessionExpired) => { item.body = "Expirada"; });
        }
        if (error.toUpperCase().indexOf("NO DISPONIBLE") > -1) {
            this.modal.close();
            this.busService.channel.publish(MessageBus.Message<IServiceNotAvailable>("IServiceNotAvailable"), (item : ISessionExpired) => { item.body = "Servicio no disponible"; });
        }
        if (error.toUpperCase().indexOf("FATAL") > -1 ){
            this.modal.close();
            this.busService.channel.publish(MessageBus.Message<IErrorMessage>("IErrorMessage"), (item : ISessionExpired) => { item.body = "Ha ocurrido un error, favor de intentar de nuevo"; });
        }
        else {
            // this.mensajeServicio = error;
            // this.modal.open();
        }
    }
}