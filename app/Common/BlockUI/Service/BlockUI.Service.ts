import { Injectable, Inject, ApplicationRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ViewChild } from "@angular/core";
import { BlockUIComponent } from "./../Component/BlockUI.Component";

@Injectable()
export class BlockUIService {
    @ViewChild("target", {read: ViewContainerRef}) target;
    blockUi: ComponentRef<BlockUIComponent>;

    constructor( private componentResolver : ComponentFactoryResolver, private applicationRef: ApplicationRef) { }

    start(message?: string) {
        const viewContainerRef: ViewContainerRef = this.applicationRef["_rootComponents"][0]._hostElement.vcRef;
        return this.startInside(viewContainerRef, message);
    }

    startInside(viewContainerRef: ViewContainerRef, message?: string) {
        this.target = viewContainerRef;
        let blockUiFactory = this.componentResolver.resolveComponentFactory(BlockUIComponent);
        this.blockUi = this.target.createComponent(blockUiFactory);
    }

    stop() {
        if (this.blockUi) {
            this.blockUi.destroy();
        }
    }

    changeMessage(message : string ) {
        this.blockUi.instance.message = message;
    }
}