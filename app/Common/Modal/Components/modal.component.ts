import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ModalComponent } from "./modalmain.component";
import { ModalHeaderComponent } from "./modalheader.component";
import { ModalBodyComponent } from "./modalbody.component";
import { ModalFooterComponent } from "./modalfooter.component";
import { AutofocusDirective } from "./../Directives/autofocus";

export * from "./modal.component";
export * from "./modalheader.component";
export * from "./modalbody.component";
export * from "./modalfooter.component";
export * from "./modalinstance.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ModalComponent,
        ModalHeaderComponent,
        ModalBodyComponent,
        ModalFooterComponent,
        AutofocusDirective
    ],
    exports: [
        ModalComponent,
        ModalHeaderComponent,
        ModalBodyComponent,
        ModalFooterComponent,
        AutofocusDirective
    ]
})
export class Ng2ModalModule {
}