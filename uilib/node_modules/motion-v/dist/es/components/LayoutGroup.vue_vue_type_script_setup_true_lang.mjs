import { useLayoutGroupProvider } from "./use-layout-group.mjs";
import { defineComponent, renderSlot, unref } from "vue";
var LayoutGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "LayoutGroup",
	props: {
		id: {},
		inherit: {
			type: [Boolean, String],
			default: true
		}
	},
	setup(__props) {
		const { forceRender, key } = useLayoutGroupProvider(__props);
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", {
				renderKey: unref(key),
				forceRender: unref(forceRender)
			});
		};
	}
});
export { LayoutGroup_vue_vue_type_script_setup_true_lang_default as default };
