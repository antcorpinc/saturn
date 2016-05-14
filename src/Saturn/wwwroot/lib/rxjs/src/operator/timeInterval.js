System.register(['../Subscriber', '../scheduler/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, async_1;
    var TimeInterval, TimeIntervalOperator, TimeIntervalSubscriber;
    /**
     * @param scheduler
     * @return {Observable<TimeInterval<any>>|WebSocketSubject<T>|Observable<T>}
     * @method timeInterval
     * @owner Observable
     */
    function timeInterval(scheduler) {
        if (scheduler === void 0) { scheduler = async_1.async; }
        return this.lift(new TimeIntervalOperator(scheduler));
    }
    exports_1("timeInterval", timeInterval);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            TimeInterval = (function () {
                function TimeInterval(value, interval) {
                    this.value = value;
                    this.interval = interval;
                }
                return TimeInterval;
            }());
            exports_1("TimeInterval", TimeInterval);
            ;
            TimeIntervalOperator = (function () {
                function TimeIntervalOperator(scheduler) {
                    this.scheduler = scheduler;
                }
                TimeIntervalOperator.prototype.call = function (observer, source) {
                    return source._subscribe(new TimeIntervalSubscriber(observer, this.scheduler));
                };
                return TimeIntervalOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            TimeIntervalSubscriber = (function (_super) {
                __extends(TimeIntervalSubscriber, _super);
                function TimeIntervalSubscriber(destination, scheduler) {
                    _super.call(this, destination);
                    this.scheduler = scheduler;
                    this.lastTime = 0;
                    this.lastTime = scheduler.now();
                }
                TimeIntervalSubscriber.prototype._next = function (value) {
                    var now = this.scheduler.now();
                    var span = now - this.lastTime;
                    this.lastTime = now;
                    this.destination.next(new TimeInterval(value, span));
                };
                return TimeIntervalSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});
//# sourceMappingURL=timeInterval.js.map