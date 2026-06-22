import { isPackageExists, resolveModule } from "local-pkg";
import pm from "picomatch";
import { createUnplugin } from "unplugin";
import { existsSync, promises, readFileSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import process from "node:process";
import MagicString from "magic-string";
import { builtinPresets, createUnimport, normalizeScanDirs, resolvePreset } from "unimport";
import { createFilter } from "unplugin-utils";

//#region node_modules/.pnpm/@antfu+utils@9.3.0/node_modules/@antfu/utils/dist/index.mjs
function toArray(array) {
	array = array ?? [];
	return Array.isArray(array) ? array : [array];
}
const isString = (val) => typeof val === "string";
function slash(str) {
	return str.replace(/\\/g, "/");
}
/**
* Throttle execution of a function. Especially useful for rate limiting
* execution of handlers on events like resize and scroll.
*
* @param {number} delay -                  A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher)
*                                            are most useful.
* @param {Function} callback -               A function to be executed after delay milliseconds. The `this` context and all arguments are passed through,
*                                            as-is, to `callback` when the throttled-function is executed.
* @param {object} [options] -              An object to configure options.
* @param {boolean} [options.noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds
*                                            while the throttled-function is being called. If noTrailing is false or unspecified, callback will be executed
*                                            one final time after the last throttled-function call. (After the throttled-function has not been called for
*                                            `delay` milliseconds, the internal counter is reset).
* @param {boolean} [options.noLeading] -   Optional, defaults to false. If noLeading is false, the first throttled-function call will execute callback
*                                            immediately. If noLeading is true, the first the callback execution will be skipped. It should be noted that
*                                            callback will never executed if both noLeading = true and noTrailing = true.
* @param {boolean} [options.debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is
*                                            false (at end), schedule `callback` to execute after `delay` ms.
*
* @returns {Function} A new, throttled, function.
*/
function throttle$1(delay, callback, options) {
	var _ref = options || {}, _ref$noTrailing = _ref.noTrailing, noTrailing = _ref$noTrailing === void 0 ? false : _ref$noTrailing, _ref$noLeading = _ref.noLeading, noLeading = _ref$noLeading === void 0 ? false : _ref$noLeading, _ref$debounceMode = _ref.debounceMode, debounceMode = _ref$debounceMode === void 0 ? void 0 : _ref$debounceMode;
	var timeoutID;
	var cancelled = false;
	var lastExec = 0;
	function clearExistingTimeout() {
		if (timeoutID) clearTimeout(timeoutID);
	}
	function cancel(options$1) {
		var _ref2$upcomingOnly = (options$1 || {}).upcomingOnly, upcomingOnly = _ref2$upcomingOnly === void 0 ? false : _ref2$upcomingOnly;
		clearExistingTimeout();
		cancelled = !upcomingOnly;
	}
	function wrapper() {
		for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) arguments_[_key] = arguments[_key];
		var self = this;
		var elapsed = Date.now() - lastExec;
		if (cancelled) return;
		function exec() {
			lastExec = Date.now();
			callback.apply(self, arguments_);
		}
		function clear() {
			timeoutID = void 0;
		}
		if (!noLeading && debounceMode && !timeoutID) exec();
		clearExistingTimeout();
		if (debounceMode === void 0 && elapsed > delay) if (noLeading) {
			lastExec = Date.now();
			if (!noTrailing) timeoutID = setTimeout(debounceMode ? clear : exec, delay);
		} else exec();
		else if (noTrailing !== true) timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === void 0 ? delay - elapsed : delay);
	}
	wrapper.cancel = cancel;
	return wrapper;
}
function throttle(...args) {
	return throttle$1(...args);
}

