import { buildHTMLStyles, buildSVGAttrs, camelCaseAttributes, isSVGTag } from "motion-dom";
function camelToDash(str) {
	return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}
function createHTMLRenderState() {
	return {
		transform: {},
		transformOrigin: {},
		style: {},
		vars: {}
	};
}
function createSVGRenderState() {
	return {
		...createHTMLRenderState(),
		attrs: {}
	};
}
function createStyles(latestValues) {
	const state = createHTMLRenderState();
	buildHTMLStyles(state, latestValues);
	const result = { ...state.style };
	for (const key in state.vars) result[key] = state.vars[key];
	if (Object.keys(result).length === 0) return null;
	return result;
}
function createSVGStyles(latestValues, tag, styleProp) {
	const state = createSVGRenderState();
	buildSVGAttrs(state, latestValues, isSVGTag(tag), void 0, styleProp);
	const attrs = {};
	for (const key in state.attrs) {
		const attrKey = camelCaseAttributes.has(key) ? key : camelToDash(key);
		attrs[attrKey] = state.attrs[key];
	}
	return {
		attrs,
		style: {
			...state.style,
			...state.vars
		}
	};
}
export { createSVGStyles, createStyles };
