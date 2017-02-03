import { Directive, ElementRef } from "@angular/core";
import { ModalComponent } from "./../Components/modalmain.component";

@Directive({
    selector: "[autofocus]"
})
export class AutofocusDirective {
    constructor(private el: ElementRef, private modal: ModalComponent) {
        if (modal != null) {
            this.modal.onOpen.subscribe(() => {
                this.el.nativeElement.focus();
            });
        }
    }
}