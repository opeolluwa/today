import { getActiveElement } from "../shared/getActiveElement.js";
import { useComposing } from "../shared/useComposing.js";
import { useKbd } from "../shared/useKbd.js";
import { Primitive } from "../Primitive/Primitive.js";
import { usePrimitiveElement } from "../Primitive/usePrimitiveElement.js";
import { injectNumberFieldRootContext } from "./NumberFieldRoot.js";
import { createBlock, defineComponent, mergeProps, onMounted, openBlock, ref, renderSlot, unref, watch, withCtx } from "vue";

//#region src/NumberField/NumberFieldInput.vue?vue&type=script&setup=true&lang.ts
var NumberFieldInput_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "NumberFieldInput",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "input"
		}
	},
	setup(__props) {
		const props = __props;
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const rootContext = injectNumberFieldRootContext();
		const kbd = useKbd();
		const { isComposing, handleCompositionStart, handleCompositionEnd } = useComposing();
		function handleKeydown(event) {
			if (isComposing.value || event.isComposing) return;
			switch (event.key) {
				case kbd.ARROW_UP:
					event.preventDefault();
					rootContext.handleIncrease();
					break;
				case kbd.ARROW_DOWN:
					event.preventDefault();
					rootContext.handleDecrease();
					break;
				case kbd.PAGE_UP:
					event.preventDefault();
					rootContext.handleIncrease(10);
					break;
				case kbd.PAGE_DOWN:
					event.preventDefault();
					rootContext.handleDecrease(10);
					break;
				case kbd.HOME:
					event.preventDefault();
					rootContext.handleMinMaxValue("min");
					break;
				case kbd.END:
					event.preventDefault();
					rootContext.handleMinMaxValue("max");
					break;
				case kbd.ENTER:
					rootContext.applyInputValue(event.target?.value);
					break;
			}
		}
		function handleWheelEvent(event) {
			if (rootContext.disableWheelChange.value) return;
			if (event.target !== getActiveElement()) return;
			if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
			event.preventDefault();
			if (event.deltaY > 0) rootContext.invertWheelChange.value ? rootContext.handleDecrease() : rootContext.handleIncrease();
			else if (event.deltaY < 0) rootContext.invertWheelChange.value ? rootContext.handleIncrease() : rootContext.handleDecrease();
		}
		onMounted(() => {
			rootContext.onInputElement(currentElement.value);
		});
		const inputValue = ref(rootContext.textValue.value);
		watch(() => rootContext.textValue.value, () => {
			inputValue.value = rootContext.textValue.value;
		}, {
			immediate: true,
			deep: true
		});
		function handleChange() {
			requestAnimationFrame(() => {
				inputValue.value = rootContext.textValue.value;
			});
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				id: unref(rootContext).id.value,
				ref_key: "primitiveElement",
				ref: primitiveElement,
				value: inputValue.value,
				role: "spinbutton",
				type: "text",
				tabindex: "0",
				inputmode: unref(rootContext).inputMode.value,
				disabled: unref(rootContext).disabled.value ? "" : void 0,
				"data-disabled": unref(rootContext).disabled.value ? "" : void 0,
				readonly: unref(rootContext).readonly.value ? "" : void 0,
				"data-readonly": unref(rootContext).readonly.value ? "" : void 0,
				autocomplete: "off",
				autocorrect: "off",
				spellcheck: "false",
				"aria-roledescription": "Number field",
				"aria-valuenow": unref(rootContext).modelValue.value,
				"aria-valuemin": unref(rootContext).min.value,
				"aria-valuemax": unref(rootContext).max.value,
				onKeydown: handleKeydown,
				onWheel: handleWheelEvent,
				onBeforeinput: _cache[0] || (_cache[0] = (event) => {
					if (event.isComposing) return;
					const target = event.target;
					let nextValue = target.value.slice(0, target.selectionStart ?? void 0) + (event.data ?? "") + target.value.slice(target.selectionEnd ?? void 0);
					if (!unref(rootContext).validate(nextValue)) event.preventDefault();
				}),
				onInput: _cache[1] || (_cache[1] = (event) => {
					const target = event.target;
					inputValue.value = target.value;
				}),
				onChange: handleChange,
				onBlur: _cache[2] || (_cache[2] = ($event) => unref(rootContext).applyInputValue($event.target?.value)),
				onCompositionstart: unref(handleCompositionStart),
				onCompositionend: unref(handleCompositionEnd)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"id",
				"value",
				"inputmode",
				"disabled",
				"data-disabled",
				"readonly",
				"data-readonly",
				"aria-valuenow",
				"aria-valuemin",
				"aria-valuemax",
				"onCompositionstart",
				"onCompositionend"
			]);
		};
	}
});

//#endregion
//#region src/NumberField/NumberFieldInput.vue
var NumberFieldInput_default = NumberFieldInput_vue_vue_type_script_setup_true_lang_default;

//#endregion
export { NumberFieldInput_default };
//# sourceMappingURL=NumberFieldInput.js.map