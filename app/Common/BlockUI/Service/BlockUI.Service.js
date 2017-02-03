System.register(["@angular/core", "./../Component/BlockUI.Component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, BlockUI_Component_1, BlockUIService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (BlockUI_Component_1_1) {
                BlockUI_Component_1 = BlockUI_Component_1_1;
            }
        ],
        execute: function () {
            BlockUIService = (function () {
                function BlockUIService(componentResolver, applicationRef) {
                    this.componentResolver = componentResolver;
                    this.applicationRef = applicationRef;
                }
                BlockUIService.prototype.start = function (message) {
                    var viewContainerRef = this.applicationRef["_rootComponents"][0]._hostElement.vcRef;
                    return this.startInside(viewContainerRef, message);
                };
                BlockUIService.prototype.startInside = function (viewContainerRef, message) {
                    this.target = viewContainerRef;
                    var blockUiFactory = this.componentResolver.resolveComponentFactory(BlockUI_Component_1.BlockUIComponent);
                    this.blockUi = this.target.createComponent(blockUiFactory);
                };
                BlockUIService.prototype.stop = function () {
                    if (this.blockUi) {
                        this.blockUi.destroy();
                    }
                };
                BlockUIService.prototype.changeMessage = function (message) {
                    this.blockUi.instance.message = message;
                };
                return BlockUIService;
            }());
            __decorate([
                core_1.ViewChild("target", { read: core_1.ViewContainerRef }),
                __metadata("design:type", Object)
            ], BlockUIService.prototype, "target", void 0);
            BlockUIService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, core_1.ApplicationRef])
            ], BlockUIService);
            exports_1("BlockUIService", BlockUIService);
        }
    };
});
//# sourceMappingURL=BlockUI.Service.js.map