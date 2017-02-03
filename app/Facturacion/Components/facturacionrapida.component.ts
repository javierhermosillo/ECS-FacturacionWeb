import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { IEstacion } from "./../../Global/Interfaces/IEstacion";
import { IMetodoPago } from "./../../Global/Interfaces/IMetodoPago";
import { EmisorService } from "./../../Global/Services/Emisor.services";
import { facturacionServices } from "./../../Facturacion/Services/facturacion.services";
import { MetodoPagoService } from "./../../Global/Services/MetodoPago.services";
import { GlobalService } from "./../../Global/Services/Global.services";
import { ModalComponent } from "./../../Common/Modal/Components/modalmain.component";
import { BlockUIService } from "./../../Common/BlockUI/Service/BlockUI.Service";

@Component({
    templateUrl: "App/Facturacion/Views/FacturacionRapida.component.html",
    providers : [EmisorService, facturacionServices, MetodoPagoService]
})
export class FacturacionRapidaComponent implements OnInit {
    estaciones : IEstacion[] = [];
    modalMessage : string = "";
    estacion : IEstacion = null;
    ticket : number = null;
    noVerificador : string = "";
    emailUsuario : string = "";
    metodosPago : IMetodoPago[] = [];
    metodoPago : IMetodoPago = null;
    metodoPagoCuenta: number = null;
    rfcReceptor : string = "";
    serieFactura : string = "";
    folioFactura : string = "";
    @ViewChild("facturacionRapidaModal") facturacionRapidaModal : ModalComponent;
    @ViewChild("facturacionRapidaErrorModal") facturacionRapidaErrorModal : ModalComponent;
    @ViewChild("ModalMensaje") ModalMensaje: ModalComponent;
    constructor(private emisorService : EmisorService, private blockUI : BlockUIService, private facturacionService : facturacionServices, private metodoPagoService : MetodoPagoService, private globalService: GlobalService, private router: Router) {}

     private EsCuentaMetodoPagoRequerido() {
        if (this.metodoPago !== null ) {
            if (this.metodoPago.ClaveMetodoPago !== ""){
                if (this.metodoPago.Nombre.toUpperCase() == "EFECTIVO" || this.metodoPago.Nombre.toUpperCase() == "DINERO ELECTRÓNICO"  || this.metodoPago.Nombre.toUpperCase() == "VALES DE DESPENSA" || this.metodoPago.Nombre.toUpperCase() == "OTROS" || this.metodoPago.Nombre.toUpperCase() == "NA") {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

     DescargarPDF() {
        window.open(this.globalService.ApiUrl() + "/facturacionRapida/PDF?Serie=" + this.serieFactura + "&folio=" + this.folioFactura + "&rfcEmisor=" + this.estacion.RFCEmisor, "_blank");
    }

    DescargarXML() {
        this.facturacionService.DescargarFacturaRapidaXML(this.serieFactura, this.folioFactura, this.estacion.RFCEmisor)
            .subscribe(data => {
                this.downloadFile(data._body, "Factura-" + this.serieFactura + "-" + this.folioFactura.toString() + ".xml", "application/xml");
            },
            error => {});
    }

    dismissedModal() {
        this.router.navigate(["/welcome"]);
    }

    private dismissedErrorModal() {
        this.facturacionRapidaErrorModal.close();
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

    Facturar() {
        this.blockUI.start("Solicitando Factura");

        this.ticket = +this.ticket.toString().replace(/^0+/, "");
        this.facturacionService.SolicitarFacturacionRapida({NoEstacion: this.estacion.NoEstacion, NoTicket : this.ticket, noVerificador : this.noVerificador, RFCEmisor : this.estacion.RFCEmisor, EmailReceptor : this.emailUsuario, MetodoPago : this.metodoPago.ClaveMetodoPago, MetodoPagoCuenta : this.metodoPagoCuenta, MetodoPagoDescripcion : this.metodoPago.Nombre, RFCReceptor : this.rfcReceptor.toUpperCase() })
            .subscribe(data => {
                this.blockUI.stop();
                //Mensaje esperado
                if (data.Serie === undefined){
                    this.modalMessage = data;
                    this.facturacionRapidaErrorModal.open();
                    return;
                }
                this.serieFactura = data.Serie;
                this.folioFactura = data.Folio;
                this.facturacionRapidaModal.open();
             }, error => {
                 this.blockUI.stop();
                 this.modalMessage = "Registro no encontrado";
                 this.facturacionRapidaErrorModal.open();
             });
    }

    private ObtenerDatosDeEstaciones() {
        this.emisorService.ObtenerEstaciones()
            .subscribe(data => {
                this.estaciones = data;
                this.estacion = data[0];
            }, error => {
                this.modalMessage = error;
            });
    }

    private ObtenerMetodosDePago(){
        this.metodoPagoService.ObtenerMetodosDePago()
            .subscribe(data => {
                this.metodosPago = data;
                this.metodoPago = data[0];
            }, error => {
                this.modalMessage = error;
            });
    }

    private volverHome(){
        this.router.navigate(["/welcome"]);
    }

    // private LimpiarPantalla() {
    //     this.estacion = null;
    //     this.ticket = null;
    //     this.noVerificador = "";
    //     this.emailUsuario = "";
    //     this.metodosPago = [];
    //     this.metodoPago = null;
    //     this.metodoPagoCuenta = null;
    //     this.rfcReceptor = "";
    //     this.serieFactura = "";
    //     this.folioFactura = "";
    // }

    ngOnInit() {
        this.ObtenerDatosDeEstaciones();
        this.ObtenerMetodosDePago();
        this.ModalMensaje.open();
    }

//Micodigo De Modal
    MensajeModalCerrar(): void {
        this.ModalMensaje.close();
    }
}