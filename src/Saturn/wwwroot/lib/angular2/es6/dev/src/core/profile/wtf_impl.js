import { global } from 'angular2/src/facade/lang';
var trace;
var events;
export function detectWTF() {
    var wtf = global['wtf'];
    if (wtf) {
        trace = wtf['trace'];
        if (trace) {
            events = trace['events'];
            return true;
        }
    }
    return false;
}
export function createScope(signature, flags = null) {
    return events.createScope(signature, flags);
}
export function leave(scope, returnValue) {
    trace.leaveScope(scope, returnValue);
    return returnValue;
}
export function startTimeRange(rangeType, action) {
    return trace.beginTimeRange(rangeType, action);
}
export function endTimeRange(range) {
    trace.endTimeRange(range);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3RmX2ltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLXhCTElCclZSLnRtcC9hbmd1bGFyMi9zcmMvY29yZS9wcm9maWxlL3d0Zl9pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sMEJBQTBCO0FBMEIvQyxJQUFJLEtBQVksQ0FBQztBQUNqQixJQUFJLE1BQWMsQ0FBQztBQUVuQjtJQUNFLElBQUksR0FBRyxHQUFRLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1IsS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELDRCQUE0QixTQUFpQixFQUFFLEtBQUssR0FBUSxJQUFJO0lBQzlELE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRUQsc0JBQXlCLEtBQVksRUFBRSxXQUFlO0lBQ3BELEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUVELCtCQUErQixTQUFpQixFQUFFLE1BQWM7SUFDOUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCw2QkFBNkIsS0FBWTtJQUN2QyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dsb2JhbH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBBIHNjb3BlIGZ1bmN0aW9uIGZvciB0aGUgV2ViIFRyYWNpbmcgRnJhbWV3b3JrIChXVEYpLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFd0ZlNjb3BlRm4geyAoYXJnMD86IGFueSwgYXJnMT86IGFueSk6IGFueTsgfVxuXG5pbnRlcmZhY2UgV1RGIHtcbiAgdHJhY2U6IFRyYWNlO1xufVxuXG5pbnRlcmZhY2UgVHJhY2Uge1xuICBldmVudHM6IEV2ZW50cztcbiAgbGVhdmVTY29wZShzY29wZTogU2NvcGUsIHJldHVyblZhbHVlOiBhbnkpO1xuICBiZWdpblRpbWVSYW5nZShyYW5nZVR5cGU6IHN0cmluZywgYWN0aW9uOiBzdHJpbmcpOiBSYW5nZTtcbiAgZW5kVGltZVJhbmdlKHJhbmdlOiBSYW5nZSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmFuZ2Uge31cblxuaW50ZXJmYWNlIEV2ZW50cyB7XG4gIGNyZWF0ZVNjb3BlKHNpZ25hdHVyZTogc3RyaW5nLCBmbGFnczogYW55KTogU2NvcGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NvcGUgeyAoLi4uYXJncyk6IGFueTsgfVxuXG52YXIgdHJhY2U6IFRyYWNlO1xudmFyIGV2ZW50czogRXZlbnRzO1xuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0V1RGKCk6IGJvb2xlYW4ge1xuICB2YXIgd3RmOiBXVEYgPSBnbG9iYWxbJ3d0ZiddO1xuICBpZiAod3RmKSB7XG4gICAgdHJhY2UgPSB3dGZbJ3RyYWNlJ107XG4gICAgaWYgKHRyYWNlKSB7XG4gICAgICBldmVudHMgPSB0cmFjZVsnZXZlbnRzJ107XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2NvcGUoc2lnbmF0dXJlOiBzdHJpbmcsIGZsYWdzOiBhbnkgPSBudWxsKTogYW55IHtcbiAgcmV0dXJuIGV2ZW50cy5jcmVhdGVTY29wZShzaWduYXR1cmUsIGZsYWdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxlYXZlPFQ+KHNjb3BlOiBTY29wZSwgcmV0dXJuVmFsdWU/OiBUKTogVCB7XG4gIHRyYWNlLmxlYXZlU2NvcGUoc2NvcGUsIHJldHVyblZhbHVlKTtcbiAgcmV0dXJuIHJldHVyblZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRUaW1lUmFuZ2UocmFuZ2VUeXBlOiBzdHJpbmcsIGFjdGlvbjogc3RyaW5nKTogUmFuZ2Uge1xuICByZXR1cm4gdHJhY2UuYmVnaW5UaW1lUmFuZ2UocmFuZ2VUeXBlLCBhY3Rpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5kVGltZVJhbmdlKHJhbmdlOiBSYW5nZSk6IHZvaWQge1xuICB0cmFjZS5lbmRUaW1lUmFuZ2UocmFuZ2UpO1xufVxuIl19