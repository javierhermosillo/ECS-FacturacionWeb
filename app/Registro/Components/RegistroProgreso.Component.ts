import { Component, Input } from "@angular/core";

@Component({
    selector : "facturacion-registroprogreso",
    templateUrl : "app/Registro/Views/RegistroProgreso.Component.html"
})
export class RegistroProgresoComponent {

    @Input() PasoActual : string;

    VerificarPasoActual(paso : string) {
        if (this.PasoActual === paso){
            return true;
        }
    }

}