import { getMotionElement } from "../components/hooks/use-motion-elm.mjs";
import { ref } from "vue";
function useDomRef() {
	const dom = ref(null);
	return new Proxy(dom, {
		get(target, key) {
			if (typeof key === "string" || typeof key === "symbol") return Reflect.get(target, key);
		},
		set(target, key, value) {
			if (key === "value") return Reflect.set(target, key, getMotionElement(value?.$el || value));
			return true;
		}
	});
}
export { useDomRef };
