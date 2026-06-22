import { addIcon, getIcon as _getIcon } from "@iconify/vue";
import { computed, watch, h, defineComponent } from "vue";
import { getIconCSS } from "@iconify/utils/lib/css/icon";
import { hash } from "ohash";
import { loadIcon, resolveCustomizeFn } from "./shared.js";
import { useAppConfig, useNuxtApp, useHead, useRuntimeConfig, onServerPrefetch } from "#imports";
let cssSelectors;
const SYMBOL_SERVER_CSS = "NUXT_ICONS_SERVER_CSS";
function escapeCssSelector(selector) {
  return selector.replace(/([^\w-])/g, "\\$1");
}
function getAllSelectors() {
  if (cssSelectors)
    return cssSelectors;
  cssSelectors = /* @__PURE__ */ new Set();
  const filter = (selector) => {
    selector = selector.replace(/^:where\((.*)\)$/, "$1").trim();
    if (selector.startsWith(".")) {
      return selector;
    }
  };
  const scanCssRules = (rules) => {
    if (!rules?.length)
      return;
    for (const rule of rules) {
      if (rule?.cssRules) {
        scanCssRules(rule.cssRules);
      }
      const selectorRaw = rule?.selectorText;
      if (typeof selectorRaw === "string") {
        const selector = filter(selectorRaw);
        if (selector)
          cssSelectors.add(selector);
      }
    }
  };
  if (typeof document !== "undefined") {
    for (const styleSheet of document.styleSheets) {
      try {
        const rules = styleSheet.cssRules || styleSheet.rules;
        scanCssRules(rules);
      } catch {
      }
    }
  }
  return cssSelectors;
}
export const NuxtIconCss = /* @__PURE__ */ defineComponent({
  name: "NuxtIconCss",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props) {
    const nuxt = useNuxtApp();
    const options = useAppConfig().icon;
    const cssClass = computed(() => {
      if (!props.name) return "";
      const base = options.cssSelectorPrefix + props.name;
      if (typeof props.customize === "function") {
        return base + "--customized-" + hash(props.customize.toString());
      }
      return base;
    });
    function getIcon(name) {
      if (!name)
        return;
      const icon = _getIcon(name);
      if (icon)
        return icon;
      const payload = nuxt.payload?.data?.[name];
      if (payload) {
        addIcon(name, payload);
        return payload;
      }
    }
    const selector = computed(() => "." + escapeCssSelector(cssClass.value));
    function getCSS(icon, withLayer = true) {
      let iconSelector = selector.value;
      if (options.cssWherePseudo) {
        iconSelector = `:where(${iconSelector})`;
      }
      const css = getIconCSS(icon, {
        iconSelector,
        format: "compressed",
        customise: resolveCustomizeFn(props.customize, options.customize)
      });
      if (options.cssLayer && withLayer) {
        return `@layer ${options.cssLayer} { ${css} }`;
      }
      return css;
    }
    if (import.meta.client) {
      const selectors = getAllSelectors();
      async function mountCSS(icon) {
        if (selectors.has(selector.value))
          return;
        if (typeof document === "undefined")
          return;
        const style = document.createElement("style");
        style.textContent = getCSS(icon);
        if (import.meta.dev) {
          style.dataset.nuxtIconDev = props.name;
        }
        const firstStyle = document.head.querySelector('style, link[rel="stylesheet"]');
        if (firstStyle)
          document.head.insertBefore(style, firstStyle);
        else
          document.head.appendChild(style);
        selectors.add(selector.value);
      }
      watch(
        () => props.name,
        () => {
          if (selectors.has(selector.value)) {
            return;
          }
          const data = getIcon(props.name);
          if (data) {
            mountCSS(data);
          } else {
            loadIcon(props.name, import.meta.server ? options.fetchTimeout : -1).then((data2) => {
              if (data2)
                mountCSS(data2);
            }).catch(() => null);
          }
        },
        { immediate: true }
      );
    }
    onServerPrefetch(async () => {
      if (import.meta.server) {
        const configs = useRuntimeConfig().icon || {};
        if (!configs?.serverKnownCssClasses?.includes(cssClass.value)) {
          const icon = await loadIcon(props.name, options.fetchTimeout).catch(() => null);
          if (!icon)
            return null;
          let ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS];
          if (!ssrCSS) {
            ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS] = /* @__PURE__ */ new Map();
            nuxt.runWithContext(() => {
              useHead({
                style: [
                  () => {
                    const sep = import.meta.dev ? "\n" : "";
                    let css = Array.from(ssrCSS.values()).sort().join(sep);
                    if (options.cssLayer) {
                      css = `@layer ${options.cssLayer} {${sep}${css}${sep}}`;
                    }
                    return { innerHTML: css };
                  }
                ]
              }, {
                tagPriority: "low"
              });
            });
          }
          if (cssClass.value && !ssrCSS.has(cssClass.value)) {
            const css = getCSS(icon, false);
            ssrCSS.set(cssClass.value, css);
          }
          return null;
        }
      }
    });
    return () => h("span", { class: ["iconify", cssClass.value] });
  }
});