//#endregion
//#region src/presets/ahooks.ts
let _cache$2;
var ahooks_default = () => {
	if (!_cache$2) {
		let indexesJson;
		try {
			const path = resolveModule("ahooks/metadata.json");
			indexesJson = JSON.parse(readFileSync(path, "utf-8"));
		} catch (error) {
			console.error(error);
			throw new Error("[auto-import] failed to load ahooks, have you installed it?");
		}
		if (indexesJson) _cache$2 = { ahooks: indexesJson.functions.flatMap((i) => [i.name, ...i.alias || []]) };
	}
	return _cache$2 || {};
};

//#endregion
//#region src/presets/jotai.ts
const jotai = { jotai: [
	"atom",
	"useAtom",
	"useAtomValue",
	"useSetAtom"
] };
const jotaiUtils = { "jotai/utils": [
	"atomWithReset",
	"useResetAtom",
	"useReducerAtom",
	"atomWithReducer",
	"atomFamily",
	"selectAtom",
	"useAtomCallback",
	"freezeAtom",
	"freezeAtomCreator",
	"splitAtom",
	"atomWithDefault",
	"waitForAll",
	"atomWithStorage",
	"atomWithHash",
	"createJSONStorage",
	"atomWithObservable",
	"useHydrateAtoms",
	"loadable"
] };

//#endregion
//#region src/presets/mobx.ts
const mobx = [
	"makeObservable",
	"makeAutoObservable",
	"extendObservable",
	"observable",
	"action",
	"runInAction",
	"flow",
	"flowResult",
	"computed",
	"autorun",
	"reaction",
	"when",
	"onReactionError",
	"intercept",
	"observe",
	"onBecomeObserved",
	"onBecomeUnobserved",
	"toJS"
];
var mobx_default = { mobx: [...mobx] };

//#endregion
//#region src/presets/mobx-react-lite.ts
var mobx_react_lite_default = { "mobx-react-lite": [
	"observer",
	"Observer",
	"useLocalObservable"
] };

//#endregion
//#region src/presets/preact.ts
var preact_default = { "preact/hooks": [
	"useState",
	"useCallback",
	"useMemo",
	"useEffect",
	"useRef",
	"useContext",
	"useReducer"
] };

//#endregion
//#region src/presets/quasar.ts
var quasar_default = { quasar: [
	"useQuasar",
	"useDialogPluginComponent",
	"useFormChild",
	"useMeta"
] };

//#endregion
//#region src/presets/react.ts
const CommonReactAPI = [
	"useState",
	"useCallback",
	"useMemo",
	"useEffect",
	"useRef",
	"useContext",
	"useReducer",
	"useImperativeHandle",
	"useDebugValue",
	"useDeferredValue",
	"useLayoutEffect",
	"useTransition",
	"startTransition",
	"useSyncExternalStore",
	"useInsertionEffect",
	"useId",
	"lazy",
	"memo",
	"createRef",
	"forwardRef"
];
var react_default = { react: [
	...CommonReactAPI,
	"cache",
	"cacheSignal",
	"createContext",
	"use",
	"useOptimistic",
	"useEffectEvent",
	"useActionState",
	"Fragment",
	"Suspense",
	"Activity"
] };

//#endregion
//#region src/presets/react-dom.ts
var react_dom_default = { "react-dom": [
	"useFormStatus",
	"createPortal",
	"flushSync",
	"preconnect",
	"prefetchDNS",
	"preinit",
	"preinitModule",
	"preload",
	"preloadModule"
] };

//#endregion
//#region src/presets/react-i18next.ts
var react_i18next_default = { "react-i18next": ["useTranslation"] };

//#endregion
//#region src/presets/react-router.ts
/**
* Only compatible with React Router v6.
*/
const ReactRouterHooks = [
	"useOutletContext",
	"useHref",
	"useInRouterContext",
	"useLocation",
	"useNavigationType",
	"useNavigate",
	"useOutlet",
	"useParams",
	"useResolvedPath",
	"useRoutes"
];
var react_router_default = { "react-router": [...ReactRouterHooks] };

