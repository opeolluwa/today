import { A as createCommentVNode, C as Fragment, D as computed, G as openBlock, L as h, N as createVNode, O as createBaseVNode, P as defineComponent, Q as resolveDynamicComponent, X as renderSlot, Y as renderList, _t as normalizeClass, bt as toDisplayString, gt as unref, j as createElementBlock, k as createBlock, l as isDark, ot as withCtx, t as usePayloadStore, u as toggleDark, yt as normalizeStyle } from "./index-D7rIWszL.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BOaGB7Aw.js";
//#region src/client/components/Container.vue
var _sfc_main = {};
var _hoisted_1$4 = { class: "h-full" };
function _sfc_render(_ctx, _cache) {
	return openBlock(), createElementBlock("div", _hoisted_1$4, [renderSlot(_ctx.$slots, "default")]);
}
var Container_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render]]);
//#endregion
//#region src/client/logic/color.ts
/**
* Predefined color map for matching the branding
*
* Accpet a 6-digit hex color string or a hue number
* Hue numbers are preferred because they will adapt better contrast in light/dark mode
*
* Hue numbers reference:
* - 0: red
* - 30: orange
* - 60: yellow
* - 120: green
* - 180: cyan
* - 240: blue
* - 270: purple
*/
var predefinedColorMap = {
	error: 0,
	client: 60,
	bailout: -1,
	ssr: 270,
	vite: 250,
	vite1: 240,
	vite2: 120,
	virtual: 140
};
function getHashColorFromString(name, opacity = 1) {
	if (predefinedColorMap[name]) return getHsla(predefinedColorMap[name], opacity);
	let hash = 0;
	for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
	return getHsla(hash % 360, opacity);
}
function getHsla(hue, opacity = 1) {
	return `hsla(${hue}, ${hue === -1 ? 0 : isDark.value ? 50 : 100}%, ${isDark.value ? 60 : 20}%, ${opacity})`;
}
function getPluginColor(name, opacity = 1) {
	if (predefinedColorMap[name]) {
		const color = predefinedColorMap[name];
		if (typeof color === "number") return getHsla(color, opacity);
		else {
			if (opacity === 1) return color;
			return color + Math.floor(opacity * 255).toString(16).padStart(2, "0");
		}
	}
	return getHashColorFromString(name, opacity);
}
//#endregion
//#region src/client/components/PluginName.vue
var PluginName_default = /* @__PURE__ */ defineComponent({
	__name: "PluginName",
	props: {
		name: {},
		compact: { type: Boolean },
		colored: { type: Boolean },
		hide: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		const startsGeneric = [
			"__load__",
			"vite-plugin-",
			"vite-",
			"rollup-plugin-",
			"rollup-",
			"unplugin-"
		];
		const startCompact = [...startsGeneric, "vite:"];
		function render() {
			const starts = props.compact ? startCompact : startsGeneric;
			for (const s of starts) if (props.name.startsWith(s)) {
				if (props.compact) return h("span", props.name.slice(s.length));
				return h("span", [h("span", { class: "op50" }, s), h("span", props.name.slice(s.length))]);
			}
			const parts = props.name.split(":");
			if (parts.length > 1) return h("span", [h("span", { style: { color: getHashColorFromString(parts[0]) } }, `${parts[0]}:`), h("span", parts.slice(1).join(":"))]);
			return h("span", props.name);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(render));
		};
	}
});
//#endregion
//#region src/client/components/Badge.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = ["textContent"];
//#endregion
//#region src/client/components/Badge.vue
var Badge_default = /* @__PURE__ */ defineComponent({
	__name: "Badge",
	props: {
		text: {},
		color: {
			type: [Boolean, Number],
			default: true
		},
		as: {},
		size: {}
	},
	setup(__props) {
		const props = __props;
		const style = computed(() => {
			if (!props.text || props.color === false) return {};
			return {
				color: typeof props.color === "number" ? getHsla(props.color) : getHashColorFromString(props.text),
				background: typeof props.color === "number" ? getHsla(props.color, .1) : getHashColorFromString(props.text, .1)
			};
		});
		const sizeClasses = computed(() => {
			switch (props.size || "sm") {
				case "sm": return "px-1.5 text-11px leading-1.6em";
			}
			return "";
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(__props.as || "span"), {
				"ws-nowrap": "",
				rounded: "",
				class: normalizeClass(unref(sizeClasses)),
				style: normalizeStyle(unref(style))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [createBaseVNode("span", { textContent: toDisplayString(props.text) }, null, 8, _hoisted_1$3)])]),
				_: 3
			}, 8, ["class", "style"]);
		};
	}
});
//#endregion
//#region src/client/components/NavBar.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = {
	"h-54px": "",
	flex: "~ none gap-2",
	border: "b main",
	"pl-4": "",
	"pr-4": "",
	"font-light": "",
	"children:my-auto": ""
};
//#endregion
//#region src/client/components/NavBar.vue
var NavBar_default = /* @__PURE__ */ defineComponent({
	__name: "NavBar",
	setup(__props) {
		const payload = usePayloadStore();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("nav", _hoisted_1$2, [renderSlot(_ctx.$slots, "default"), renderSlot(_ctx.$slots, "actions", {}, () => [!unref(payload).metadata.embedded ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
				_cache[2] || (_cache[2] = createBaseVNode("div", {
					mx1: "",
					"h-full": "",
					"w-0": "",
					border: "r main"
				}, null, -1)),
				_cache[3] || (_cache[3] = createBaseVNode("a", {
					"icon-btn": "",
					"text-lg": "",
					href: "https://github.com/antfu/vite-plugin-inspect",
					target: "_blank"
				}, [createBaseVNode("div", { "i-carbon-logo-github": "" })], -1)),
				createBaseVNode("button", {
					class: "icon-btn text-lg",
					title: "Toggle Dark Mode",
					onClick: _cache[0] || (_cache[0] = ($event) => unref(toggleDark)())
				}, [..._cache[1] || (_cache[1] = [createBaseVNode("span", {
					"i-carbon-sun": "",
					"dark:i-carbon-moon": ""
				}, null, -1)])])
			], 64)) : createCommentVNode("", true)])]);
		};
	}
});
//#endregion
//#region src/client/components/SegmentControl.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = {
	flex: "~ gap-1 items-center",
	border: "~ subtle rounded",
	"bg-subtle": "",
	p1: ""
};
//#endregion
//#region src/client/components/SegmentControl.vue
var SegmentControl_default = /* @__PURE__ */ defineComponent({
	__name: "SegmentControl",
	props: {
		options: {},
		modelValue: {}
	},
	emits: ["update:modelValue"],
	setup(__props) {
		return (_ctx, _cache) => {
			const _component_Badge = Badge_default;
			return openBlock(), createElementBlock("div", _hoisted_1$1, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option) => {
				return openBlock(), createBlock(_component_Badge, {
					key: option.value,
					class: normalizeClass(["px-2 py-1 text-xs font-mono", option.value === __props.modelValue ? "" : "op50"]),
					color: option.value === __props.modelValue,
					"aria-pressed": option.value === __props.modelValue,
					size: "none",
					text: option.label,
					as: "button",
					onClick: ($event) => _ctx.$emit("update:modelValue", option.value)
				}, null, 8, [
					"class",
					"color",
					"aria-pressed",
					"text",
					"onClick"
				]);
			}), 128))]);
		};
	}
});
//#endregion
//#region src/client/components/QuerySelector.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { flex: "~ gap-2" };
//#endregion
//#region src/client/components/QuerySelector.vue
var QuerySelector_default = /* @__PURE__ */ defineComponent({
	__name: "QuerySelector",
	setup(__props) {
		const payload = usePayloadStore();
		return (_ctx, _cache) => {
			const _component_SegmentControl = SegmentControl_default;
			return openBlock(), createElementBlock("div", _hoisted_1, [unref(payload).metadata.instances.length > 1 ? (openBlock(), createBlock(_component_SegmentControl, {
				key: 0,
				modelValue: unref(payload).query.vite,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(payload).query.vite = $event),
				options: unref(payload).metadata.instances.map((i) => ({
					label: i.vite,
					value: i.vite
				}))
			}, null, 8, ["modelValue", "options"])) : createCommentVNode("", true), createVNode(_component_SegmentControl, {
				modelValue: unref(payload).query.env,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(payload).query.env = $event),
				options: unref(payload).instance.environments.map((i) => ({
					label: i,
					value: i
				}))
			}, null, 8, ["modelValue", "options"])]);
		};
	}
});
//#endregion
export { PluginName_default as a, Badge_default as i, SegmentControl_default as n, getPluginColor as o, NavBar_default as r, Container_default as s, QuerySelector_default as t };
