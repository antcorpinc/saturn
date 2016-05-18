System.register(['@angular/platform-browser-dynamic', './accountregister.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, accountregister_component_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (accountregister_component_1_1) {
                accountregister_component_1 = accountregister_component_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(accountregister_component_1.RegisterComponent)
                .then(function (success) { return console.log('Register app bootstrapped'); })
                .catch(function (error) { return console.log(error); });
        }
    }
});
//# sourceMappingURL=accountregistermain.js.map