//#endregion
//#region src/presets/react-router-dom.ts
/**
* Only compatible with React Router Dom v6.
*/
var react_router_dom_default = { "react-router-dom": [
	...ReactRouterHooks,
	"useLinkClickHandler",
	"useSearchParams",
	"Link",
	"NavLink",
	"Navigate",
	"Outlet",
	"Route",
	"Routes"
] };

//#endregion
//#region src/presets/recoil.ts
var recoil_default = { recoil: [
	"atom",
	"selector",
	"useRecoilState",
	"useRecoilValue",
	"useSetRecoilState",
	"useResetRecoilState",
	"useRecoilStateLoadable",
	"useRecoilValueLoadable",
	"isRecoilValue",
	"useRecoilCallback"
] };

//#endregion
//#region src/presets/solid.ts
const solidCore = { "solid-js": [
	"createSignal",
	"createEffect",
	"createMemo",
	"createResource",
	"onMount",
	"onCleanup",
	"onError",
	"untrack",
	"batch",
	"on",
	"createRoot",
	"mergeProps",
	"splitProps",
	"useTransition",
	"observable",
	"mapArray",
	"indexArray",
	"createContext",
	"useContext",
	"children",
	"lazy",
	"createDeferred",
	"createRenderEffect",
	"createSelector",
	"For",
	"Show",
	"Switch",
	"Match",
	"Index",
	"ErrorBoundary",
	"Suspense",
	"SuspenseList"
] };
const solidStore = { "solid-js/store": [
	"createStore",
	"produce",
	"reconcile",
	"createMutable"
] };
const solidWeb = { "solid-js/web": [
	"Dynamic",
	"hydrate",
	"render",
	"renderToString",
	"renderToStringAsync",
	"renderToStream",
	"isServer",
	"Portal"
] };
var solid_default = {
	...solidCore,
	...solidStore,
	...solidWeb
};

//#endregion
//#region src/presets/solid-app-router.ts
var solid_app_router_default = { "solid-app-router": [
	"Link",
	"NavLink",
	"Navigate",
	"Outlet",
	"Route",
	"Router",
	"Routes",
	"_mergeSearchString",
	"createIntegration",
	"hashIntegration",
	"normalizeIntegration",
	"pathIntegration",
	"staticIntegration",
	"useHref",
	"useIsRouting",
	"useLocation",
	"useMatch",
	"useNavigate",
	"useParams",
	"useResolvedPath",
	"useRouteData",
	"useRoutes",
	"useSearchParams"
] };

//#endregion
//#region src/presets/solid-router.ts
var solid_router_default = { "@solidjs/router": [
	"A",
	"HashRouter",
	"MemoryRouter",
	"Navigate",
	"Route",
	"Router",
	"action",
	"createAsync",
	"createAsyncStore",
	"query",
	"revalidate",
	"useAction",
	"useSubmission",
	"useSubmissions",
	"useBeforeLeave",
	"useCurrentMatches",
	"useIsRouting",
	"useLocation",
	"useMatch",
	"useNavigate",
	"useParams",
	"usePreloadRoute",
	"useSearchParams"
] };

//#endregion
//#region src/presets/svelte.ts
const svelteAnimate = { "svelte/animate": ["flip"] };
const svelteEasing = { "svelte/easing": [
	"back",
	"bounce",
	"circ",
	"cubic",
	"elastic",
	"expo",
	"quad",
	"quart",
	"quint",
	"sine"
].reduce((acc, e) => {
	acc.push(`${e}In`, `${e}Out`, `${e}InOut`);
	return acc;
}, ["linear"]) };
const svelteStore = { "svelte/store": [
	"writable",
	"readable",
	"derived",
	"get"
] };
const svelteMotion = { "svelte/motion": ["tweened", "spring"] };
const svelteTransition = { "svelte/transition": [
	"fade",
	"blur",
	"fly",
	"slide",
	"scale",
	"draw",
	"crossfade"
] };
const svelte = { svelte: [
	"onMount",
	"beforeUpdate",
	"afterUpdate",
	"onDestroy",
	"tick",
	"setContext",
	"getContext",
	"hasContext",
	"getAllContexts",
	"createEventDispatcher"
] };

