System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Cell;
    return {
        setters: [],
        execute: function () {
            Cell = (function () {
                function Cell(value, row, column, dataSet) {
                    this.value = value;
                    this.row = row;
                    this.column = column;
                    this.dataSet = dataSet;
                    this.newValue = '';
                    this.newValue = value;
                }
                Cell.prototype.getValue = function () {
                    var valid = this.column.getValuePrepareFunction() instanceof Function;
                    var prepare = valid ? this.column.getValuePrepareFunction() : Cell.PREPARE;
                    return prepare.call(null, this.value);
                };
                Cell.prototype.getColumn = function () {
                    return this.column;
                };
                Cell.prototype.getRow = function () {
                    return this.row;
                };
                return Cell;
            }());
            Cell.PREPARE = function (value) { return value; };
            exports_1("Cell", Cell);
        }
    };
});
//# sourceMappingURL=cell.js.map