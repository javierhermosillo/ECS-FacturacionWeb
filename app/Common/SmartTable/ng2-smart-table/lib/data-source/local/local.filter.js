System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LocalFilter;
    return {
        setters: [],
        execute: function () {
            LocalFilter = (function () {
                function LocalFilter() {
                }
                LocalFilter.filter = function (data, field, search, customFilter) {
                    var filter = customFilter ? customFilter : this.FILTER;
                    return data.filter(function (el) {
                        var value = typeof el[field] === 'undefined' || el[field] === null ? '' : el[field];
                        return filter.call(null, value.toString().toLowerCase(), search.toString().toLowerCase());
                    });
                };
                return LocalFilter;
            }());
            LocalFilter.FILTER = function (value, search) {
                return value.includes(search);
            };
            exports_1("LocalFilter", LocalFilter);
        }
    };
});
//# sourceMappingURL=local.filter.js.map