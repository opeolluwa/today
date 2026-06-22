import { isMotionValue, motionValue } from "framer-motion/dom";
import { attachFollow } from "motion-dom";
import { toValue, watch } from "vue";
function useFollowValue(source, options = {}) {
	const value = motionValue(isMotionValue(source) ? source.get() : source);
	let cleanup;
	watch(() => toValue(options), (_1, _2, onCleanup) => {
		cleanup = attachFollow(value, source, toValue(options));
		onCleanup(() => {
			cleanup?.();
		});
	}, { immediate: true });
	return value;
}
function useSpring(source, config = {}) {
	const value = motionValue(isMotionValue(source) ? source.get() : source);
	watch(() => toValue(config), (_1, _2, onCleanup) => {
		const cleanup = attachFollow(value, source, {
			type: "spring",
			...toValue(config)
		});
		onCleanup(() => {
			cleanup?.();
		});
	}, { immediate: true });
	return value;
}
export { useFollowValue, useSpring };
