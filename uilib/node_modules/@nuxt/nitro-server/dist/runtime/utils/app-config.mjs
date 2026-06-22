import { klona } from "klona";
// @ts-expect-error virtual file
import _inlineAppConfig from "#internal/nuxt/app-config";

const _sharedAppConfig = _deepFreeze(klona(_inlineAppConfig));
export function useAppConfig(event) {
	
	if (!event) {
		return _sharedAppConfig;
	}
	event.context.nuxt ||= {};
	
	if (event.context.nuxt.appConfig) {
		return event.context.nuxt.appConfig;
	}
	
	const appConfig = klona(_inlineAppConfig);
	event.context.nuxt.appConfig = appConfig;
	return appConfig;
}

function _deepFreeze(object) {
	const propNames = Object.getOwnPropertyNames(object);
	for (const name of propNames) {
		const value = object[name];
		if (value && typeof value === "object") {
			_deepFreeze(value);
		}
	}
	return Object.freeze(object);
}
