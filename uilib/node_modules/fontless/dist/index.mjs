import { hash } from "ohash";
import { dirname, extname, relative } from "pathe";
import { filename } from "pathe/utils";
import { hasProtocol, joinRelativeURL, joinURL, withLeadingSlash } from "ufo";
import { DEFAULT_CATEGORY_FALLBACKS, generateFontFace as generateFontFace$1, getMetricsForFamily, readMetrics } from "fontaine";
import { createUnifont, providers } from "unifont";
import { createJiti } from "jiti";
import { consola } from "consola";
import { Buffer } from "node:buffer";
import { parse, walk } from "css-tree";
import { transform } from "esbuild";
import { transform as transform$1 } from "lightningcss";
import MagicString from "magic-string";
import { readFile } from "node:fs/promises";
import { defu } from "defu";
import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

//#region src/css/render.ts
function generateFontFace(family, font) {
	return [
		"@font-face {",
		`  font-family: '${family}';`,
		`  src: ${renderFontSrc(font.src)};`,
		`  font-display: ${font.display || "swap"};`,
		font.unicodeRange && `  unicode-range: ${font.unicodeRange};`,
		font.weight && `  font-weight: ${Array.isArray(font.weight) ? font.weight.join(" ") : font.weight};`,
		font.style && `  font-style: ${font.style};`,
		font.stretch && `  font-stretch: ${font.stretch};`,
		font.featureSettings && `  font-feature-settings: ${font.featureSettings};`,
		font.variationSettings && `  font-variation-settings: ${font.variationSettings};`,
		`}`
	].filter(Boolean).join("\n");
}
async function generateFontFallbacks(family, data, fallbacks) {
	if (!fallbacks?.length) return [];
	const fontURL = data.src.find((s) => "url" in s);
	const metrics = await getMetricsForFamily(family) || fontURL && await readMetrics(fontURL.originalURL || fontURL.url);
	if (!metrics) return [];
	const css = [];
	for (const fallback of fallbacks) css.push(generateFontFace$1(metrics, {
		...fallback,
		metrics: await getMetricsForFamily(fallback.font) || void 0
	}));
	return css;
}
const formatMap = {
	woff2: "woff2",
	woff: "woff",
	otf: "opentype",
	ttf: "truetype",
	eot: "embedded-opentype",
	svg: "svg"
};
const extensionMap = Object.fromEntries(Object.entries(formatMap).map(([key, value]) => [value, key]));
const formatToExtension = (format) => format && format in extensionMap ? `.${extensionMap[format]}` : void 0;
function parseFont(font) {
	if (font.startsWith("/") || hasProtocol(font)) return {
		url: font,
		format: formatMap[extname(font).slice(1)]
	};
	return { name: font };
}
function renderFontSrc(sources) {
	return sources.map((src) => {
		if ("url" in src) {
			let rendered = `url("${src.url}")`;
			for (const key of ["format", "tech"]) if (key in src) rendered += ` ${key}(${src[key]})`;
			return rendered;
		}
		return `local("${src.name}")`;
	}).join(", ");
}
function relativiseFontSources(font, relativeTo) {
	return {
		...font,
		src: font.src.map((source) => {
			if ("name" in source) return source;
			if (!source.url.startsWith("/")) return source;
			return {
				...source,
				url: relative(relativeTo, source.url)
			};
		})
	};
}

