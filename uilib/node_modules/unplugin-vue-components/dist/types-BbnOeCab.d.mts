import { TransformResult } from "unplugin";
import { FilterPattern } from "unplugin-utils";

//#region node_modules/.pnpm/@antfu+utils@9.3.0/node_modules/@antfu/utils/dist/index.d.mts
/**
 * Promise, or maybe not
 */
type Awaitable<T> = T | PromiseLike<T>;
/**
 * Null or whatever
 */
//#endregion
//#region src/types.d.ts
interface ImportInfoLegacy {
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
interface ImportInfo {
  as?: string;
  name?: string;
  from: string;
}
type SideEffectsInfo = (ImportInfo | string)[] | ImportInfo | string | undefined;
interface ComponentInfo extends ImportInfo {
  sideEffects?: SideEffectsInfo;
}
type ComponentResolveResult = Awaitable<string | ComponentInfo | null | undefined | void>;
type ComponentResolverFunction = (name: string) => ComponentResolveResult;
interface ComponentResolverObject {
  type: 'component' | 'directive';
  resolve: ComponentResolverFunction;
}
type ComponentResolver = ComponentResolverFunction | ComponentResolverObject;
type Matcher = (id: string) => boolean | null | undefined;
type Transformer = (code: string, id: string, path: string, query: Record<string, string>) => Awaitable<TransformResult | null>;
interface PublicPluginAPI {
  /**
   * Resolves a component using the configured resolvers.
   */
  findComponent: (name: string, filename?: string) => Promise<ComponentInfo | undefined>;
  /**
   * Obtain an import statement for a resolved component.
   */
  stringifyImport: (info: ComponentInfo) => string;
}
/**
 * Plugin options.
 */
interface Options {
  /**
   * RegExp or glob to match files to be transformed
   */
  include?: FilterPattern;
  /**
   * RegExp or glob to match files to NOT be transformed
   */
  exclude?: FilterPattern;
  /**
   * RegExp or string to match component names that will NOT be imported
   */
  excludeNames?: FilterPattern;
  /**
   * Relative paths to the directory to search for components.
   * @default 'src/components'
   */
  dirs?: string | string[];
  /**
   * Valid file extensions for components.
   * @default ['vue']
   */
  extensions?: string | string[];
  /**
   * Glob patterns to match file names to be detected as components.
   *
   * When specified, the `dirs`, `extensions`, and `directoryAsNamespace` options will be ignored.
   */
  globs?: string | string[];
  /**
   * Negated glob patterns to exclude files from being detected as components.
   *
   * @default []
   */
  globsExclude?: string | string[];
  /**
   * Search for subdirectories
   * @default true
   */
  deep?: boolean;
  /**
   * Allow subdirectories as namespace prefix for components
   * @default false
   */
  directoryAsNamespace?: boolean;
  /**
   * Generate components with prefix.
   */
  prefix?: string;
  /**
   * Collapse same prefixes (camel-sensitive) of folders and components
   * to prevent duplication inside namespaced component name.
   *
   * Works when `directoryAsNamespace: true`
   * @default false
   */
  collapseSamePrefixes?: boolean;
  /**
   * Subdirectory paths for ignoring namespace prefixes
   *
   * Works when `directoryAsNamespace: true`
   * @default "[]"
   */
  globalNamespaces?: string[];
  /**
   * Pass a custom function to resolve the component importing path from the component name.
   *
   * The component names are always in PascalCase
   */
  resolvers?: (ComponentResolver | ComponentResolver[])[];
  /**
   * Apply custom transform over the path for importing
   */
  importPathTransform?: (path: string) => string | undefined;
  /**
   * Tranform users' usage of resolveComponent/resolveDirective as well
   *
   * If disabled, only components inside templates (which compiles to `_resolveComponent` etc.)
   * will be transformed.
   *
   * @default true
   */
  transformerUserResolveFunctions?: boolean;
  /**
   * Generate TypeScript declaration for global components
   *
   * Accept boolean or a path related to project root
   *
   * @see https://github.com/vuejs/core/pull/3399
   * @see https://github.com/johnsoncodehk/volar#using
   * @default true
   */
  dts?: boolean | string;
  /**
   * Generate TypeScript declaration for global components
   * For TSX support
   *
   * @default true if `@vitejs/plugin-vue-jsx` is installed
   */
  dtsTsx?: boolean;
  /**
   * Do not emit warning on component overriding
   *
   * @default false
   */
  allowOverrides?: boolean;
  /**
   * auto import for directives.
   * @default true
   */
  directives?: boolean;
  /**
   * Only provide types of components in library (registered globally)
   */
  types?: TypeImport[];
  /**
   * Generate sourcemap for the transformed code.
   *
   * @default true
   */
  sourcemap?: boolean;
  /**
   * Save component information into a JSON file for other tools to consume.
   * Provide a filepath to save the JSON file.
   *
   * When set to `true`, it will save to `./.components-info.json`
   *
   * @default false
   */
  dumpComponentsInfo?: boolean | string;
  /**
   * The mode for syncing the components.d.ts and .components-info.json file.
   * - `append`: only append the new components to the existing files.
   * - `overwrite`: overwrite the whole existing files with the current components.
   * - `default`: use `append` strategy when using dev server, `overwrite` strategy when using build.
   *
   * @default 'default'
   */
  syncMode?: 'default' | 'append' | 'overwrite';
}
type ResolvedOptions = Omit<Required<Options>, 'resolvers' | 'extensions' | 'dirs' | 'globalComponentsDeclaration'> & {
  resolvers: ComponentResolverObject[];
  extensions: string[];
  dirs: string[];
  resolvedDirs: string[];
  globs: string[];
  globsExclude: string[];
  dts: string | false;
  dtsTsx: boolean;
  root: string;
};
type ComponentsImportMap = Record<string, string[] | undefined>;
interface TypeImport {
  from: string;
  names: string[];
}
//#endregion
export { ComponentResolverObject as a, ImportInfoLegacy as c, PublicPluginAPI as d, ResolvedOptions as f, TypeImport as h, ComponentResolverFunction as i, Matcher as l, Transformer as m, ComponentResolveResult as n, ComponentsImportMap as o, SideEffectsInfo as p, ComponentResolver as r, ImportInfo as s, ComponentInfo as t, Options as u };