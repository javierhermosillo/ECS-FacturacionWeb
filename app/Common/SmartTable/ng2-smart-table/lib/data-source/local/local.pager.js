System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LocalPager;
    return {
        setters: [],
        execute: function () {
            LocalPager = (function () {
                function LocalPager() {
                }
                LocalPager.paginate = function (data, page, perPage) {
                    return data.slice(perPage * (page - 1), perPage * page);
                };
                return LocalPager;
            }());
            exports_1("LocalPager", LocalPager);
        }
    };
});
//# sourceMappingURL=local.pager.js.map