//#endregion
//#region src/presets/uni-app.ts
var uni_app_default = { "@dcloudio/uni-app": [
	"onAddToFavorites",
	"onBackPress",
	"onError",
	"onHide",
	"onLaunch",
	"onLoad",
	"onNavigationBarButtonTap",
	"onNavigationBarSearchInputChanged",
	"onNavigationBarSearchInputClicked",
	"onNavigationBarSearchInputConfirmed",
	"onNavigationBarSearchInputFocusChanged",
	"onPageNotFound",
	"onPageScroll",
	"onPullDownRefresh",
	"onReachBottom",
	"onReady",
	"onResize",
	"onShareAppMessage",
	"onShareTimeline",
	"onShow",
	"onTabItemTap",
	"onThemeChange",
	"onUnhandledRejection",
	"onUnload"
] };

//#endregion
//#region src/presets/vee-validate.ts
var vee_validate_default = { "vee-validate": [
	"validate",
	"defineRule",
	"configure",
	"useField",
	"useForm",
	"useFieldArray",
	"useResetForm",
	"useIsFieldDirty",
	"useIsFieldTouched",
	"useIsFieldValid",
	"useIsSubmitting",
	"useValidateField",
	"useIsFormDirty",
	"useIsFormTouched",
	"useIsFormValid",
	"useValidateForm",
	"useSubmitCount",
	"useFieldValue",
	"useFormValues",
	"useFormErrors",
	"useFieldError",
	"useSubmitForm",
	"FormContextKey",
	"FieldContextKey"
] };

//#endregion
//#region src/presets/vitepress.ts
var vitepress_default = { vitepress: [
	"useData",
	"useRoute",
	"useRouter",
	"withBase"
] };

//#endregion
//#region src/presets/vue-router.ts
var vue_router_default = { "vue-router": [
	"useRouter",
	"useRoute",
	"useLink",
	"onBeforeRouteLeave",
	"onBeforeRouteUpdate"
] };

//#endregion
//#region src/presets/vue-router-composables.ts
var vue_router_composables_default = { "vue-router/composables": [
	"useRouter",
	"useRoute",
	"useLink",
	"onBeforeRouteLeave",
	"onBeforeRouteUpdate"
] };

//#endregion
//#region src/presets/vueuse-core.ts
let _cache$1;
var vueuse_core_default = () => {
	const excluded = [
		"toRefs",
		"utils",
		"toRef",
		"toValue"
	];
	if (!_cache$1) {
		let indexesJson;
		try {
			const corePath = resolveModule("@vueuse/core") || process.cwd();
			const path = resolveModule("@vueuse/core/indexes.json") || resolveModule("@vueuse/metadata/index.json") || resolveModule("@vueuse/metadata/index.json", { paths: [corePath] });
			indexesJson = JSON.parse(readFileSync(path, "utf-8"));
		} catch (error) {
			console.error(error);
			throw new Error("[auto-import] failed to load @vueuse/core, have you installed it?");
		}
		if (indexesJson) _cache$1 = { "@vueuse/core": indexesJson.functions.filter((i) => ["core", "shared"].includes(i.package)).flatMap((i) => [i.name, ...i.alias || []]).filter((i) => i && i.length >= 4 && !excluded.includes(i)) };
	}
	return _cache$1 || {};
};

//#endregion
//#region src/presets/vueuse-head.ts
var vueuse_head_default = { "@vueuse/head": ["useHead", "useSeoMeta"] };

