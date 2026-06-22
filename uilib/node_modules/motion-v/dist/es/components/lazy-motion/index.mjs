import { lazyMotionContextProvider } from "./context.mjs";
import { defineComponent, ref } from "vue";
const LazyMotion = defineComponent({
	name: "LazyMotion",
	inheritAttrs: false,
	props: {
		features: {
			type: [Object, Function],
			required: true
		},
		strict: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { slots }) {
		const features = ref({});
		if (typeof props.features === "object" && "renderer" in props.features) features.value = props.features;
		else if (typeof props.features === "function") props.features().then((mod) => {
			features.value = mod;
		});
		else if (props.features instanceof Promise) props.features.then((mod) => {
			features.value = mod;
		});
		lazyMotionContextProvider({
			features,
			strict: props.strict
		});
		return () => {
			return slots.default?.();
		};
	}
});
export { LazyMotion };