//#endregion
//#region src/assets.ts
function toArray(value) {
	return !value || Array.isArray(value) ? value : [value];
}
function normalizeFontData(context, faces) {
	const data = [];
	for (const face of toArray(faces)) data.push({
		...face,
		unicodeRange: toArray(face.unicodeRange),
		src: toArray(face.src).map((src) => {
			const source = typeof src === "string" ? parseFont(src) : src;
			if ("url" in source && hasProtocol(source.url, { acceptRelative: true })) {
				source.url = source.url.replace(/^\/\//, "https://");
				const _url = source.url.replace(/\?.*/, "");
				const file = [hash(filename(_url) || _url).replace(/^-+/, "").slice(0, 50), hash(source).replace(/-/, "_") + (extname(source.url) || formatToExtension(source.format) || "")].filter(Boolean).join("-");
				context.renderedFontURLs.set(file, source.url);
				source.originalURL = source.url;
				source.url = context.dev ? joinRelativeURL(context.assetsBaseURL, file) : joinURL(context.assetsBaseURL, file);
				context.callback?.(file, source.url);
			}
			return source;
		})
	});
	return data;
}

//#endregion
//#region src/defaults.ts
const defaultValues = {
	weights: [400],
	styles: ["normal", "italic"],
	subsets: [
		"cyrillic-ext",
		"cyrillic",
		"greek-ext",
		"greek",
		"vietnamese",
		"latin-ext",
		"latin"
	],
	formats: ["woff2"],
	fallbacks: {
		"serif": DEFAULT_CATEGORY_FALLBACKS.serif,
		"sans-serif": DEFAULT_CATEGORY_FALLBACKS["sans-serif"],
		"monospace": DEFAULT_CATEGORY_FALLBACKS.monospace,
		"cursive": DEFAULT_CATEGORY_FALLBACKS.handwriting,
		"fantasy": DEFAULT_CATEGORY_FALLBACKS.display,
		"system-ui": DEFAULT_CATEGORY_FALLBACKS["sans-serif"],
		"ui-serif": DEFAULT_CATEGORY_FALLBACKS.serif,
		"ui-sans-serif": DEFAULT_CATEGORY_FALLBACKS["sans-serif"],
		"ui-monospace": DEFAULT_CATEGORY_FALLBACKS.monospace,
		"ui-rounded": [],
		"emoji": [],
		"math": [],
		"fangsong": []
	}
};
const defaultOptions = {
	processCSSVariables: "font-prefixed-only",
	experimental: { disableLocalFallbacks: false },
	defaults: {},
	assets: {},
	local: {},
	google: {},
	adobe: { id: "" },
	npm: { remote: false },
	providers: {
		adobe: providers.adobe,
		google: providers.google,
		googleicons: providers.googleicons,
		bunny: providers.bunny,
		fontshare: providers.fontshare,
		fontsource: providers.fontsource,
		npm: providers.npm
	}
};

//#endregion
//#region src/providers.ts
async function resolveProviders(_providers = {}, opts) {
	const jiti = createJiti(opts.root, { alias: opts.alias });
	const providers = { ..._providers };
	for (const key in providers) {
		const value = providers[key];
		if (value === false) delete providers[key];
		if (typeof value === "string") providers[key] = await jiti.import(value, { default: true });
	}
	return providers;
}

//#endregion
//#region src/css/parse.ts
const weightMap = {
	100: "Thin",
	200: "ExtraLight",
	300: "Light",
	400: "Regular",
	500: "Medium",
	600: "SemiBold",
	700: "Bold",
	800: "ExtraBold",
	900: "Black"
};
const styleMap = {
	italic: "Italic",
	oblique: "Oblique",
	normal: ""
};
function processRawValue(value) {
	return value.split(",").map((v) => v.trim().replace(/^(?<quote>['"])(.*)\k<quote>$/, "$2"));
}
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
const globalCSSValues = new Set([
	"inherit",
	"initial",
	"revert",
	"revert-layer",
	"unset"
]);
function extractGeneric(node) {
	if (node.value.type === "Raw") {
		const children = processRawValue(node.value.value);
		for (const child of children) if (genericCSSFamilies.has(child)) return child;
		return;
	}
	for (const child of node.value.children) if (child.type === "Identifier" && genericCSSFamilies.has(child.name)) return child.name;
}
function extractEndOfFirstChild(node) {
	if (node.value.type === "Raw") {
		const value = node.value.value;
		const index = value.indexOf(",");
		return node.value.loc.start.offset + (index >= 0 ? index : value.length);
	}
	for (const child of node.value.children) {
		if (child.type === "String") return child.loc.end.offset;
		if (child.type === "Operator" && child.value === ",") return child.loc.start.offset;
	}
	return node.value.children.last.loc.end.offset;
}
function extractFontFamilies(node) {
	if (node.value.type === "Raw") return processRawValue(node.value.value).filter((child) => !genericCSSFamilies.has(child) && !globalCSSValues.has(child));
	const families = [];
	let buffer = "";
	for (const child of node.value.children) {
		if (child.type === "Identifier" && !genericCSSFamilies.has(child.name) && !globalCSSValues.has(child.name)) buffer = buffer ? `${buffer} ${child.name}` : child.name;
		if (buffer && child.type === "Operator" && child.value === ",") {
			families.push(buffer.replace(/\\/g, ""));
			buffer = "";
		}
		if (buffer && child.type === "Dimension") buffer = `${buffer} ${child.value}${child.unit}`.trim();
		if (child.type === "String") families.push(child.value);
	}
	if (buffer) families.push(buffer);
	return families;
}
function addLocalFallbacks(fontFamily, data) {
	for (const face of data) {
		const style = (face.style ? styleMap[face.style] : "") ?? "";
		if (Array.isArray(face.weight)) face.src.unshift({ name: [
			fontFamily,
			"Variable",
			style
		].join(" ").trim() });
		else if (face.src[0] && !("name" in face.src[0])) {
			const weights = (Array.isArray(face.weight) ? face.weight : [face.weight]).map((weight) => weightMap[weight]).filter(Boolean);
			for (const weight of weights) {
				if (weight === "Regular") face.src.unshift({ name: [fontFamily, style].join(" ").trim() });
				face.src.unshift({ name: [
					fontFamily,
					weight,
					style
				].join(" ").trim() });
			}
		}
	}
	return data;
}

//#endregion
//#region src/resolve.ts
async function createResolver(context) {
	const { options, normalizeFontData, providers, exposeFont = () => {}, logger = consola.withTag("fontless") } = context;
	const resolvedProviders = [];
	const prioritisedProviders = /* @__PURE__ */ new Set();
	for (const [key, provider] of Object.entries(providers)) if (options.providers?.[key] === false || options.provider && options.provider !== key) delete providers[key];
	else {
		const providerOptions = options[key] || {};
		resolvedProviders.push(provider(providerOptions));
	}
	if (resolvedProviders.length === 0) throw new Error("At least one font provider must be configured");
	for (const val of options.priority || []) if (val in providers) prioritisedProviders.add(val);
	for (const provider in providers) prioritisedProviders.add(provider);
	const unifont = await createUnifont(resolvedProviders, {
		...options,
		storage: context.storage
	});
	const normalizedDefaults = {
		weights: [...new Set((options.defaults?.weights || defaultValues.weights).map((v) => String(v)))],
		styles: [...new Set(options.defaults?.styles || defaultValues.styles)],
		subsets: [...new Set(options.defaults?.subsets || defaultValues.subsets)],
		formats: [...new Set(options.defaults?.formats || defaultValues.formats)],
		fallbacks: Object.fromEntries(Object.entries(defaultValues.fallbacks).map(([key, value]) => [key, Array.isArray(options.defaults?.fallbacks) ? options.defaults.fallbacks : options.defaults?.fallbacks?.[key] || value]))
	};
	function addFallbacks(fontFamily, font) {
		if (options.experimental?.disableLocalFallbacks) return font;
		return addLocalFallbacks(fontFamily, font);
	}
	return async function resolveFontFaceWithOverride(fontFamily, override, fallbackOptions) {
		const fallbacks = (override && "fallbacks" in override ? override.fallbacks : void 0) || normalizedDefaults.fallbacks[fallbackOptions?.generic || "sans-serif"];
		if (override && "src" in override) {
			const fonts = addFallbacks(fontFamily, normalizeFontData({
				src: override.src,
				display: override.display,
				weight: override.weight,
				style: override.style
			}));
			exposeFont({
				type: "manual",
				fontFamily,
				fonts
			});
			return {
				fallbacks,
				fonts
			};
		}
		if (override?.provider === "none") return;
		const defaults = {
			...normalizedDefaults,
			fallbacks
		};
		for (const key of [
			"weights",
			"styles",
			"subsets"
		]) if (override?.[key]) defaults[key] = override[key].map((v) => String(v));
		if (override?.formats) defaults.formats = override.formats;
		const providerOptions = override && "providerOptions" in override ? override.providerOptions : void 0;
		if (override?.provider) {
			if (override.provider in providers) {
				const resolveOptions = providerOptions?.[override.provider] ? {
					...defaults,
					options: { [override.provider]: providerOptions[override.provider] }
				} : defaults;
				const result = await unifont.resolveFont(fontFamily, resolveOptions, [override.provider]);
				const fonts = normalizeFontData(result?.fonts || []);
				if (!fonts.length || !result) {
					logger.warn(`Could not produce font face declaration from \`${override.provider}\` for font family \`${fontFamily}\`.`);
					return;
				}
				const fontsWithLocalFallbacks = addFallbacks(fontFamily, fonts);
				exposeFont({
					type: "override",
					fontFamily,
					provider: override.provider,
					fonts: fontsWithLocalFallbacks
				});
				return {
					fallbacks: result.fallbacks || defaults.fallbacks,
					fonts: fontsWithLocalFallbacks
				};
			}
			logger.warn(`Unknown provider \`${override.provider}\` for font family \`${fontFamily}\`. Falling back to default providers.`);
		}
		const resolveOptions = providerOptions ? {
			...defaults,
			options: providerOptions
		} : defaults;
		const result = await unifont.resolveFont(fontFamily, resolveOptions, [...prioritisedProviders]);
		if (result) {
			const fonts = normalizeFontData(result.fonts);
			if (fonts.length > 0) {
				const fontsWithLocalFallbacks = addFallbacks(fontFamily, fonts);
				exposeFont({
					type: "auto",
					fontFamily,
					provider: result.provider || "unknown",
					fonts: fontsWithLocalFallbacks
				});
				return {
					fallbacks: defaults.fallbacks,
					fonts: fontsWithLocalFallbacks
				};
			}
			if (override) logger.warn(`Could not produce font face declaration for \`${fontFamily}\` with override.`);
		}
	};
}

//#endregion
//#region src/utils.ts
function resolveMinifyCssEsbuildOptions(options) {
	const base = {
		charset: options.charset ?? "utf8",
		logLevel: options.logLevel,
		logLimit: options.logLimit,
		logOverride: options.logOverride,
		legalComments: options.legalComments,
		target: options.target ?? "chrome"
	};
	if (options.minifyIdentifiers != null || options.minifySyntax != null || options.minifyWhitespace != null) return {
		...base,
		minifyIdentifiers: options.minifyIdentifiers ?? true,
		minifySyntax: options.minifySyntax ?? true,
		minifyWhitespace: options.minifyWhitespace ?? true
	};
	return {
		...base,
		minify: true
	};
}
function findSafeInsertionIndex(ast) {
	let safeIndex = 0;
	walk(ast, {
		visit: "Atrule",
		enter(node) {
			if (node.name === "charset" || node.name === "import" || node.name === "namespace" || node.name === "layer" && node.prelude) safeIndex = Math.max(safeIndex, node.loc.end.offset);
		}
	});
	return safeIndex;
}
async function transformCSS(options, code, id, opts = {}) {
	const s = new MagicString(code);
	const ast = parse(code, { positions: true });
	const injectedDeclarations = /* @__PURE__ */ new Set();
	const safeInsertionIndex = findSafeInsertionIndex(ast);
	const promises = [];
	async function addFontFaceDeclaration(fontFamily, fallbackOptions) {
		const result = await options.resolveFontFace(fontFamily, {
			generic: fallbackOptions?.generic,
			fallbacks: fallbackOptions?.fallbacks || []
		}) || {};
		if (!result.fonts || result.fonts.length === 0) return;
		const fallbackMap = result.fallbacks?.map((f) => ({
			font: f,
			name: `${fontFamily} Fallback: ${f}`
		})) || [];
		let insertFontFamilies = false;
		const [topPriorityFont] = result.fonts.sort((a, b) => (a.meta?.priority || 0) - (b.meta?.priority || 0));
		if (topPriorityFont && options.shouldPreload(fontFamily, topPriorityFont)) {
			const fontToPreload = topPriorityFont.src.find((s) => "url" in s)?.url;
			if (fontToPreload) {
				const urls = options.fontsToPreload.get(id) || /* @__PURE__ */ new Set();
				options.fontsToPreload.set(id, urls.add(fontToPreload));
			}
		}
		result.fonts.sort((a, b) => -((a.meta?.priority || 0) - (b.meta?.priority || 0)));
		const prefaces = [];
		for (const font of result.fonts) {
			const fallbackDeclarations = await generateFontFallbacks(fontFamily, font, fallbackMap);
			const declarations = [generateFontFace(fontFamily, opts.relative ? relativiseFontSources(font, withLeadingSlash(dirname(id))) : font), ...fallbackDeclarations];
			for (let declaration of declarations) if (!injectedDeclarations.has(declaration)) {
				injectedDeclarations.add(declaration);
				if (!options.dev) if (options.lightningcssOptions) declaration = transform$1({
					filename: id,
					code: Buffer.from(declaration),
					minify: true,
					sourceMap: false,
					...options.lightningcssOptions
				}).code.toString() || declaration;
				else declaration = await transform(declaration, {
					loader: "css",
					charset: "utf8",
					minify: true,
					...options.esbuildOptions
				}).then((r) => r.code || declaration).catch(() => declaration);
				else declaration += "\n";
				prefaces.push(declaration);
			}
			if (fallbackDeclarations.length) insertFontFamilies = true;
		}
		if (safeInsertionIndex > 0) s.appendLeft(safeInsertionIndex, `\n${prefaces.join("")}`);
		else s.prepend(prefaces.join(""));
		if (fallbackOptions && insertFontFamilies) {
			const insertedFamilies = fallbackMap.map((f) => `"${f.name}"`).join(", ");
			s.prependLeft(fallbackOptions.index, `, ${insertedFamilies}`);
		}
	}
	const existingFontFamilies = /* @__PURE__ */ new Set();
	function processNode(node, parentOffset = 0) {
		walk(node, {
			visit: "Declaration",
			enter(node) {
				if (this.atrule?.name === "font-face" && node.property === "font-family") for (const family of extractFontFamilies(node)) existingFontFamilies.add(family);
			}
		});
		walk(node, {
			visit: "Declaration",
			enter(node) {
				if (node.property !== "font-family" && node.property !== "font" && (options.processCSSVariables === false || options.processCSSVariables === "font-prefixed-only" && !node.property.startsWith("--font") || options.processCSSVariables === true && !node.property.startsWith("--")) || this.atrule?.name === "font-face") return;
				const [fontFamily, ...fallbacks] = extractFontFamilies(node);
				if (fontFamily && !existingFontFamilies.has(fontFamily)) promises.push(addFontFaceDeclaration(fontFamily, {
					fallbacks,
					generic: extractGeneric(node),
					index: extractEndOfFirstChild(node) + parentOffset
				}));
			}
		});
		walk(node, {
			visit: "Raw",
			enter(node) {
				const nestedRaw = parse(node.value, { positions: true });
				if (!nestedRaw.children.some((child) => child.type === "Rule")) return;
				parentOffset += node.loc.start.offset;
				processNode(nestedRaw, parentOffset);
			}
		});
	}
	processNode(ast);
	await Promise.all(promises);
	return s;
}

//#endregion
//#region src/storage.ts
const cacheBase = "node_modules/.cache/fontless/meta";
const storage = createStorage({ driver: fsDriver({ base: cacheBase }) });

//#endregion
//#region src/vite.ts
const CSS_LANG_QUERY_RE = /&lang\.css/;
const INLINE_STYLE_ID_RE = /[?&]index=\d+\.css$/;
const CSS_EXTENSIONS_RE = /\.(?:css|scss|sass|postcss|pcss|less|stylus|styl)(?:\?[^.]+)?$/;
function fontless(_options) {
	const options = defu(_options, defaultOptions);
	let cssTransformOptions;
	let assetContext;
	return {
		name: "vite-plugin-fontless",
		apply: (_config, env) => !env.isPreview,
		async configResolved(config) {
			assetContext = {
				dev: config.mode === "development",
				renderedFontURLs: /* @__PURE__ */ new Map(),
				assetsBaseURL: options.assets?.prefix || joinURL("/", config.build.assetsDir, "_fonts")
			};
			const alias = Array.isArray(config.resolve.alias) ? {} : config.resolve.alias;
			const providers = await resolveProviders(options.providers, {
				root: config.root,
				alias
			});
			options.npm = defu(options.npm, {
				readFile: (path) => readFile(path, "utf-8").catch(() => null),
				root: config.root
			});
			const resolveFontFaceWithOverride = await createResolver({
				options,
				providers,
				storage,
				normalizeFontData: normalizeFontData.bind({}, assetContext)
			});
			cssTransformOptions = {
				processCSSVariables: options.processCSSVariables,
				shouldPreload(fontFamily, _fontFace) {
					return (options.families?.find((f) => f.name === fontFamily))?.preload ?? options.defaults?.preload ?? false;
				},
				fontsToPreload: /* @__PURE__ */ new Map(),
				dev: config.mode === "development",
				async resolveFontFace(fontFamily, fallbackOptions) {
					const override = options.families?.find((f) => f.name === fontFamily);
					if (override?.global) return;
					return resolveFontFaceWithOverride(fontFamily, override, fallbackOptions);
				}
			};
			if (!cssTransformOptions.dev) {
				if (config.css.lightningcss) cssTransformOptions.lightningcssOptions = config.css.lightningcss;
				else if (config.esbuild) cssTransformOptions.esbuildOptions = defu(cssTransformOptions.esbuildOptions, resolveMinifyCssEsbuildOptions(config.esbuild));
			}
		},
		configureServer(server) {
			server.middlewares.use(assetContext.assetsBaseURL, async (req, res, next) => {
				try {
					const filename = req.url.slice(1);
					const url = assetContext.renderedFontURLs.get(filename);
					if (!url) {
						next();
						return;
					}
					const key = `data:fonts:${filename}`;
					let data = await storage.getItemRaw(key);
					if (!data) {
						data = await fetch(url).then((r) => r.arrayBuffer()).then((r) => Buffer.from(r));
						await storage.setItemRaw(key, data);
					}
					res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
					res.end(data);
				} catch (e) {
					next(e);
				}
			});
		},
		transform: {
			filter: {
				id: { include: [
					CSS_EXTENSIONS_RE,
					CSS_LANG_QUERY_RE,
					INLINE_STYLE_ID_RE
				] },
				code: { exclude: !options.processCSSVariables ? [/^(?!.*font-family\s*:).*$/s] : void 0 }
			},
			async handler(code, id) {
				const s = await transformCSS(cssTransformOptions, code, id);
				if (s.hasChanged()) return {
					code: s.toString(),
					map: s.generateMap({ hires: true })
				};
			}
		},
		async generateBundle() {
			for (const [filename, url] of assetContext.renderedFontURLs) {
				const key = `data:fonts:${filename}`;
				let res = await storage.getItemRaw(key);
				if (!res) {
					res = await fetch(url).then((r) => r.arrayBuffer()).then((r) => Buffer.from(r));
					await storage.setItemRaw(key, res);
				}
				this.emitFile({
					type: "asset",
					fileName: joinURL(assetContext.assetsBaseURL, filename).slice(1),
					source: res
				});
			}
		},
		transformIndexHtml: { handler() {
			return [...cssTransformOptions.fontsToPreload.values()].flatMap((v) => [...v]).map((href) => ({
				tag: "link",
				attrs: {
					rel: "preload",
					as: "font",
					href,
					crossorigin: ""
				}
			}));
		} }
	};
}

//#endregion
export { createResolver, defaultOptions, defaultValues, fontless, generateFontFace, normalizeFontData, parseFont, resolveMinifyCssEsbuildOptions, resolveProviders, transformCSS };