//#endregion
//#region src/presets/vueuse-math.ts
let _cache;
var vueuse_math_default = () => {
	if (!_cache) {
		let indexesJson;
		try {
			const corePath = resolveModule("@vueuse/core") || process.cwd();
			const path = resolveModule("@vueuse/metadata/index.json") || resolveModule("@vueuse/metadata/index.json", { paths: [corePath] });
			indexesJson = JSON.parse(readFileSync(path, "utf-8"));
		} catch (error) {
			console.error(error);
			throw new Error("[auto-import] failed to load @vueuse/math, have you installed it?");
		}
		if (indexesJson) _cache = { "@vueuse/math": indexesJson.functions.filter((i) => ["math"].includes(i.package)).flatMap((i) => [i.name, ...i.alias || []]).filter((i) => i && i.length >= 4) };
	}
	return _cache || {};
};

//#endregion
//#region src/presets/vuex.ts
var vuex_default = { vuex: [
	"createStore",
	"createLogger",
	"mapState",
	"mapGetters",
	"mapActions",
	"mapMutations",
	"createNamespacedHelpers",
	"useStore"
] };

//#endregion
//#region src/presets/index.ts
const presets = {
	...builtinPresets,
	"ahooks": ahooks_default,
	"@vueuse/core": vueuse_core_default,
	"@vueuse/math": vueuse_math_default,
	"@vueuse/head": vueuse_head_default,
	"mobx": mobx_default,
	"mobx-react-lite": mobx_react_lite_default,
	"preact": preact_default,
	"quasar": quasar_default,
	"react": react_default,
	"react-dom": react_dom_default,
	"react-router": react_router_default,
	"react-router-dom": react_router_dom_default,
	"react-i18next": react_i18next_default,
	"svelte": svelte,
	"svelte/animate": svelteAnimate,
	"svelte/easing": svelteEasing,
	"svelte/motion": svelteMotion,
	"svelte/store": svelteStore,
	"svelte/transition": svelteTransition,
	"vee-validate": vee_validate_default,
	"vitepress": vitepress_default,
	"vue-router": vue_router_default,
	"vue-router/composables": vue_router_composables_default,
	"vuex": vuex_default,
	"uni-app": uni_app_default,
	"solid-js": solid_default,
	"@solidjs/router": solid_router_default,
	"solid-app-router": solid_app_router_default,
	"jotai": jotai,
	"jotai/utils": jotaiUtils,
	"recoil": recoil_default
};

//#endregion
//#region src/core/biomelintrc.ts
function generateBiomeLintConfigs(imports) {
	const config = { javascript: { globals: imports.map((i) => i.as ?? i.name).filter(Boolean).sort() } };
	return JSON.stringify(config, null, 2);
}

//#endregion
//#region src/core/eslintrc.ts
function generateESLintConfigs(imports, eslintrc) {
	const eslintConfigs = { globals: {} };
	imports.map((i) => i.as ?? i.name).filter(Boolean).sort().forEach((name) => {
		eslintConfigs.globals[name] = eslintrc.globalsPropValue;
	});
	return JSON.stringify(eslintConfigs, null, 2);
}

//#endregion
//#region src/core/resolvers.ts
function normalizeImport(info, name) {
	if (typeof info === "string") return {
		name: "default",
		as: name,
		from: info
	};
	if ("path" in info) return {
		from: info.path,
		as: info.name,
		name: info.importName,
		sideEffects: info.sideEffects
	};
	return {
		name,
		as: name,
		...info
	};
}
async function firstMatchedResolver(resolvers, fullname) {
	let name = fullname;
	for (const resolver of resolvers) {
		if (typeof resolver === "object" && resolver.type === "directive") if (name.startsWith("v")) name = name.slice(1);
		else continue;
		const resolved = await (typeof resolver === "function" ? resolver(name) : resolver.resolve(name));
		if (resolved) return normalizeImport(resolved, fullname);
	}
}
function resolversAddon(resolvers) {
	return {
		name: "unplugin-auto-import:resolvers",
		async matchImports(names, matched) {
			if (!resolvers.length) return;
			const dynamic = [];
			const sideEffects = [];
			await Promise.all([...names].map(async (name) => {
				const matchedImport = matched.find((i) => i.as === name);
				if (matchedImport) {
					if ("sideEffects" in matchedImport) sideEffects.push(...toArray(matchedImport.sideEffects).map((i) => normalizeImport(i, "")));
					return;
				}
				const resolved = await firstMatchedResolver(resolvers, name);
				if (resolved) dynamic.push(resolved);
				if (resolved?.sideEffects) sideEffects.push(...toArray(resolved?.sideEffects).map((i) => normalizeImport(i, "")));
			}));
			if (dynamic.length) {
				this.dynamicImports.push(...dynamic);
				this.invalidate();
			}
			if (dynamic.length || sideEffects.length) return [
				...matched,
				...dynamic,
				...sideEffects
			];
		}
	};
}

