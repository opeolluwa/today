import { getElement } from "../components/hooks/use-motion-elm.mjs";
import { isSSR } from "../utils/is.mjs";
import { offsetToViewTimelineRange } from "./scroll/offsets.mjs";
import { scroll } from "framer-motion/dom";
import { motionValue as motionValue$1, supportsScrollTimeline, supportsViewTimeline } from "motion-dom";
import { toValue, watchEffect } from "vue";
function createScrollMotionValues() {
	return {
		scrollX: motionValue$1(0),
		scrollY: motionValue$1(0),
		scrollXProgress: motionValue$1(0),
		scrollYProgress: motionValue$1(0)
	};
}
function canAccelerateScroll(target, offset) {
	if (isSSR) return false;
	return target ? supportsViewTimeline() && !!offsetToViewTimelineRange(offset) : supportsScrollTimeline();
}
function makeAccelerateConfig(axis, options) {
	return {
		factory: (animation) => {
			const { container, target, ...rest } = toValue(options);
			return scroll(animation, {
				...rest,
				axis,
				container: getElement(container),
				target: getElement(target)
			});
		},
		times: [0, 1],
		keyframes: [0, 1],
		ease: (v) => v,
		duration: 1
	};
}
function useScroll(options = {}) {
	const values = createScrollMotionValues();
	const { target, offset } = toValue(options);
	if (canAccelerateScroll(target, offset)) {
		values.scrollXProgress.accelerate = makeAccelerateConfig("x", options);
		values.scrollYProgress.accelerate = makeAccelerateConfig("y", options);
	}
	watchEffect((onCleanup) => {
		if (isSSR) return;
		const { container, target: target$1, ...rest } = toValue(options);
		const cleanup = scroll((_progress, { x, y }) => {
			values.scrollX.set(x.current);
			values.scrollXProgress.set(x.progress);
			values.scrollY.set(y.current);
			values.scrollYProgress.set(y.progress);
		}, {
			...rest,
			container: getElement(container),
			target: getElement(target$1)
		});
		onCleanup(() => {
			cleanup();
		});
	}, { flush: "post" });
	return values;
}
export { useScroll };
