'use strict';"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/src/core/di');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var async_1 = require('angular2/src/facade/async');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var component_factory_1 = require('./component_factory');
/**
 * Low-level service for loading {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 */
var ComponentResolver = (function () {
    function ComponentResolver() {
    }
    return ComponentResolver;
}());
exports.ComponentResolver = ComponentResolver;
function _isComponentFactory(type) {
    return type instanceof component_factory_1.ComponentFactory;
}
var ReflectorComponentResolver = (function (_super) {
    __extends(ReflectorComponentResolver, _super);
    function ReflectorComponentResolver() {
        _super.apply(this, arguments);
    }
    ReflectorComponentResolver.prototype.resolveComponent = function (componentType) {
        var metadatas = reflection_1.reflector.annotations(componentType);
        var componentFactory = metadatas.find(_isComponentFactory);
        if (lang_1.isBlank(componentFactory)) {
            throw new exceptions_1.BaseException("No precompiled component " + lang_1.stringify(componentType) + " found");
        }
        return async_1.PromiseWrapper.resolve(componentFactory);
    };
    ReflectorComponentResolver.prototype.clearCache = function () { };
    ReflectorComponentResolver = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ReflectorComponentResolver);
    return ReflectorComponentResolver;
}(ComponentResolver));
exports.ReflectorComponentResolver = ReflectorComponentResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50X3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1CUkplcjFKOS50bXAvYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2NvbXBvbmVudF9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBeUIsc0JBQXNCLENBQUMsQ0FBQTtBQUNoRCxxQkFBdUMsMEJBQTBCLENBQUMsQ0FBQTtBQUNsRSwyQkFBNEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUM3RCxzQkFBNkIsMkJBQTJCLENBQUMsQ0FBQTtBQUN6RCwyQkFBd0IseUNBQXlDLENBQUMsQ0FBQTtBQUNsRSxrQ0FBK0IscUJBQXFCLENBQUMsQ0FBQTtBQUVyRDs7O0dBR0c7QUFDSDtJQUFBO0lBR0EsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIcUIseUJBQWlCLG9CQUd0QyxDQUFBO0FBRUQsNkJBQTZCLElBQVM7SUFDcEMsTUFBTSxDQUFDLElBQUksWUFBWSxvQ0FBZ0IsQ0FBQztBQUMxQyxDQUFDO0FBR0Q7SUFBZ0QsOENBQWlCO0lBQWpFO1FBQWdELDhCQUFpQjtJQVdqRSxDQUFDO0lBVkMscURBQWdCLEdBQWhCLFVBQWlCLGFBQW1CO1FBQ2xDLElBQUksU0FBUyxHQUFHLHNCQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELElBQUksZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRTNELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLElBQUksMEJBQWEsQ0FBQyw4QkFBNEIsZ0JBQVMsQ0FBQyxhQUFhLENBQUMsV0FBUSxDQUFDLENBQUM7UUFDeEYsQ0FBQztRQUNELE1BQU0sQ0FBQyxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRCwrQ0FBVSxHQUFWLGNBQWMsQ0FBQztJQVhqQjtRQUFDLGVBQVUsRUFBRTs7a0NBQUE7SUFZYixpQ0FBQztBQUFELENBQUMsQUFYRCxDQUFnRCxpQkFBaUIsR0FXaEU7QUFYWSxrQ0FBMEIsNkJBV3RDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7VHlwZSwgaXNCbGFuaywgc3RyaW5naWZ5fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge3JlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeX0gZnJvbSAnLi9jb21wb25lbnRfZmFjdG9yeSc7XG5cbi8qKlxuICogTG93LWxldmVsIHNlcnZpY2UgZm9yIGxvYWRpbmcge0BsaW5rIENvbXBvbmVudEZhY3Rvcnl9cywgd2hpY2hcbiAqIGNhbiBsYXRlciBiZSB1c2VkIHRvIGNyZWF0ZSBhbmQgcmVuZGVyIGEgQ29tcG9uZW50IGluc3RhbmNlLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50UmVzb2x2ZXIge1xuICBhYnN0cmFjdCByZXNvbHZlQ29tcG9uZW50KGNvbXBvbmVudFR5cGU6IFR5cGUpOiBQcm9taXNlPENvbXBvbmVudEZhY3Rvcnk+O1xuICBhYnN0cmFjdCBjbGVhckNhY2hlKCk7XG59XG5cbmZ1bmN0aW9uIF9pc0NvbXBvbmVudEZhY3RvcnkodHlwZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlIGluc3RhbmNlb2YgQ29tcG9uZW50RmFjdG9yeTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlZmxlY3RvckNvbXBvbmVudFJlc29sdmVyIGV4dGVuZHMgQ29tcG9uZW50UmVzb2x2ZXIge1xuICByZXNvbHZlQ29tcG9uZW50KGNvbXBvbmVudFR5cGU6IFR5cGUpOiBQcm9taXNlPENvbXBvbmVudEZhY3Rvcnk+IHtcbiAgICB2YXIgbWV0YWRhdGFzID0gcmVmbGVjdG9yLmFubm90YXRpb25zKGNvbXBvbmVudFR5cGUpO1xuICAgIHZhciBjb21wb25lbnRGYWN0b3J5ID0gbWV0YWRhdGFzLmZpbmQoX2lzQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICBpZiAoaXNCbGFuayhjb21wb25lbnRGYWN0b3J5KSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYE5vIHByZWNvbXBpbGVkIGNvbXBvbmVudCAke3N0cmluZ2lmeShjb21wb25lbnRUeXBlKX0gZm91bmRgKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnJlc29sdmUoY29tcG9uZW50RmFjdG9yeSk7XG4gIH1cbiAgY2xlYXJDYWNoZSgpIHt9XG59XG4iXX0=