//#endregion
//#region src/core/ctx.ts
const INCLUDE_RE_LIST = [
	/\.[jt]sx?$/,
	/\.astro$/,
	/\.vue$/,
	/\.vue\?vue/,
	/\.vue\.[tj]sx?\?vue/,
	/\.svelte$/
];
const EXCLUDE_RE_LIST = [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/];
function createContext(options = {}, root = process.cwd()) {
	root = slash(root);
	const { dts: preferDTS = isPackageExists("typescript"), dtsMode = "append", dtsPreserveExts = false, dirsScanOptions, dirs, vueDirectives, vueTemplate } = options;
	const eslintrc = options.eslintrc || {};
	eslintrc.enabled = eslintrc.enabled === void 0 ? false : eslintrc.enabled;
	eslintrc.filepath = eslintrc.filepath || "./.eslintrc-auto-import.json";
	eslintrc.globalsPropValue = eslintrc.globalsPropValue === void 0 ? true : eslintrc.globalsPropValue;
	const biomelintrc = options.biomelintrc || {};
	biomelintrc.enabled = biomelintrc.enabled !== void 0;
	biomelintrc.filepath = biomelintrc.filepath || "./.biomelintrc-auto-import.json";
	const dumpUnimportItems = options.dumpUnimportItems === true ? "./.unimport-items.json" : options.dumpUnimportItems ?? false;
	const resolvers = options.resolvers ? [options.resolvers].flat(2) : [];
	const injectAtEnd = options.injectAtEnd !== false;
	const unimport = createUnimport({
		imports: [],
		presets: options.packagePresets?.map((p) => typeof p === "string" ? { package: p } : p) ?? [],
		dirsScanOptions: {
			...dirsScanOptions,
			cwd: root
		},
		dirs,
		injectAtEnd,
		parser: options.parser,
		addons: {
			addons: [resolversAddon(resolvers), {
				name: "unplugin-auto-import:dts",
				declaration(dts$1) {
					return `${`
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated by unplugin-auto-import
// biome-ignore lint: disable
${dts$1}`.trim()}\n`;
				}
			}],
			vueDirectives,
			vueTemplate
		}
	});
	const importsPromise = flattenImports(options.imports).then((imports) => {
		if (!imports.length && !resolvers.length && !dirs?.length) console.warn("[auto-import] plugin installed but no imports has defined, see https://github.com/antfu/unplugin-auto-import#configurations for configurations");
		const compare = (left, right) => {
			return right instanceof RegExp ? right.test(left) : right === left;
		};
		options.ignore?.forEach((name) => {
			const i = imports.find((i$1) => compare(i$1.as, name));
			if (i) i.disabled = true;
		});
		options.ignoreDts?.forEach((name) => {
			const i = imports.find((i$1) => compare(i$1.as, name));
			if (i) i.dtsDisabled = true;
		});
		return unimport.getInternalContext().replaceImports(imports);
	});
	const filter = createFilter(options.include || INCLUDE_RE_LIST, options.exclude || EXCLUDE_RE_LIST);
	const dts = preferDTS === false ? false : preferDTS === true ? resolve(root, "auto-imports.d.ts") : resolve(root, preferDTS);
	const multilineCommentsRE = /\/\*.*?\*\//gs;
	const singlelineCommentsRE = /\/\/.*$/gm;
	const dtsReg = /declare\s+global\s*\{(.*?)[\n\r]\}/s;
	const componentCustomPropertiesReg = /interface\s+ComponentCustomProperties\s*\{(.*?)[\n\r]\}/gs;
	function parseDTS(dts$1) {
		dts$1 = dts$1.replace(multilineCommentsRE, "").replace(singlelineCommentsRE, "");
		const code = dts$1.match(dtsReg)?.[0];
		if (!code) return;
		return Object.fromEntries(Array.from(code.matchAll(/['"]?(const\s*[^\s'"]+)['"]?\s*:\s*(.+?)[,;\r\n]/g)).map((i) => [i[1], i[2]]));
	}
	async function generateDTS(file) {
		await importsPromise;
		const dir = dirname(file);
		const originalDTS = parseDTS(existsSync(file) ? await promises.readFile(file, "utf-8") : "");
		let currentContent = await unimport.generateTypeDeclarations({ resolvePath: (i) => {
			if (i.from.startsWith(".") || isAbsolute(i.from)) {
				const related = slash(dtsPreserveExts ? relative(dir, i.from) : relative(dir, i.from).replace(/\.ts(x)?$/, ""));
				return !related.startsWith(".") ? `./${related}` : related;
			}
			return i.from;
		} });
		if (options.vueTemplate) currentContent = currentContent.replace(componentCustomPropertiesReg, ($1) => `interface GlobalComponents {}\n  ${$1}`);
		if (dtsMode === "append") {
			const currentDTS = parseDTS(currentContent);
			if (originalDTS) {
				Object.assign(originalDTS, currentDTS);
				const dtsList = Object.keys(originalDTS).sort().map((k) => `  ${k}: ${originalDTS[k]}`);
				return currentContent.replace(dtsReg, () => `declare global {\n${dtsList.join("\n")}\n}`);
			}
		}
		return currentContent;
	}
	async function generateESLint() {
		return generateESLintConfigs(await unimport.getImports(), eslintrc);
	}
	async function generateBiomeLint() {
		return generateBiomeLintConfigs(await unimport.getImports());
	}
	const writeConfigFilesThrottled = throttle(500, writeConfigFiles, { noLeading: false });
	async function writeFile(filePath, content = "") {
		await promises.mkdir(dirname(filePath), { recursive: true });
		return await promises.writeFile(filePath, content, "utf-8");
	}
	let lastDTS;
	let lastESLint;
	let lastBiomeLint;
	let lastUnimportItems;
	async function writeConfigFiles() {
		const promises$1 = [];
		if (dts) promises$1.push(generateDTS(dts).then((content) => {
			if (content !== lastDTS) {
				lastDTS = content;
				return writeFile(dts, content);
			}
		}));
		if (eslintrc.enabled && eslintrc.filepath) {
			const filepath = eslintrc.filepath;
			promises$1.push(generateESLint().then(async (content) => {
				if (filepath.endsWith(".cjs")) content = `module.exports = ${content}`;
				else if (filepath.endsWith(".mjs") || filepath.endsWith(".js")) content = `export default ${content}`;
				content = `${content}\n`;
				if (content.trim() !== lastESLint?.trim()) {
					lastESLint = content;
					return writeFile(eslintrc.filepath, content);
				}
			}));
		}
		if (biomelintrc.enabled) promises$1.push(generateBiomeLint().then((content) => {
			if (content !== lastBiomeLint) {
				lastBiomeLint = content;
				return writeFile(biomelintrc.filepath, content);
			}
		}));
		if (dumpUnimportItems) promises$1.push(unimport.getImports().then((items) => {
			if (!dumpUnimportItems) return;
			const content = JSON.stringify(items, null, 2);
			if (content !== lastUnimportItems) {
				lastUnimportItems = content;
				return writeFile(dumpUnimportItems, content);
			}
		}));
		return Promise.all(promises$1);
	}
	async function scanDirs() {
		await unimport.modifyDynamicImports(async (imports) => {
			const exports_ = await unimport.scanImportsFromDir();
			exports_.forEach((i) => i.__source = "dir");
			return modifyDefaultExportsAlias([...imports.filter((i) => i.__source !== "dir"), ...exports_], options);
		});
		writeConfigFilesThrottled();
	}
	async function transform(code, id) {
		await importsPromise;
		const s = new MagicString(code);
		await unimport.injectImports(s, id);
		if (!s.hasChanged()) return;
		writeConfigFilesThrottled();
		return {
			code: s.toString(),
			map: s.generateMap({
				source: id,
				includeContent: true,
				hires: true
			})
		};
	}
	const configFilePaths = [
		dts,
		eslintrc.filepath,
		biomelintrc.filepath,
		dumpUnimportItems
	].filter(isString).map((path) => resolve(root, path));
	const normalizedDirPaths = dirs?.length ? dirs.flatMap((dir) => normalizeScanDirs([dir], {
		...dirsScanOptions,
		cwd: root
	})) : [];
	return {
		root,
		dirs,
		filter,
		scanDirs,
		writeConfigFiles,
		writeConfigFilesThrottled,
		transform,
		generateDTS,
		generateESLint,
		unimport,
		configFilePaths,
		normalizedDirPaths
	};
}
async function flattenImports(map) {
	return (await Promise.all(toArray(map).map(async (definition) => {
		if (typeof definition === "string") {
			if (!presets[definition]) throw new Error(`[auto-import] preset ${definition} not found`);
			const preset = presets[definition];
			definition = typeof preset === "function" ? preset() : preset;
		}
		if ("from" in definition && "imports" in definition) return await resolvePreset(definition);
		else {
			const resolved = [];
			for (const mod of Object.keys(definition)) for (const id of definition[mod]) {
				const meta = { from: mod };
				if (Array.isArray(id)) {
					meta.name = id[0];
					meta.as = id[1];
				} else {
					meta.name = id;
					meta.as = id;
				}
				resolved.push(meta);
			}
			return resolved;
		}
	}))).flat();
}
function modifyDefaultExportsAlias(imports, options) {
	if (options.defaultExportByFilename) imports.forEach((i) => {
		if (i.name === "default") i.as = i.from.split("/").pop()?.split(".")?.shift() ?? i.as;
	});
	return imports;
}

