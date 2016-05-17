var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgZone } from 'angular2/src/core/zone/ng_zone';
import { isBlank, isPresent, assertionsEnabled, CONST_EXPR, lockMode, isPromise } from 'angular2/src/facade/lang';
import { Provider, Injector, Injectable } from 'angular2/src/core/di';
import { PLATFORM_INITIALIZER, APP_INITIALIZER } from './application_tokens';
import { PromiseWrapper, ObservableWrapper } from 'angular2/src/facade/async';
import { ListWrapper } from 'angular2/src/facade/collection';
import { TestabilityRegistry, Testability } from 'angular2/src/core/testability/testability';
import { ComponentResolver } from 'angular2/src/core/linker/component_resolver';
import { BaseException, ExceptionHandler, unimplemented } from 'angular2/src/facade/exceptions';
import { Console } from 'angular2/src/core/console';
import { wtfLeave, wtfCreateScope } from './profile/profile';
/**
 * Create an Angular zone.
 */
export function createNgZone() {
    return new NgZone({ enableLongStackTrace: assertionsEnabled() });
}
var _platform;
var _inPlatformCreate = false;
/**
 * Creates a platform.
 * Platforms have to be eagerly created via this function.
 */
export function createPlatform(injector) {
    if (_inPlatformCreate) {
        throw new BaseException('Already creating a platform...');
    }
    if (isPresent(_platform) && !_platform.disposed) {
        throw new BaseException("There can be only one platform. Destroy the previous one to create a new one.");
    }
    lockMode();
    _inPlatformCreate = true;
    try {
        _platform = injector.get(PlatformRef);
    }
    finally {
        _inPlatformCreate = false;
    }
    return _platform;
}
/**
 * Checks that there currently is a platform
 * which contains the given token as a provider.
 */
export function assertPlatform(requiredToken) {
    var platform = getPlatform();
    if (isBlank(platform)) {
        throw new BaseException('Not platform exists!');
    }
    if (isPresent(platform) && isBlank(platform.injector.get(requiredToken, null))) {
        throw new BaseException('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
/**
 * Dispose the existing platform.
 */
export function disposePlatform() {
    if (isPresent(_platform) && !_platform.disposed) {
        _platform.dispose();
    }
}
/**
 * Returns the current platform.
 */
export function getPlatform() {
    return isPresent(_platform) && !_platform.disposed ? _platform : null;
}
/**
 * Shortcut for ApplicationRef.bootstrap.
 * Requires a platform the be created first.
 */
export function coreBootstrap(injector, componentFactory) {
    var appRef = injector.get(ApplicationRef);
    return appRef.bootstrap(componentFactory);
}
/**
 * Resolves the componentFactory for the given component,
 * waits for asynchronous initializers and bootstraps the component.
 * Requires a platform the be created first.
 */
export function coreLoadAndBootstrap(injector, componentType) {
    var appRef = injector.get(ApplicationRef);
    return appRef.run(() => {
        var componentResolver = injector.get(ComponentResolver);
        return PromiseWrapper
            .all([componentResolver.resolveComponent(componentType), appRef.waitForAsyncInitializers()])
            .then((arr) => appRef.bootstrap(arr[0]));
    });
}
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
 * explicitly by calling {@link createPlatform}().
 */
export class PlatformRef {
    /**
     * Retrieve the platform {@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton providers.
     */
    get injector() { throw unimplemented(); }
    ;
    get disposed() { throw unimplemented(); }
}
export let PlatformRef_ = class PlatformRef_ extends PlatformRef {
    constructor(_injector) {
        super();
        this._injector = _injector;
        /** @internal */
        this._applications = [];
        /** @internal */
        this._disposeListeners = [];
        this._disposed = false;
        if (!_inPlatformCreate) {
            throw new BaseException('Platforms have to be created via `createPlatform`!');
        }
        let inits = _injector.get(PLATFORM_INITIALIZER, null);
        if (isPresent(inits))
            inits.forEach(init => init());
    }
    registerDisposeListener(dispose) { this._disposeListeners.push(dispose); }
    get injector() { return this._injector; }
    get disposed() { return this._disposed; }
    addApplication(appRef) { this._applications.push(appRef); }
    dispose() {
        ListWrapper.clone(this._applications).forEach((app) => app.dispose());
        this._disposeListeners.forEach((dispose) => dispose());
        this._disposed = true;
    }
    /** @internal */
    _applicationDisposed(app) { ListWrapper.remove(this._applications, app); }
};
PlatformRef_ = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [Injector])
], PlatformRef_);
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {@link bootstrap}.
 */
