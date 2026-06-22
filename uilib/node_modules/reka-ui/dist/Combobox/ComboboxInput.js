import { useComposing } from "../shared/useComposing.js";
import { usePrimitiveElement } from "../Primitive/usePrimitiveElement.js";
import { injectListboxRootContext } from "../Listbox/ListboxRoot.js";
import { ListboxFilter_default } from "../Listbox/ListboxFilter.js";
import { injectComboboxRootContext } from "./ComboboxRoot.js";
import { createBlock, defineComponent, isRef, nextTick, onMounted, openBlock, renderSlot, unref, watch, withCtx, withKeys } from "vue";
import { useVModel } from "@vueuse/core";

//#region src/Combobox/ComboboxInput.vue?vue&type=script&setup=true&lang.ts
var ComboboxInput_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxInput",
	props: {
		displayValue: {
			type: Function,
			required: false
		},
		modelValue: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
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
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectComboboxRootContext();
		const listboxContext = injectListboxRootContext();
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const modelValue = useVModel(props, "modelValue", emits, { passive: props.modelValue === void 0 });
		onMounted(() => {
			if (currentElement.value) rootContext.onInputElementChange(currentElement.value);
		});
		const { isComposing, handleCompositionStart, handleCompositionEnd } = useComposing((event) => {
			const el = event.target;
			if (el) processInputValue(el.value);
		});
		function handleKeyDown(ev) {
			if (isComposing.value) return;
			ev.preventDefault();
			if (!rootContext.open.value) rootContext.onOpenChange(true);
		}
		function processInputValue(value) {
			if (!rootContext.open.value) {
				rootContext.onOpenChange(true);
				nextTick(() => {
					if (value) {
						rootContext.filterSearch.value = value;
						listboxContext.highlightFirstItem();
					}
				});
			} else rootContext.filterSearch.value = value;
		}
		function handleInput(event) {
			if (isComposing.value) return;
			processInputValue(event.target.value);
		}
		function handleFocus() {
			if (rootContext.openOnFocus.value && !rootContext.open.value) rootContext.onOpenChange(true);
		}
		function handleBlur(ev) {
			if (!rootContext.open.value) return;
			const nextFocus = ev.relatedTarget;
			if (!nextFocus) return;
			const isInsideRoot = rootContext.parentElement.value?.contains(nextFocus);
			const isInsideContent = document.getElementById(rootContext.contentId)?.contains(nextFocus);
			if (!isInsideRoot && !isInsideContent) requestAnimationFrame(() => {
				if (!rootContext.open.value) return;
				const active = document.activeElement;
				const isStillOutside = !rootContext.parentElement.value?.contains(active) && !document.getElementById(rootContext.contentId)?.contains(active);
				if (isStillOutside) rootContext.onOpenChange(false);
			});
		}
		function handleClick() {
			if (rootContext.openOnClick.value && !rootContext.open.value) rootContext.onOpenChange(true);
		}
		function resetSearchTerm() {
			const rootModelValue = rootContext.modelValue.value;
			if (props.displayValue) modelValue.value = props.displayValue(rootModelValue);
			else if (!rootContext.multiple.value && rootModelValue && !Array.isArray(rootModelValue)) if (typeof rootModelValue !== "object") modelValue.value = rootModelValue.toString();
			else modelValue.value = "";
			else modelValue.value = "";
			nextTick(() => {
				modelValue.value = modelValue.value;
			});
		}
		rootContext.onResetSearchTerm(() => {
			resetSearchTerm();
		});
		watch(rootContext.modelValue, async () => {
			if (!rootContext.isUserInputted.value && rootContext.resetSearchTermOnSelect.value) resetSearchTerm();
		}, {
			immediate: true,
			deep: true
		});
		watch(rootContext.filterState, (_newValue, oldValue) => {
			if (!rootContext.isVirtual.value && oldValue.count === 0) listboxContext.highlightFirstItem();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ListboxFilter_default), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				modelValue: unref(modelValue),
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"auto-focus": _ctx.autoFocus,
				disabled: _ctx.disabled,
				"aria-expanded": unref(rootContext).open.value,
				"aria-controls": unref(rootContext).contentId,
				"aria-autocomplete": "list",
				role: "combobox",
				autocomplete: "off",
				onClick: handleClick,
				onInput: handleInput,
				onKeydown: withKeys(handleKeyDown, ["down", "up"]),
				onFocus: handleFocus,
				onBlur: handleBlur,
				onCompositionstart: unref(handleCompositionStart),
				onCompositionend: unref(handleCompositionEnd)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"modelValue",
				"as",
				"as-child",
				"auto-focus",
				"disabled",
				"aria-expanded",
				"aria-controls",
				"onCompositionstart",
				"onCompositionend"
			]);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxInput.vue
var ComboboxInput_default = ComboboxInput_vue_vue_type_script_setup_true_lang_default;

//#endregion
export { ComboboxInput_default };
//# sourceMappingURL=ComboboxInput.js.map