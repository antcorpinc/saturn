'use strict';"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var lang_1 = require('angular2/src/facade/lang');
var core_1 = require('angular2/core');
var invalid_pipe_argument_exception_1 = require('./invalid_pipe_argument_exception');
/**
 * Implements uppercase transforms to text.
 *
 * ### Example
 *
 * {@example core/pipes/ts/lowerupper_pipe/lowerupper_pipe_example.ts region='LowerUpperPipe'}
 */
var UpperCasePipe = (function () {
    function UpperCasePipe() {
    }
    UpperCasePipe.prototype.transform = function (value) {
        if (lang_1.isBlank(value))
            return value;
        if (!lang_1.isString(value)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(UpperCasePipe, value);
        }
        return value.toUpperCase();
    };
    UpperCasePipe = __decorate([
        lang_1.CONST(),
        core_1.Pipe({ name: 'uppercase' }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UpperCasePipe);
    return UpperCasePipe;
}());
exports.UpperCasePipe = UpperCasePipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBwZXJjYXNlX3BpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUJSSmVyMUo5LnRtcC9hbmd1bGFyMi9zcmMvY29tbW9uL3BpcGVzL3VwcGVyY2FzZV9waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBdUMsMEJBQTBCLENBQUMsQ0FBQTtBQUNsRSxxQkFBNEQsZUFBZSxDQUFDLENBQUE7QUFDNUUsZ0RBQTJDLG1DQUFtQyxDQUFDLENBQUE7QUFFL0U7Ozs7OztHQU1HO0FBSUg7SUFBQTtJQVFBLENBQUM7SUFQQyxpQ0FBUyxHQUFULFVBQVUsS0FBYTtRQUNyQixFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLElBQUksOERBQTRCLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFWSDtRQUFDLFlBQUssRUFBRTtRQUNQLFdBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUMsQ0FBQztRQUN6QixpQkFBVSxFQUFFOztxQkFBQTtJQVNiLG9CQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFSWSxxQkFBYSxnQkFRekIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNTdHJpbmcsIENPTlNULCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtQaXBlVHJhbnNmb3JtLCBXcmFwcGVkVmFsdWUsIEluamVjdGFibGUsIFBpcGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtJbnZhbGlkUGlwZUFyZ3VtZW50RXhjZXB0aW9ufSBmcm9tICcuL2ludmFsaWRfcGlwZV9hcmd1bWVudF9leGNlcHRpb24nO1xuXG4vKipcbiAqIEltcGxlbWVudHMgdXBwZXJjYXNlIHRyYW5zZm9ybXMgdG8gdGV4dC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL3BpcGVzL3RzL2xvd2VydXBwZXJfcGlwZS9sb3dlcnVwcGVyX3BpcGVfZXhhbXBsZS50cyByZWdpb249J0xvd2VyVXBwZXJQaXBlJ31cbiAqL1xuQENPTlNUKClcbkBQaXBlKHtuYW1lOiAndXBwZXJjYXNlJ30pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXBwZXJDYXNlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKGlzQmxhbmsodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgaWYgKCFpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkUGlwZUFyZ3VtZW50RXhjZXB0aW9uKFVwcGVyQ2FzZVBpcGUsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gIH1cbn1cbiJdfQ==