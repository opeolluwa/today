import { createTV, cnMerge } from "tailwind-variants";
import appConfig from "#build/app.config";
const appConfigTv = appConfig;
const config = appConfigTv.ui?.tv;
const baseTv = /* @__PURE__ */ createTV(config);
function findReplacer(value) {
  if (typeof value === "function") {
    return value;
  }
  if (Array.isArray(value)) {
    for (let i = value.length - 1; i >= 0; i--) {
      const replacer = findReplacer(value[i]);
      if (replacer) {
        return replacer;
      }
    }
  }
  return void 0;
}
function plainClasses(value) {
  if (Array.isArray(value)) {
    return value.flatMap((item) => plainClasses(item));
  }
  if (typeof value === "function") {
    return [];
  }
  return [value];
}
function applyReplacer(replacer, slotProps, resolveDefaults) {
  return cnMerge(replacer(resolveDefaults()), ...plainClasses(slotProps.class), ...plainClasses(slotProps.className))(config) ?? "";
}
function wrapSlots(slots, directives) {
  return new Proxy(slots, {
    get(target, key) {
      const slot = target[key];
      if (typeof slot !== "function") {
        return slot;
      }
      return (slotProps = {}) => {
        const replacer = findReplacer(slotProps.class) ?? findReplacer(slotProps.className) ?? directives?.[key];
        if (!replacer) {
          return slot(slotProps);
        }
        return applyReplacer(replacer, slotProps, () => slot({ ...slotProps, class: void 0, className: void 0 }));
      };
    }
  });
}
function extractDirectives(componentConfig) {
  if (!componentConfig || typeof componentConfig !== "object") {
    return { config: componentConfig };
  }
  let config2 = componentConfig;
  let directives;
  if (typeof componentConfig.base === "function") {
    directives = { base: componentConfig.base };
    config2 = { ...config2, base: "" };
  }
  const slots = componentConfig.slots;
  if (slots && typeof slots === "object") {
    const replacers = Object.entries(slots).filter(([, value]) => typeof value === "function");
    if (replacers.length) {
      directives ??= {};
      const cleaned = { ...slots };
      for (const [slot, replacer] of replacers) {
        directives[slot] = replacer;
        cleaned[slot] = "";
      }
      config2 = { ...config2, slots: cleaned };
    }
  }
  return { config: config2, directives };
}
export const tv = ((componentConfig) => {
  const { config: cleanConfig, directives } = extractDirectives(componentConfig);
  const component = baseTv(cleanConfig);
  return new Proxy(component, {
    apply(target, thisArg, args) {
      const result = Reflect.apply(target, thisArg, args);
      if (result && typeof result === "object") {
        return wrapSlots(result, directives);
      }
      if (typeof result === "string") {
        const slotProps = args[0] ?? {};
        const replacer = findReplacer(slotProps.class) ?? findReplacer(slotProps.className) ?? directives?.base;
        if (replacer) {
          return applyReplacer(replacer, slotProps, () => Reflect.apply(target, thisArg, [{ ...slotProps, class: void 0, className: void 0 }]));
        }
      }
      return result;
    }
  });
});
