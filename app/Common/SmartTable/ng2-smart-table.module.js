System.register(["@angular/core", "@angular/common", "@angular/forms", "./ng2-smart-table.directives", "./ng2-smart-table/components/cell/cell.component", "./ng2-smart-table/components/filter/filter.component", "./ng2-smart-table/components/pager/pager.component", "./ng2-smart-table/components/title/title.component"], function (exports_1, context_1) {
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
    var core_1, common_1, forms_1, ng2_smart_table_directives_1, cell_component_1, filter_component_1, pager_component_1, title_component_1, Ng2SmartTableModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (ng2_smart_table_directives_1_1) {
                ng2_smart_table_directives_1 = ng2_smart_table_directives_1_1;
            },
            function (cell_component_1_1) {
                cell_component_1 = cell_component_1_1;
            },
            function (filter_component_1_1) {
                filter_component_1 = filter_component_1_1;
            },
            function (pager_component_1_1) {
                pager_component_1 = pager_component_1_1;
            },
            function (title_component_1_1) {
                title_component_1 = title_component_1_1;
            }
        ],
        execute: function () {
            Ng2SmartTableModule = (function () {
                function Ng2SmartTableModule() {
                }
                return Ng2SmartTableModule;
            }());
            Ng2SmartTableModule = __decorate([
                core_1.NgModule({
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule
                    ],
                    declarations: [
                        cell_component_1.CellComponent,
                        filter_component_1.FilterComponent,
                        pager_component_1.PagerComponent,
                        title_component_1.TitleComponent,
                        ng2_smart_table_directives_1.NG2_SMART_TABLE_DIRECTIVES
                    ],
                    exports: [ng2_smart_table_directives_1.NG2_SMART_TABLE_DIRECTIVES]
                }),
                __metadata("design:paramtypes", [])
            ], Ng2SmartTableModule);
            exports_1("Ng2SmartTableModule", Ng2SmartTableModule);
        }
    };
});
//# sourceMappingURL=ng2-smart-table.module.js.map