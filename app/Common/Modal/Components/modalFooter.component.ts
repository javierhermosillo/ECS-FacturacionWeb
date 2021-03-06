import { Component, Input, Inject } from '@angular/core';
import { ModalComponent } from "./modalmain.component";

@Component({
    selector: 'modal-footer',
    template: `
        <div class="modal-footer bg-primary-accent">
            <ng-content></ng-content>
            <button *ngIf="showDefaultButtons" type="button" class="btn btn-default" data-dismiss="modal" (click)="modal.dismiss()">{{dismissButtonLabel}}</button>
            <button *ngIf="showDefaultButtons" type="button" class="btn btn-primary" (click)="modal.close()">{{closeButtonLabel}}</button>
        </div>
    `
})
export class ModalFooterComponent {
    @Input('show-default-buttons') showDefaultButtons: boolean = false;
    @Input('dismiss-button-label') dismissButtonLabel: string = 'Dismiss';
    @Input('close-button-label') closeButtonLabel: string = 'Close';
    constructor(@Inject(ModalComponent) private modal: ModalComponent) { }
}