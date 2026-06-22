import { resolveMotionProps } from "../../utils/resolve-motion-props.mjs";
import { getMotionElement } from "../hooks/use-motion-elm.mjs";
import { injectLayoutGroup, injectMotion, provideMotion } from "../context.mjs";
import { useLazyMotionContext } from "../lazy-motion/context.mjs";
import { useMotionConfig } from "../motion-config/context.mjs";
import { injectAnimatePresence } from "../animate-presence/presence.mjs";
import { createSVGStyles, createStyles } from "../../state/style.mjs";
import { updateLazyFeatures } from "../../features/lazy-features.mjs";
import { MotionState } from "../../state/motion-state.mjs";
import { isMotionValue } from "framer-motion/dom";
import { getCurrentInstance, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref, useAttrs, watch } from "vue";
import { invariant, warning } from "hey-listen";
function useMotionState(props, renderer) {
	const parentState = injectMotion(null);
	const layoutGroup = injectLayoutGroup({});
	const config = useMotionConfig();
	const presenceContext = injectAnimatePresence({});
	const lazyMotionContext = useLazyMotionContext({
		features: ref({}),
		strict: false
	});
	if (process.env.NODE_ENV !== "production" && renderer && lazyMotionContext.strict) {
		const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
		props.ignoreStrict ? warning(false, strictMessage) : invariant(false, strictMessage);
	}
	const attrs = useAttrs();
	function getProps() {
		return resolveMotionProps(props, {
			layoutGroup,
			presenceContext,
			config: config.value
		});
	}
	function getMotionProps() {
		return {
			...attrs,
			...getProps()
		};
	}
	const state = new MotionState(getMotionProps(), parentState);
	provideMotion(state);
	if (renderer) state.initVisualElement(renderer);
	watch(lazyMotionContext.features, (bundle) => {
		if (bundle.features?.length) updateLazyFeatures(bundle.features);
		if (bundle.renderer) state.initVisualElement(bundle.renderer);
		state.updateFeatures();
	}, {
		immediate: true,
		flush: "pre"
	});
	function getAttrs() {
		const isSVG = state.type === "svg";
		const attrsProps = { ...attrs };
		Object.keys(attrs).forEach((key) => {
			if (isMotionValue(attrs[key])) attrsProps[key] = attrs[key].get();
		});
		const currentValues = state.visualElement?.latestValues || state.latestValues;
		let styleProps = {
			...props.style,
			...isSVG ? {} : currentValues
		};
		for (const key in styleProps) if (isMotionValue(styleProps[key])) styleProps[key] = styleProps[key].get();
		if (isSVG) {
			const { attrs: svgAttrs, style: svgStyle } = createSVGStyles({
				...currentValues,
				...styleProps
			}, state.options.as, props.style);
			Object.assign(attrsProps, svgAttrs);
			styleProps = svgStyle;
		}
		if (props.drag && props.dragListener !== false) Object.assign(styleProps, {
			userSelect: "none",
			WebkitUserSelect: "none",
			WebkitTouchCallout: "none",
			touchAction: props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`
		});
		const style = createStyles(styleProps);
		if (style) attrsProps.style = style;
		return attrsProps;
	}
	const instance = getCurrentInstance().proxy;
	onMounted(() => {
		const el = getMotionElement(instance.$el);
		state.mount(el);
	});
	onBeforeUnmount(() => state.beforeUnmount());
	onUnmounted(() => {
		if (!getMotionElement(instance.$el)?.isConnected) state.unmount();
	});
	onBeforeUpdate(() => {
		state.beforeUpdate();
		state.updateOptions(getMotionProps());
	});
	onUpdated(() => {
		state.update();
	});
	return {
		getProps,
		getAttrs,
		layoutGroup,
		state
	};
}
export { useMotionState };