export class ApplicationRef {
    /**
     * Retrieve the application {@link Injector}.
     */
    get injector() { return unimplemented(); }
    ;
    /**
     * Retrieve the application {@link NgZone}.
     */
    get zone() { return unimplemented(); }
    ;
    /**
     * Get a list of component types registered to this application.
     */
    get componentTypes() { return unimplemented(); }
    ;
}
let ApplicationRef_1;
export let ApplicationRef_ = ApplicationRef_1 = class ApplicationRef_ extends ApplicationRef {
    constructor(_platform, _zone, _injector) {
        super();
        this._platform = _platform;
        this._zone = _zone;
        this._injector = _injector;
        /** @internal */
        this._bootstrapListeners = [];
        /** @internal */
        this._disposeListeners = [];
        /** @internal */
        this._rootComponents = [];
        /** @internal */
        this._rootComponentTypes = [];
        /** @internal */
        this._changeDetectorRefs = [];
        /** @internal */
        this._runningTick = false;
        /** @internal */
        this._enforceNoNewChanges = false;
        var zone = _injector.get(NgZone);
        this._enforceNoNewChanges = assertionsEnabled();
        zone.run(() => { this._exceptionHandler = _injector.get(ExceptionHandler); });
        this._asyncInitDonePromise = this.run(() => {
            let inits = _injector.get(APP_INITIALIZER, null);
            var asyncInitResults = [];
            var asyncInitDonePromise;
            if (isPresent(inits)) {
                for (var i = 0; i < inits.length; i++) {
                    var initResult = inits[i]();
                    if (isPromise(initResult)) {
                        asyncInitResults.push(initResult);
                    }
                }
            }
            if (asyncInitResults.length > 0) {
                asyncInitDonePromise =
                    PromiseWrapper.all(asyncInitResults).then((_) => this._asyncInitDone = true);
                this._asyncInitDone = false;
            }
            else {
                this._asyncInitDone = true;
                asyncInitDonePromise = PromiseWrapper.resolve(true);
            }
            return asyncInitDonePromise;
        });
        ObservableWrapper.subscribe(zone.onError, (error) => {
            this._exceptionHandler.call(error.error, error.stackTrace);
        });
        ObservableWrapper.subscribe(this._zone.onMicrotaskEmpty, (_) => { this._zone.run(() => { this.tick(); }); });
    }
    registerBootstrapListener(listener) {
        this._bootstrapListeners.push(listener);
    }
    registerDisposeListener(dispose) { this._disposeListeners.push(dispose); }
    registerChangeDetector(changeDetector) {
        this._changeDetectorRefs.push(changeDetector);
    }
    unregisterChangeDetector(changeDetector) {
        ListWrapper.remove(this._changeDetectorRefs, changeDetector);
    }
    waitForAsyncInitializers() { return this._asyncInitDonePromise; }
    run(callback) {
        var zone = this.injector.get(NgZone);
        var result;
        // Note: Don't use zone.runGuarded as we want to know about
        // the thrown exception!
        // Note: the completer needs to be created outside
        // of `zone.run` as Dart swallows rejected promises
        // via the onError callback of the promise.
        var completer = PromiseWrapper.completer();
        zone.run(() => {
            try {
                result = callback();
                if (isPromise(result)) {
                    PromiseWrapper.then(result, (ref) => { completer.resolve(ref); }, (err, stackTrace) => {
                        completer.reject(err, stackTrace);
                        this._exceptionHandler.call(err, stackTrace);
                    });
                }
            }
            catch (e) {
                this._exceptionHandler.call(e, e.stack);
                throw e;
            }
        });
        return isPromise(result) ? completer.promise : result;
    }
    bootstrap(componentFactory) {
        if (!this._asyncInitDone) {
            throw new BaseException('Cannot bootstrap as there are still asynchronous initializers running. Wait for them using waitForAsyncInitializers().');
        }
        return this.run(() => {
            this._rootComponentTypes.push(componentFactory.componentType);
            var compRef = componentFactory.create(this._injector, [], componentFactory.selector);
            compRef.onDestroy(() => { this._unloadComponent(compRef); });
            var testability = compRef.injector.get(Testability, null);
            if (isPresent(testability)) {
                compRef.injector.get(TestabilityRegistry)
                    .registerApplication(compRef.location.nativeElement, testability);
            }
            this._loadComponent(compRef);
            let c = this._injector.get(Console);
            if (assertionsEnabled()) {
                c.log("Angular 2 is running in the development mode. Call enableProdMode() to enable the production mode.");
            }
            return compRef;
        });
    }
    /** @internal */
    _loadComponent(componentRef) {
        this._changeDetectorRefs.push(componentRef.changeDetectorRef);
        this.tick();
        this._rootComponents.push(componentRef);
        this._bootstrapListeners.forEach((listener) => listener(componentRef));
    }
    /** @internal */
    _unloadComponent(componentRef) {
        if (!ListWrapper.contains(this._rootComponents, componentRef)) {
            return;
        }
        this.unregisterChangeDetector(componentRef.changeDetectorRef);
        ListWrapper.remove(this._rootComponents, componentRef);
    }
    get injector() { return this._injector; }
    get zone() { return this._zone; }
    tick() {
        if (this._runningTick) {
            throw new BaseException("ApplicationRef.tick is called recursively");
        }
        var s = ApplicationRef_1._tickScope();
        try {
            this._runningTick = true;
            this._changeDetectorRefs.forEach((detector) => detector.detectChanges());
            if (this._enforceNoNewChanges) {
                this._changeDetectorRefs.forEach((detector) => detector.checkNoChanges());
            }
        }
        finally {
            this._runningTick = false;
            wtfLeave(s);
        }
    }
    dispose() {
        // TODO(alxhub): Dispose of the NgZone.
        ListWrapper.clone(this._rootComponents).forEach((ref) => ref.destroy());
        this._disposeListeners.forEach((dispose) => dispose());
        this._platform._applicationDisposed(this);
    }
    get componentTypes() { return this._rootComponentTypes; }
};
/** @internal */
ApplicationRef_._tickScope = wtfCreateScope('ApplicationRef#tick()');
ApplicationRef_ = ApplicationRef_1 = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [PlatformRef_, NgZone, Injector])
], ApplicationRef_);
/**
 * @internal
 */
export const PLATFORM_CORE_PROVIDERS = CONST_EXPR([PlatformRef_, CONST_EXPR(new Provider(PlatformRef, { useExisting: PlatformRef_ }))]);
/**
 * @internal
 */
