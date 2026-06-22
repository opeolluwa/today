import { useMotionConfig } from "../../components/motion-config/context.mjs";
import { createScopedAnimate } from "framer-motion/dom";
import { computed, onUnmounted, ref } from "vue";
function useAnimate() {
	const dom = ref(null);
	const domProxy = new Proxy(dom, {
		get(target, key) {
			if (typeof key === "string" || typeof key === "symbol") {
				if (key === "current") return Reflect.get(target, "value");
				return Reflect.get(target, key);
			}
		},
		set(target, key, value) {
			if (key === "value") return Reflect.set(target, key, value?.$el || value);
			if (key === "animations") return Reflect.set(target, key, value);
			return true;
		}
	});
	domProxy.animations = [];
	const config = useMotionConfig();
	const scopedAnimate = computed(() => createScopedAnimate({
		scope: domProxy,
		skipAnimations: config.value.skipAnimations
	}));
	const animate = ((...args) => scopedAnimate.value(...args));
	onUnmounted(() => {
		domProxy.animations.forEach((animation) => animation.stop());
	});
	return [domProxy, animate];
}
export { useAnimate };
