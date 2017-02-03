System.register(["@angular/core", "./lib/grid", "./lib/data-source/data-source", "./lib/helpers", "./lib/data-source/local/local.data-source"], function (exports_1, context_1) {
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
    var core_1, grid_1, data_source_1, helpers_1, local_data_source_1, Ng2SmartTableComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            },
            function (data_source_1_1) {
                data_source_1 = data_source_1_1;
            },
            function (helpers_1_1) {
                helpers_1 = helpers_1_1;
            },
            function (local_data_source_1_1) {
                local_data_source_1 = local_data_source_1_1;
            }
        ],
        execute: function () {
            Ng2SmartTableComponent = (function () {
                function Ng2SmartTableComponent() {
                    this.settings = {};
                    this.rowSelect = new core_1.EventEmitter();
                    this.userRowSelect = new core_1.EventEmitter();
                    this.delete = new core_1.EventEmitter();
                    this.edit = new core_1.EventEmitter();
                    this.create = new core_1.EventEmitter();
                    this.deleteConfirm = new core_1.EventEmitter();
                    this.editConfirm = new core_1.EventEmitter();
                    this.createConfirm = new core_1.EventEmitter();
                    this.defaultSettings = {
                        mode: "inline",
                        hideHeader: false,
                        hideSubHeader: false,
                        actions: {
                            columnTitle: "Actions",
                            add: true,
                            edit: true,
                            delete: true
                        },
                        filter: {
                            inputClass: "",
                        },
                        edit: {
                            inputClass: "",
                            editButtonContent: "Edit",
                            saveButtonContent: "Update",
                            cancelButtonContent: "Cancel",
                            confirmSave: false
                        },
                        add: {
                            inputClass: "",
                            addButtonContent: "Add New",
                            createButtonContent: "Create",
                            cancelButtonContent: "Cancel",
                            confirmCreate: false
                        },
                        delete: {
                            deleteButtonContent: "Delete",
                            confirmDelete: false
                        },
                        attr: {
                            id: "",
                            class: "",
                        },
                        noDataMessage: "No data found",
                        columns: {},
                        pager: {
                            display: true,
                            perPage: 10
                        }
                    };
                }
                Ng2SmartTableComponent.prototype.ngOnChanges = function (changes) {
                    if (this.grid) {
                        if (changes["settings"]) {
                            this.grid.setSettings(this.prepareSettings());
                        }
                        if (changes["source"]) {
                            this.grid.setSource(this.source);
                        }
                    }
                    else {
                        this.initGrid();
                    }
                };
                Ng2SmartTableComponent.prototype.onAdd = function (event) {
                    event.stopPropagation();
                    if (this.grid.getSetting("mode") === "external") {
                        this.create.emit({
                            source: this.source
                        });
                    }
                    else {
                        this.grid.createFormShown = true;
                    }
                    return false;
                };
                Ng2SmartTableComponent.prototype.onUserSelectRow = function (row) {
                    this.grid.selectRow(row);
                    this.userRowSelect.emit({
                        data: row.getData(),
                        source: this.source
                    });
                    this.onSelectRow(row);
                };
                Ng2SmartTableComponent.prototype.onSelectRow = function (row) {
                    this.grid.selectRow(row);
                    this.rowSelect.emit({
                        data: row.getData(),
                        source: this.source
                    });
                };
                Ng2SmartTableComponent.prototype.onEdit = function (row, event) {
                    event.stopPropagation();
                    this.onSelectRow(row);
                    if (this.grid.getSetting("mode") === "external") {
                        this.edit.emit({
                            data: row.getData(),
                            source: this.source
                        });
                    }
                    else {
                        this.grid.edit(row);
                    }
                    return false;
                };
                Ng2SmartTableComponent.prototype.onDelete = function (row, event) {
                    event.stopPropagation();
                    if (this.grid.getSetting("mode") === "external") {
                        this.delete.emit({
                            data: row.getData(),
                            source: this.source
                        });
                    }
                    else {
                        this.grid.delete(row, this.deleteConfirm);
                    }
                    return false;
                };
                Ng2SmartTableComponent.prototype.onCreate = function (row, event) {
                    event.stopPropagation();
                    this.grid.create(row, this.createConfirm);
                    return false;
                };
                Ng2SmartTableComponent.prototype.onSave = function (row, event) {
                    event.stopPropagation();
                    this.grid.save(row, this.editConfirm);
                    return false;
                };
                Ng2SmartTableComponent.prototype.initGrid = function () {
                    var _this = this;
                    this.source = this.prepareSource();
                    this.grid = new grid_1.Grid(this.source, this.prepareSettings());
                    this.grid.onSelectRow().subscribe(function (row) { return _this.onSelectRow(row); });
                };
                Ng2SmartTableComponent.prototype.prepareSource = function () {
                    if (this.source instanceof data_source_1.DataSource) {
                        return this.source;
                    }
                    else if (this.source instanceof Array) {
                        return new local_data_source_1.LocalDataSource(this.source);
                    }
                    return new local_data_source_1.LocalDataSource();
                };
                Ng2SmartTableComponent.prototype.prepareSettings = function () {
                    return helpers_1.deepExtend({}, this.defaultSettings, this.settings);
                };
                return Ng2SmartTableComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], Ng2SmartTableComponent.prototype, "source", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], Ng2SmartTableComponent.prototype, "settings", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], Ng2SmartTableComponent.prototype, "rowSelect", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], Ng2SmartTableComponent.prototype, "userRowSelect", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], Ng2SmartTableComponent.prototype, "delete", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], Ng2SmartTableComponent.prototype, "edit", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], Ng2SmartTableComponent.prototype, "create", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], Ng2SmartTableComponent.prototype, "deleteConfirm", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], Ng2SmartTableComponent.prototype, "editConfirm", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], Ng2SmartTableComponent.prototype, "createConfirm", void 0);
            Ng2SmartTableComponent = __decorate([
                core_1.Component({
                    selector: "ng2-smart-table",
                    styles: ["./ng2-smart-table.scss"],
                    templateUrl: "App/Common/SmartTable/ng2-smart-table/ng2-smart-table.html"
                }),
                __metadata("design:paramtypes", [])
            ], Ng2SmartTableComponent);
            exports_1("Ng2SmartTableComponent", Ng2SmartTableComponent);
        }
    };
});
//# sourceMappingURL=ng2-smart-table.component.js.map