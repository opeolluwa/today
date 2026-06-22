import { createHead as createClientHead, renderDOMHead } from "@unhead/vue/client";
import { defineNuxtPlugin } from "#app/nuxt";
import { freezeHead } from "../island-head.js";
import unheadOptions from "#build/unhead-options.mjs";
export default defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = import.meta.server ? nuxtApp.ssrContext.head : createClientHead(unheadOptions);
    if (import.meta.server && nuxtApp.ssrContext.islandContext) {
      const unfreeze = freezeHead(head);
      nuxtApp.hooks.hookOnce("app:created", unfreeze);
    }
    nuxtApp.vueApp.use(head);
    if (import.meta.client) {
      let pauseDOMUpdates = true;
      const syncHead = async () => {
        pauseDOMUpdates = false;
        await renderDOMHead(head);
      };
      head.hooks.hook("dom:beforeRender", (context) => {
        context.shouldRender = !pauseDOMUpdates;
      });
      nuxtApp.hooks.hook("page:start", () => {
        pauseDOMUpdates = true;
      });
      nuxtApp.hooks.hook("page:finish", () => {
        if (!nuxtApp.isHydrating) {
          syncHead();
        }
      });
      nuxtApp.hooks.hook("app:error", syncHead);
      nuxtApp.hooks.hook("app:suspense:resolve", syncHead);
      const originalPush = head.push.bind(head);
      head.push = ((input, options) => {
        const entry = originalPush(input, options);
        const originalDispose = entry.dispose.bind(entry);
        entry.dispose = () => {
          const transitionPromise = nuxtApp["~transitionPromise"];
          if (transitionPromise) {
            transitionPromise.then(originalDispose);
          } else {
            originalDispose();
          }
        };
        return entry;
      });
    }
  }
});
