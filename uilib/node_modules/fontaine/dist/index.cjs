//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) {
				__defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
		}
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let css_tree = require("css-tree");
let magic_regexp = require("magic-regexp");
let node_url = require("node:url");
let _capsizecss_unpack = require("@capsizecss/unpack");
let _capsizecss_unpack_fs = require("@capsizecss/unpack/fs");
let ufo = require("ufo");
let magic_string = require("magic-string");
magic_string = __toESM(magic_string);
let pathe = require("pathe");
let unplugin = require("unplugin");

//#region src/css.ts
function toPercentage(value, fractionDigits = 4) {
	return `${+(value * 100).toFixed(fractionDigits)}%`;
}
function toCSS(properties, indent = 2) {
	return Object.entries(properties).map(([key, value]) => `${" ".repeat(indent)}${key}: ${value};`).join("\n");
}
const QUOTES_RE = (0, magic_regexp.createRegExp)((0, magic_regexp.charIn)("\"'").at.lineStart().or((0, magic_regexp.charIn)("\"'").at.lineEnd()), ["g"]);
const withoutQuotes = (str) => str.trim().replace(QUOTES_RE, "");
const genericCSSFamilies = new Set([
	"serif",
	"sans-serif",
	"monospace",
	"cursive",
	"fantasy",
	"system-ui",
	"ui-serif",
	"ui-sans-serif",
	"ui-monospace",
	"ui-rounded",
	"emoji",
	"math",
	"fangsong"
]);
const fontProperties = new Set([
	"font-weight",
	"font-style",
	"font-stretch"
]);
/**
* Extracts font family and source information from a CSS @font-face rule using css-tree.
*
* @param {string} css - The CSS containing @font-face rules
* @returns Array<{ family?: string, source?: string }> - Array of objects with font family and source information
*/
function parseFontFace(css) {
	const families = [];
	(0, css_tree.walk)(typeof css === "string" ? (0, css_tree.parse)(css, { positions: true }) : css, {
		visit: "Atrule",
		enter(node) {
			if (node.name !== "font-face") return;
			let family;
			const sources = [];
			const properties = {};
			if (node.block) (0, css_tree.walk)(node.block, {
				visit: "Declaration",
				enter(declaration) {
					if (declaration.property === "font-family" && declaration.value.type === "Value") for (const child of declaration.value.children) {
						if (child.type === "String") {
							family = withoutQuotes(child.value);
							break;
						}
						if (child.type === "Identifier" && !genericCSSFamilies.has(child.name)) {
							family = child.name;
							break;
						}
					}
					if (fontProperties.has(declaration.property)) {
						if (declaration.value.type === "Value") for (const child of declaration.value.children) {
							const hasValue = !!properties[declaration.property];
							properties[declaration.property] ||= "";
							properties[declaration.property] += (hasValue ? " " : "") + (0, css_tree.generate)(child);
						}
					}
					if (declaration.property === "src") (0, css_tree.walk)(declaration.value, {
						visit: "Url",
						enter(urlNode) {
							const source = withoutQuotes(urlNode.value);
							if (source) sources.push(source);
						}
					});
				}
			});
			if (family) {
				for (const source of sources) families.push({
					index: node.loc.start.offset,
					family,
					source,
					properties
				});
				if (!sources.length) families.push({
					index: node.loc.start.offset,
					family,
					properties
				});
			}
		}
	});
	return families;
}
/**
* Generates a fallback name based on the first font family specified in the input string.
* @param {string} name - The full font family string.
* @returns {string} - The fallback font name.
*/
function generateFallbackName(name) {
	return `${withoutQuotes(name.split(",").shift())} fallback`;
}
/**
* Generates a CSS `@font-face' declaration for a font, taking fallback and resizing into account.
* @param {FontFaceMetrics} metrics - The metrics of the preferred font. See {@link FontFaceMetrics}.
* @param {FallbackOptions} fallback - The fallback options, including name, font and optional metrics. See {@link FallbackOptions}.
* @returns {string} - The full `@font-face` CSS declaration.
*/
function generateFontFace(metrics, fallback) {
	const { name: fallbackName, font: fallbackFontName, metrics: fallbackMetrics, ...properties } = fallback;
	const preferredFontXAvgRatio = metrics.xWidthAvg / metrics.unitsPerEm;
	const fallbackFontXAvgRatio = fallbackMetrics ? fallbackMetrics.xWidthAvg / fallbackMetrics.unitsPerEm : 1;
	const sizeAdjust = fallbackMetrics && preferredFontXAvgRatio && fallbackFontXAvgRatio ? preferredFontXAvgRatio / fallbackFontXAvgRatio : 1;
	const adjustedEmSquare = metrics.unitsPerEm * sizeAdjust;
	const ascentOverride = metrics.ascent / adjustedEmSquare;
	const descentOverride = Math.abs(metrics.descent) / adjustedEmSquare;
	const lineGapOverride = metrics.lineGap / adjustedEmSquare;
	return `@font-face {\n${toCSS({
		"font-family": JSON.stringify(fallbackName),
		"src": `local(${JSON.stringify(fallbackFontName)})`,
		"size-adjust": toPercentage(sizeAdjust),
		"ascent-override": toPercentage(ascentOverride),
		"descent-override": toPercentage(descentOverride),
		"line-gap-override": toPercentage(lineGapOverride),
		...properties
	})}\n}\n`;
}

