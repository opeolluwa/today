import { defineNuxtModule, addComponent, addImports, addPluginTemplate, addTypeTemplate } from '@nuxt/kit';

const components = [
  "Motion",
  "AnimatePresence",
  "LayoutGroup",
  "MotionConfig",
  "ReorderGroup",
  "ReorderItem",
  "M"
];
const utilities = [
  "useTransform",
  "useTime",
  "useMotionTemplate",
  "useSpring",
  "useScroll",
  "useMotionValue",
  "useVelocity",
  "useAnimate",
  "useInView",
  "useAnimationFrame",
  "useMotionValueEvent",
  "useLayoutGroup",
  "useDragControls",
  "useReducedMotion",
  "vMotion",
  "createPresetDirective"
];
const index = defineNuxtModule({
  meta: {
    name: "motion-v",
    configKey: "motionV",
    compatibility: {
      nuxt: ">=3.0.0"
    }
  },
  defaults: {
    prefix: "",
    components: true,
    utilities: true,
    directives: false,
    presets: {}
  },
  setup(options, _nuxtApp) {
    if (options.components) {
      components.forEach((component) => {
        addComponent({
          name: `${options.prefix}${component}`,
          export: component,
          filePath: "motion-v"
        });
      });
    }
    if (options.utilities) {
      utilities.forEach((utility) => {
        addImports({
          from: "motion-v",
          name: utility
        });
      });
    }
    const presetEntries = Object.entries(options.presets || {});
    const needsPlugin = options.directives || presetEntries.length > 0;
    if (needsPlugin) {
      const presetLines = presetEntries.map(
        ([name, preset]) => `  nuxtApp.vueApp.directive(${JSON.stringify(name)}, createPresetDirective(${JSON.stringify(preset)}))`
      );
      const imports = ["createPresetDirective"];
      if (options.directives) {
        imports.unshift("vMotion");
      }
      const directiveLine = options.directives ? `  nuxtApp.vueApp.directive('motion', vMotion)
` : "";
      addPluginTemplate({
        filename: "motion-v-directives.mjs",
        getContents: () => `import { defineNuxtPlugin } from '#imports'
import { ${imports.join(", ")} } from 'motion-v'

export default defineNuxtPlugin((nuxtApp) => {
${directiveLine}${presetLines.join("\n")}${presetLines.length ? "\n" : ""}})
`
      });
      const typeLines = [];
      if (options.directives) {
        typeLines.push("    vMotion: typeof import('motion-v').vMotion");
      }
      for (const name of presetEntries.map(([n]) => n)) {
        const camelName = `v${name.replace(/(^|-)(\w)/g, (_, _sep, c) => c.toUpperCase())}`;
        typeLines.push(`    ${camelName}: import('vue').Directive<HTMLElement | SVGElement, import('motion-v').Options>`);
      }
      if (typeLines.length > 0) {
        addTypeTemplate({
          filename: "types/motion-v-directives.d.ts",
          getContents: () => `declare module 'vue' {
  interface GlobalDirectives {
${typeLines.join("\n")}
  }
}

export {}
`
        });
      }
    }
  }
});

export { index as default };
