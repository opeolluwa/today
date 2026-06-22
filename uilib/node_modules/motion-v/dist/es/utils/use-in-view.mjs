import { inView } from "framer-motion/dom";
import { ref, unref, watchEffect } from "vue";
import { unrefElement } from "@vueuse/core";
function useInView(domRef, options) {
	const isInView = ref(false);
	watchEffect((onCleanup) => {
		const realOptions = unref(options) || {};
		const { once } = realOptions;
		const el = unrefElement(domRef);
		if (!el || once && isInView.value) return;
		const onEnter = () => {
			isInView.value = true;
			return once ? void 0 : () => {
				isInView.value = false;
			};
		};
		const cleanup = inView(el, onEnter, {
			...realOptions,
			root: unref(realOptions.root)
		});
		onCleanup(() => {
			cleanup();
		});
	}, { flush: "post" });
	return isInView;
}
export { useInView };