export const APPLICATION_CORE_PROVIDERS = CONST_EXPR([
    CONST_EXPR(new Provider(NgZone, { useFactory: createNgZone, deps: CONST_EXPR([]) })),
    ApplicationRef_,
    CONST_EXPR(new Provider(ApplicationRef, { useExisting: ApplicationRef_ }))
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC14QkxJQnJWUi50bXAvYW5ndWxhcjIvc3JjL2NvcmUvYXBwbGljYXRpb25fcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztPQUFPLEVBQUMsTUFBTSxFQUFjLE1BQU0sZ0NBQWdDO09BQzNELEVBRUwsT0FBTyxFQUNQLFNBQVMsRUFDVCxpQkFBaUIsRUFHakIsVUFBVSxFQUNWLFFBQVEsRUFDUixTQUFTLEVBQ1YsTUFBTSwwQkFBMEI7T0FDMUIsRUFBVSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBQyxNQUFNLHNCQUFzQjtPQUNyRSxFQUF5QixvQkFBb0IsRUFBRSxlQUFlLEVBQUMsTUFBTSxzQkFBc0I7T0FDM0YsRUFBQyxjQUFjLEVBQW9CLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCO09BQ3RGLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0NBQWdDO09BQ25ELEVBQUMsbUJBQW1CLEVBQUUsV0FBVyxFQUFDLE1BQU0sMkNBQTJDO09BQ25GLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw2Q0FBNkM7T0FFdEUsRUFDTCxhQUFhLEVBRWIsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDZCxNQUFNLGdDQUFnQztPQUNoQyxFQUFDLE9BQU8sRUFBQyxNQUFNLDJCQUEyQjtPQUMxQyxFQUFDLFFBQVEsRUFBRSxjQUFjLEVBQWEsTUFBTSxtQkFBbUI7QUFHdEU7O0dBRUc7QUFDSDtJQUNFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxFQUFDLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLEVBQUMsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFFRCxJQUFJLFNBQXNCLENBQUM7QUFDM0IsSUFBSSxpQkFBaUIsR0FBWSxLQUFLLENBQUM7QUFFdkM7OztHQUdHO0FBQ0gsK0JBQStCLFFBQWtCO0lBQy9DLEVBQUUsQ0FBQyxD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LENBQUMsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRW5HOztHQUVHO0FBQ0gsT0FBTyxNQUFNLDBCQUEwQixHQUFHLFVBQVUsQ0FBQztJQUNuRCxVQUFVLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUNsRixlQUFlO0lBQ2YsVUFBVSxDQUFDLElBQUksUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUMsQ0FBQyxDQUFDO0NBQ3pFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Tmdab25lLCBOZ1pvbmVFcnJvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvem9uZS9uZ196b25lJztcbmltcG9ydCB7XG4gIFR5cGUsXG4gIGlzQmxhbmssXG4gIGlzUHJlc2VudCxcbiAgYXNzZXJ0aW9uc0VuYWJsZWQsXG4gIHByaW50LFxuICBJU19EQVJULFxuICBDT05TVF9FWFBSLFxuICBsb2NrTW9kZSxcbiAgaXNQcm9taXNlXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge3Byb3ZpZGUsIFByb3ZpZGVyLCBJbmplY3RvciwgSW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtBUFBfSURfUkFORE9NX1BST1ZJREVSLCBQTEFURk9STV9JTklUSUFMSVpFUiwgQVBQX0lOSVRJQUxJWkVSfSBmcm9tICcuL2FwcGxpY2F0aW9uX3Rva2Vucyc7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyLCBQcm9taXNlQ29tcGxldGVyLCBPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBUZXN0YWJpbGl0eX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvdGVzdGFiaWxpdHkvdGVzdGFiaWxpdHknO1xuaW1wb3J0IHtDb21wb25lbnRSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2NvbXBvbmVudF9yZXNvbHZlcic7XG5pbXBvcnQge0NvbXBvbmVudFJlZiwgQ29tcG9uZW50RmFjdG9yeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JztcbmltcG9ydCB7XG4gIEJhc2VFeGNlcHRpb24sXG4gIFdyYXBwZWRFeGNlcHRpb24sXG4gIEV4Y2VwdGlvbkhhbmRsZXIsXG4gIHVuaW1wbGVtZW50ZWRcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7Q29uc29sZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY29uc29sZSc7XG5pbXBvcnQge3d0ZkxlYXZlLCB3dGZDcmVhdGVTY29wZSwgV3RmU2NvcGVGbn0gZnJvbSAnLi9wcm9maWxlL3Byb2ZpbGUnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0b3JfcmVmJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gQW5ndWxhciB6b25lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTmdab25lKCk6IE5nWm9uZSB7XG4gIHJldHVybiBuZXcgTmdab25lKHtlbmFibGVMb25nU3RhY2tUcmFjZTogYXNzZXJ0aW9uc0VuYWJsZWQoKX0pO1xufVxuXG52YXIgX3BsYXRmb3JtOiBQbGF0Zm9ybVJlZjtcbnZhciBfaW5QbGF0Zm9ybUNyZWF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBwbGF0Zm9ybS5cbiAqIFBsYXRmb3JtcyBoYXZlIHRvIGJlIGVhZ2VybHkgY3JlYXRlZCB2aWEgdGhpcyBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXRmb3JtKGluamVjdG9yOiBJbmplY3Rvcik6IFBsYXRmb3JtUmVmIHtcbiAgaWYgKF9pblBsYXRmb3JtQ3JlYXRlKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ0FscmVhZHkgY3JlYXRpbmcgYSBwbGF0Zm9ybS4uLicpO1xuICB9XG4gIGlmIChpc1ByZXNlbnQoX3BsYXRmb3JtKSAmJiAhX3BsYXRmb3JtLmRpc3Bvc2VkKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgIFwiVGhlcmUgY2FuIGJlIG9ubHkgb25lIHBsYXRmb3JtLiBEZXN0cm95IHRoZSBwcmV2aW91cyBvbmUgdG8gY3JlYXRlIGEgbmV3IG9uZS5cIik7XG4gIH1cbiAgbG9ja01vZGUoKTtcbiAgX2luUGxhdGZvcm1DcmVhdGUgPSB0cnVlO1xuICB0cnkge1xuICAgIF9wbGF0Zm9ybSA9IGluamVjdG9yLmdldChQbGF0Zm9ybVJlZik7XG4gIH0gZmluYWxseSB7XG4gICAgX2luUGxhdGZvcm1DcmVhdGUgPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gX3BsYXRmb3JtO1xufVxuXG4vKipcbiAqIENoZWNrcyB0aGF0IHRoZXJlIGN1cnJlbnRseSBpcyBhIHBsYXRmb3JtXG4gKiB3aGljaCBjb250YWlucyB0aGUgZ2l2ZW4gdG9rZW4gYXMgYSBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFBsYXRmb3JtKHJlcXVpcmVkVG9rZW46IGFueSk6IFBsYXRmb3JtUmVmIHtcbiAgdmFyIHBsYXRmb3JtID0gZ2V0UGxhdGZvcm0oKTtcbiAgaWYgKGlzQmxhbmsocGxhdGZvcm0pKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ05vdCBwbGF0Zm9ybSBleGlzdHMhJyk7XG4gIH1cbiAgaWYgKGlzUHJlc2VudChwbGF0Zm9ybSkgJiYgaXNCbGFuayhwbGF0Zm9ybS5pbmplY3Rvci5nZXQocmVxdWlyZWRUb2tlbiwgbnVsbCkpKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICdBIHBsYXRmb3JtIHdpdGggYSBkaWZmZXJlbnQgY29uZmlndXJhdGlvbiBoYXMgYmVlbiBjcmVhdGVkLiBQbGVhc2UgZGVzdHJveSBpdCBmaXJzdC4nKTtcbiAgfVxuICByZXR1cm4gcGxhdGZvcm07XG59XG5cbi8qKlxuICogRGlzcG9zZSB0aGUgZXhpc3RpbmcgcGxhdGZvcm0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwb3NlUGxhdGZvcm0oKTogdm9pZCB7XG4gIGlmIChpc1ByZXNlbnQoX3BsYXRmb3JtKSAmJiAhX3BsYXRmb3JtLmRpc3Bvc2VkKSB7XG4gICAgX3BsYXRmb3JtLmRpc3Bvc2UoKTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnQgcGxhdGZvcm0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbGF0Zm9ybSgpOiBQbGF0Zm9ybVJlZiB7XG4gIHJldHVybiBpc1ByZXNlbnQoX3BsYXRmb3JtKSAmJiAhX3BsYXRmb3JtLmRpc3Bvc2VkID8gX3BsYXRmb3JtIDogbnVsbDtcbn1cblxuLyoqXG4gKiBTaG9ydGN1dCBmb3IgQXBwbGljYXRpb25SZWYuYm9vdHN0cmFwLlxuICogUmVxdWlyZXMgYSBwbGF0Zm9ybSB0aGUgYmUgY3JlYXRlZCBmaXJzdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcmVCb290c3RyYXAoaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeSk6IENvbXBvbmVudFJlZiB7XG4gIHZhciBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmID0gaW5qZWN0b3IuZ2V0KEFwcGxpY2F0aW9uUmVmKTtcbiAgcmV0dXJuIGFwcFJlZi5ib290c3RyYXAoY29tcG9uZW50RmFjdG9yeSk7XG59XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIGNvbXBvbmVudEZhY3RvcnkgZm9yIHRoZSBnaXZlbiBjb21wb25lbnQsXG4gKiB3YWl0cyBmb3IgYXN5bmNocm9ub3VzIGluaXRpYWxpemVycyBhbmQgYm9vdHN0cmFwcyB0aGUgY29tcG9uZW50LlxuICogUmVxdWlyZXMgYSBwbGF0Zm9ybSB0aGUgYmUgY3JlYXRlZCBmaXJzdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcmVMb2FkQW5kQm9vdHN0cmFwKGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlOiBUeXBlKTogUHJvbWlzZTxDb21wb25lbnRSZWY+IHtcbiAgdmFyIGFwcFJlZjogQXBwbGljYXRpb25SZWYgPSBpbmplY3Rvci5nZXQoQXBwbGljYXRpb25SZWYpO1xuICByZXR1cm4gYXBwUmVmLnJ1bigoKSA9PiB7XG4gICAgdmFyIGNvbXBvbmVudFJlc29sdmVyOiBDb21wb25lbnRSZXNvbHZlciA9IGluamVjdG9yLmdldChDb21wb25lbnRSZXNvbHZlcik7XG4gICAgcmV0dXJuIFByb21pc2VXcmFwcGVyXG4gICAgICAgIC5hbGwoW2NvbXBvbmVudFJlc29sdmVyLnJlc29sdmVDb21wb25lbnQoY29tcG9uZW50VHlwZSksIGFwcFJlZi53YWl0Rm9yQXN5bmNJbml0aWFsaXplcnMoKV0pXG4gICAgICAgIC50aGVuKChhcnIpID0+IGFwcFJlZi5ib290c3RyYXAoYXJyWzBdKSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRoZSBBbmd1bGFyIHBsYXRmb3JtIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgQW5ndWxhciBvbiBhIHdlYiBwYWdlLiBFYWNoIHBhZ2VcbiAqIGhhcyBleGFjdGx5IG9uZSBwbGF0Zm9ybSwgYW5kIHNlcnZpY2VzIChzdWNoIGFzIHJlZmxlY3Rpb24pIHdoaWNoIGFyZSBjb21tb25cbiAqIHRvIGV2ZXJ5IEFuZ3VsYXIgYXBwbGljYXRpb24gcnVubmluZyBvbiB0aGUgcGFnZSBhcmUgYm91bmQgaW4gaXRzIHNjb3BlLlxuICpcbiAqIEEgcGFnZSdzIHBsYXRmb3JtIGlzIGluaXRpYWxpemVkIGltcGxpY2l0bHkgd2hlbiB7QGxpbmsgYm9vdHN0cmFwfSgpIGlzIGNhbGxlZCwgb3JcbiAqIGV4cGxpY2l0bHkgYnkgY2FsbGluZyB7QGxpbmsgY3JlYXRlUGxhdGZvcm19KCkuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQbGF0Zm9ybVJlZiB7XG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGxpc3RlbmVyIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBwbGF0Zm9ybSBpcyBkaXNwb3NlZC5cbiAgICovXG4gIGFic3RyYWN0IHJlZ2lzdGVyRGlzcG9zZUxpc3RlbmVyKGRpc3Bvc2U6ICgpID0+IHZvaWQpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgcGxhdGZvcm0ge0BsaW5rIEluamVjdG9yfSwgd2hpY2ggaXMgdGhlIHBhcmVudCBpbmplY3RvciBmb3JcbiAgICogZXZlcnkgQW5ndWxhciBhcHBsaWNhdGlvbiBvbiB0aGUgcGFnZSBhbmQgcHJvdmlkZXMgc2luZ2xldG9uIHByb3ZpZGVycy5cbiAgICovXG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHRocm93IHVuaW1wbGVtZW50ZWQoKTsgfTtcblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgQW5ndWxhciBwbGF0Zm9ybSBhbmQgYWxsIEFuZ3VsYXIgYXBwbGljYXRpb25zIG9uIHRoZSBwYWdlLlxuICAgKi9cbiAgYWJzdHJhY3QgZGlzcG9zZSgpOiB2b2lkO1xuXG4gIGdldCBkaXNwb3NlZCgpOiBib29sZWFuIHsgdGhyb3cgdW5pbXBsZW1lbnRlZCgpOyB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybVJlZl8gZXh0ZW5kcyBQbGF0Zm9ybVJlZiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FwcGxpY2F0aW9uczogQXBwbGljYXRpb25SZWZbXSA9IFtdO1xuICAvKiogQGludGVybmFsICovXG4gIF9kaXNwb3NlTGlzdGVuZXJzOiBGdW5jdGlvbltdID0gW107XG5cbiAgcHJpdmF0ZSBfZGlzcG9zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICghX2luUGxhdGZvcm1DcmVhdGUpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdQbGF0Zm9ybXMgaGF2ZSB0byBiZSBjcmVhdGVkIHZpYSBgY3JlYXRlUGxhdGZvcm1gIScpO1xuICAgIH1cbiAgICBsZXQgaW5pdHM6IEZ1bmN0aW9uW10gPSA8RnVuY3Rpb25bXT5faW5qZWN0b3IuZ2V0KFBMQVRGT1JNX0lOSVRJQUxJWkVSLCBudWxsKTtcbiAgICBpZiAoaXNQcmVzZW50KGluaXRzKSkgaW5pdHMuZm9yRWFjaChpbml0ID0+IGluaXQoKSk7XG4gIH1cblxuICByZWdpc3RlckRpc3Bvc2VMaXN0ZW5lcihkaXNwb3NlOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX2Rpc3Bvc2VMaXN0ZW5lcnMucHVzaChkaXNwb3NlKTsgfVxuXG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiB0aGlzLl9pbmplY3RvcjsgfVxuXG4gIGdldCBkaXNwb3NlZCgpIHsgcmV0dXJuIHRoaXMuX2Rpc3Bvc2VkOyB9XG5cbiAgYWRkQXBwbGljYXRpb24oYXBwUmVmOiBBcHBsaWNhdGlvblJlZikgeyB0aGlzLl9hcHBsaWNhdGlvbnMucHVzaChhcHBSZWYpOyB9XG5cbiAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBMaXN0V3JhcHBlci5jbG9uZSh0aGlzLl9hcHBsaWNhdGlvbnMpLmZvckVhY2goKGFwcCkgPT4gYXBwLmRpc3Bvc2UoKSk7XG4gICAgdGhpcy5fZGlzcG9zZUxpc3RlbmVycy5mb3JFYWNoKChkaXNwb3NlKSA9PiBkaXNwb3NlKCkpO1xuICAgIHRoaXMuX2Rpc3Bvc2VkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FwcGxpY2F0aW9uRGlzcG9zZWQoYXBwOiBBcHBsaWNhdGlvblJlZik6IHZvaWQgeyBMaXN0V3JhcHBlci5yZW1vdmUodGhpcy5fYXBwbGljYXRpb25zLCBhcHApOyB9XG59XG5cbi8qKlxuICogQSByZWZlcmVuY2UgdG8gYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBydW5uaW5nIG9uIGEgcGFnZS5cbiAqXG4gKiBGb3IgbW9yZSBhYm91dCBBbmd1bGFyIGFwcGxpY2F0aW9ucywgc2VlIHRoZSBkb2N1bWVudGF0aW9uIGZvciB7QGxpbmsgYm9vdHN0cmFwfS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFwcGxpY2F0aW9uUmVmIHtcbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgbGlzdGVuZXIgdG8gYmUgY2FsbGVkIGVhY2ggdGltZSBgYm9vdHN0cmFwKClgIGlzIGNhbGxlZCB0byBib290c3RyYXBcbiAgICogYSBuZXcgcm9vdCBjb21wb25lbnQuXG4gICAqL1xuICBhYnN0cmFjdCByZWdpc3RlckJvb3RzdHJhcExpc3RlbmVyKGxpc3RlbmVyOiAocmVmOiBDb21wb25lbnRSZWYpID0+IHZvaWQpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGxpc3RlbmVyIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBhcHBsaWNhdGlvbiBpcyBkaXNwb3NlZC5cbiAgICovXG4gIGFic3RyYWN0IHJlZ2lzdGVyRGlzcG9zZUxpc3RlbmVyKGRpc3Bvc2U6ICgpID0+IHZvaWQpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gYWxsIGFzeW5jaHJvbm91cyBhcHBsaWNhdGlvbiBpbml0aWFsaXplcnNcbiAgICogYXJlIGRvbmUuXG4gICAqL1xuICBhYnN0cmFjdCB3YWl0Rm9yQXN5bmNJbml0aWFsaXplcnMoKTogUHJvbWlzZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBSdW5zIHRoZSBnaXZlbiBjYWxsYmFjayBpbiB0aGUgem9uZSBhbmQgcmV0dXJucyB0aGUgcmVzdWx0IG9mIHRoZSBjYWxsYmFjay5cbiAgICogRXhjZXB0aW9ucyB3aWxsIGJlIGZvcndhcmRlZCB0byB0aGUgRXhjZXB0aW9uSGFuZGxlciBhbmQgcmV0aHJvd24uXG4gICAqL1xuICBhYnN0cmFjdCBydW4oY2FsbGJhY2s6IEZ1bmN0aW9uKTogYW55O1xuXG4gIC8qKlxuICAgKiBCb290c3RyYXAgYSBuZXcgY29tcG9uZW50IGF0IHRoZSByb290IGxldmVsIG9mIHRoZSBhcHBsaWNhdGlvbi5cbiAgICpcbiAgICogIyMjIEJvb3RzdHJhcCBwcm9jZXNzXG4gICAqXG4gICAqIFdoZW4gYm9vdHN0cmFwcGluZyBhIG5ldyByb290IGNvbXBvbmVudCBpbnRvIGFuIGFwcGxpY2F0aW9uLCBBbmd1bGFyIG1vdW50cyB0aGVcbiAgICogc3BlY2lmaWVkIGFwcGxpY2F0aW9uIGNvbXBvbmVudCBvbnRvIERPTSBlbGVtZW50cyBpZGVudGlmaWVkIGJ5IHRoZSBbY29tcG9uZW50VHlwZV0nc1xuICAgKiBzZWxlY3RvciBhbmQga2lja3Mgb2ZmIGF1dG9tYXRpYyBjaGFuZ2UgZGV0ZWN0aW9uIHRvIGZpbmlzaCBpbml0aWFsaXppbmcgdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICoge0BleGFtcGxlIGNvcmUvdHMvcGxhdGZvcm0vcGxhdGZvcm0udHMgcmVnaW9uPSdsb25nZm9ybSd9XG4gICAqL1xuICBhYnN0cmFjdCBib290c3RyYXAoY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeSk6IENvbXBvbmVudFJlZjtcblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIGFwcGxpY2F0aW9uIHtAbGluayBJbmplY3Rvcn0uXG4gICAqL1xuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gPEluamVjdG9yPnVuaW1wbGVtZW50ZWQoKTsgfTtcblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIGFwcGxpY2F0aW9uIHtAbGluayBOZ1pvbmV9LlxuICAgKi9cbiAgZ2V0IHpvbmUoKTogTmdab25lIHsgcmV0dXJuIDxOZ1pvbmU+dW5pbXBsZW1lbnRlZCgpOyB9O1xuXG4gIC8qKlxuICAgKiBEaXNwb3NlIG9mIHRoaXMgYXBwbGljYXRpb24gYW5kIGFsbCBvZiBpdHMgY29tcG9uZW50cy5cbiAgICovXG4gIGFic3RyYWN0IGRpc3Bvc2UoKTogdm9pZDtcblxuICAvKipcbiAgICogSW52b2tlIHRoaXMgbWV0aG9kIHRvIGV4cGxpY2l0bHkgcHJvY2VzcyBjaGFuZ2UgZGV0ZWN0aW9uIGFuZCBpdHMgc2lkZS1lZmZlY3RzLlxuICAgKlxuICAgKiBJbiBkZXZlbG9wbWVudCBtb2RlLCBgdGljaygpYCBhbHNvIHBlcmZvcm1zIGEgc2Vjb25kIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgdG8gZW5zdXJlIHRoYXQgbm9cbiAgICogZnVydGhlciBjaGFuZ2VzIGFyZSBkZXRlY3RlZC4gSWYgYWRkaXRpb25hbCBjaGFuZ2VzIGFyZSBwaWNrZWQgdXAgZHVyaW5nIHRoaXMgc2Vjb25kIGN5Y2xlLFxuICAgKiBiaW5kaW5ncyBpbiB0aGUgYXBwIGhhdmUgc2lkZS1lZmZlY3RzIHRoYXQgY2Fubm90IGJlIHJlc29sdmVkIGluIGEgc2luZ2xlIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogcGFzcy5cbiAgICogSW4gdGhpcyBjYXNlLCBBbmd1bGFyIHRocm93cyBhbiBlcnJvciwgc2luY2UgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBjYW4gb25seSBoYXZlIG9uZSBjaGFuZ2VcbiAgICogZGV0ZWN0aW9uIHBhc3MgZHVyaW5nIHdoaWNoIGFsbCBjaGFuZ2UgZGV0ZWN0aW9uIG11c3QgY29tcGxldGUuXG4gICAqL1xuICBhYnN0cmFjdCB0aWNrKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEdldCBhIGxpc3Qgb2YgY29tcG9uZW50IHR5cGVzIHJlZ2lzdGVyZWQgdG8gdGhpcyBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGdldCBjb21wb25lbnRUeXBlcygpOiBUeXBlW10geyByZXR1cm4gPFR5cGVbXT51bmltcGxlbWVudGVkKCk7IH07XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvblJlZl8gZXh0ZW5kcyBBcHBsaWNhdGlvblJlZiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgc3RhdGljIF90aWNrU2NvcGU6IFd0ZlNjb3BlRm4gPSB3dGZDcmVhdGVTY29wZSgnQXBwbGljYXRpb25SZWYjdGljaygpJyk7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9ib290c3RyYXBMaXN0ZW5lcnM6IEZ1bmN0aW9uW10gPSBbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9kaXNwb3NlTGlzdGVuZXJzOiBGdW5jdGlvbltdID0gW107XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfcm9vdENvbXBvbmVudHM6IENvbXBvbmVudFJlZltdID0gW107XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfcm9vdENvbXBvbmVudFR5cGVzOiBUeXBlW10gPSBbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZnM6IENoYW5nZURldGVjdG9yUmVmW10gPSBbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9ydW5uaW5nVGljazogYm9vbGVhbiA9IGZhbHNlO1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgX2VuZm9yY2VOb05ld0NoYW5nZXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9leGNlcHRpb25IYW5kbGVyOiBFeGNlcHRpb25IYW5kbGVyO1xuXG4gIHByaXZhdGUgX2FzeW5jSW5pdERvbmVQcm9taXNlOiBQcm9taXNlPGFueT47XG4gIHByaXZhdGUgX2FzeW5jSW5pdERvbmU6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtUmVmXywgcHJpdmF0ZSBfem9uZTogTmdab25lLCBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICBzdXBlcigpO1xuICAgIHZhciB6b25lOiBOZ1pvbmUgPSBfaW5qZWN0b3IuZ2V0KE5nWm9uZSk7XG4gICAgdGhpcy5fZW5mb3JjZU5vTmV3Q2hhbmdlcyA9IGFzc2VydGlvbnNFbmFibGVkKCk7XG4gICAgem9uZS5ydW4oKCkgPT4geyB0aGlzLl9leGNlcHRpb25IYW5kbGVyID0gX2luamVjdG9yLmdldChFeGNlcHRpb25IYW5kbGVyKTsgfSk7XG4gICAgdGhpcy5fYXN5bmNJbml0RG9uZVByb21pc2UgPSB0aGlzLnJ1bigoKSA9PiB7XG4gICAgICBsZXQgaW5pdHM6IEZ1bmN0aW9uW10gPSBfaW5qZWN0b3IuZ2V0KEFQUF9JTklUSUFMSVpFUiwgbnVsbCk7XG4gICAgICB2YXIgYXN5bmNJbml0UmVzdWx0cyA9IFtdO1xuICAgICAgdmFyIGFzeW5jSW5pdERvbmVQcm9taXNlO1xuICAgICAgaWYgKGlzUHJlc2VudChpbml0cykpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBpbml0UmVzdWx0ID0gaW5pdHNbaV0oKTtcbiAgICAgICAgICBpZiAoaXNQcm9taXNlKGluaXRSZXN1bHQpKSB7XG4gICAgICAgICAgICBhc3luY0luaXRSZXN1bHRzLnB1c2goaW5pdFJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYXN5bmNJbml0UmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFzeW5jSW5pdERvbmVQcm9taXNlID1cbiAgICAgICAgICAgIFByb21pc2VXcmFwcGVyLmFsbChhc3luY0luaXRSZXN1bHRzKS50aGVuKChfKSA9PiB0aGlzLl9hc3luY0luaXREb25lID0gdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2FzeW5jSW5pdERvbmUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2FzeW5jSW5pdERvbmUgPSB0cnVlO1xuICAgICAgICBhc3luY0luaXREb25lUHJvbWlzZSA9IFByb21pc2VXcmFwcGVyLnJlc29sdmUodHJ1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXN5bmNJbml0RG9uZVByb21pc2U7XG4gICAgfSk7XG4gICAgT2JzZXJ2YWJsZVdyYXBwZXIuc3Vic2NyaWJlKHpvbmUub25FcnJvciwgKGVycm9yOiBOZ1pvbmVFcnJvcikgPT4ge1xuICAgICAgdGhpcy5fZXhjZXB0aW9uSGFuZGxlci5jYWxsKGVycm9yLmVycm9yLCBlcnJvci5zdGFja1RyYWNlKTtcbiAgICB9KTtcbiAgICBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUodGhpcy5fem9uZS5vbk1pY3JvdGFza0VtcHR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXykgPT4geyB0aGlzLl96b25lLnJ1bigoKSA9PiB7IHRoaXMudGljaygpOyB9KTsgfSk7XG4gIH1cblxuICByZWdpc3RlckJvb3RzdHJhcExpc3RlbmVyKGxpc3RlbmVyOiAocmVmOiBDb21wb25lbnRSZWYpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9ib290c3RyYXBMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gIH1cblxuICByZWdpc3RlckRpc3Bvc2VMaXN0ZW5lcihkaXNwb3NlOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX2Rpc3Bvc2VMaXN0ZW5lcnMucHVzaChkaXNwb3NlKTsgfVxuXG4gIHJlZ2lzdGVyQ2hhbmdlRGV0ZWN0b3IoY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKTogdm9pZCB7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWZzLnB1c2goY2hhbmdlRGV0ZWN0b3IpO1xuICB9XG5cbiAgdW5yZWdpc3RlckNoYW5nZURldGVjdG9yKGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZik6IHZvaWQge1xuICAgIExpc3RXcmFwcGVyLnJlbW92ZSh0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZnMsIGNoYW5nZURldGVjdG9yKTtcbiAgfVxuXG4gIHdhaXRGb3JBc3luY0luaXRpYWxpemVycygpOiBQcm9taXNlPGFueT4geyByZXR1cm4gdGhpcy5fYXN5bmNJbml0RG9uZVByb21pc2U7IH1cblxuICBydW4oY2FsbGJhY2s6IEZ1bmN0aW9uKTogYW55IHtcbiAgICB2YXIgem9uZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KE5nWm9uZSk7XG4gICAgdmFyIHJlc3VsdDtcbiAgICAvLyBOb3RlOiBEb24ndCB1c2Ugem9uZS5ydW5HdWFyZGVkIGFzIHdlIHdhbnQgdG8ga25vdyBhYm91dFxuICAgIC8vIHRoZSB0aHJvd24gZXhjZXB0aW9uIVxuICAgIC8vIE5vdGU6IHRoZSBjb21wbGV0ZXIgbmVlZHMgdG8gYmUgY3JlYXRlZCBvdXRzaWRlXG4gICAgLy8gb2YgYHpvbmUucnVuYCBhcyBEYXJ0IHN3YWxsb3dzIHJlamVjdGVkIHByb21pc2VzXG4gICAgLy8gdmlhIHRoZSBvbkVycm9yIGNhbGxiYWNrIG9mIHRoZSBwcm9taXNlLlxuICAgIHZhciBjb21wbGV0ZXIgPSBQcm9taXNlV3JhcHBlci5jb21wbGV0ZXIoKTtcbiAgICB6b25lLnJ1bigoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBjYWxsYmFjaygpO1xuICAgICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgICBQcm9taXNlV3JhcHBlci50aGVuKHJlc3VsdCwgKHJlZikgPT4geyBjb21wbGV0ZXIucmVzb2x2ZShyZWYpOyB9LCAoZXJyLCBzdGFja1RyYWNlKSA9PiB7XG4gICAgICAgICAgICBjb21wbGV0ZXIucmVqZWN0KGVyciwgc3RhY2tUcmFjZSk7XG4gICAgICAgICAgICB0aGlzLl9leGNlcHRpb25IYW5kbGVyLmNhbGwoZXJyLCBzdGFja1RyYWNlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLl9leGNlcHRpb25IYW5kbGVyLmNhbGwoZSwgZS5zdGFjayk7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGlzUHJvbWlzZShyZXN1bHQpID8gY29tcGxldGVyLnByb21pc2UgOiByZXN1bHQ7XG4gIH1cblxuICBib290c3RyYXAoY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeSk6IENvbXBvbmVudFJlZiB7XG4gICAgaWYgKCF0aGlzLl9hc3luY0luaXREb25lKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAnQ2Fubm90IGJvb3RzdHJhcCBhcyB0aGVyZSBhcmUgc3RpbGwgYXN5bmNocm9ub3VzIGluaXRpYWxpemVycyBydW5uaW5nLiBXYWl0IGZvciB0aGVtIHVzaW5nIHdhaXRGb3JBc3luY0luaXRpYWxpemVycygpLicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy5fcm9vdENvbXBvbmVudFR5cGVzLnB1c2goY29tcG9uZW50RmFjdG9yeS5jb21wb25lbnRUeXBlKTtcbiAgICAgIHZhciBjb21wUmVmID0gY29tcG9uZW50RmFjdG9yeS5jcmVhdGUodGhpcy5faW5qZWN0b3IsIFtdLCBjb21wb25lbnRGYWN0b3J5LnNlbGVjdG9yKTtcbiAgICAgIGNvbXBSZWYub25EZXN0cm95KCgpID0+IHsgdGhpcy5fdW5sb2FkQ29tcG9uZW50KGNvbXBSZWYpOyB9KTtcbiAgICAgIHZhciB0ZXN0YWJpbGl0eSA9IGNvbXBSZWYuaW5qZWN0b3IuZ2V0KFRlc3RhYmlsaXR5LCBudWxsKTtcbiAgICAgIGlmIChpc1ByZXNlbnQodGVzdGFiaWxpdHkpKSB7XG4gICAgICAgIGNvbXBSZWYuaW5qZWN0b3IuZ2V0KFRlc3RhYmlsaXR5UmVnaXN0cnkpXG4gICAgICAgICAgICAucmVnaXN0ZXJBcHBsaWNhdGlvbihjb21wUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRlc3RhYmlsaXR5KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fbG9hZENvbXBvbmVudChjb21wUmVmKTtcbiAgICAgIGxldCBjID0gdGhpcy5faW5qZWN0b3IuZ2V0KENvbnNvbGUpO1xuICAgICAgaWYgKGFzc2VydGlvbnNFbmFibGVkKCkpIHtcbiAgICAgICAgYy5sb2coXG4gICAgICAgICAgICBcIkFuZ3VsYXIgMiBpcyBydW5uaW5nIGluIHRoZSBkZXZlbG9wbWVudCBtb2RlLiBDYWxsIGVuYWJsZVByb2RNb2RlKCkgdG8gZW5hYmxlIHRoZSBwcm9kdWN0aW9uIG1vZGUuXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbXBSZWY7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9sb2FkQ29tcG9uZW50KGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmKTogdm9pZCB7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWZzLnB1c2goY29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB0aGlzLnRpY2soKTtcbiAgICB0aGlzLl9yb290Q29tcG9uZW50cy5wdXNoKGNvbXBvbmVudFJlZik7XG4gICAgdGhpcy5fYm9vdHN0cmFwTGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcihjb21wb25lbnRSZWYpKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3VubG9hZENvbXBvbmVudChjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZik6IHZvaWQge1xuICAgIGlmICghTGlzdFdyYXBwZXIuY29udGFpbnModGhpcy5fcm9vdENvbXBvbmVudHMsIGNvbXBvbmVudFJlZikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy51bnJlZ2lzdGVyQ2hhbmdlRGV0ZWN0b3IoY29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmKTtcbiAgICBMaXN0V3JhcHBlci5yZW1vdmUodGhpcy5fcm9vdENvbXBvbmVudHMsIGNvbXBvbmVudFJlZik7XG4gIH1cblxuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gdGhpcy5faW5qZWN0b3I7IH1cblxuICBnZXQgem9uZSgpOiBOZ1pvbmUgeyByZXR1cm4gdGhpcy5fem9uZTsgfVxuXG4gIHRpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3J1bm5pbmdUaWNrKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIkFwcGxpY2F0aW9uUmVmLnRpY2sgaXMgY2FsbGVkIHJlY3Vyc2l2ZWx5XCIpO1xuICAgIH1cblxuICAgIHZhciBzID0gQXBwbGljYXRpb25SZWZfLl90aWNrU2NvcGUoKTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5fcnVubmluZ1RpY2sgPSB0cnVlO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWZzLmZvckVhY2goKGRldGVjdG9yKSA9PiBkZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCkpO1xuICAgICAgaWYgKHRoaXMuX2VuZm9yY2VOb05ld0NoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWZzLmZvckVhY2goKGRldGVjdG9yKSA9PiBkZXRlY3Rvci5jaGVja05vQ2hhbmdlcygpKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5fcnVubmluZ1RpY2sgPSBmYWxzZTtcbiAgICAgIHd0ZkxlYXZlKHMpO1xuICAgIH1cbiAgfVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgLy8gVE9ETyhhbHhodWIpOiBEaXNwb3NlIG9mIHRoZSBOZ1pvbmUuXG4gICAgTGlzdFdyYXBwZXIuY2xvbmUodGhpcy5fcm9vdENvbXBvbmVudHMpLmZvckVhY2goKHJlZikgPT4gcmVmLmRlc3Ryb3koKSk7XG4gICAgdGhpcy5fZGlzcG9zZUxpc3RlbmVycy5mb3JFYWNoKChkaXNwb3NlKSA9PiBkaXNwb3NlKCkpO1xuICAgIHRoaXMuX3BsYXRmb3JtLl9hcHBsaWNhdGlvbkRpc3Bvc2VkKHRoaXMpO1xuICB9XG5cbiAgZ2V0IGNvbXBvbmVudFR5cGVzKCk6IFR5cGVbXSB7IHJldHVybiB0aGlzLl9yb290Q29tcG9uZW50VHlwZXM7IH1cbn1cblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IFBMQVRGT1JNX0NPUkVfUFJPVklERVJTID1cbiAgICBDT05TVF9FWFBSKFtQbGF0Zm9ybVJlZl8sIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKFBsYXRmb3JtUmVmLCB7dXNlRXhpc3Rpbmc6IFBsYXRmb3JtUmVmX30pKV0pO1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgQVBQTElDQVRJT05fQ09SRV9QUk9WSURFUlMgPSBDT05TVF9FWFBSKFtcbiAgQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoTmdab25lLCB7dXNlRmFjdG9yeTogY3JlYXRlTmdab25lLCBkZXBzOiBDT05TVF9FWFBSKFtdKX0pKSxcbiAgQXBwbGljYXRpb25SZWZfLFxuICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihBcHBsaWNhdGlvblJlZiwge3VzZUV4aXN0aW5nOiBBcHBsaWNhdGlvblJlZl99KSlcbl0pO1xuIl19