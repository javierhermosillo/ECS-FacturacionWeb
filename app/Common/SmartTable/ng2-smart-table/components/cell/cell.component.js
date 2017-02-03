System.register(["@angular/core", "../../lib/data-set/cell"], function (exports_1, context_1) {
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
    var core_1, cell_1, CellComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (cell_1_1) {
                cell_1 = cell_1_1;
            }
        ],
        execute: function () {
            CellComponent = (function () {
                function CellComponent() {
                    this.inputClass = "";
                    this.mode = "inline";
                    this.edited = new core_1.EventEmitter();
                }
                CellComponent.prototype.onStopEditing = function () {
                    this.cell.getRow().isInEditing = false;
                    return false;
                };
                CellComponent.prototype.onEdited = function (event) {
                    this.edited.emit(event);
                    return false;
                };
                CellComponent.prototype.onClick = function (event) {
                    event.stopPropagation();
                };
                return CellComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", cell_1.Cell)
            ], CellComponent.prototype, "cell", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], CellComponent.prototype, "inputClass", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], CellComponent.prototype, "mode", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], CellComponent.prototype, "edited", void 0);
            CellComponent = __decorate([
                core_1.Component({
                    selector: "ng2-smart-table-cell",
                    styles: ["./cell.scss"],
                    template: "\n    <div *ngIf=\"!cell.getRow().isInEditing && cell.getColumn().type !== 'html'\"[innerHTML]=\"cell.getValue()\"></div>\n    <div *ngIf=\"!cell.getRow().isInEditing && cell.getColumn().type === 'html'\" [innerHTML]=\"cell.getValue()\"></div>\n    <input *ngIf=\"cell.getRow().isInEditing\" \n      [ngClass]=\"inputClass\"\n      class=\"form-control\"\n      [(ngModel)]=\"cell.newValue\"\n      [name]=\"cell.getColumn().id\" \n      [placeholder]=\"cell.getColumn().title\"\n      [disabled]=\"!cell.getColumn().isEditable\"\n      (click)=\"onClick($event)\"\n      (keydown.enter)=\"onEdited($event)\" \n      (keydown.esc)=\"onStopEditing()\">\n  "
                }),
                __metadata("design:paramtypes", [])
            ], CellComponent);
            exports_1("CellComponent", CellComponent);
        }
    };
});
//# sourceMappingURL=cell.component.js.map