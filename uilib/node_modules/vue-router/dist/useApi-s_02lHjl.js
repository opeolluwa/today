/*!
* vue-router v5.1.0
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
import { inject } from "vue";
//#region src/utils/env.ts
const isBrowser = typeof document !== "undefined";
//#endregion
//#region src/utils/index.ts
/**
* Identity function that returns the value as is.
*
* @param v - the value to return
*
* @internal
*/
const identityFn = (v) => v;
/**
* Allows differentiating lazy components from functional components and vue-class-component
* @internal
*
* @param component
*/
function isRouteComponent(component) {
	return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
	return obj.__esModule || obj[Symbol.toStringTag] === "Module" || obj.default && isRouteComponent(obj.default);
}
const assign = Object.assign;
function applyToParams(fn, params) {
	const newParams = {};
	for (const key in params) {
		const value = params[key];
		newParams[key] = isArray(value) ? value.map(fn) : fn(value);
	}
	return newParams;
}
const noop = () => {};
/**
* Typesafe alternative to Array.isArray
* https://github.com/microsoft/TypeScript/pull/48228
*
* @internal
*/
const isArray = Array.isArray;
function mergeOptions(defaults, partialOptions) {
	const options = {};
	for (const key in defaults) options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
	return options;
}
//#endregion
//#region src/errors.ts
const NavigationFailureSymbol = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
/**
* Enumeration with all possible types for navigation failures. Can be passed to
* {@link isNavigationFailure} to check for specific failures.
*/
let NavigationFailureType = /* @__PURE__ */ function(NavigationFailureType) {
	/**
	* An aborted navigation is a navigation that failed because a navigation
	* guard returned `false` or called `next(false)`
	*/
	NavigationFailureType[NavigationFailureType["aborted"] = 4] = "aborted";
	/**
	* A cancelled navigation is a navigation that failed because a more recent
	* navigation finished started (not necessarily finished).
	*/
	NavigationFailureType[NavigationFailureType["cancelled"] = 8] = "cancelled";
	/**
	* A duplicated navigation is a navigation that failed because it was
	* initiated while already being at the exact same location.
	*/
	NavigationFailureType[NavigationFailureType["duplicated"] = 16] = "duplicated";
	return NavigationFailureType;
}({});
const ErrorTypeMessages = {
	[1]({ location, currentLocation }) {
		return `No match for\n ${JSON.stringify(location)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
	},
	[2]({ from, to }) {
		return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
	},
	[4]({ from, to }) {
		return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
	},
	[8]({ from, to }) {
		return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
	},
	[16]({ from, to: _to }) {
		return `Avoided redundant navigation to current location: "${from.fullPath}".`;
	}
};
/**
* Creates a typed NavigationFailure object.
* @internal
* @param type - NavigationFailureType
* @param params - { from, to }
*/
function createRouterError(type, params) {
	if (process.env.NODE_ENV !== "production" || false) return assign(new Error(ErrorTypeMessages[type](params)), {
		type,
		[NavigationFailureSymbol]: true
	}, params);
	else return assign(/* @__PURE__ */ new Error(), {
		type,
		[NavigationFailureSymbol]: true
	}, params);
}
function isNavigationFailure(error, type) {
	return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const propertiesToLog = [
	"params",
	"query",
	"hash"
];
function stringifyRoute(to) {
	if (typeof to === "string") return to;
	if (to.path != null) return to.path;
	const location = {};
	for (const key of propertiesToLog) if (key in to) location[key] = to[key];
	return JSON.stringify(location, null, 2);
}
//#endregion
//#region src/injectionSymbols.ts
/**
* RouteRecord being rendered by the closest ancestor Router View. Used for
* `onBeforeRouteUpdate` and `onBeforeRouteLeave`. rvlm stands for Router View
* Location Matched
*
* @internal
*/
const matchedRouteKey = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
/**
* Allows overriding the router view depth to control which component in
* `matched` is rendered. rvd stands for Router View Depth
*
* @internal
*/
const viewDepthKey = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
/**
* Allows overriding the router instance returned by `useRouter` in tests. r
* stands for router
*
* @internal
*/
const routerKey = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
/**
* Allows overriding the current route returned by `useRoute` in tests. rl
* stands for route location
*
* @internal
*/
const routeLocationKey = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
/**
* Allows overriding the current route used by router-view. Internally this is
* used when the `route` prop is passed.
*
* @internal
*/
const routerViewLocationKey = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
//#endregion
//#region src/useApi.ts
/**
* Returns the router instance. Equivalent to using `$router` inside
* templates.
*/
function useRouter() {
	return inject(routerKey);
}
/**
* Returns the current route location. Equivalent to using `$route` inside
* templates.
*/
function useRoute(_name) {
	return inject(routeLocationKey);
}
//#endregion
export { mergeOptions as _, routerKey as a, NavigationFailureType as c, applyToParams as d, assign as f, isRouteComponent as g, isESModule as h, routeLocationKey as i, createRouterError as l, isArray as m, useRouter as n, routerViewLocationKey as o, identityFn as p, matchedRouteKey as r, viewDepthKey as s, useRoute as t, isNavigationFailure as u, noop as v, isBrowser as y };
