import { Motion } from "../motion/index.mjs";
import { useReorderContext } from "./context.mjs";
import { useDefaultMotionValue } from "./utils.mjs";
import { useTransform } from "../../value/use-transform.mjs";
import { autoScrollIfNeeded, resetAutoScrollState } from "./auto-scroll.mjs";
import { computed, createBlock, defineComponent, mergeProps, openBlock, ref, renderSlot, toRefs, unref, useAttrs, withCtx } from "vue";
import { invariant } from "hey-listen";
var Item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ReorderItem",
	inheritAttrs: false,
	__name: "Item",
	props: {
		value: {},
		layout: {
			type: [Boolean, String],
			default: true
		},
		as: { default: "li" },
		asChild: { type: Boolean },
		whileDrag: { default: void 0 },
		whileHover: {},
		whilePress: {},
		whileInView: {},
		whileFocus: {},
		forwardMotionProps: { type: Boolean },
		ignoreStrict: { type: Boolean },
		custom: {},
		initial: {
			type: [
				String,
				Array,
				Object,
				Boolean
			],
			default: void 0
		},
		animate: { default: void 0 },
		exit: {},
		variants: {},
		inherit: { type: Boolean },
		style: {},
		transformTemplate: {},
		transition: {},
		onAnimationComplete: {},
		onUpdate: {},
		onAnimationStart: {},
		layoutId: { default: void 0 },
		layoutScroll: {
			type: Boolean,
			default: false
		},
		layoutRoot: {
			type: Boolean,
			default: false
		},
		"data-framer-portal-id": {},
		crossfade: {
			type: Boolean,
			default: true
		},
		layoutDependency: {},
		onBeforeLayoutMeasure: {},
		onLayoutMeasure: {},
		onLayoutAnimationStart: {},
		onLayoutAnimationComplete: {},
		globalPressTarget: { type: Boolean },
		onPressStart: {},
		onPress: {},
		onPressCancel: {},
		onHoverStart: {},
		onHoverEnd: {},
		inViewOptions: {},
		inView: { default: void 0 },
		onViewportEnter: {},
		onViewportLeave: {},
		drag: { type: [Boolean, String] },
		dragSnapToOrigin: { type: Boolean },
		dragDirectionLock: { type: Boolean },
		dragPropagation: { type: Boolean },
		dragConstraints: { type: [Boolean, Object] },
		dragElastic: {
			type: [
				Boolean,
				Number,
				Object
			],
			default: .5
		},
		dragMomentum: {
			type: Boolean,
			default: true
		},
		dragTransition: {},
		dragListener: {
			type: Boolean,
			default: true
		},
		dragControls: {},
		onDragStart: {},
		onDragEnd: {},
		onDrag: {},
		onDirectionLock: {},
		onDragTransitionEnd: {},
		onMeasureDragConstraints: {},
		onPanSessionStart: {},
		onPanStart: {},
		onPan: {},
		onPanEnd: {},
		onFocus: {},
		onBlur: {}
	},
	setup(__props) {
		const props = __props;
		const { style } = toRefs(props);
		const context = useReorderContext();
		const point = {
			x: useDefaultMotionValue(style.value?.x),
			y: useDefaultMotionValue(style.value?.y)
		};
		const zIndex = useTransform([point.x, point.y], ([latestX, latestY]) => latestX || latestY ? 1 : "unset");
		function warning$1() {
			invariant(Boolean(context), "Reorder.Item must be a descendant of Reorder.Group");
		}
		warning$1();
		const { axis, registerItem, updateOrder, groupRef } = context;
		const attrs = useAttrs();
		function bindProps() {
			const { value, onDragStart, onDragEnd, onDrag, ...rest } = props;
			return {
				...attrs,
				...rest,
				style: {
					...style.value,
					x: point.x,
					y: point.y,
					zIndex
				}
			};
		}
		const drag = computed(() => {
			if (props.drag) return props.drag;
			return axis.value;
		});
		const isDragging = ref(false);
		function handleDrag(event, gesturePoint) {
			const { velocity, point: pointerPoint } = gesturePoint;
			const offset = point[axis.value].get();
			updateOrder(props.value, offset, velocity[axis.value]);
			autoScrollIfNeeded(groupRef.value, pointerPoint[axis.value], axis.value, velocity[axis.value]);
			if (!isDragging.value) isDragging.value = true;
			props.onDrag?.(event, gesturePoint);
		}
		function handleDragEnd(event, gesturePoint) {
			isDragging.value = false;
			resetAutoScrollState();
			props.onDragEnd?.(event, gesturePoint);
		}
		function handleDragStart(event, gesturePoint) {
			props.onDragStart?.(event, gesturePoint);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Motion), mergeProps(bindProps(), {
				drag: drag.value,
				"drag-snap-to-origin": true,
				onDrag: handleDrag,
				onDragEnd: handleDragEnd,
				onDragStart: handleDragStart,
				onLayoutMeasure: _cache[0] || (_cache[0] = (measured) => {
					unref(registerItem)(_ctx.value, measured);
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { isDragging: isDragging.value })]),
				_: 3
			}, 16, ["drag"]);
		};
	}
});
export { Item_vue_vue_type_script_setup_true_lang_default as default };
