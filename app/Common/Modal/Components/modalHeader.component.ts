import { Component, Input, Inject } from '@angular/core';
import { ModalComponent } from "./modalmain.component";

@Component({
    selector: 'modal-header',
    template: `
        <div class="modal-header bg-primary-accent">
            <button *ngIf="showClose" type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="modal.dismiss()">
                <span aria-hidden="true" class="fa fa-times-circle fa-lg text-white"></span>
            </button>
            <ng-content></ng-content>
        </div>
    `
})
export class ModalHeaderComponent {
    @Input('show-close') showClose: boolean = false;
    constructor(private modal: ModalComponent) { }
}