import { updateLazyFeatures } from "../../features/lazy-features.mjs";
import { useMotionState } from "./use-motion-state.mjs";
import { MotionComponentProps } from "./props.mjs";
import { Comment, cloneVNode, defineComponent, h, mergeProps } from "vue";
var componentMaxCache = /* @__PURE__ */ new Map();
var componentMiniCache = /* @__PURE__ */ new Map();
function renderSlotFragments(fragments) {
	if (!Array.isArray(fragments)) return [fragments];
	const result = [];
	for (const item of fragments) if (Array.isArray(item)) result.push(...item);
	else result.push(item);
	return result;
}
var SELF_CLOSING_TAGS = [
	"area",
	"img",
	"input"
];
function handlePrimitiveAndSlot(asTag, allAttrs, slots) {
	if (typeof asTag === "string" && SELF_CLOSING_TAGS.includes(asTag)) return h(asTag, allAttrs);
	if (asTag === "template") {
		if (!slots.default) return null;
		const childrens = renderSlotFragments(slots.default());
		const firstNonCommentChildrenIndex = childrens.findIndex((child) => child.type !== Comment);
		if (firstNonCommentChildrenIndex === -1) return childrens;
		const firstNonCommentChildren = childrens[firstNonCommentChildrenIndex];
		delete firstNonCommentChildren.props?.ref;
		const mergedProps = firstNonCommentChildren.props ? mergeProps(allAttrs, firstNonCommentChildren.props) : allAttrs;
		if (allAttrs.class && firstNonCommentChildren.props?.class) delete firstNonCommentChildren.props.class;
		const cloned = cloneVNode(firstNonCommentChildren, mergedProps);
		for (const prop in mergedProps) if (prop.startsWith("on")) {
			cloned.props ||= {};
			cloned.props[prop] = mergedProps[prop];
		}
		if (childrens.length === 1) return cloned;
		childrens[firstNonCommentChildrenIndex] = cloned;
		return childrens;
	}
	return null;
}
function createMotionComponent(component, options = {}) {
	const isString = typeof component === "string";
	const name = isString ? component : component.name || "";
	const componentCache = options.renderer ? componentMaxCache : componentMiniCache;
	if (isString && componentCache?.has(component)) return componentCache.get(component);
	const motionComponent = defineComponent({
		inheritAttrs: false,
		props: {
			...MotionComponentProps,
			as: {
				type: [String, Object],
				default: component || "div"
			}
		},
		name: name ? `motion.${name}` : "Motion",
		setup(props, { slots }) {
			const { getProps, getAttrs, state } = useMotionState(props, options.renderer);
			function onVnodeUpdated() {
				const el = state.element;
				if ((!(typeof props.as === "object") || props.asChild) && el) {
					const { style } = getAttrs();
					if (style) for (const [key, val] of Object.entries(style)) el.style[key] = val;
				}
			}
			return () => {
				const motionProps = getProps();
				const motionAttrs = getAttrs();
				const asTag = props.asChild ? "template" : props.as;
				const allAttrs = {
					...props.forwardMotionProps ? motionProps : {},
					...motionAttrs,
					onVnodeUpdated
				};
				const primitiveOrSlotResult = handlePrimitiveAndSlot(asTag, allAttrs, slots);
				if (primitiveOrSlotResult !== null) return primitiveOrSlotResult;
				return h(asTag, { ...allAttrs }, slots);
			};
		}
	});
	if (isString) componentCache?.set(component, motionComponent);
	return motionComponent;
}
function createMotionComponentWithFeatures(featureBundle) {
	const renderer = featureBundle?.renderer;
	updateLazyFeatures(featureBundle?.features || []);
	return new Proxy({}, { get(_, prop) {
		if (prop === "create") return (component, options) => createMotionComponent(component, {
			...options,
			renderer
		});
		return createMotionComponent(prop, { renderer });
	} });
}
export { createMotionComponentWithFeatures };
