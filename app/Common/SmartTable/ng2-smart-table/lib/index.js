System.register(["./grid", "./data-source/local/local.data-source"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default")
                exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (grid_1_1) {
                exportStar_1(grid_1_1);
            },
            function (local_data_source_1_1) {
                exportStar_1(local_data_source_1_1);
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=index.js.map