//#endregion
//#region src/core/unplugin.ts
var unplugin_default = createUnplugin((options) => {
	let ctx = createContext(options);
	return {
		name: "unplugin-auto-import",
		enforce: "post",
		transformInclude(id) {
			return ctx.filter(id);
		},
		transform: {
			filter: { id: {
				include: options.include || INCLUDE_RE_LIST,
				exclude: options.exclude || EXCLUDE_RE_LIST
			} },
			async handler(code, id) {
				return ctx.transform(code, id);
			}
		},
		async buildStart() {
			await ctx.scanDirs();
		},
		async buildEnd() {
			await ctx.writeConfigFiles();
		},
		vite: {
			async config(config) {
				if (options.viteOptimizeDeps === false) return;
				const exclude = config.optimizeDeps?.exclude || [];
				const imports = new Set((await ctx.unimport.getImports()).map((i) => i.from).filter((i) => i.match(/^[a-z@]/) && !exclude.includes(i) && isPackageExists(i)));
				if (!imports.size) return;
				return { optimizeDeps: { include: [...imports] } };
			},
			async handleHotUpdate({ file }) {
				if (!ctx.dirs?.length) return;
				if (ctx.configFilePaths.includes(file)) return;
				const normalizedFilePath = slash(file);
				if (ctx.normalizedDirPaths.some((dirPath) => pm.isMatch(normalizedFilePath, dirPath.glob))) await ctx.scanDirs();
			},
			async configResolved(config) {
				if (ctx.root !== config.root) {
					ctx = createContext(options, config.root);
					await ctx.scanDirs();
				}
			}
		}
	};
});

//#endregion
export { unplugin_default as t };