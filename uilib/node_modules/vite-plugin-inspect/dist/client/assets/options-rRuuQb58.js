import { D as computed, G as openBlock, O as createBaseVNode, P as defineComponent, _ as defineStore, _t as normalizeClass, bt as toDisplayString, f as useLocalStorage, gt as unref, j as createElementBlock, k as createBlock } from "./index-D7rIWszL.js";
//#region src/client/components/NumberWithUnit.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { block: "" };
var _hoisted_2 = {
	"ml-0.4": "",
	"text-xs": "",
	op75: ""
};
//#endregion
//#region src/client/components/NumberWithUnit.vue
var NumberWithUnit_default = /* @__PURE__ */ defineComponent({
	__name: "NumberWithUnit",
	props: {
		number: {},
		unit: {}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", _hoisted_1, [createBaseVNode("span", null, toDisplayString(__props.number), 1), createBaseVNode("span", _hoisted_2, toDisplayString(__props.unit), 1)]);
		};
	}
});
//#endregion
//#region src/client/components/DurationDisplay.vue
var DurationDisplay_default = /* @__PURE__ */ defineComponent({
	__name: "DurationDisplay",
	props: {
		duration: {},
		factor: { default: 1 },
		color: {
			type: Boolean,
			default: true
		}
	},
	setup(__props) {
		const props = __props;
		function getDurationColor(duration) {
			if (!props.color) return "";
			if (duration == null) return "";
			duration = duration * props.factor;
			if (duration < 1) return "";
			if (duration > 1e3) return "status-red";
			if (duration > 500) return "status-yellow";
			if (duration > 200) return "status-green";
			return "";
		}
		const units = computed(() => {
			if (!props.duration) return ["", "-"];
			if (props.duration < 1) return ["<1", "ms"];
			if (props.duration < 1e3) return [props.duration.toFixed(0), "ms"];
			if (props.duration < 1e3 * 60) return [(props.duration / 1e3).toFixed(1), "s"];
			return [(props.duration / 1e3 / 60).toFixed(1), "min"];
		});
		return (_ctx, _cache) => {
			const _component_NumberWithUnit = NumberWithUnit_default;
			return openBlock(), createBlock(_component_NumberWithUnit, {
				class: normalizeClass(getDurationColor(__props.duration)),
				number: unref(units)[0],
				unit: unref(units)[1]
			}, null, 8, [
				"class",
				"number",
				"unit"
			]);
		};
	}
});
//#endregion
//#region src/client/stores/options.ts
var useOptionsStore = defineStore("options", () => {
	const view = useLocalStorage("vite-inspect-v1-options", {
		diff: true,
		graphWeightMode: "deps",
		lineWrapping: false,
		listMode: "detailed",
		metricDisplayHook: "transform",
		panelSizeDiff: 30,
		panelSizeModule: 10,
		showBailout: false,
		showOneColumn: false,
		sort: "default"
	}, { mergeDefaults: true });
	const search = useLocalStorage("vite-inspect-v1-search", {
		text: "",
		includeNodeModules: false,
		includeVirtual: false,
		includeUnreached: false,
		exactSearch: false
	}, { mergeDefaults: true });
	function toggleSort() {
		const rules = [
			"default",
			"time-asc",
			"time-desc"
		];
		view.value.sort = rules[(rules.indexOf(view.value.sort) + 1) % rules.length];
	}
	function toggleListMode() {
		const modes = [
			"detailed",
			"graph",
			"list"
		];
		view.value.listMode = modes[(modes.indexOf(view.value.listMode) + 1) % modes.length];
	}
	return {
		view,
		search,
		toggleSort,
		toggleListMode
	};
});
//#endregion
export { DurationDisplay_default as n, NumberWithUnit_default as r, useOptionsStore as t };
