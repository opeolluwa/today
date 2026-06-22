import * as unimport0 from "unimport";
import { AddonVueDirectivesOptions, Import, InlinePreset, PackagePreset, ScanDirExportsOptions, UnimportOptions } from "unimport";
import { FilterPattern } from "unplugin-utils";

//#region node_modules/.pnpm/@antfu+utils@9.3.0/node_modules/@antfu/utils/dist/index.d.mts
/**
 * Promise, or maybe not
 */
type Awaitable<T> = T | PromiseLike<T>;
/**
 * Null or whatever
 */
/**
 * Array, or not yet
 */
type Arrayable<T> = T | Array<T>;
/**
 * Function
 */
//#endregion
//#region src/presets/index.d.ts
declare const presets: {
  '@vue/composition-api': unimport0.InlinePreset;
  pinia: unimport0.InlinePreset;
  'vue-demi': unimport0.InlinePreset;
  'vue-i18n': unimport0.InlinePreset;
  'vue-router-composables': unimport0.InlinePreset;
  vue: unimport0.InlinePreset;
  'vue/macros': unimport0.InlinePreset;
  vitest: unimport0.InlinePreset;
  rxjs: unimport0.InlinePreset;
  'date-fns': unimport0.InlinePreset;
  ahooks: () => ImportsMap;
  '@vueuse/core': () => ImportsMap;
  '@vueuse/math': () => ImportsMap;
  '@vueuse/head': ImportsMap;
  mobx: ImportsMap;
  'mobx-react-lite': ImportsMap;
  preact: ImportsMap;
  quasar: ImportsMap;
  react: ImportsMap;
  'react-dom': ImportsMap;
  'react-router': ImportsMap;
  'react-router-dom': ImportsMap;
  'react-i18next': ImportsMap;
  svelte: ImportsMap;
  'svelte/animate': ImportsMap;
  'svelte/easing': ImportsMap;
  'svelte/motion': ImportsMap;
  'svelte/store': ImportsMap;
  'svelte/transition': ImportsMap;
  'vee-validate': ImportsMap;
  vitepress: ImportsMap;
  'vue-router': ImportsMap;
  'vue-router/composables': ImportsMap;
  vuex: ImportsMap;
  'uni-app': ImportsMap;
  'solid-js': ImportsMap;
  '@solidjs/router': ImportsMap;
  'solid-app-router': ImportsMap;
  jotai: ImportsMap;
  'jotai/utils': ImportsMap;
  recoil: ImportsMap;
};
type PresetName = keyof typeof presets;
//#endregion
//#region src/types.d.ts
interface ImportLegacy {
  /**
       * @deprecated renamed to `as`
       */
  name?: string;
  /**
       * @deprecated renamed to `name`
       */
  importName?: string;
  /**
       * @deprecated renamed to `from`
       */
  path: string;
  sideEffects?: SideEffectsInfo;
}
interface ImportExtended extends Import {
  sideEffects?: SideEffectsInfo;
  __source?: 'dir' | 'resolver';
}
type ImportNameAlias = [string, string];
type SideEffectsInfo = Arrayable<ResolverResult | string> | undefined;
interface ResolverResult {
  as?: string;
  name?: string;
  from: string;
}
type ResolverFunction = (name: string) => Awaitable<string | ResolverResult | ImportExtended | null | undefined | void>;
interface ResolverResultObject {
  type: 'component' | 'directive';
  resolve: ResolverFunction;
}
/**
 * Given a identifier name, returns the import path or an import object
 */
type Resolver = ResolverFunction | ResolverResultObject;
/**
 * module, name, alias
 */
type ImportsMap = Record<string, (string | ImportNameAlias)[]>;
/**
 * Directory to search for import
 */
