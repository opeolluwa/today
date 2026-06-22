import { defineComponent, getCurrentInstance, toDisplayString, watchEffect } from "vue";
var RowValue_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "RowValue",
	props: { value: {} },
	setup(__props) {
		const props = __props;
		const instance = getCurrentInstance().proxy;
		watchEffect((cleanup) => {
			cleanup(props.value.on("change", (value) => {
				if (instance.$el) instance.$el.textContent = value;
			}));
		});
		return (_ctx, _cache) => {
			return toDisplayString(_ctx.value.get());
		};
	}
});
export { RowValue_vue_vue_type_script_setup_true_lang_default as default };
