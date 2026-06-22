function resolveVariantValue(definition, variants, custom) {
	if (Array.isArray(definition)) return definition.reduce((acc, item) => {
		const resolvedVariant = resolveVariantValue(item, variants, custom);
		return resolvedVariant ? {
			...acc,
			...resolvedVariant
		} : acc;
	}, {});
	else if (typeof definition === "object") return definition;
	else if (definition && variants) {
		const variant = variants[definition];
		return typeof variant === "function" ? variant(custom) : variant;
	}
}
function resolveVariant(definition, variants, custom) {
	const resolved = resolveVariantValue(definition, variants, custom);
	if (!resolved) return void 0;
	const { transition, transitionEnd, ...target } = resolved;
	return {
		...target,
		...transitionEnd
	};
}
function resolveInitialValues(options, context) {
	const sources = (options.initial === void 0 && options.variants ? context?.initial : options.initial) === false ? ["initial", "animate"] : ["initial"];
	const custom = options.custom ?? options.presenceContext?.custom;
	return sources.reduce((acc, variant) => {
		return {
			...acc,
			...resolveVariant(options[variant] || context?.[variant], options.variants, custom)
		};
	}, {});
}
function shallowCompare(next, prev) {
	const prevLength = prev?.length;
	if (prevLength !== next.length) return false;
	for (let i = 0; i < prevLength; i++) if (prev[i] !== next[i]) return false;
	return true;
}
var svgElementSet = new Set([
	"animate",
	"circle",
	"defs",
	"desc",
	"ellipse",
	"g",
	"image",
	"line",
	"filter",
	"marker",
	"mask",
	"metadata",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"rect",
	"stop",
	"svg",
	"switch",
	"symbol",
	"text",
	"tspan",
	"use",
	"view",
	"clipPath",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"foreignObject",
	"linearGradient",
	"radialGradient",
	"textPath"
]);
function isSVGElement(as) {
	return svgElementSet.has(as);
}
export { isSVGElement, resolveInitialValues, shallowCompare };
