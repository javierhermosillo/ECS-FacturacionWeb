System.register(["rxjs/Operator/Publish"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Publish_1;
    var Broadcaster;
    return {
        setters:[
            function (Publish_1_1) {
                Publish_1 = Publish_1_1;
            }],
        execute: function() {
            Broadcaster = (function (_super) {
                __extends(Broadcaster, _super);
                function Broadcaster() {
                    _super.apply(this, arguments);
                }
                return Broadcaster;
            }(Publish_1.publish));
            exports_1("Broadcaster", Broadcaster);
        }
    }
});
//# sourceMappingURL=Broadcaster.js.map