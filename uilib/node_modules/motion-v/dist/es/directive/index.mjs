import { resolveMotionProps } from "../utils/resolve-motion-props.mjs";
import { layoutGroupInjectionKey, motionInjectionKey } from "../components/context.mjs";
import { defaultConfig, motionConfigInjectionKey } from "../components/motion-config/context.mjs";
import { animatePresenceInjectionKey } from "../components/animate-presence/presence.mjs";
import { createSVGStyles, createStyles } from "../state/style.mjs";
import { updateLazyFeatures } from "../features/lazy-features.mjs";
import { isSVGElement, resolveInitialValues } from "../state/utils.mjs";
import { MotionState, mountedStates } from "../state/motion-state.mjs";
import { createVisualElement } from "../state/create-visual-element.mjs";
import { domMax } from "../features/dom-max.mjs";
import { warning } from "hey-listen";
function extractMotionProps(vnode, bindingValue) {
	const vnodeProps = vnode?.props;
	if (!vnodeProps) return bindingValue || {};
	return {
		...bindingValue || {},
		...vnodeProps
	};
}
function cleanVNodeProps(el, vnodeProps) {
	if (!vnodeProps) return;
	for (const key in vnodeProps) {
		const value = vnodeProps[key];
		if (typeof value !== "function" && key in Element.prototype) delete el[key];
		if (value != null && typeof value === "object" && key !== "style") el.removeAttribute(key);
	}
}
function resolveTag(source) {
	if (source instanceof Element) return source.tagName.toLowerCase();
	return typeof source.type === "string" ? source.type : "div";
}
function computeStyles(values, tag, styleProp) {
	if (isSVGElement(tag)) {
		const { attrs, style } = createSVGStyles({ ...values }, tag, styleProp);
		return {
			styles: createStyles(style),
			attrs
		};
	}
	return { styles: createStyles({
		...styleProp,
		...values
	}) };
}
function resolveSSRStyles(options) {
	if (!options) return null;
	const latestValues = resolveInitialValues(options);
	if (Object.keys(latestValues).length === 0) return null;
	return computeStyles(latestValues, options.as || "div", options.style).styles;
}
function applyInitialStyles(el, state) {
	const { styles, attrs } = computeStyles(state.latestValues, resolveTag(el), state.options.style);
	if (attrs) for (const key in attrs) el.setAttribute(key, String(attrs[key]));
	if (styles) for (const key in styles) el.style[key] = styles[key];
}
function findComponentParent(vnode, root) {
	const stack = /* @__PURE__ */ new Set();
	const walk = (children) => {
		for (const child of children) {
			if (!child) continue;
			if (child === vnode || child.el && vnode.el && child.el === vnode.el) return true;
			stack.add(child);
			let result$1;
			if (child.suspense) result$1 = walk([child.ssContent]);
			else if (Array.isArray(child.children)) result$1 = walk(child.children);
			else if (child.component?.vnode) result$1 = walk([child.component?.subTree]);
			if (result$1) return result$1;
			stack.delete(child);
		}
		return false;
	};
	if (!walk([root.subTree])) {
		warning(false, "Could not find original vnode, component will not inherit provides");
		return root;
	}
	const result = Array.from(stack).reverse();
	for (const child of result) if (child.component) return child.component;
	return root;
}
function resolveProvides(vnode, binding) {
	return (vnode.ctx === binding.instance.$ ? findComponentParent(vnode, binding.instance.$)?.provides : vnode.ctx?.provides) ?? binding.instance.$.provides;
}
function buildMotionOptions(motionProps, provides, tag) {
	const parentState = provides[motionInjectionKey] ?? null;
	const layoutGroup = provides[layoutGroupInjectionKey] ?? {};
	const presenceContext = provides[animatePresenceInjectionKey] ?? {};
	const config = (provides[motionConfigInjectionKey] ?? null)?.value ?? defaultConfig;
	return {
		parentState,
		options: resolveMotionProps({
			...motionProps,
			as: tag
		}, {
			layoutGroup,
			presenceContext,
			config
		})
	};
}
function createMotionDirective(featureBundle, defaultOptions) {
	const renderer = featureBundle?.renderer ?? createVisualElement;
	if (featureBundle?.features) updateLazyFeatures(featureBundle.features);
	function mergeMotionProps(vnode, bindingValue) {
		const userProps = extractMotionProps(vnode, bindingValue);
		return defaultOptions ? {
			...defaultOptions,
			...userProps
		} : userProps;
	}
	return {
		created(el, binding, vnode) {
			const provides = resolveProvides(vnode, binding);
			const { options, parentState } = buildMotionOptions(mergeMotionProps(vnode, binding.value), provides, resolveTag(el));
			const state = new MotionState(options, parentState);
			state.initVisualElement(renderer);
			mountedStates.set(el, state);
		},
		mounted(el, binding, vnode) {
			const state = mountedStates.get(el);
			if (!state) return;
			cleanVNodeProps(el, vnode.props);
			applyInitialStyles(el, state);
			state.mount(el);
			state.updateFeatures();
		},
		beforeUpdate(el, binding, vnode) {
			const state = mountedStates.get(el);
			if (!state) return;
			const provides = resolveProvides(vnode, binding);
			const { options } = buildMotionOptions(mergeMotionProps(vnode, binding.value), provides, resolveTag(el));
			state.beforeUpdate();
			state.updateOptions(options);
		},
		updated(el, binding, vnode) {
			const state = mountedStates.get(el);
			if (!state) return;
			cleanVNodeProps(el, vnode.props);
			state.update();
		},
		beforeUnmount(el) {
			const state = mountedStates.get(el);
			if (!state) return;
			state.beforeUnmount();
		},
		unmounted(el) {
			const state = mountedStates.get(el);
			if (!state) return;
			if (!el.isConnected) state.unmount();
		},
		getSSRProps(binding, vnode) {
			const motionProps = mergeMotionProps(vnode, binding.value);
			const tag = vnode ? resolveTag(vnode) : "div";
			const ssrStyles = resolveSSRStyles({
				...motionProps,
				as: tag
			});
			if (!ssrStyles) return {};
			return { style: ssrStyles };
		}
	};
}
function createPresetDirective(preset, featureBundle) {
	return createMotionDirective(featureBundle ?? domMax, preset);
}
const vMotion = createMotionDirective(domMax);
const MotionPlugin = { install(app, options) {
	app.directive("motion", vMotion);
	if (options?.presets) for (const [name, preset] of Object.entries(options.presets)) app.directive(name, createPresetDirective(preset));
} };
export { MotionPlugin, createMotionDirective, createPresetDirective, vMotion };
