import { C as Fragment, G as openBlock, L as h, N as createVNode, O as createBaseVNode, P as defineComponent, Q as resolveDynamicComponent, Y as renderList, Z as resolveComponent, gt as unref, j as createElementBlock, k as createBlock, ot as withCtx, t as usePayloadStore } from "./index-D7rIWszL.js";
import { a as PluginName_default, i as Badge_default, r as NavBar_default, s as Container_default, t as QuerySelector_default } from "./QuerySelector-80miXv9L.js";
//#region src/client/pages/index/plugins.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { "w-full": "" };
//#endregion
//#region src/client/pages/index/plugins.vue
var plugins_default = /* @__PURE__ */ defineComponent({
	__name: "plugins",
	setup(__props) {
		const payload = usePayloadStore();
		function renderRow(idx) {
			const envs = payload.instance.environments.map((e) => payload.instance.environmentPlugins[e].includes(idx));
			const nodes = [];
			envs.forEach((e, i) => {
				if (envs[i - 1] === e) return;
				if (!e) nodes.push(h("td"));
				else {
					let length = envs.slice(i).findIndex((e) => !e);
					if (length === -1) length = envs.length - i;
					nodes.push(h("td", {
						colspan: length,
						class: "border border-main px4 py1"
					}, [h(PluginName_default, { name: payload.instance.plugins[idx].name })]));
				}
			});
			return () => nodes;
		}
		return (_ctx, _cache) => {
			const _component_RouterLink = resolveComponent("RouterLink");
			const _component_QuerySelector = QuerySelector_default;
			const _component_NavBar = NavBar_default;
			const _component_Badge = Badge_default;
			const _component_Container = Container_default;
			return openBlock(), createElementBlock(Fragment, null, [createVNode(_component_NavBar, null, {
				default: withCtx(() => [
					createVNode(_component_RouterLink, {
						"my-auto": "",
						"icon-btn": "",
						"outline-none": "",
						to: "/"
					}, {
						default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("div", { "i-carbon-arrow-left": "" }, null, -1)])]),
						_: 1
					}),
					_cache[1] || (_cache[1] = createBaseVNode("div", { "flex-auto": "" }, null, -1)),
					createVNode(_component_QuerySelector)
				]),
				_: 1
			}), createVNode(_component_Container, {
				flex: "",
				"overflow-auto": "",
				p5: ""
			}, {
				default: withCtx(() => [createBaseVNode("table", _hoisted_1, [createBaseVNode("thead", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(payload).instance.environments, (e) => {
					return openBlock(), createElementBlock("td", {
						key: e,
						border: "~ main",
						p2: "",
						"text-center": ""
					}, [createVNode(_component_Badge, {
						text: e,
						size: "none",
						px2: "",
						py1: "",
						"text-sm": "",
						"font-mono": ""
					}, null, 8, ["text"])]);
				}), 128))]), createBaseVNode("tbody", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(payload).instance.plugins, (p, idx) => {
					return openBlock(), createElementBlock("tr", { key: idx }, [(openBlock(), createBlock(resolveDynamicComponent(renderRow(idx))))]);
				}), 128))])])]),
				_: 1
			})], 64);
		};
	}
});
//#endregion
export { plugins_default as default };
