import { Component, OnInit } from "@angular/core";
import { BlockUIService } from "./../../Common/BlockUI/Service/BlockUI.Service";
import { facturacionServices } from "./../Services/facturacion.services";
import { GlobalService } from "./../../Global/Services/Global.services";
// import { LocalDataSource  } from "./../../Common/SmartTable/ng2-smart-table/lib/index";

@Component({
    selector : "facturacion-facturacionhistorialcomponent",
    templateUrl : "app/facturacion/views/facturacion.historial.component.html",
    providers : [facturacionServices]
})
export class FacturacionHistorialComponent implements OnInit {
    // historialSource : LocalDataSource = new LocalDataSource();
    historial : any[] = [];
    contextHistorial : any[];
    // tableSettings = {
    //     actions : {
    //          add: false,
    //          edit: false,
    //          delete: false
    //     },
    //     columns: {
    //         Fecha: {
    //             title: "Fecha"
    //         },
    //         Serie: {
    //             title: "Serie"
    //         },
    //         Folio: {
    //             title: "Folio"
    //         },
    //         RFC: {
    //             title: "RFC"
    //         },
    //         Cliente: {
    //             title: "Cliente"
    //         },
    //         Total: {
    //             title: "Total"
    //         },
    //         Descargas : {
    //             title: "Descargas",
    //             valuePrepareFunction : (value) => { return "<a>XML</a>&nbsp;<a>PDF</a>"}
    //         }
    //     },
    //     pager : {
    //         perPage : 10
    //     },
    //     hideSubHeader : true,
    //     noDataMessage : "No hay datos de facturas disponibles",
    // };

    constructor(private blockUiService : BlockUIService, private facturacionService : facturacionServices, private globalService : GlobalService) {
    }


    cargarHistorialDeFacturacion() {
        this.blockUiService.start("Cargando información");
        this.facturacionService.ObtenerHistorialDeFacturacion()
            .subscribe(data =>
            {
                data.forEach(item => {
                    this.historial.push({Fecha : item.Fecha, Serie : item.Serie, Folio : item.Folio, RFC : item.RFC, Cliente : item.Cliente, Total : item.Total, Descargas : item.Serie, RFCEmisor : item.RFCEmisor });
                });
                this.contextHistorial = this.historial;
                this.blockUiService.stop();
                // this.historialSource.load(this.historial);
            },
            error => {
                console.log(error);
            });
    }

    descargarPDF(serieFactura : string, folioFactura : string, rfcEmisor : string) {
        window.open(this.globalService.ApiUrl() + "/facturacion/PDF?Serie=" + serieFactura + "&folio=" + folioFactura + "&rfcEmisor=" + rfcEmisor, "_blank");
    }

    descargarXML(serieFactura : string, folioFactura : string, rfcEmisor : string) {
          this.facturacionService.DescargarFacturaXML(serieFactura, folioFactura, rfcEmisor)
            .subscribe(data => {
                this.downloadFile(data._body, "Factura-" + serieFactura + "-" + folioFactura.toString() + ".xml", "application/xml");
            }, 
            error => this.HandleError);
     }

    // filtrarResultados(query : string) {
    //      this.historialSource.setFilter([
    //         {
    //             field: "Fecha",
    //             search: query
    //         },
    //         {
    //             field: "Serie",
    //             search: query
    //         },
    //         {
    //             field: "Folio",
    //             search: query
    //         },
    //         {
    //             field: "RFC",
    //             search: query
    //         },
    //         {
    //             field: "Cliente",
    //             search: query
    //         },
    //         {
    //             field: "Total",
    //             search: query
    //         }
    //     ], false);
    // }

    filtrarResultados(query : string) {
        if (query == "") {
            this.contextHistorial = this.historial;
        } else {
            this.contextHistorial = this.historial.filter(
            item => item.Fecha.toString().toUpperCase().indexOf(query.toUpperCase()) >= 0
            || (item.Fecha).toString().toUpperCase().indexOf(query.toUpperCase()) >= 0
            || (item.Serie).toString().toUpperCase().indexOf(query.toUpperCase()) >= 0
            || (item.Folio).toString().toUpperCase().indexOf(query.toUpperCase()) >= 0
            || (item.RFC).toString().toUpperCase().indexOf(query.toUpperCase()) >= 0
            || (item.Cliente).toString().toUpperCase().indexOf(query.toUpperCase()) >= 0
            || (item.Total).toString().toUpperCase().indexOf(query.toUpperCase()) >= 0);
        }
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

    HandleError(error : any) {
        if (error.message.indexOf("Expirada") > -1)
        {
            //this.busService.channel.publish(MessageBus.Message<ISessionExpired>("ISessionExpired"), (item : ISessionExpired) => { item.body = "Expirada"; });
        };
    }

    //Angular Pipeline
    ngOnInit(){
        this.cargarHistorialDeFacturacion();
    }
}