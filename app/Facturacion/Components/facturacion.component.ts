import { Component , ViewChild, AfterViewInit} from "@angular/core";
// import { facturacionBusquedaComponent } from "./../Components/facturacion.busqueda.component";
// import { FacturacionTransaccionComponent } from "./../Components/facturacion.transacciones.component";
// import { FacturacionPreFacturaComponent } from "./../Components/facturacion.preFactura.component";
import { ITransaccion } from "./../Interfaces/ITransaccion";
import { facturacionServices } from "./../Services/facturacion.services";
import { EmisorService } from "./../../Global/Services/Emisor.services";
import { MetodoPagoService } from "./../../Global/Services/MetodoPago.services";
import { AutenticacionService } from "./../../Autenticacion/Services/Autenticacion.service";
import { PerfilUsuarioService } from "./../../Perfil/Services/perfil.usuario.service";
import { ModalComponent } from "./../../Common/Modal/Components/modalmain.component";

@Component({
    selector: "facturacion-principal",
    templateUrl: "App/Facturacion/Views/Facturacion.component.html",
    //directives: [facturacionBusquedaComponent, FacturacionTransaccionComponent, FacturacionPreFacturaComponent],
    providers : [facturacionServices, MetodoPagoService, EmisorService, PerfilUsuarioService, AutenticacionService]
})
export class FacturacionComponent
{
    transaccion : ITransaccion = { IdTransaccion : "", NoTransaccionOriginal : "", Cantidad : 0, Precio : 0, IVA : 0, IEPS : 0, Total : 0, FechaCreacion : new Date(), Productos : [], Estacion : { IdEstacion : "", Nombre : "", NoEstacion : "", RFCEmisor: ""}};
    transaccionesPreFactura : ITransaccion[] = [];
    @ViewChild("facturacionGeneralModal") facturacionGeneralModal : ModalComponent;

    constructor(private autenticacionService : AutenticacionService) {
    }

    dismissedGeneralModal() {
        this.facturacionGeneralModal.close();
    }

    RegistrarTransaccionEncontrada(transaccion : ITransaccion) {
        this.transaccion = transaccion;
    }

    RegistrarTransaccionesPreFactura(transacciones : ITransaccion[]) {
        this.transaccionesPreFactura = transacciones;
    }

    validarCorreoConfirmado() : Boolean {
        let result = true;
        if (sessionStorage.getItem("CorreoConfirmado") != null ) {
            result = false;
        }
        return result;
    }

    reenviarCorreoConfirmacion() {
        this.autenticacionService.SolicitarReenvioCorreo(sessionStorage.getItem("UserEmail"), sessionStorage.getItem("UserId"))
            .subscribe(data => { 
                this.facturacionGeneralModal.open();
                this.validarCorreoConfirmado();
             });
    }
}