//#endregion
//#region src/fallbacks.ts
/**
* Default fallback font stacks for each font category.
* These are system fonts that work across different platforms.
*/
const DEFAULT_CATEGORY_FALLBACKS = {
	"sans-serif": [
		"BlinkMacSystemFont",
		"Segoe UI",
		"Helvetica Neue",
		"Arial",
		"Noto Sans"
	],
	"serif": [
		"Times New Roman",
		"Georgia",
		"Noto Serif"
	],
	"monospace": [
		"Courier New",
		"Roboto Mono",
		"Noto Sans Mono"
	],
	"display": [
		"BlinkMacSystemFont",
		"Segoe UI",
		"Helvetica Neue",
		"Arial",
		"Noto Sans"
	],
	"handwriting": [
		"BlinkMacSystemFont",
		"Segoe UI",
		"Helvetica Neue",
		"Arial",
		"Noto Sans"
	]
};
/**
* Resolves the appropriate fallback fonts for a given font family.
*
* Resolution order:
* 1. If fallbacks is an array, use it as a global override
* 2. If fallbacks is an object with the font family key, use that override
* 3. If metrics contain a category, use the category-based fallbacks
* 4. Default to sans-serif category fallbacks
*
* @param options - Configuration for fallback resolution
* @returns Array of fallback font family names
*/
function resolveCategoryFallbacks(options) {
	const { fontFamily, fallbacks, metrics, categoryFallbacks } = options;
	const mergedCategoryFallbacks = { ...DEFAULT_CATEGORY_FALLBACKS };
	if (categoryFallbacks) for (const category in categoryFallbacks) {
		const categoryKey = category;
		const categoryFallbacksList = categoryFallbacks[categoryKey];
		if (categoryFallbacksList) mergedCategoryFallbacks[categoryKey] = categoryFallbacksList;
	}
	if (Array.isArray(fallbacks)) return fallbacks;
	const familyFallback = fallbacks[fontFamily];
	if (familyFallback) return familyFallback;
	if (metrics?.category) {
		const categoryFallback = mergedCategoryFallbacks[metrics.category];
		if (categoryFallback) return categoryFallback;
	}
	return mergedCategoryFallbacks["sans-serif"];
}

//#endregion
//#region src/metrics.ts
const metricCache = {};
function filterRequiredMetrics(font) {
	return {
		ascent: font.ascent,
		descent: font.descent,
		lineGap: font.lineGap,
		unitsPerEm: font.unitsPerEm,
		xWidthAvg: font.xWidthAvg,
		category: font.category
	};
}
/**
* Retrieves the font metrics for a given font family from the metrics collection. Uses caching to avoid redundant calculations.
* @param {string} family - The name of the font family for which metrics are requested.
* @returns {Promise<FontFaceMetrics | null>} - A promise that resolves with the filtered font metrics or null if not found. See {@link FontFaceMetrics}.
* @async
*/
async function getMetricsForFamily(family) {
	family = withoutQuotes(family);
	if (family in metricCache) return metricCache[family] ?? null;
	try {
		const name = fontFamilyToCamelCase(family);
		const { entireMetricsCollection } = await import("#capsize-font-metrics");
		const metrics = entireMetricsCollection[name];
		/* v8 ignore next 4 */
		if (!("descent" in metrics)) {
			metricCache[family] = null;
			return null;
		}
		const filteredMetrics = filterRequiredMetrics(metrics);
		metricCache[family] = filteredMetrics;
		return filteredMetrics;
	} catch {
		metricCache[family] = null;
		return null;
	}
}
const urlRequestCache = /* @__PURE__ */ new Map();
/**
* Reads font metrics from a specified source URL or file path. This function supports both local files and remote URLs.
* It caches the results to optimise subsequent requests for the same source.
* @param {URL | string} _source - The source URL or local file path from which to read the font metrics.
* @returns {Promise<FontFaceMetrics | null>} - A promise that resolves to the filtered font metrics or null if the source cannot be processed.
* @async
*/
async function readMetrics(_source) {
	const source = typeof _source !== "string" && "href" in _source ? _source.href : _source;
	if (source in metricCache) return metricCache[source] ?? null;
	const { protocol } = (0, ufo.parseURL)(source);
	if (!protocol) return null;
	let metrics;
	if (protocol === "file:") metrics = await (0, _capsizecss_unpack_fs.fromFile)((0, node_url.fileURLToPath)(source));
	else if (urlRequestCache.has(source)) metrics = await urlRequestCache.get(source);
	else {
		const requestPromise = (0, _capsizecss_unpack.fromUrl)(source);
		urlRequestCache.set(source, requestPromise);
		metrics = await requestPromise;
	}
	const filteredMetrics = filterRequiredMetrics(metrics);
	metricCache[source] = filteredMetrics;
	return filteredMetrics;
}
function fontFamilyToCamelCase(str) {
	return str.split(/[\s|-]/).filter(Boolean).map((s, i) => `${s.charAt(0)[i > 0 ? "toUpperCase" : "toLowerCase"]()}${s.slice(1)}`).join("");
}

