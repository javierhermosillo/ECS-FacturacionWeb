System.register(["./cell"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var cell_1, Row;
    return {
        setters: [
            function (cell_1_1) {
                cell_1 = cell_1_1;
            }
        ],
        execute: function () {
            Row = (function () {
                function Row(index, data, _dataSet) {
                    this.index = index;
                    this.data = data;
                    this._dataSet = _dataSet;
                    this.isSelected = false;
                    this.isInEditing = false;
                    this.cells = [];
                    this.process();
                }
                Row.prototype.getCell = function (column) {
                    return this.cells.find(function (el) { return el.getColumn() === column; });
                };
                Row.prototype.getCells = function () {
                    return this.cells;
                };
                Row.prototype.getData = function () {
                    return this.data;
                };
                Row.prototype.getNewData = function () {
                    var values = {};
                    this.getCells().forEach(function (cell) { return values[cell.getColumn().id] = cell.newValue; });
                    return Object.assign(this.data, values);
                };
                Row.prototype.setData = function (data) {
                    this.data = data;
                    this.process();
                };
                Row.prototype.process = function () {
                    var _this = this;
                    this.cells = [];
                    this._dataSet.getColumns().forEach(function (column) {
                        var cell = _this.createCell(column);
                        _this.cells.push(cell);
                    });
                };
                Row.prototype.createCell = function (column) {
                    var value = typeof this.data[column.id] === 'undefined' ? '' : this.data[column.id];
                    return new cell_1.Cell(value, this, column, this._dataSet);
                };
                return Row;
            }());
            exports_1("Row", Row);
        }
    };
});
//# sourceMappingURL=row.js.map