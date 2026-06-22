import { computed } from "vue";
import { getIcon as _getIcon, addIcon as _addIcon, loadIcon as _loadIcon } from "@iconify/vue";
import { useAppConfig } from "#imports";
import { init as initClientBundle } from "#build/nuxt-icon-client-bundle";
export { initClientBundle };
export async function loadIcon(name, timeout) {
  if (!name)
    return null;
  initClientBundle(_addIcon);
  const _icon = _getIcon(name);
  if (_icon)
    return _icon;
  let timeoutWarn;
  const load = _loadIcon(name).catch(() => {
    console.warn(`[Icon] failed to load icon \`${name}\``);
    return null;
  });
  if (timeout > 0)
    await Promise.race([
      load,
      new Promise((resolve) => {
        timeoutWarn = setTimeout(() => {
          console.warn(`[Icon] loading icon \`${name}\` timed out after ${timeout}ms`);
          resolve();
        }, timeout);
      })
    ]).finally(() => clearTimeout(timeoutWarn));
  else
    await load;
  return _getIcon(name);
}
export function useResolvedName(getName) {
  const options = useAppConfig().icon;
  const collections = (options.collections || []).sort((a, b) => b.length - a.length);
  return computed(() => {
    const name = getName();
    const bare = name.startsWith(options.cssSelectorPrefix) ? name.slice(options.cssSelectorPrefix.length) : name;
    const resolved = options.aliases?.[bare] || bare;
    if (!resolved.includes(":")) {
      const collection = collections.find((c) => resolved.startsWith(c + "-"));
      return collection ? collection + ":" + resolved.slice(collection.length + 1) : resolved;
    }
    return resolved;
  });
}
export function resolveCustomizeFn(customize, globalCustomize) {
  if (customize === false) return void 0;
  if (customize === true || customize === null) return globalCustomize;
  return customize;
}