interface ScanDir {
  glob: string;
  types?: boolean;
}
type NormalizedScanDir = Required<ScanDir>;
type ESLintGlobalsPropValue = boolean | 'readonly' | 'readable' | 'writable' | 'writeable';
interface ESLintrc {
  /**
       * @default false
       */
  enabled?: boolean;
  /**
       * Filepath to save the generated eslint config
       *
       * @default './.eslintrc-auto-import.json'
       */
  filepath?: string;
  /**
       * @default true
       */
  globalsPropValue?: ESLintGlobalsPropValue;
}
interface BiomeLintrc {
  /**
       * @default false
       */
  enabled?: boolean;
  /**
       * Filepath to save the generated eslint config
       *
       * @default './.eslintrc-auto-import.json'
       */
  filepath?: string;
}
interface Options {
  /**
       * Preset names or custom imports map
       *
       * @default []
       */
  imports?: Arrayable<ImportsMap | PresetName | InlinePreset>;
  /**
       * Local package presets.
       *
       * Register local installed packages as a preset.
       *
       * @default []
       * @see https://github.com/unplugin/unplugin-auto-import#package-presets
       */
  packagePresets?: (PackagePreset | string)[];
  /**
       * Identifiers to be ignored
       */
  ignore?: (string | RegExp)[];
  /**
       * These identifiers won't be put on the DTS file
       */
  ignoreDts?: (string | RegExp)[];
  /**
       * Inject the imports at the end of other imports
       *
       * @default true
       */
  injectAtEnd?: boolean;
  /**
       * Options for scanning directories for auto import
       */
  dirsScanOptions?: Omit<ScanDirExportsOptions, 'cwd'>;
  /**
       * Path for directories to be auto imported
       */
  dirs?: (string | ScanDir)[];
  /**
       * Pass a custom function to resolve the component importing path from the component name.
       *
       * The component names are always in PascalCase
       */
  resolvers?: Arrayable<Arrayable<Resolver>>;
  /**
       * Parser to be used for parsing the source code.
       *
       * @see https://github.com/unjs/unimport#acorn-parser
       * @default 'regex'
       */
  parser?: UnimportOptions['parser'];
  /**
       * Specifies the file path for generating the corresponding .d.ts file.
       * This option is enabled by default when `typescript` is installed locally.
       * Set to `false` to disable this feature.
       */
  dts?: string | boolean;
  /**
       * Mode for generating the .d.ts file.
       * - `overwrite`: overwrite the whole existing .d.ts file with the new type definitions.
       * - `append`: only append the new type definitions to the existing .d.ts file, means the existing type definitions will be kept.
       * @default 'append'
       */
  dtsMode?: 'overwrite' | 'append';
  /**
       * Preserve the original file extensions in the generated .d.ts file.
       * Set to `true` to keep the extensions for .ts and .tsx files.
       * @default false
       */
  dtsPreserveExts?: boolean;
  /**
       * Auto import inside Vue templates
       *
       * @see https://github.com/unjs/unimport/pull/15
       * @see https://github.com/unjs/unimport/pull/72
       * @default false
       */
  vueTemplate?: boolean;
  /**
       * Enable auto import directives for Vue's SFC.
       *
       * Library authors should include `meta.vueDirective: true` in the import metadata.
       *
       * When using a local directives folder, provide the `isDirective`
       * callback to check if the import is a Vue directive.
       *
       * @see https://github.com/unjs/unimport?tab=readme-ov-file#vue-directives-auto-import-and-typescript-declaration-generation
       */
  vueDirectives?: true | AddonVueDirectivesOptions;
  /**
       * Set default export alias by file name
       *
       * @default false
       */
  defaultExportByFilename?: boolean;
  /**
       * Rules to include transforming target.
       *
       * @default [/\.[jt]sx?$/, /\.astro$/, /\.vue$/, /\.vue\?vue/, /\.vue\.[tj]sx?\?vue/, /\.svelte$/]
       */
  include?: FilterPattern;
  /**
       * Rules to exclude transforming target.
       *
       * @default [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/]
       */
  exclude?: FilterPattern;
  /**
       * Generate corresponding .eslintrc-auto-import.json file.
       */
  eslintrc?: ESLintrc;
  /**
       * Generate corresponding .biomelintrc.json file.
       */
  biomelintrc?: BiomeLintrc;
  /**
       * Save unimport items into a JSON file for other tools to consume.
       * Provide a filepath to save the JSON file.
       *
       * When set to `true`, it will save to `./.unimport-items.json`
       *
       * @default false
       */
  dumpUnimportItems?: boolean | string;
  /**
       * Include auto-imported packages in Vite's `optimizeDeps` option
       *
       * @default true
       */
  viteOptimizeDeps?: boolean;
}
//#endregion
export { ImportLegacy as a, NormalizedScanDir as c, ResolverFunction as d, ResolverResult as f, PresetName as g, SideEffectsInfo as h, ImportExtended as i, Options as l, ScanDir as m, ESLintGlobalsPropValue as n, ImportNameAlias as o, ResolverResultObject as p, ESLintrc as r, ImportsMap as s, BiomeLintrc as t, Resolver as u };