//#endregion
//#region src/transform.ts
const supportedExtensions = [
	"woff2",
	"woff",
	"ttf"
];
const CSS_RE = (0, magic_regexp.createRegExp)((0, magic_regexp.exactly)(".").and((0, magic_regexp.anyOf)("sass", "css", "scss")).and((0, magic_regexp.exactly)("?").and((0, magic_regexp.oneOrMore)(magic_regexp.char)).optionally()).at.lineEnd());
const RELATIVE_RE = (0, magic_regexp.createRegExp)((0, magic_regexp.exactly)(".").or("..").and((0, magic_regexp.anyOf)("/", "\\")).at.lineStart());
/**
* Transforms CSS files to include font fallbacks.
*
* @param options - The transformation options. See {@link FontaineTransformOptions}.
* @returns The unplugin instance.
*/
const FontaineTransform = (0, unplugin.createUnplugin)((options) => {
	const cssContext = options.css = options.css || {};
	cssContext.value = "";
	const resolvePath = options.resolvePath || ((id) => id);
	const fallbackName = options.fallbackName || options.overrideName || generateFallbackName;
	const skipFontFaceGeneration = options.skipFontFaceGeneration || (() => false);
	function readMetricsFromId(path, importer) {
		return readMetrics((0, pathe.isAbsolute)(importer) && RELATIVE_RE.test(path) ? new URL(path, (0, node_url.pathToFileURL)(importer)) : resolvePath(path));
	}
	return {
		name: "fontaine-transform",
		enforce: "pre",
		transform: {
			filter: { id: [CSS_RE] },
			async handler(code, id) {
				const s = new magic_string.default(code);
				const ast = (0, css_tree.parse)(code, { positions: true });
				for (const { family, source, index, properties } of parseFontFace(ast)) {
					if (!supportedExtensions.some((e) => source?.endsWith(e))) continue;
					if (skipFontFaceGeneration(fallbackName(family))) continue;
					const metrics = await getMetricsForFamily(family) || source && await readMetricsFromId(source, id).catch(() => null);
					/* v8 ignore next 2 */
					if (!metrics) continue;
					const familyFallbacks = resolveCategoryFallbacks({
						fontFamily: family,
						fallbacks: options.fallbacks,
						metrics,
						categoryFallbacks: options.categoryFallbacks
					});
					for (let i = familyFallbacks.length - 1; i >= 0; i--) {
						const fallback = familyFallbacks[i];
						const fallbackMetrics = await getMetricsForFamily(fallback);
						if (!fallbackMetrics) continue;
						const fontFace = generateFontFace(metrics, {
							name: fallbackName(family),
							font: fallback,
							metrics: fallbackMetrics,
							...properties
						});
						cssContext.value += fontFace;
						s.appendLeft(index, fontFace);
					}
				}
				(0, css_tree.walk)(ast, {
					visit: "Declaration",
					enter(node) {
						if (node.property !== "font-family") return;
						if (this.atrule && this.atrule.name === "font-face") return;
						if (node.value.type !== "Value")
 /* v8 ignore next */ return;
						for (const child of node.value.children) {
							let family;
							if (child.type === "String") family = withoutQuotes(child.value);
							else if (child.type === "Identifier" && child.name !== "inherit") family = child.name;
							if (!family) continue;
							s.appendRight(child.loc.end.offset, `, "${fallbackName(family)}"`);
							return;
						}
					}
				});
				if (s.hasChanged()) return {
					code: s.toString(),
					map: options.sourcemap ? s.generateMap({
						source: id,
						includeContent: true
					}) : void 0
				};
			}
		}
	};
});

//#endregion
exports.DEFAULT_CATEGORY_FALLBACKS = DEFAULT_CATEGORY_FALLBACKS;
exports.FontaineTransform = FontaineTransform;
exports.generateFallbackName = generateFallbackName;
exports.generateFontFace = generateFontFace;
exports.getMetricsForFamily = getMetricsForFamily;
exports.readMetrics = readMetrics;
exports.resolveCategoryFallbacks = resolveCategoryFallbacks;