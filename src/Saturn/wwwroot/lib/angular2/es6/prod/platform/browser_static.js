export * from 'angular2/src/core/angular_entrypoint';
export { BROWSER_PROVIDERS, ELEMENT_PROBE_PROVIDERS, ELEMENT_PROBE_PROVIDERS_PROD_MODE, inspectNativeElement, BrowserDomAdapter, By, Title, enableDebugTools, disableDebugTools } from 'angular2/src/platform/browser_common';
import { isPresent, isBlank } from 'angular2/src/facade/lang';
import { BROWSER_PROVIDERS, BROWSER_APP_COMMON_PROVIDERS, BROWSER_PLATFORM_MARKER } from 'angular2/src/platform/browser_common';
import { coreLoadAndBootstrap, ReflectiveInjector, getPlatform, createPlatform, assertPlatform } from 'angular2/core';
/**
 * An array of providers that should be passed into `application()` when bootstrapping a component
 * when all templates
 * have been precompiled offline.
 */
export const BROWSER_APP_PROVIDERS = BROWSER_APP_COMMON_PROVIDERS;
export function browserStaticPlatform() {
    if (isBlank(getPlatform())) {
        createPlatform(ReflectiveInjector.resolveAndCreate(BROWSER_PROVIDERS));
    }
    return assertPlatform(BROWSER_PLATFORM_MARKER);
}
/**
 * See {@link bootstrap} for more information.
 */
export function bootstrapStatic(appComponentType, customProviders, initReflector) {
    if (isPresent(initReflector)) {
        initReflector();
    }
    let appProviders = isPresent(customProviders) ? [BROWSER_APP_PROVIDERS, customProviders] : BROWSER_APP_PROVIDERS;
    var appInjector = ReflectiveInjector.resolveAndCreate(appProviders, browserStaticPlatform().injector);
    return coreLoadAndBootstrap(appInjector, appComponentType);
}
