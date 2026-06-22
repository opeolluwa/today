import { Icon as Iconify, addIcon } from "@iconify/vue";
import { h } from "vue";
import { initClientBundle, loadIcon, useResolvedName, resolveCustomizeFn } from "./shared.js";
import { useAsyncData, useNuxtApp, defineComponent, useAppConfig, onServerPrefetch } from "#imports";
export const NuxtIconSvg = /* @__PURE__ */ defineComponent({
  name: "NuxtIconSvg",
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
  setup(props, { slots }) {
    const nuxt = useNuxtApp();
    const options = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const storeKey = "i-" + name.value;
    if (name.value) {
      onServerPrefetch(async () => {
        if (import.meta.server) {
          await useAsyncData(
            storeKey,
            async () => await loadIcon(name.value, options.fetchTimeout),
            { deep: false }
          );
        }
      });
      if (import.meta.client) {
        const payload = nuxt.payload.data[storeKey];
        if (payload) {
          addIcon(name.value, payload);
        } else {
          initClientBundle(addIcon);
        }
      }
    }
    return () => h(Iconify, {
      icon: name.value,
      ssr: true,
      // Iconify uses `customise`, where we expose `customize` for consistency
      customise: resolveCustomizeFn(props.customize, options.customize)
    }, slots);
  }
});
