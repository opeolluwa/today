import { defaultConfig, provideMotionConfig, useMotionConfig } from "./context.mjs";
import { computed, defineComponent, renderSlot } from "vue";
import { isDef } from "@vueuse/core";
import { warning } from "hey-listen";
var MotionConfig_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "MotionConfig",
	inheritAttrs: false,
	__name: "MotionConfig",
	props: {
		transition: {},
		reduceMotion: {},
		reducedMotion: { default: ({ reduceMotion }) => {
			if (isDef(reduceMotion)) {
				warning(false, "`reduceMotion` is deprecated. Use `reducedMotion` instead.");
				return reduceMotion;
			}
			return defaultConfig.reducedMotion;
		} },
		skipAnimations: { type: Boolean },
		nonce: {},
		inViewOptions: {}
	},
	setup(__props) {
		const props = __props;
		const parentConfig = useMotionConfig();
		provideMotionConfig(computed(() => ({
			transition: props.transition ?? parentConfig.value.transition,
			reducedMotion: props.reducedMotion ?? parentConfig.value.reducedMotion,
			skipAnimations: props.skipAnimations ?? parentConfig.value.skipAnimations,
			nonce: props.nonce ?? parentConfig.value.nonce,
			inViewOptions: props.inViewOptions ?? parentConfig.value.inViewOptions
		})));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
export { MotionConfig_vue_vue_type_script_setup_true_lang_default as default };
