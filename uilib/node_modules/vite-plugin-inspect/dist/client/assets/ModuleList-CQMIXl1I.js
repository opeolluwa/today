import { A as createCommentVNode, B as nextTick, C as Fragment, D as computed, G as openBlock, I as guardReactiveProps, J as pushScopeId, K as popScopeId, L as h$2, M as createTextVNode, N as createVNode, O as createBaseVNode, P as defineComponent, S as withKeys, X as renderSlot, Y as renderList, Z as resolveComponent, _t as normalizeClass, bt as toDisplayString, ct as withScopeId, gt as unref, h as useRoute, j as createElementBlock, k as createBlock, l as isDark, ot as withCtx, p as useVirtualList, pt as toRef, st as withDirectives, t as usePayloadStore, ut as ref, v as createApp, vt as normalizeProps, yt as normalizeStyle, z as mergeProps } from "./index-D7rIWszL.js";
import { a as PluginName_default, i as Badge_default, o as getPluginColor } from "./QuerySelector-80miXv9L.js";
import { n as DurationDisplay_default, r as NumberWithUnit_default, t as useOptionsStore } from "./options-rRuuQb58.js";
//#endregion
//#region src/client/components/ByteSizeDisplay.vue
var ByteSizeDisplay_default = /* @__PURE__ */ defineComponent({
	__name: "ByteSizeDisplay",
	props: { bytes: {} },
	setup(__props) {
		const props = __props;
		function byteToHumanReadable(byte) {
			if (byte < 1024) return [byte, "B"];
			if (byte < 1024 * 1024) return [(byte / 1024).toFixed(2), "KB"];
			if (byte < 1024 * 1024 * 1024) return [(byte / 1024 / 1024).toFixed(2), "MB"];
			return [(byte / 1024 / 1024 / 1024).toFixed(2), "GB"];
		}
		const readable = computed(() => byteToHumanReadable(props.bytes));
		return (_ctx, _cache) => {
			const _component_NumberWithUnit = NumberWithUnit_default;
			return openBlock(), createBlock(_component_NumberWithUnit, {
				number: unref(readable)[0],
				unit: unref(readable)[1]
			}, null, 8, ["number", "unit"]);
		};
	}
});
//#endregion
//#region src/client/components/FileIcon.vue
var FileIcon_default = /* @__PURE__ */ defineComponent({
	__name: "FileIcon",
	props: { filename: {} },
	setup(__props) {
		const props = __props;
		const map = {
			angular: "i-catppuccin-angular",
			vue: "i-catppuccin-vue",
			js: "i-catppuccin-javascript",
			mjs: "i-catppuccin-javascript",
			cjs: "i-catppuccin-javascript",
			ts: "i-catppuccin-typescript",
			mts: "i-catppuccin-typescript",
			cts: "i-catppuccin-typescript",
			md: "i-catppuccin-markdown",
			markdown: "i-catppuccin-markdown",
			mdx: "i-catppuccin-mdx",
			jsx: "i-catppuccin-javascript-react",
			tsx: "i-catppuccin-typescript-react",
			svelte: "i-catppuccin-svelte",
			html: "i-catppuccin-html",
			css: "i-catppuccin-css",
			scss: "i-catppuccin-css",
			less: "i-catppuccin-less",
			json: "i-catppuccin-json",
			yaml: "i-catppuccin-yaml",
			toml: "i-catppuccin-toml",
			svg: "i-catppuccin-svg"
		};
		const icon = computed(() => {
			let file = props.filename;
			file = file.replace(/(\?|&)v=[^&]*/, "$1").replace(/\?$/, "");
			if (/[\\/]node_modules[\\/]/.test(file)) return "i-catppuccin-folder-node-open";
			let ext = (file.split(".").pop() || "").toLowerCase();
			let icon = map[ext];
			if (icon) return icon;
			ext = ext.split("?")[0];
			icon = map[ext];
			if (icon) return icon;
			return "i-catppuccin-file";
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				"flex-none": "",
				class: normalizeClass([unref(icon), unref(isDark) ? "" : "brightness-60 hue-rotate-180 invert-100 saturate-200"])
			}, null, 2);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
/**
* Custom positioning reference element.
* @see https://floating-ui.com/docs/virtual-elements
*/
var sides = [
	"top",
	"right",
	"bottom",
	"left"
];
var alignments = ["start", "end"];
var placements = /* @__PURE__ */ sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
var oppositeAlignmentMap = {
	start: "end",
	end: "start"
};
function clamp(start, value, end) {
	return max(start, min(value, end));
}
function evaluate(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
var yAxisSides = /* @__PURE__ */ new Set(["top", "bottom"]);
function getSideAxis(placement) {
	return yAxisSides.has(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...padding
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number" ? expandPaddingObject(padding) : {
		top: padding,
		right: padding,
		bottom: padding,
		left: padding
	};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+core@1.7.3/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	switch (getAlignment(placement)) {
		case "start":
			coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
			break;
		case "end":
			coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
			break;
	}
	return coords;
}
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*
* This export does not have any `platform` interface logic. You will need to
* write one for the platform you are using Floating UI with.
*/
var computePosition = async (reference, floating, config) => {
	const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
	const validMiddleware = middleware.filter(Boolean);
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
	let rects = await platform.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let middlewareData = {};
	let resetCount = 0;
	for (let i = 0; i < validMiddleware.length; i++) {
		const { name, fn } = validMiddleware[i];
		const { x: nextX, y: nextY, data, reset } = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData = {
			...middlewareData,
			[name]: {
				...middlewareData[name],
				...data
			}
		};
		if (reset && resetCount <= 50) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) statefulPlacement = reset.placement;
				if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
					reference,
					floating,
					strategy
				}) : reset.rects;
				({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
};
/**
* Resolves with an object of overflow side offsets that determine how much the
* element is overflowing a given clipping boundary on each side.
* - positive = overflowing the boundary by that number of pixels
* - negative = how many pixels left before it will overflow
* - 0 = lies flush with the boundary
* @see https://floating-ui.com/docs/detectOverflow
*/
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform, rects, elements, strategy } = state;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform.getClippingRect({
		element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
		boundary,
		rootBoundary,
		strategy
	}));
	const rect = elementContext === "floating" ? {
		x,
		y,
		width: rects.floating.width,
		height: rects.floating.height
	} : rects.reference;
	const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) ? await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
		x: 1,
		y: 1
	} : {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements,
		rect,
		offsetParent,
		strategy
	}) : rect);
	return {
		top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
		bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
		left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
		right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	};
}
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow = (options) => ({
	name: "arrow",
	options,
	async fn(state) {
		const { x, y, placement, rects, platform, elements, middlewareData } = state;
		const { element, padding = 0 } = evaluate(options, state) || {};
		if (element == null) return {};
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
		let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
		if (!clientSize || !await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) clientSize = elements.floating[clientProp] || rects.floating[length];
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
		const min$1 = minPadding;
		const max = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset = clamp(min$1, center, max);
		const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
		const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset,
				centerOffset: center - offset - alignmentOffset,
				...shouldAddOffset && { alignmentOffset }
			},
			reset: shouldAddOffset
		};
	}
});
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
	return (alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getSide(placement) === placement)).filter((placement) => {
		if (alignment) return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
		return true;
	});
}
/**
* Optimizes the visibility of the floating element by choosing the placement
* that has the most space available automatically, without needing to specify a
* preferred placement. Alternative to `flip`.
* @see https://floating-ui.com/docs/autoPlacement
*/
var autoPlacement = function(options) {
	if (options === void 0) options = {};
	return {
		name: "autoPlacement",
		options,
		async fn(state) {
			var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
			const { rects, middlewareData, placement, platform, elements } = state;
			const { crossAxis = false, alignment, allowedPlacements = placements, autoAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
			const placements$1 = alignment !== void 0 || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
			const overflow = await detectOverflow(state, detectOverflowOptions);
			const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
			const currentPlacement = placements$1[currentIndex];
			if (currentPlacement == null) return {};
			const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));
			if (placement !== currentPlacement) return { reset: { placement: placements$1[0] } };
			const currentOverflows = [
				overflow[getSide(currentPlacement)],
				overflow[alignmentSides[0]],
				overflow[alignmentSides[1]]
			];
			const allOverflows = [...((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || [], {
				placement: currentPlacement,
				overflows: currentOverflows
			}];
			const nextPlacement = placements$1[currentIndex + 1];
			if (nextPlacement) return {
				data: {
					index: currentIndex + 1,
					overflows: allOverflows
				},
				reset: { placement: nextPlacement }
			};
			const placementsSortedByMostSpace = allOverflows.map((d) => {
				const alignment = getAlignment(d.placement);
				return [
					d.placement,
					alignment && crossAxis ? d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) : d.overflows[0],
					d.overflows
				];
			}).sort((a, b) => a[1] - b[1]);
			const resetPlacement = ((_placementsThatFitOnE = placementsSortedByMostSpace.filter((d) => d[2].slice(0, getAlignment(d[0]) ? 2 : 3).every((v) => v <= 0))[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
			if (resetPlacement !== placement) return {
				data: {
					index: currentIndex + 1,
					overflows: allOverflows
				},
				reset: { placement: resetPlacement }
			};
			return {};
		}
	};
};
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip = function(options) {
	if (options === void 0) options = {};
	return {
		name: "flip",
		options,
		async fn(state) {
			var _middlewareData$arrow, _middlewareData$flip;
			const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
			if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
			const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
			if (checkMainAxis) overflows.push(overflow[side]);
			if (checkCrossAxis) {
				const sides = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides[0]], overflow[sides[1]]);
			}
			overflowsData = [...overflowsData, {
				placement,
				overflows
			}];
			if (!overflows.every((side) => side <= 0)) {
				var _middlewareData$flip2, _overflowsData$filter;
				const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
						data: {
							index: nextIndex,
							overflows: overflowsData
						},
						reset: { placement: nextPlacement }
					};
				}
				let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
				if (!resetPlacement) switch (fallbackStrategy) {
					case "bestFit": {
						var _overflowsData$filter2;
						const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
							if (hasFallbackAxisSideDirection) {
								const currentSideAxis = getSideAxis(d.placement);
								return currentSideAxis === initialSideAxis || currentSideAxis === "y";
							}
							return true;
						}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
						if (placement) resetPlacement = placement;
						break;
					}
					case "initialPlacement":
						resetPlacement = initialPlacement;
						break;
				}
				if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
			}
			return {};
		}
	};
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
	const { placement, platform, elements } = state;
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset = function(options) {
	if (options === void 0) options = 0;
	return {
		name: "offset",
		options,
		async fn(state) {
			var _middlewareData$offse, _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift = function(options) {
	if (options === void 0) options = {};
	return {
		name: "shift",
		options,
		async fn(state) {
			const { x, y, placement } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
				let { x, y } = _ref;
				return {
					x,
					y
				};
			} }, ...detectOverflowOptions } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const overflow = await detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(getSide(placement));
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			if (checkMainAxis) {
				const minSide = mainAxis === "y" ? "top" : "left";
				const maxSide = mainAxis === "y" ? "bottom" : "right";
				const min = mainAxisCoord + overflow[minSide];
				const max = mainAxisCoord - overflow[maxSide];
				mainAxisCoord = clamp(min, mainAxisCoord, max);
			}
			if (checkCrossAxis) {
				const minSide = crossAxis === "y" ? "top" : "left";
				const maxSide = crossAxis === "y" ? "bottom" : "right";
				const min = crossAxisCoord + overflow[minSide];
				const max = crossAxisCoord - overflow[maxSide];
				crossAxisCoord = clamp(min, crossAxisCoord, max);
			}
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size = function(options) {
	if (options === void 0) options = {};
	return {
		name: "size",
		options,
		async fn(state) {
			var _state$middlewareData, _state$middlewareData2;
			const { placement, rects, platform, elements } = state;
			const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
			const overflow = await detectOverflow(state, detectOverflowOptions);
			const side = getSide(placement);
			const alignment = getAlignment(placement);
			const isYAxis = getSideAxis(placement) === "y";
			const { width, height } = rects.floating;
			let heightSide;
			let widthSide;
			if (side === "top" || side === "bottom") {
				heightSide = side;
				widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
			} else {
				widthSide = side;
				heightSide = alignment === "end" ? "top" : "bottom";
			}
			const maximumClippingHeight = height - overflow.top - overflow.bottom;
			const maximumClippingWidth = width - overflow.left - overflow.right;
			const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
			const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
			const noShift = !state.middlewareData.shift;
			let availableHeight = overflowAvailableHeight;
			let availableWidth = overflowAvailableWidth;
			if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) availableWidth = maximumClippingWidth;
			if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) availableHeight = maximumClippingHeight;
			if (noShift && !alignment) {
				const xMin = max(overflow.left, 0);
				const xMax = max(overflow.right, 0);
				const yMin = max(overflow.top, 0);
				const yMax = max(overflow.bottom, 0);
				if (isYAxis) availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
				else availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
			}
			await apply({
				...state,
				availableWidth,
				availableHeight
			});
			const nextDimensions = await platform.getDimensions(elements.floating);
			if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
			return {};
		}
	};
};
//#endregion
//#region node_modules/.pnpm/@floating-ui+dom@1.1.1/node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.min.mjs
function n$1(t) {
	var e;
	return (null == (e = t.ownerDocument) ? void 0 : e.defaultView) || window;
}
function o(t) {
	return n$1(t).getComputedStyle(t);
}
var i = Math.min, r = Math.max, l = Math.round;
function c$1(t) {
	const e = o(t);
	let n = parseFloat(e.width), i = parseFloat(e.height);
	const r = t.offsetWidth, c = t.offsetHeight, s = l(n) !== r || l(i) !== c;
	return s && (n = r, i = c), {
		width: n,
		height: i,
		fallback: s
	};
}
function s(t) {
	return h$1(t) ? (t.nodeName || "").toLowerCase() : "";
}
var f;
function u() {
	if (f) return f;
	const t = navigator.userAgentData;
	return t && Array.isArray(t.brands) ? (f = t.brands.map(((t) => t.brand + "/" + t.version)).join(" "), f) : navigator.userAgent;
}
function a(t) {
	return t instanceof n$1(t).HTMLElement;
}
function d$1(t) {
	return t instanceof n$1(t).Element;
}
function h$1(t) {
	return t instanceof n$1(t).Node;
}
function p(t) {
	if ("undefined" == typeof ShadowRoot) return !1;
	return t instanceof n$1(t).ShadowRoot || t instanceof ShadowRoot;
}
function g$1(t) {
	const { overflow: e, overflowX: n, overflowY: i, display: r } = o(t);
	return /auto|scroll|overlay|hidden|clip/.test(e + i + n) && !["inline", "contents"].includes(r);
}
function m$1(t) {
	return [
		"table",
		"td",
		"th"
	].includes(s(t));
}
function y$1(t) {
	const e = /firefox/i.test(u()), n = o(t), i = n.backdropFilter || n.WebkitBackdropFilter;
	return "none" !== n.transform || "none" !== n.perspective || !!i && "none" !== i || e && "filter" === n.willChange || e && !!n.filter && "none" !== n.filter || ["transform", "perspective"].some(((t) => n.willChange.includes(t))) || [
		"paint",
		"layout",
		"strict",
		"content"
	].some(((t) => {
		const e = n.contain;
		return null != e && e.includes(t);
	}));
}
function x$1() {
	return !/^((?!chrome|android).)*safari/i.test(u());
}
function w(t) {
	return [
		"html",
		"body",
		"#document"
	].includes(s(t));
}
function v(t) {
	return d$1(t) ? t : t.contextElement;
}
var b$1 = {
	x: 1,
	y: 1
};
function L(t) {
	const e = v(t);
	if (!a(e)) return b$1;
	const n = e.getBoundingClientRect(), { width: o, height: i, fallback: r } = c$1(e);
	let s = (r ? l(n.width) : n.width) / o, f = (r ? l(n.height) : n.height) / i;
	return s && Number.isFinite(s) || (s = 1), f && Number.isFinite(f) || (f = 1), {
		x: s,
		y: f
	};
}
function E$1(t, e, o, i) {
	var r, l;
	void 0 === e && (e = !1), void 0 === o && (o = !1);
	const c = t.getBoundingClientRect(), s = v(t);
	let f = b$1;
	e && (i ? d$1(i) && (f = L(i)) : f = L(t));
	const u = s ? n$1(s) : window, a = !x$1() && o;
	let h = (c.left + (a && (null == (r = u.visualViewport) ? void 0 : r.offsetLeft) || 0)) / f.x, p = (c.top + (a && (null == (l = u.visualViewport) ? void 0 : l.offsetTop) || 0)) / f.y, g = c.width / f.x, m = c.height / f.y;
	if (s) {
		const t = n$1(s), e = i && d$1(i) ? n$1(i) : i;
		let o = t.frameElement;
		for (; o && i && e !== t;) {
			const t = L(o), e = o.getBoundingClientRect(), i = getComputedStyle(o);
			e.x += (o.clientLeft + parseFloat(i.paddingLeft)) * t.x, e.y += (o.clientTop + parseFloat(i.paddingTop)) * t.y, h *= t.x, p *= t.y, g *= t.x, m *= t.y, h += e.x, p += e.y, o = n$1(o).frameElement;
		}
	}
	return {
		width: g,
		height: m,
		top: p,
		right: h + g,
		bottom: p + m,
		left: h,
		x: h,
		y: p
	};
}
function R(t) {
	return ((h$1(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function T(t) {
	return d$1(t) ? {
		scrollLeft: t.scrollLeft,
		scrollTop: t.scrollTop
	} : {
		scrollLeft: t.pageXOffset,
		scrollTop: t.pageYOffset
	};
}
function C$1(t) {
	return E$1(R(t)).left + T(t).scrollLeft;
}
function F(t) {
	if ("html" === s(t)) return t;
	const e = t.assignedSlot || t.parentNode || p(t) && t.host || R(t);
	return p(e) ? e.host : e;
}
function W(t) {
	const e = F(t);
	return w(e) ? e.ownerDocument.body : a(e) && g$1(e) ? e : W(e);
}
function D(t, e) {
	var o;
	void 0 === e && (e = []);
	const i = W(t), r = i === (null == (o = t.ownerDocument) ? void 0 : o.body), l = n$1(i);
	return r ? e.concat(l, l.visualViewport || [], g$1(i) ? i : []) : e.concat(i, D(i));
}
function S$1(e, i, l) {
	return "viewport" === i ? rectToClientRect(function(t, e) {
		const o = n$1(t), i = R(t), r = o.visualViewport;
		let l = i.clientWidth, c = i.clientHeight, s = 0, f = 0;
		if (r) {
			l = r.width, c = r.height;
			const t = x$1();
			(t || !t && "fixed" === e) && (s = r.offsetLeft, f = r.offsetTop);
		}
		return {
			width: l,
			height: c,
			x: s,
			y: f
		};
	}(e, l)) : d$1(i) ? rectToClientRect(function(t, e) {
		const n = E$1(t, !0, "fixed" === e), o = n.top + t.clientTop, i = n.left + t.clientLeft, r = a(t) ? L(t) : {
			x: 1,
			y: 1
		};
		return {
			width: t.clientWidth * r.x,
			height: t.clientHeight * r.y,
			x: i * r.x,
			y: o * r.y
		};
	}(i, l)) : rectToClientRect(function(t) {
		const e = R(t), n = T(t), i = t.ownerDocument.body, l = r(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth), c = r(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
		let s = -n.scrollLeft + C$1(t);
		const f = -n.scrollTop;
		return "rtl" === o(i).direction && (s += r(e.clientWidth, i.clientWidth) - l), {
			width: l,
			height: c,
			x: s,
			y: f
		};
	}(R(e)));
}
function A(t) {
	return a(t) && "fixed" !== o(t).position ? t.offsetParent : null;
}
function H$1(t) {
	const e = n$1(t);
	let i = A(t);
	for (; i && m$1(i) && "static" === o(i).position;) i = A(i);
	return i && ("html" === s(i) || "body" === s(i) && "static" === o(i).position && !y$1(i)) ? e : i || function(t) {
		let e = F(t);
		for (; a(e) && !w(e);) {
			if (y$1(e)) return e;
			e = F(e);
		}
		return null;
	}(t) || e;
}
function O(t, e, n) {
	const o = a(e), i = R(e), r = E$1(t, !0, "fixed" === n, e);
	let l = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const c = {
		x: 0,
		y: 0
	};
	if (o || !o && "fixed" !== n) if (("body" !== s(e) || g$1(i)) && (l = T(e)), a(e)) {
		const t = E$1(e, !0);
		c.x = t.x + e.clientLeft, c.y = t.y + e.clientTop;
	} else i && (c.x = C$1(i));
	return {
		x: r.left + l.scrollLeft - c.x,
		y: r.top + l.scrollTop - c.y,
		width: r.width,
		height: r.height
	};
}
var P = {
	getClippingRect: function(t) {
		let { element: e, boundary: n, rootBoundary: l, strategy: c } = t;
		const u = [..."clippingAncestors" === n ? function(t, e) {
			const n = e.get(t);
			if (n) return n;
			let i = D(t).filter(((t) => d$1(t) && "body" !== s(t))), r = null;
			const l = "fixed" === o(t).position;
			let c = l ? F(t) : t;
			for (; d$1(c) && !w(c);) {
				const t = o(c), e = y$1(c);
				(l ? e || r : e || "static" !== t.position || !r || !["absolute", "fixed"].includes(r.position)) ? r = t : i = i.filter(((t) => t !== c)), c = F(c);
			}
			return e.set(t, i), i;
		}(e, this._c) : [].concat(n), l], a = u[0], h = u.reduce(((t, n) => {
			const o = S$1(e, n, c);
			return t.top = r(o.top, t.top), t.right = i(o.right, t.right), t.bottom = i(o.bottom, t.bottom), t.left = r(o.left, t.left), t;
		}), S$1(e, a, c));
		return {
			width: h.right - h.left,
			height: h.bottom - h.top,
			x: h.left,
			y: h.top
		};
	},
	convertOffsetParentRelativeRectToViewportRelativeRect: function(t) {
		let { rect: e, offsetParent: n, strategy: o } = t;
		const i = a(n), r = R(n);
		if (n === r) return e;
		let l = {
			scrollLeft: 0,
			scrollTop: 0
		}, c = {
			x: 1,
			y: 1
		};
		const f = {
			x: 0,
			y: 0
		};
		if ((i || !i && "fixed" !== o) && (("body" !== s(n) || g$1(r)) && (l = T(n)), a(n))) {
			const t = E$1(n);
			c = L(n), f.x = t.x + n.clientLeft, f.y = t.y + n.clientTop;
		}
		return {
			width: e.width * c.x,
			height: e.height * c.y,
			x: e.x * c.x - l.scrollLeft * c.x + f.x,
			y: e.y * c.y - l.scrollTop * c.y + f.y
		};
	},
	isElement: d$1,
	getDimensions: function(t) {
		return a(t) ? c$1(t) : t.getBoundingClientRect();
	},
	getOffsetParent: H$1,
	getDocumentElement: R,
	getScale: L,
	async getElementRects(t) {
		let { reference: e, floating: n, strategy: o } = t;
		const i = this.getOffsetParent || H$1, r = this.getDimensions;
		return {
			reference: O(e, await i(n), o),
			floating: {
				x: 0,
				y: 0,
				...await r(n)
			}
		};
	},
	getClientRects: (t) => Array.from(t.getClientRects()),
	isRTL: (t) => "rtl" === o(t).direction
};
var B$1 = (t, n, o) => {
	const i = /* @__PURE__ */ new Map(), r = {
		platform: P,
		...o
	}, l = {
		...r.platform,
		_c: i
	};
	return computePosition(t, n, {
		...r,
		platform: l
	});
};
//#endregion
//#region node_modules/.pnpm/floating-vue@5.2.2_@nuxt+kit@4.4.6_vue@3.5.35_typescript@6.0.3_/node_modules/floating-vue/dist/floating-vue.mjs
var h = {
	disabled: !1,
	distance: 5,
	skidding: 0,
	container: "body",
	boundary: void 0,
	instantMove: !1,
	disposeTimeout: 150,
	popperTriggers: [],
	strategy: "absolute",
	preventOverflow: !0,
	flip: !0,
	shift: !0,
	overflowPadding: 0,
	arrowPadding: 0,
	arrowOverflow: !0,
	/**
	* By default, compute autohide on 'click'.
	*/
	autoHideOnMousedown: !1,
	themes: {
		tooltip: {
			placement: "top",
			triggers: [
				"hover",
				"focus",
				"touch"
			],
			hideTriggers: (e) => [...e, "click"],
			delay: {
				show: 200,
				hide: 0
			},
			handleResize: !1,
			html: !1,
			loadingContent: "..."
		},
		dropdown: {
			placement: "bottom",
			triggers: ["click"],
			delay: 0,
			handleResize: !0,
			autoHide: !0
		},
		menu: {
			$extend: "dropdown",
			triggers: ["hover", "focus"],
			popperTriggers: ["hover"],
			delay: {
				show: 0,
				hide: 400
			}
		}
	}
};
function S(e, t) {
	let o = h.themes[e] || {}, i;
	do
		i = o[t], typeof i > "u" ? o.$extend ? o = h.themes[o.$extend] || {} : (o = null, i = h[t]) : o = null;
	while (o);
	return i;
}
function Ze(e) {
	const t = [e];
	let o = h.themes[e] || {};
	do
		o.$extend && !o.$resetCss ? (t.push(o.$extend), o = h.themes[o.$extend] || {}) : o = null;
	while (o);
	return t.map((i) => `v-popper--theme-${i}`);
}
function re(e) {
	const t = [e];
	let o = h.themes[e] || {};
	do
		o.$extend ? (t.push(o.$extend), o = h.themes[o.$extend] || {}) : o = null;
	while (o);
	return t;
}
var $ = !1;
if (typeof window < "u") {
	$ = !1;
	try {
		const e = Object.defineProperty({}, "passive", { get() {
			$ = !0;
		} });
		window.addEventListener("test", null, e);
	} catch {}
}
var _e = !1;
typeof window < "u" && typeof navigator < "u" && (_e = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
var Te = [
	"auto",
	"top",
	"bottom",
	"left",
	"right"
].reduce((e, t) => e.concat([
	t,
	`${t}-start`,
	`${t}-end`
]), []), pe = {
	hover: "mouseenter",
	focus: "focus",
	click: "click",
	touch: "touchstart",
	pointer: "pointerdown"
}, ae = {
	hover: "mouseleave",
	focus: "blur",
	click: "click",
	touch: "touchend",
	pointer: "pointerup"
};
function de(e, t) {
	const o = e.indexOf(t);
	o !== -1 && e.splice(o, 1);
}
function G() {
	return new Promise((e) => requestAnimationFrame(() => {
		requestAnimationFrame(e);
	}));
}
var d = [];
var g = null;
var le = {};
function he(e) {
	let t = le[e];
	return t || (t = le[e] = []), t;
}
var Y = function() {};
typeof window < "u" && (Y = window.Element);
function n(e) {
	return function(t) {
		return S(t.theme, e);
	};
}
var q = "__floating-vue__popper", Q = () => defineComponent({
	name: "VPopper",
	provide() {
		return { [q]: { parentPopper: this } };
	},
	inject: { [q]: { default: null } },
	props: {
		theme: {
			type: String,
			required: !0
		},
		targetNodes: {
			type: Function,
			required: !0
		},
		referenceNode: {
			type: Function,
			default: null
		},
		popperNode: {
			type: Function,
			required: !0
		},
		shown: {
			type: Boolean,
			default: !1
		},
		showGroup: {
			type: String,
			default: null
		},
		ariaId: { default: null },
		disabled: {
			type: Boolean,
			default: n("disabled")
		},
		positioningDisabled: {
			type: Boolean,
			default: n("positioningDisabled")
		},
		placement: {
			type: String,
			default: n("placement"),
			validator: (e) => Te.includes(e)
		},
		delay: {
			type: [
				String,
				Number,
				Object
			],
			default: n("delay")
		},
		distance: {
			type: [Number, String],
			default: n("distance")
		},
		skidding: {
			type: [Number, String],
			default: n("skidding")
		},
		triggers: {
			type: Array,
			default: n("triggers")
		},
		showTriggers: {
			type: [Array, Function],
			default: n("showTriggers")
		},
		hideTriggers: {
			type: [Array, Function],
			default: n("hideTriggers")
		},
		popperTriggers: {
			type: Array,
			default: n("popperTriggers")
		},
		popperShowTriggers: {
			type: [Array, Function],
			default: n("popperShowTriggers")
		},
		popperHideTriggers: {
			type: [Array, Function],
			default: n("popperHideTriggers")
		},
		container: {
			type: [
				String,
				Object,
				Y,
				Boolean
			],
			default: n("container")
		},
		boundary: {
			type: [String, Y],
			default: n("boundary")
		},
		strategy: {
			type: String,
			validator: (e) => ["absolute", "fixed"].includes(e),
			default: n("strategy")
		},
		autoHide: {
			type: [Boolean, Function],
			default: n("autoHide")
		},
		handleResize: {
			type: Boolean,
			default: n("handleResize")
		},
		instantMove: {
			type: Boolean,
			default: n("instantMove")
		},
		eagerMount: {
			type: Boolean,
			default: n("eagerMount")
		},
		popperClass: {
			type: [
				String,
				Array,
				Object
			],
			default: n("popperClass")
		},
		computeTransformOrigin: {
			type: Boolean,
			default: n("computeTransformOrigin")
		},
		/**
		* @deprecated
		*/
		autoMinSize: {
			type: Boolean,
			default: n("autoMinSize")
		},
		autoSize: {
			type: [Boolean, String],
			default: n("autoSize")
		},
		/**
		* @deprecated
		*/
		autoMaxSize: {
			type: Boolean,
			default: n("autoMaxSize")
		},
		autoBoundaryMaxSize: {
			type: Boolean,
			default: n("autoBoundaryMaxSize")
		},
		preventOverflow: {
			type: Boolean,
			default: n("preventOverflow")
		},
		overflowPadding: {
			type: [Number, String],
			default: n("overflowPadding")
		},
		arrowPadding: {
			type: [Number, String],
			default: n("arrowPadding")
		},
		arrowOverflow: {
			type: Boolean,
			default: n("arrowOverflow")
		},
		flip: {
			type: Boolean,
			default: n("flip")
		},
		shift: {
			type: Boolean,
			default: n("shift")
		},
		shiftCrossAxis: {
			type: Boolean,
			default: n("shiftCrossAxis")
		},
		noAutoFocus: {
			type: Boolean,
			default: n("noAutoFocus")
		},
		disposeTimeout: {
			type: Number,
			default: n("disposeTimeout")
		}
	},
	emits: {
		show: () => !0,
		hide: () => !0,
		"update:shown": (e) => !0,
		"apply-show": () => !0,
		"apply-hide": () => !0,
		"close-group": () => !0,
		"close-directive": () => !0,
		"auto-hide": () => !0,
		resize: () => !0
	},
	data() {
		return {
			isShown: !1,
			isMounted: !1,
			skipTransition: !1,
			classes: {
				showFrom: !1,
				showTo: !1,
				hideFrom: !1,
				hideTo: !0
			},
			result: {
				x: 0,
				y: 0,
				placement: "",
				strategy: this.strategy,
				arrow: {
					x: 0,
					y: 0,
					centerOffset: 0
				},
				transformOrigin: null
			},
			randomId: `popper_${[Math.random(), Date.now()].map((e) => e.toString(36).substring(2, 10)).join("_")}`,
			shownChildren: /* @__PURE__ */ new Set(),
			lastAutoHide: !0,
			pendingHide: !1,
			containsGlobalTarget: !1,
			isDisposed: !0,
			mouseDownContains: !1
		};
	},
	computed: {
		popperId() {
			return this.ariaId != null ? this.ariaId : this.randomId;
		},
		shouldMountContent() {
			return this.eagerMount || this.isMounted;
		},
		slotData() {
			return {
				popperId: this.popperId,
				isShown: this.isShown,
				shouldMountContent: this.shouldMountContent,
				skipTransition: this.skipTransition,
				autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide,
				show: this.show,
				hide: this.hide,
				handleResize: this.handleResize,
				onResize: this.onResize,
				classes: {
					...this.classes,
					popperClass: this.popperClass
				},
				result: this.positioningDisabled ? null : this.result,
				attrs: this.$attrs
			};
		},
		parentPopper() {
			var e;
			return (e = this[q]) == null ? void 0 : e.parentPopper;
		},
		hasPopperShowTriggerHover() {
			var e, t;
			return ((e = this.popperTriggers) == null ? void 0 : e.includes("hover")) || ((t = this.popperShowTriggers) == null ? void 0 : t.includes("hover"));
		}
	},
	watch: {
		shown: "$_autoShowHide",
		disabled(e) {
			e ? this.dispose() : this.init();
		},
		async container() {
			this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
		},
		triggers: {
			handler: "$_refreshListeners",
			deep: !0
		},
		positioningDisabled: "$_refreshListeners",
		...[
			"placement",
			"distance",
			"skidding",
			"boundary",
			"strategy",
			"overflowPadding",
			"arrowPadding",
			"preventOverflow",
			"shift",
			"shiftCrossAxis",
			"flip"
		].reduce((e, t) => (e[t] = "$_computePosition", e), {})
	},
	created() {
		this.autoMinSize && console.warn("[floating-vue] `autoMinSize` option is deprecated. Use `autoSize=\"min\"` instead."), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
	},
	mounted() {
		this.init(), this.$_detachPopperNode();
	},
	activated() {
		this.$_autoShowHide();
	},
	deactivated() {
		this.hide();
	},
	beforeUnmount() {
		this.dispose();
	},
	methods: {
		show({ event: e = null, skipDelay: t = !1, force: o = !1 } = {}) {
			var i, s;
			(i = this.parentPopper) != null && i.lockedChild && this.parentPopper.lockedChild !== this || (this.pendingHide = !1, (o || !this.disabled) && (((s = this.parentPopper) == null ? void 0 : s.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e, t), this.$emit("show"), this.$_showFrameLocked = !0, requestAnimationFrame(() => {
				this.$_showFrameLocked = !1;
			})), this.$emit("update:shown", !0));
		},
		hide({ event: e = null, skipDelay: t = !1 } = {}) {
			var o;
			if (!this.$_hideInProgress) {
				if (this.shownChildren.size > 0) {
					this.pendingHide = !0;
					return;
				}
				if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
					this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
						this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: t }), this.parentPopper.lockedChild = null);
					}, 1e3));
					return;
				}
				((o = this.parentPopper) == null ? void 0 : o.lockedChild) === this && (this.parentPopper.lockedChild = null), this.pendingHide = !1, this.$_scheduleHide(e, t), this.$emit("hide"), this.$emit("update:shown", !1);
			}
		},
		init() {
			var e;
			this.isDisposed && (this.isDisposed = !1, this.isMounted = !1, this.$_events = [], this.$_preventShow = !1, this.$_referenceNode = ((e = this.referenceNode) == null ? void 0 : e.call(this)) ?? this.$el, this.$_targetNodes = this.targetNodes().filter((t) => t.nodeType === t.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
		},
		dispose() {
			this.isDisposed || (this.isDisposed = !0, this.$_removeEventListeners(), this.hide({ skipDelay: !0 }), this.$_detachPopperNode(), this.isMounted = !1, this.isShown = !1, this.$_updateParentShownChildren(!1), this.$_swapTargetAttrs("data-original-title", "title"));
		},
		async onResize() {
			this.isShown && (await this.$_computePosition(), this.$emit("resize"));
		},
		async $_computePosition() {
			if (this.isDisposed || this.positioningDisabled) return;
			const e = {
				strategy: this.strategy,
				middleware: []
			};
			(this.distance || this.skidding) && e.middleware.push(offset({
				mainAxis: this.distance,
				crossAxis: this.skidding
			}));
			const t = this.placement.startsWith("auto");
			if (t ? e.middleware.push(autoPlacement({ alignment: this.placement.split("-")[1] ?? "" })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(shift({
				padding: this.overflowPadding,
				boundary: this.boundary,
				crossAxis: this.shiftCrossAxis
			})), !t && this.flip && e.middleware.push(flip({
				padding: this.overflowPadding,
				boundary: this.boundary
			}))), e.middleware.push(arrow({
				element: this.$_arrowNode,
				padding: this.arrowPadding
			})), this.arrowOverflow && e.middleware.push({
				name: "arrowOverflow",
				fn: ({ placement: i, rects: s, middlewareData: r }) => {
					let p;
					const { centerOffset: a } = r.arrow;
					return i.startsWith("top") || i.startsWith("bottom") ? p = Math.abs(a) > s.reference.width / 2 : p = Math.abs(a) > s.reference.height / 2, { data: { overflow: p } };
				}
			}), this.autoMinSize || this.autoSize) {
				const i = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
				e.middleware.push({
					name: "autoSize",
					fn: ({ rects: s, placement: r, middlewareData: p }) => {
						var u;
						if ((u = p.autoSize) != null && u.skip) return {};
						let a, l;
						return r.startsWith("top") || r.startsWith("bottom") ? a = s.reference.width : l = s.reference.height, this.$_innerNode.style[i === "min" ? "minWidth" : i === "max" ? "maxWidth" : "width"] = a != null ? `${a}px` : null, this.$_innerNode.style[i === "min" ? "minHeight" : i === "max" ? "maxHeight" : "height"] = l != null ? `${l}px` : null, {
							data: { skip: !0 },
							reset: { rects: !0 }
						};
					}
				});
			}
			(this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(size({
				boundary: this.boundary,
				padding: this.overflowPadding,
				apply: ({ availableWidth: i, availableHeight: s }) => {
					this.$_innerNode.style.maxWidth = i != null ? `${i}px` : null, this.$_innerNode.style.maxHeight = s != null ? `${s}px` : null;
				}
			})));
			const o = await B$1(this.$_referenceNode, this.$_popperNode, e);
			Object.assign(this.result, {
				x: o.x,
				y: o.y,
				placement: o.placement,
				strategy: o.strategy,
				arrow: {
					...o.middlewareData.arrow,
					...o.middlewareData.arrowOverflow
				}
			});
		},
		$_scheduleShow(e, t = !1) {
			if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), g && this.instantMove && g.instantMove && g !== this.parentPopper) {
				g.$_applyHide(!0), this.$_applyShow(!0);
				return;
			}
			t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
		},
		$_scheduleHide(e, t = !1) {
			if (this.shownChildren.size > 0) {
				this.pendingHide = !0;
				return;
			}
			this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && (g = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
		},
		$_computeDelay(e) {
			const t = this.delay;
			return parseInt(t && t[e] || t || 0);
		},
		async $_applyShow(e = !1) {
			clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await G(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([...D(this.$_referenceNode), ...D(this.$_popperNode)], "scroll", () => {
				this.$_computePosition();
			}));
		},
		async $_applyShowEffect() {
			if (this.$_hideInProgress) return;
			if (this.computeTransformOrigin) {
				const t = this.$_referenceNode.getBoundingClientRect(), o = this.$_popperNode.querySelector(".v-popper__wrapper"), i = o.parentNode.getBoundingClientRect(), s = t.x + t.width / 2 - (i.left + o.offsetLeft), r = t.y + t.height / 2 - (i.top + o.offsetTop);
				this.result.transformOrigin = `${s}px ${r}px`;
			}
			this.isShown = !0, this.$_applyAttrsToTarget({
				"aria-describedby": this.popperId,
				"data-popper-shown": ""
			});
			const e = this.showGroup;
			if (e) {
				let t;
				for (let o = 0; o < d.length; o++) t = d[o], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
			}
			d.push(this), document.body.classList.add("v-popper--some-open");
			for (const t of re(this.theme)) he(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
			this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await G(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
		},
		async $_applyHide(e = !1) {
			if (this.shownChildren.size > 0) {
				this.pendingHide = !0, this.$_hideInProgress = !1;
				return;
			}
			if (clearTimeout(this.$_scheduleTimer), !this.isShown) return;
			this.skipTransition = e, de(d, this), d.length === 0 && document.body.classList.remove("v-popper--some-open");
			for (const o of re(this.theme)) {
				const i = he(o);
				de(i, this), i.length === 0 && document.body.classList.remove(`v-popper--some-open--${o}`);
			}
			g === this && (g = null), this.isShown = !1, this.$_applyAttrsToTarget({
				"aria-describedby": void 0,
				"data-popper-shown": void 0
			}), clearTimeout(this.$_disposeTimer);
			const t = this.disposeTimeout;
			t !== null && (this.$_disposeTimer = setTimeout(() => {
				this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
			}, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await G(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
		},
		$_autoShowHide() {
			this.shown ? this.show() : this.hide();
		},
		$_ensureTeleport() {
			if (this.isDisposed) return;
			let e = this.container;
			if (typeof e == "string" ? e = window.document.querySelector(e) : e === !1 && (e = this.$_targetNodes[0].parentNode), !e) throw new Error("No container for popover: " + this.container);
			e.appendChild(this.$_popperNode), this.isMounted = !0;
		},
		$_addEventListeners() {
			const e = (o) => {
				this.isShown && !this.$_hideInProgress || (o.usedByTooltip = !0, !this.$_preventShow && this.show({ event: o }));
			};
			this.$_registerTriggerListeners(this.$_targetNodes, pe, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], pe, this.popperTriggers, this.popperShowTriggers, e);
			const t = (o) => {
				o.usedByTooltip || this.hide({ event: o });
			};
			this.$_registerTriggerListeners(this.$_targetNodes, ae, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], ae, this.popperTriggers, this.popperHideTriggers, t);
		},
		$_registerEventListeners(e, t, o) {
			this.$_events.push({
				targetNodes: e,
				eventType: t,
				handler: o
			}), e.forEach((i) => i.addEventListener(t, o, $ ? { passive: !0 } : void 0));
		},
		$_registerTriggerListeners(e, t, o, i, s) {
			let r = o;
			i != null && (r = typeof i == "function" ? i(r) : i), r.forEach((p) => {
				const a = t[p];
				a && this.$_registerEventListeners(e, a, s);
			});
		},
		$_removeEventListeners(e) {
			const t = [];
			this.$_events.forEach((o) => {
				const { targetNodes: i, eventType: s, handler: r } = o;
				!e || e === s ? i.forEach((p) => p.removeEventListener(s, r)) : t.push(o);
			}), this.$_events = t;
		},
		$_refreshListeners() {
			this.isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
		},
		$_handleGlobalClose(e, t = !1) {
			this.$_showFrameLocked || (this.hide({ event: e }), e.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t && (this.$_preventShow = !0, setTimeout(() => {
				this.$_preventShow = !1;
			}, 300)));
		},
		$_detachPopperNode() {
			this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
		},
		$_swapTargetAttrs(e, t) {
			for (const o of this.$_targetNodes) {
				const i = o.getAttribute(e);
				i && (o.removeAttribute(e), o.setAttribute(t, i));
			}
		},
		$_applyAttrsToTarget(e) {
			for (const t of this.$_targetNodes) for (const o in e) {
				const i = e[o];
				i == null ? t.removeAttribute(o) : t.setAttribute(o, i);
			}
		},
		$_updateParentShownChildren(e) {
			let t = this.parentPopper;
			for (; t;) e ? t.shownChildren.add(this.randomId) : (t.shownChildren.delete(this.randomId), t.pendingHide && t.hide()), t = t.parentPopper;
		},
		$_isAimingPopper() {
			const e = this.$_referenceNode.getBoundingClientRect();
			if (y >= e.left && y <= e.right && _ >= e.top && _ <= e.bottom) {
				const t = this.$_popperNode.getBoundingClientRect(), o = y - c, i = _ - m, r = t.left + t.width / 2 - c + (t.top + t.height / 2) - m + t.width + t.height, p = c + o * r, a = m + i * r;
				return C(c, m, p, a, t.left, t.top, t.left, t.bottom) || C(c, m, p, a, t.left, t.top, t.right, t.top) || C(c, m, p, a, t.right, t.top, t.right, t.bottom) || C(c, m, p, a, t.left, t.bottom, t.right, t.bottom);
			}
			return !1;
		}
	},
	render() {
		return this.$slots.default(this.slotData);
	}
});
if (typeof document < "u" && typeof window < "u") {
	if (_e) {
		const e = $ ? {
			passive: !0,
			capture: !0
		} : !0;
		document.addEventListener("touchstart", (t) => ue(t, !0), e), document.addEventListener("touchend", (t) => fe(t, !0), e);
	} else window.addEventListener("mousedown", (e) => ue(e, !1), !0), window.addEventListener("click", (e) => fe(e, !1), !0);
	window.addEventListener("resize", tt);
}
function ue(e, t) {
	if (h.autoHideOnMousedown) Pe(e, t);
	else for (let o = 0; o < d.length; o++) {
		const i = d[o];
		try {
			i.mouseDownContains = i.popperNode().contains(e.target);
		} catch {}
	}
}
function fe(e, t) {
	h.autoHideOnMousedown || Pe(e, t);
}
function Pe(e, t) {
	const o = {};
	for (let i = d.length - 1; i >= 0; i--) {
		const s = d[i];
		try {
			const r = s.containsGlobalTarget = s.mouseDownContains || s.popperNode().contains(e.target);
			s.pendingHide = !1, requestAnimationFrame(() => {
				if (s.pendingHide = !1, !o[s.randomId] && ce(s, r, e)) {
					if (s.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && r) {
						let a = s.parentPopper;
						for (; a;) o[a.randomId] = !0, a = a.parentPopper;
						return;
					}
					let p = s.parentPopper;
					for (; p && ce(p, p.containsGlobalTarget, e);) {
						p.$_handleGlobalClose(e, t);
						p = p.parentPopper;
					}
				}
			});
		} catch {}
	}
}
function ce(e, t, o) {
	return o.closeAllPopover || o.closePopover && t || et(e, o) && !t;
}
function et(e, t) {
	if (typeof e.autoHide == "function") {
		const o = e.autoHide(t);
		return e.lastAutoHide = o, o;
	}
	return e.autoHide;
}
function tt() {
	for (let e = 0; e < d.length; e++) d[e].$_computePosition();
}
var c = 0, m = 0, y = 0, _ = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
	c = y, m = _, y = e.clientX, _ = e.clientY;
}, $ ? { passive: !0 } : void 0);
function C(e, t, o, i, s, r, p, a) {
	const l = ((p - s) * (t - r) - (a - r) * (e - s)) / ((a - r) * (o - e) - (p - s) * (i - t)), u = ((o - e) * (t - r) - (i - t) * (e - s)) / ((a - r) * (o - e) - (p - s) * (i - t));
	return l >= 0 && l <= 1 && u >= 0 && u <= 1;
}
var ot = { extends: Q() }, B = (e, t) => {
	const o = e.__vccOpts || e;
	for (const [i, s] of t) o[i] = s;
	return o;
};
function it(e, t, o, i, s, r) {
	return openBlock(), createElementBlock("div", {
		ref: "reference",
		class: normalizeClass(["v-popper", { "v-popper--shown": e.slotData.isShown }])
	}, [renderSlot(e.$slots, "default", normalizeProps(guardReactiveProps(e.slotData)))], 2);
}
var st = /* @__PURE__ */ B(ot, [["render", it]]);
function nt() {
	var e = window.navigator.userAgent, t = e.indexOf("MSIE ");
	if (t > 0) return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
	if (e.indexOf("Trident/") > 0) {
		var i = e.indexOf("rv:");
		return parseInt(e.substring(i + 3, e.indexOf(".", i)), 10);
	}
	var s = e.indexOf("Edge/");
	return s > 0 ? parseInt(e.substring(s + 5, e.indexOf(".", s)), 10) : -1;
}
var z;
function X() {
	X.init || (X.init = !0, z = nt() !== -1);
}
var E = {
	name: "ResizeObserver",
	props: {
		emitOnMount: {
			type: Boolean,
			default: !1
		},
		ignoreWidth: {
			type: Boolean,
			default: !1
		},
		ignoreHeight: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["notify"],
	mounted() {
		X(), nextTick(() => {
			this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
		});
		const e = document.createElement("object");
		this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", z && this.$el.appendChild(e), e.data = "about:blank", z || this.$el.appendChild(e);
	},
	beforeUnmount() {
		this.removeResizeHandlers();
	},
	methods: {
		compareAndNotify() {
			(!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitSize());
		},
		emitSize() {
			this.$emit("notify", {
				width: this._w,
				height: this._h
			});
		},
		addResizeHandlers() {
			this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify();
		},
		removeResizeHandlers() {
			this._resizeObject && this._resizeObject.onload && (!z && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
		}
	}
};
var rt = /* @__PURE__ */ withScopeId("data-v-b329ee4c");
pushScopeId("data-v-b329ee4c");
var pt = {
	class: "resize-observer",
	tabindex: "-1"
};
popScopeId();
E.render = /* @__PURE__ */ rt((e, t, o, i, s, r) => (openBlock(), createBlock("div", pt)));
E.__scopeId = "data-v-b329ee4c";
E.__file = "src/components/ResizeObserver.vue";
var Z = (e = "theme") => ({ computed: { themeClass() {
	return Ze(this[e]);
} } }), dt = defineComponent({
	name: "VPopperContent",
	components: { ResizeObserver: E },
	mixins: [Z()],
	props: {
		popperId: String,
		theme: String,
		shown: Boolean,
		mounted: Boolean,
		skipTransition: Boolean,
		autoHide: Boolean,
		handleResize: Boolean,
		classes: Object,
		result: Object
	},
	emits: ["hide", "resize"],
	methods: { toPx(e) {
		return e != null && !isNaN(e) ? `${e}px` : null;
	} }
}), lt = [
	"id",
	"aria-hidden",
	"tabindex",
	"data-popper-placement"
], ht = {
	ref: "inner",
	class: "v-popper__inner"
}, ct = [/* @__PURE__ */ createBaseVNode("div", { class: "v-popper__arrow-outer" }, null, -1), /* @__PURE__ */ createBaseVNode("div", { class: "v-popper__arrow-inner" }, null, -1)];
function mt(e, t, o, i, s, r) {
	const p = resolveComponent("ResizeObserver");
	return openBlock(), createElementBlock("div", {
		id: e.popperId,
		ref: "popover",
		class: normalizeClass(["v-popper__popper", [
			e.themeClass,
			e.classes.popperClass,
			{
				"v-popper__popper--shown": e.shown,
				"v-popper__popper--hidden": !e.shown,
				"v-popper__popper--show-from": e.classes.showFrom,
				"v-popper__popper--show-to": e.classes.showTo,
				"v-popper__popper--hide-from": e.classes.hideFrom,
				"v-popper__popper--hide-to": e.classes.hideTo,
				"v-popper__popper--skip-transition": e.skipTransition,
				"v-popper__popper--arrow-overflow": e.result && e.result.arrow.overflow,
				"v-popper__popper--no-positioning": !e.result
			}
		]]),
		style: normalizeStyle(e.result ? {
			position: e.result.strategy,
			transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
		} : void 0),
		"aria-hidden": e.shown ? "false" : "true",
		tabindex: e.autoHide ? 0 : void 0,
		"data-popper-placement": e.result ? e.result.placement : void 0,
		onKeyup: t[2] || (t[2] = withKeys((a) => e.autoHide && e.$emit("hide"), ["esc"]))
	}, [createBaseVNode("div", {
		class: "v-popper__backdrop",
		onClick: t[0] || (t[0] = (a) => e.autoHide && e.$emit("hide"))
	}), createBaseVNode("div", {
		class: "v-popper__wrapper",
		style: normalizeStyle(e.result ? { transformOrigin: e.result.transformOrigin } : void 0)
	}, [createBaseVNode("div", ht, [e.mounted ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("div", null, [renderSlot(e.$slots, "default")]), e.handleResize ? (openBlock(), createBlock(p, {
		key: 0,
		onNotify: t[1] || (t[1] = (a) => e.$emit("resize", a))
	})) : createCommentVNode("", !0)], 64)) : createCommentVNode("", !0)], 512), createBaseVNode("div", {
		ref: "arrow",
		class: "v-popper__arrow-container",
		style: normalizeStyle(e.result ? {
			left: e.toPx(e.result.arrow.x),
			top: e.toPx(e.result.arrow.y)
		} : void 0)
	}, ct, 4)], 4)], 46, lt);
}
var ee = /* @__PURE__ */ B(dt, [["render", mt]]), te = { methods: {
	show(...e) {
		return this.$refs.popper.show(...e);
	},
	hide(...e) {
		return this.$refs.popper.hide(...e);
	},
	dispose(...e) {
		return this.$refs.popper.dispose(...e);
	},
	onResize(...e) {
		return this.$refs.popper.onResize(...e);
	}
} };
var K = function() {};
typeof window < "u" && (K = window.Element);
var gt = defineComponent({
	name: "VPopperWrapper",
	components: {
		Popper: st,
		PopperContent: ee
	},
	mixins: [te, Z("finalTheme")],
	props: {
		theme: {
			type: String,
			default: null
		},
		referenceNode: {
			type: Function,
			default: null
		},
		shown: {
			type: Boolean,
			default: !1
		},
		showGroup: {
			type: String,
			default: null
		},
		ariaId: { default: null },
		disabled: {
			type: Boolean,
			default: void 0
		},
		positioningDisabled: {
			type: Boolean,
			default: void 0
		},
		placement: {
			type: String,
			default: void 0
		},
		delay: {
			type: [
				String,
				Number,
				Object
			],
			default: void 0
		},
		distance: {
			type: [Number, String],
			default: void 0
		},
		skidding: {
			type: [Number, String],
			default: void 0
		},
		triggers: {
			type: Array,
			default: void 0
		},
		showTriggers: {
			type: [Array, Function],
			default: void 0
		},
		hideTriggers: {
			type: [Array, Function],
			default: void 0
		},
		popperTriggers: {
			type: Array,
			default: void 0
		},
		popperShowTriggers: {
			type: [Array, Function],
			default: void 0
		},
		popperHideTriggers: {
			type: [Array, Function],
			default: void 0
		},
		container: {
			type: [
				String,
				Object,
				K,
				Boolean
			],
			default: void 0
		},
		boundary: {
			type: [String, K],
			default: void 0
		},
		strategy: {
			type: String,
			default: void 0
		},
		autoHide: {
			type: [Boolean, Function],
			default: void 0
		},
		handleResize: {
			type: Boolean,
			default: void 0
		},
		instantMove: {
			type: Boolean,
			default: void 0
		},
		eagerMount: {
			type: Boolean,
			default: void 0
		},
		popperClass: {
			type: [
				String,
				Array,
				Object
			],
			default: void 0
		},
		computeTransformOrigin: {
			type: Boolean,
			default: void 0
		},
		/**
		* @deprecated
		*/
		autoMinSize: {
			type: Boolean,
			default: void 0
		},
		autoSize: {
			type: [Boolean, String],
			default: void 0
		},
		/**
		* @deprecated
		*/
		autoMaxSize: {
			type: Boolean,
			default: void 0
		},
		autoBoundaryMaxSize: {
			type: Boolean,
			default: void 0
		},
		preventOverflow: {
			type: Boolean,
			default: void 0
		},
		overflowPadding: {
			type: [Number, String],
			default: void 0
		},
		arrowPadding: {
			type: [Number, String],
			default: void 0
		},
		arrowOverflow: {
			type: Boolean,
			default: void 0
		},
		flip: {
			type: Boolean,
			default: void 0
		},
		shift: {
			type: Boolean,
			default: void 0
		},
		shiftCrossAxis: {
			type: Boolean,
			default: void 0
		},
		noAutoFocus: {
			type: Boolean,
			default: void 0
		},
		disposeTimeout: {
			type: Number,
			default: void 0
		}
	},
	emits: {
		show: () => !0,
		hide: () => !0,
		"update:shown": (e) => !0,
		"apply-show": () => !0,
		"apply-hide": () => !0,
		"close-group": () => !0,
		"close-directive": () => !0,
		"auto-hide": () => !0,
		resize: () => !0
	},
	computed: { finalTheme() {
		return this.theme ?? this.$options.vPopperTheme;
	} },
	methods: { getTargetNodes() {
		return Array.from(this.$el.children).filter((e) => e !== this.$refs.popperContent.$el);
	} }
});
function wt(e, t, o, i, s, r) {
	const p = resolveComponent("PopperContent"), a = resolveComponent("Popper");
	return openBlock(), createBlock(a, mergeProps({ ref: "popper" }, e.$props, {
		theme: e.finalTheme,
		"target-nodes": e.getTargetNodes,
		"popper-node": () => e.$refs.popperContent.$el,
		class: [e.themeClass],
		onShow: t[0] || (t[0] = () => e.$emit("show")),
		onHide: t[1] || (t[1] = () => e.$emit("hide")),
		"onUpdate:shown": t[2] || (t[2] = (l) => e.$emit("update:shown", l)),
		onApplyShow: t[3] || (t[3] = () => e.$emit("apply-show")),
		onApplyHide: t[4] || (t[4] = () => e.$emit("apply-hide")),
		onCloseGroup: t[5] || (t[5] = () => e.$emit("close-group")),
		onCloseDirective: t[6] || (t[6] = () => e.$emit("close-directive")),
		onAutoHide: t[7] || (t[7] = () => e.$emit("auto-hide")),
		onResize: t[8] || (t[8] = () => e.$emit("resize"))
	}), {
		default: withCtx(({ popperId: l, isShown: u, shouldMountContent: L, skipTransition: D, autoHide: I, show: F, hide: v, handleResize: R, onResize: j, classes: V, result: Ee }) => [renderSlot(e.$slots, "default", {
			shown: u,
			show: F,
			hide: v
		}), createVNode(p, {
			ref: "popperContent",
			"popper-id": l,
			theme: e.finalTheme,
			shown: u,
			mounted: L,
			"skip-transition": D,
			"auto-hide": I,
			"handle-resize": R,
			classes: V,
			result: Ee,
			onHide: v,
			onResize: j
		}, {
			default: withCtx(() => [renderSlot(e.$slots, "popper", {
				shown: u,
				hide: v
			})]),
			_: 2
		}, 1032, [
			"popper-id",
			"theme",
			"shown",
			"mounted",
			"skip-transition",
			"auto-hide",
			"handle-resize",
			"classes",
			"result",
			"onHide",
			"onResize"
		])]),
		_: 3
	}, 16, [
		"theme",
		"target-nodes",
		"popper-node",
		"class"
	]);
}
var k = /* @__PURE__ */ B(gt, [["render", wt]]), Se = {
	...k,
	name: "VDropdown",
	vPopperTheme: "dropdown"
};
({ ...k });
({ ...k });
var $t = defineComponent({
	name: "VTooltipDirective",
	components: {
		Popper: Q(),
		PopperContent: ee
	},
	mixins: [te],
	inheritAttrs: !1,
	props: {
		theme: {
			type: String,
			default: "tooltip"
		},
		html: {
			type: Boolean,
			default: (e) => S(e.theme, "html")
		},
		content: {
			type: [
				String,
				Number,
				Function
			],
			default: null
		},
		loadingContent: {
			type: String,
			default: (e) => S(e.theme, "loadingContent")
		},
		targetNodes: {
			type: Function,
			required: !0
		}
	},
	data() {
		return { asyncContent: null };
	},
	computed: {
		isContentAsync() {
			return typeof this.content == "function";
		},
		loading() {
			return this.isContentAsync && this.asyncContent == null;
		},
		finalContent() {
			return this.isContentAsync ? this.loading ? this.loadingContent : this.asyncContent : this.content;
		}
	},
	watch: {
		content: {
			handler() {
				this.fetchContent(!0);
			},
			immediate: !0
		},
		async finalContent() {
			await this.$nextTick(), this.$refs.popper.onResize();
		}
	},
	created() {
		this.$_fetchId = 0;
	},
	methods: {
		fetchContent(e) {
			if (typeof this.content == "function" && this.$_isShown && (e || !this.$_loading && this.asyncContent == null)) {
				this.asyncContent = null, this.$_loading = !0;
				const t = ++this.$_fetchId, o = this.content(this);
				o.then ? o.then((i) => this.onResult(t, i)) : this.onResult(t, o);
			}
		},
		onResult(e, t) {
			e === this.$_fetchId && (this.$_loading = !1, this.asyncContent = t);
		},
		onShow() {
			this.$_isShown = !0, this.fetchContent();
		},
		onHide() {
			this.$_isShown = !1;
		}
	}
}), vt = ["innerHTML"], yt = ["textContent"];
function _t(e, t, o, i, s, r) {
	const p = resolveComponent("PopperContent"), a = resolveComponent("Popper");
	return openBlock(), createBlock(a, mergeProps({ ref: "popper" }, e.$attrs, {
		theme: e.theme,
		"target-nodes": e.targetNodes,
		"popper-node": () => e.$refs.popperContent.$el,
		onApplyShow: e.onShow,
		onApplyHide: e.onHide
	}), {
		default: withCtx(({ popperId: l, isShown: u, shouldMountContent: L, skipTransition: D, autoHide: I, hide: F, handleResize: v, onResize: R, classes: j, result: V }) => [createVNode(p, {
			ref: "popperContent",
			class: normalizeClass({ "v-popper--tooltip-loading": e.loading }),
			"popper-id": l,
			theme: e.theme,
			shown: u,
			mounted: L,
			"skip-transition": D,
			"auto-hide": I,
			"handle-resize": v,
			classes: j,
			result: V,
			onHide: F,
			onResize: R
		}, {
			default: withCtx(() => [e.html ? (openBlock(), createElementBlock("div", {
				key: 0,
				innerHTML: e.finalContent
			}, null, 8, vt)) : (openBlock(), createElementBlock("div", {
				key: 1,
				textContent: toDisplayString(e.finalContent)
			}, null, 8, yt))]),
			_: 2
		}, 1032, [
			"class",
			"popper-id",
			"theme",
			"shown",
			"mounted",
			"skip-transition",
			"auto-hide",
			"handle-resize",
			"classes",
			"result",
			"onHide",
			"onResize"
		])]),
		_: 1
	}, 16, [
		"theme",
		"target-nodes",
		"popper-node",
		"onApplyShow",
		"onApplyHide"
	]);
}
var ze = /* @__PURE__ */ B($t, [["render", _t]]), Ae = "v-popper--has-tooltip";
function Tt(e, t) {
	let o = e.placement;
	if (!o && t) for (const i of Te) t[i] && (o = i);
	return o || (o = S(e.theme || "tooltip", "placement")), o;
}
function Ne(e, t, o) {
	let i;
	const s = typeof t;
	return s === "string" ? i = { content: t } : t && s === "object" ? i = t : i = { content: !1 }, i.placement = Tt(i, o), i.targetNodes = () => [e], i.referenceNode = () => e, i;
}
var x, b, Pt = 0;
function St() {
	if (x) return;
	b = ref([]), x = createApp({
		name: "VTooltipDirectiveApp",
		setup() {
			return { directives: b };
		},
		render() {
			return this.directives.map((t) => h$2(ze, {
				...t.options,
				shown: t.shown || t.options.shown,
				key: t.id
			}));
		},
		devtools: { hide: !0 }
	});
	const e = document.createElement("div");
	document.body.appendChild(e), x.mount(e);
}
function bt(e, t, o) {
	St();
	const i = ref(Ne(e, t, o)), s = ref(!1), r = {
		id: Pt++,
		options: i,
		shown: s
	};
	return b.value.push(r), e.classList && e.classList.add(Ae), e.$_popper = {
		options: i,
		item: r,
		show() {
			s.value = !0;
		},
		hide() {
			s.value = !1;
		}
	};
}
function He(e) {
	if (e.$_popper) {
		const t = b.value.indexOf(e.$_popper.item);
		t !== -1 && b.value.splice(t, 1), delete e.$_popper, delete e.$_popperOldShown, delete e.$_popperMountTarget;
	}
	e.classList && e.classList.remove(Ae);
}
function me(e, { value: t, modifiers: o }) {
	const i = Ne(e, t, o);
	if (!i.content || S(i.theme || "tooltip", "disabled")) He(e);
	else {
		let s;
		e.$_popper ? (s = e.$_popper, s.options.value = i) : s = bt(e, t, o), typeof t.shown < "u" && t.shown !== e.$_popperOldShown && (e.$_popperOldShown = t.shown, t.shown ? s.show() : s.hide());
	}
}
var Mt = {
	beforeMount: me,
	updated: me,
	beforeUnmount(e) {
		He(e);
	}
}, kt = Se;
//#endregion
//#region node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/shared/pathe.M-eThtNZ.mjs
var _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
	if (!input) return input;
	return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
var _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
var _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
function cwd() {
	if (typeof process !== "undefined" && typeof process.cwd === "function") return process.cwd().replace(/\\/g, "/");
	return "/";
}
var resolve = function(...arguments_) {
	arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
	let resolvedPath = "";
	let resolvedAbsolute = false;
	for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
		const path = index >= 0 ? arguments_[index] : cwd();
		if (!path || path.length === 0) continue;
		resolvedPath = `${path}/${resolvedPath}`;
		resolvedAbsolute = isAbsolute(path);
	}
	resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
	if (resolvedAbsolute && !isAbsolute(resolvedPath)) return `/${resolvedPath}`;
	return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
	let res = "";
	let lastSegmentLength = 0;
	let lastSlash = -1;
	let dots = 0;
	let char = null;
	for (let index = 0; index <= path.length; ++index) {
		if (index < path.length) char = path[index];
		else if (char === "/") break;
		else char = "/";
		if (char === "/") {
			if (lastSlash === index - 1 || dots === 1);
			else if (dots === 2) {
				if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
					if (res.length > 2) {
						const lastSlashIndex = res.lastIndexOf("/");
						if (lastSlashIndex === -1) {
							res = "";
							lastSegmentLength = 0;
						} else {
							res = res.slice(0, lastSlashIndex);
							lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
						}
						lastSlash = index;
						dots = 0;
						continue;
					} else if (res.length > 0) {
						res = "";
						lastSegmentLength = 0;
						lastSlash = index;
						dots = 0;
						continue;
					}
				}
				if (allowAboveRoot) {
					res += res.length > 0 ? "/.." : "..";
					lastSegmentLength = 2;
				}
			} else {
				if (res.length > 0) res += `/${path.slice(lastSlash + 1, index)}`;
				else res = path.slice(lastSlash + 1, index);
				lastSegmentLength = index - lastSlash - 1;
			}
			lastSlash = index;
			dots = 0;
		} else if (char === "." && dots !== -1) ++dots;
		else dots = -1;
	}
	return res;
}
var isAbsolute = function(p) {
	return _IS_ABSOLUTE_RE.test(p);
};
var relative = function(from, to) {
	const _from = resolve(from).replace(_ROOT_FOLDER_RE, "$1").split("/");
	const _to = resolve(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
	if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0]) return _to.join("/");
	const _fromCopy = [..._from];
	for (const segment of _fromCopy) {
		if (_to[0] !== segment) break;
		_from.shift();
		_to.shift();
	}
	return [..._from.map(() => ".."), ..._to].join("/");
};
//#endregion
//#region src/client/components/ModuleId.vue
var ModuleId_default = /* @__PURE__ */ defineComponent({
	__name: "ModuleId",
	props: {
		id: {},
		badges: { type: Boolean },
		icon: {
			type: Boolean,
			default: true
		},
		module: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		const payload = usePayloadStore();
		const mod = computed(() => payload.modules.find((i) => i.id === props.id));
		const isVirtual = computed(() => mod.value?.virtual);
		const relativePath = computed(() => {
			if (!props.id) return "";
			let relate = relative(payload.root, props.id);
			if (!relate.startsWith(".")) relate = `./${relate}`;
			if (relate.startsWith("./")) return relate;
			if (/^(?:\.\.\/){1,3}[^.]/.test(relate)) return relate;
			return props.id;
		});
		const HighlightedPath = defineComponent({ render() {
			const parts = relativePath.value.split(/([/?&:])/g);
			let type = "start";
			const classes = parts.map(() => []);
			const nodes = parts.map((part) => {
				return h$2("span", { class: "" }, part);
			});
			parts.forEach((part, index) => {
				const _class = classes[index];
				if (part === "?") type = "query";
				if (type === "start") {
					if (/^\.+$/.test(part)) _class.push("op50");
					else if (part === "/") _class.push("op50");
					else if (part !== "/") type = "path";
				}
				if (type === "path") {
					if (part === "/" || part === "node_modules" || /^\.\w/.test(part)) _class.push("op75");
					if (part === ".pnpm") {
						classes[index + 2]?.push("op50");
						if (nodes[index + 2]) nodes[index + 2].children = "…";
					}
					if (part === ":") {
						if (nodes[index - 1]) {
							nodes[index - 1].props ||= {};
							nodes[index - 1].props.style ||= {};
							nodes[index - 1].props.style.color = getPluginColor(parts[index - 1]);
						}
						_class.push("op50");
					}
				}
				if (type === "query") if (part === "?" || part === "&") _class.push("text-orange-5 dark:text-orange-4");
				else _class.push("text-orange-9 dark:text-orange-2");
			});
			nodes.forEach((node, index) => {
				if (node.props) node.props.class = classes[index].join(" ");
			});
			return nodes;
		} });
		const gridStyles = computed(() => {
			if (!props.module) return "";
			const gridColumns = [];
			if (props.icon) gridColumns.push("min-content");
			if (props.module) gridColumns.push("minmax(0,1fr)");
			else gridColumns.push("100%");
			if (isVirtual.value) gridColumns.push("min-content");
			return `grid-template-columns: ${gridColumns.join(" ")};`;
		});
		const containerClass = computed(() => {
			return props.module ? "grid grid-rows-1 items-center gap-1" : "flex items-center";
		});
		return (_ctx, _cache) => {
			const _component_FileIcon = FileIcon_default;
			const _component_Badge = Badge_default;
			return __props.id ? withDirectives((openBlock(), createElementBlock("div", {
				key: 0,
				"my-auto": "",
				"text-sm": "",
				"font-mono": "",
				class: normalizeClass(containerClass.value),
				style: normalizeStyle(gridStyles.value)
			}, [
				__props.icon ? (openBlock(), createBlock(_component_FileIcon, {
					key: 0,
					filename: __props.id,
					"mr1.5": ""
				}, null, 8, ["filename"])) : createCommentVNode("", true),
				createBaseVNode("span", { class: normalizeClass({
					"overflow-hidden": __props.module,
					"text-truncate": __props.module
				}) }, [createVNode(unref(HighlightedPath))], 2),
				renderSlot(_ctx.$slots, "default"),
				isVirtual.value ? (openBlock(), createBlock(_component_Badge, {
					key: 1,
					class: "ml1",
					text: "virtual"
				})) : createCommentVNode("", true)
			], 6)), [[
				unref(Mt),
				{
					content: props.id,
					triggers: ["hover", "focus"],
					disabled: !__props.module
				},
				void 0,
				{ "bottom-start": true }
			]]) : createCommentVNode("", true);
		};
	}
});
//#endregion
//#region src/client/components/ModuleList.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 0,
	class: "h-full"
};
var _hoisted_2 = {
	key: 0,
	"px-6": "",
	"py-4": "",
	italic: "",
	op50: ""
};
var _hoisted_3 = { key: 0 };
var _hoisted_4 = { key: 1 };
var _hoisted_5 = {
	key: 0,
	flex: "~ gap-1",
	"text-xs": ""
};
var _hoisted_6 = {
	flex: "~ auto gap-1",
	"of-hidden": ""
};
var _hoisted_7 = {
	key: 0,
	op20: ""
};
var _hoisted_8 = {
	"ws-nowrap": "",
	op50: ""
};
var _hoisted_9 = ["title"];
var _hoisted_10 = { flex: "~ none gap-1 wrap justify-end" };
//#endregion
//#region src/client/components/ModuleList.vue
var ModuleList_default = /* @__PURE__ */ defineComponent({
	__name: "ModuleList",
	props: { modules: {} },
	setup(__props) {
		const props = __props;
		const options = useOptionsStore();
		const payload = usePayloadStore();
		const route = useRoute();
		const { list, containerProps, wrapperProps } = useVirtualList(toRef(props, "modules"), { itemHeight: options.view.listMode === "detailed" ? 53 : 37 });
		return (_ctx, _cache) => {
			const _component_ModuleId = ModuleId_default;
			const _component_PluginName = PluginName_default;
			const _component_ByteSizeDisplay = ByteSizeDisplay_default;
			const _component_DurationDisplay = DurationDisplay_default;
			const _component_RouterLink = resolveComponent("RouterLink");
			return __props.modules ? (openBlock(), createElementBlock("div", _hoisted_1, [!__props.modules.length ? (openBlock(), createElementBlock("div", _hoisted_2, [unref(options).search.text ? (openBlock(), createElementBlock("div", _hoisted_3, " No search result ")) : (openBlock(), createElementBlock("div", _hoisted_4, [..._cache[0] || (_cache[0] = [
				createTextVNode(" No module recorded yet, visit ", -1),
				createBaseVNode("a", {
					href: "/",
					target: "_blank"
				}, "your app", -1),
				createTextVNode(" first and then refresh this page. ", -1)
			])]))])) : (openBlock(), createElementBlock("div", mergeProps({ key: 1 }, unref(containerProps), { class: "h-full" }), [createBaseVNode("div", normalizeProps(guardReactiveProps(unref(wrapperProps))), [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(list), (m) => {
				return openBlock(), createBlock(_component_RouterLink, {
					key: `${unref(payload).query.vite}-${unref(payload).query.env}-${m.data.id}`,
					class: "block border-b border-main px-3 py-2 text-left text-sm font-mono hover:bg-active",
					to: {
						path: "/module",
						query: {
							...unref(route).query,
							id: m.data.id
						}
					}
				}, {
					default: withCtx(() => [createVNode(_component_ModuleId, {
						id: m.data.id,
						badges: "",
						"ws-nowrap": ""
					}, null, 8, ["id"]), unref(options).view.listMode === "detailed" ? (openBlock(), createElementBlock("div", _hoisted_5, [createBaseVNode("div", _hoisted_6, [(openBlock(true), createElementBlock(Fragment, null, renderList(m.data.plugins.slice(1).filter((plugin) => plugin.transform !== void 0), (i, idx) => {
						return openBlock(), createElementBlock(Fragment, { key: i }, [idx !== 0 ? (openBlock(), createElementBlock("span", _hoisted_7, "|")) : createCommentVNode("", true), createBaseVNode("span", _hoisted_8, [createVNode(_component_PluginName, {
							name: i.name,
							compact: true
						}, null, 8, ["name"])])], 64);
					}), 128)), m.data.invokeCount > 2 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [_cache[1] || (_cache[1] = createBaseVNode("span", { op40: "" }, "·", -1)), createBaseVNode("span", {
						"text-green": "",
						title: `Transform invoked ${m.data.invokeCount} times`
					}, "x" + toDisplayString(m.data.invokeCount), 9, _hoisted_9)], 64)) : createCommentVNode("", true)]), createBaseVNode("div", _hoisted_10, [m.data.sourceSize && m.data.distSize ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
						createVNode(_component_ByteSizeDisplay, {
							op75: "",
							bytes: m.data.sourceSize
						}, null, 8, ["bytes"]),
						_cache[2] || (_cache[2] = createBaseVNode("span", {
							"i-carbon-arrow-right": "",
							op50: ""
						}, null, -1)),
						createVNode(_component_ByteSizeDisplay, {
							class: normalizeClass(m.data.distSize > m.data.sourceSize ? "status-yellow" : "status-green"),
							bytes: m.data.distSize
						}, null, 8, ["class", "bytes"]),
						_cache[3] || (_cache[3] = createBaseVNode("span", { op40: "" }, "|", -1))
					], 64)) : createCommentVNode("", true), createBaseVNode("span", null, [createVNode(_component_DurationDisplay, { duration: m.data.totalTime }, null, 8, ["duration"])])])])) : createCommentVNode("", true)]),
					_: 2
				}, 1032, ["to"]);
			}), 128))], 16)], 16))])) : createCommentVNode("", true);
		};
	}
});
//#endregion
export { ModuleId_default as n, kt as r, ModuleList_default as t };
