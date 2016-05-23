System.register(['@angular/core', '@angular/http', '@angular/router', './registerstep1.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, registerstep1_component_1;
    var RegisterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (registerstep1_component_1_1) {
                registerstep1_component_1 = registerstep1_component_1_1;
            }],
        execute: function() {
            RegisterComponent = (function () {
                function RegisterComponent(router) {
                    this.router = router;
                }
                RegisterComponent.prototype.ngOnInit = function () {
                    this.router.navigateByUrl('/account/registertest');
                };
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: 'register-app',
                        template: "\n   <div>\n   This is testing\n      <router-outlet></router-outlet>\n     \n</div>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            router_1.ROUTER_PROVIDERS
                        ]
                    }),
                    router_1.Routes([
                        { path: '/RegisterComponent/registerstep1', component: registerstep1_component_1.RegisterStep1Component },
                        { path: '/Account', component: registerstep1_component_1.RegisterStep1Component },
                        { path: '/Account/RegisterComponent', component: registerstep1_component_1.RegisterStep1Component },
                        { path: '/Account/RegisterComponent/registerstep1', component: registerstep1_component_1.RegisterStep1Component },
                        { path: '/account/registertest', component: registerstep1_component_1.RegisterStep1Component },
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], RegisterComponent);
                return RegisterComponent;
            }());
            exports_1("RegisterComponent", RegisterComponent);
        }
    }
});
//# sourceMappingURL=accountregister.component.js.map