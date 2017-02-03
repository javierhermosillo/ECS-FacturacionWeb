System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LocalSorter;
    return {
        setters: [],
        execute: function () {
            LocalSorter = (function () {
                function LocalSorter() {
                }
                LocalSorter.sort = function (data, field, direction, customCompare) {
                    var dir = (direction === 'asc') ? 1 : -1;
                    var compare = customCompare ? customCompare : this.COMPARE;
                    return data.sort(function (a, b) {
                        return compare.call(null, dir, a[field], b[field]);
                    });
                };
                return LocalSorter;
            }());
            LocalSorter.COMPARE = function (direction, a, b) {
                if (a < b) {
                    return -1 * direction;
                }
                if (a > b) {
                    return direction;
                }
                return 0;
            };
            exports_1("LocalSorter", LocalSorter);
        }
    };
});
//# sourceMappingURL=local.sorter.js.map