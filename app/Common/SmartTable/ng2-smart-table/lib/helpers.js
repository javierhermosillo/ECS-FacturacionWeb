System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function isSpecificValue(val) {
        return (
        // val instanceof Buffer || 
        val instanceof Date ||
            val instanceof RegExp) ? true : false;
    }
    function cloneSpecificValue(val) {
        if (val instanceof Buffer) {
            var x = new Buffer(val.length);
            val.copy(x);
            return x;
        }
        else if (val instanceof Date) {
            return new Date(val.getTime());
        }
        else if (val instanceof RegExp) {
            return new RegExp(val);
        }
        else {
            throw new Error('Unexpected situation');
        }
    }
    /**
     * Recursive cloning array.
     */
    function deepCloneArray(arr) {
        var clone = [];
        arr.forEach(function (item, index) {
            if (typeof item === 'object' && item !== null) {
                if (Array.isArray(item)) {
                    clone[index] = deepCloneArray(item);
                }
                else if (isSpecificValue(item)) {
                    clone[index] = cloneSpecificValue(item);
                }
                else {
                    clone[index] = deepExtend({}, item);
                }
            }
            else {
                clone[index] = item;
            }
        });
        return clone;
    }
    var deepExtend, Deferred;
    return {
        setters: [],
        execute: function () {
            /**
             * Extending object that entered in first argument.
             *
             * Returns extended object or false if have no target object or incorrect type.
             *
             * If you wish to clone source object (without modify it), just use empty new
             * object as first argument, like this:
             *   deepExtend({}, yourObj_1, [yourObj_N]);
             */
            exports_1("deepExtend", deepExtend = function () {
                var objects = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    objects[_i] = arguments[_i];
                }
                if (arguments.length < 1 || typeof arguments[0] !== 'object') {
                    return false;
                }
                if (arguments.length < 2) {
                    return arguments[0];
                }
                var target = arguments[0];
                // convert arguments to array and cut off target object
                var args = Array.prototype.slice.call(arguments, 1);
                var val, src, clone;
                args.forEach(function (obj) {
                    // skip argument if it is array or isn't object
                    if (typeof obj !== 'object' || Array.isArray(obj)) {
                        return;
                    }
                    Object.keys(obj).forEach(function (key) {
                        src = target[key]; // source value
                        val = obj[key]; // new value
                        // recursion prevention
                        if (val === target) {
                            return;
                        }
                        else if (typeof val !== 'object' || val === null) {
                            target[key] = val;
                            return;
                        }
                        else if (Array.isArray(val)) {
                            target[key] = deepCloneArray(val);
                            return;
                        }
                        else if (isSpecificValue(val)) {
                            target[key] = cloneSpecificValue(val);
                            return;
                        }
                        else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                            target[key] = deepExtend({}, val);
                            return;
                        }
                        else {
                            target[key] = deepExtend(src, val);
                            return;
                        }
                    });
                });
                return target;
            });
            Deferred = (function () {
                function Deferred() {
                    var _this = this;
                    this.promise = new Promise(function (resolve, reject) {
                        _this.resolve = resolve;
                        _this.reject = reject;
                    });
                }
                return Deferred;
            }());
            exports_1("Deferred", Deferred);
        }
    };
});
//# sourceMappingURL=helpers.js.map