System.register(['../../Observable', '../../operator/defaultIfEmpty'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, defaultIfEmpty_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (defaultIfEmpty_1_1) {
                defaultIfEmpty_1 = defaultIfEmpty_1_1;
            }],
        execute: function() {
            Observable_1.Observable.prototype.defaultIfEmpty = defaultIfEmpty_1.defaultIfEmpty;
        }
    }
});
//# sourceMappingURL=defaultIfEmpty.js.map