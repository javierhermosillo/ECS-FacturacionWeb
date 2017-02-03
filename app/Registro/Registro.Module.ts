import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RegistroComponent } from "./Components/Registro.Component";
import { RegistroConfirmacionComponent } from "./Components/RegistroConfirmacion.Component";
import { RegistroProgresoComponent } from "./Components/RegistroProgreso.Component";
import { RegistroUsuarioComponent } from "./Components/RegistroUsuario.Component";
import { RegistroReceptoresComponent } from "./Components/RegistroReceptores.Component";
import { Ng2ModalModule } from "./../Common/Modal/Components/modal.component";
import MaskedInput from "angular2-text-mask";

@NgModule({
    imports : [CommonModule, Ng2ModalModule, FormsModule],
    declarations : [RegistroComponent, RegistroConfirmacionComponent, RegistroProgresoComponent, RegistroUsuarioComponent, RegistroReceptoresComponent, MaskedInput],
    exports : [RegistroComponent, RegistroConfirmacionComponent, RegistroProgresoComponent, RegistroUsuarioComponent, RegistroReceptoresComponent]
})
export class RegistroModule{}