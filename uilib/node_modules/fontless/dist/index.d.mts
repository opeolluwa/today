import { DEFAULT_CATEGORY_FALLBACKS } from "fontaine";
import { FontFaceData, GoogleFamilyOptions, GoogleiconsFamilyOptions, LocalFontSource, Provider, ProviderFactory, RemoteFontSource, ResolveFontOptions, UnifontOptions, providers } from "unifont";
import { ConsolaInstance } from "consola";
import "css-tree";
import { TransformOptions } from "esbuild";
import { TransformOptions as TransformOptions$1 } from "lightningcss";
import MagicString from "magic-string";
import { ESBuildOptions, Plugin } from "vite";

//#region src/css/parse.d.ts
declare const _genericCSSFamilies: readonly ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "emoji", "math", "fangsong"];
type GenericCSSFamily = typeof _genericCSSFamilies[number];
//#endregion
//#region src/types.d.ts
type FontFormat = ResolveFontOptions["formats"][number];
type Awaitable<T> = T | Promise<T>;
interface FontFallback {
  family?: string;
  as: string;
}
interface SharedFontDetails {
  fontFamily: string;
  fonts: FontFaceData[];
}
interface ManualFontDetails extends SharedFontDetails {
  type: "manual";
}
interface ProviderFontDetails extends SharedFontDetails {
  type: "override" | "auto";
  provider: string;
}
type FontProviderName = (string & {}) | "google" | "local" | "none";
interface FontFamilyOverrides {
  /** The font family to apply this override to. */
  name: string;
  /** Inject `@font-face` regardless of usage in project. */
  global?: boolean;
  /**
  * Enable or disable adding preload links to the initially rendered HTML.
  * This is true by default for the highest priority format unless a font is subsetted (to avoid over-preloading).
  */
  preload?: boolean;
}
/** Provider-specific family options that can be passed when resolving a font */
type ProviderFamilyOptions = {
  google?: GoogleFamilyOptions;
  googleicons?: GoogleiconsFamilyOptions;
} & Record<string, Record<string, unknown> | undefined>;
interface FontFamilyProviderOverride extends FontFamilyOverrides, Partial<Omit<ResolveFontOptions, "weights" | "options"> & {
  weights: Array<string | number>;
}> {
  /** The provider to use when resolving this font. */
  provider?: FontProviderName;
  /**
  * Provider-specific options for this font family.
  * These options are passed to the provider when resolving this specific font.
  */
  providerOptions?: ProviderFamilyOptions;
}
type FontSource = string | LocalFontSource | RemoteFontSource;
interface RawFontFaceData extends Omit<FontFaceData, "src" | "unicodeRange"> {
  src: FontSource | Array<FontSource>;
  unicodeRange?: string | string[];
}
interface FontFamilyManualOverride extends FontFamilyOverrides, RawFontFaceData {
  /** Font families to generate fallback metrics for. */
  fallbacks?: string[];
}
type ProviderOption = ((options: any) => Provider) | string | false;
interface FontlessOptions {
  /**
  * Specify overrides for individual font families.
  *
  * ```ts
  * fonts: {
  *   families: [
  *     // do not resolve this font with any provider from `@nuxt/fonts`
  *     { name: 'Custom Font', provider: 'none' },
  *     // only resolve this font with the `google` provider
  *     { name: 'My Font Family', provider: 'google' },
  *     // specify specific font data
  *     { name: 'Other Font', src: 'https://example.com/font.woff2' },
  *   ]
  * }
  * ```
  */
  families?: Array<FontFamilyManualOverride | FontFamilyProviderOverride>;
  defaults?: Partial<{
    preload: boolean;
    weights: Array<string | number>;
    styles: ResolveFontOptions["styles"];
    subsets: ResolveFontOptions["subsets"];
    /**
    * Font formats to resolve. Defaults to `['woff2']`.
    * @default ['woff2']
    */
    formats: FontFormat[];
    fallbacks?: Partial<Record<GenericCSSFamily, string[]>>;
  }>;
  providers?: {
    adobe?: ProviderOption;
    bunny?: ProviderOption;
    fontshare?: ProviderOption;
    fontsource?: ProviderOption;
    google?: ProviderOption;
    googleicons?: ProviderOption;
    npm?: ProviderOption;
    [key: string]: ProviderOption | undefined;
  };
  /** Configure the way font assets are exposed */
  assets?: {
    /**
    * The baseURL where font files are served.
    * @default '/assets/_fonts'
    */
    prefix?: string; /** Currently font assets are exposed as public assets as part of the build. This will be configurable in future */
    strategy?: "public";
  };
  /** Options passed directly to `local` font provider (none currently) */
  local?: Record<string, never>;
  /** Options passed directly to `adobe` font provider */
  adobe?: typeof providers.adobe extends ProviderFactory<any, infer O> ? O : Record<string, never>;
  /** Options passed directly to `bunny` font provider */
  bunny?: typeof providers.bunny extends ProviderFactory<any, infer O> ? O : Record<string, never>;
  /** Options passed directly to `fontshare` font provider */
  fontshare?: typeof providers.fontshare extends ProviderFactory<any, infer O> ? O : Record<string, never>;
  /** Options passed directly to `fontsource` font provider */
  fontsource?: typeof providers.fontsource extends ProviderFactory<any, infer O> ? O : Record<string, never>;
  /** Options passed directly to `google` font provider */
  google?: typeof providers.google extends ProviderFactory<any, infer O> ? O : Record<string, never>;
  /** Options passed directly to `googleicons` font provider */
  googleicons?: typeof providers.googleicons extends ProviderFactory<any, infer O> ? O : Record<string, never>;
  /** Options passed directly to `npm` font provider */
  npm?: typeof providers.npm extends ProviderFactory<any, infer O> ? O : Record<string, never>;
  /**
  * An ordered list of providers to check when resolving font families.
  *
  * After checking these providers, Nuxt Fonts will proceed by checking the
  *
  * Default behaviour is to check all user providers in the order they were defined, and then all built-in providers.
  */
  priority?: string[];
  /**
  * In some cases you may wish to use only one font provider. This is equivalent to disabling all other font providers.
  */
  provider?: FontProviderName;
  /**
  * You can enable support for processing CSS variables for font family names.
  * @default 'font-prefixed-only'
  */
  processCSSVariables?: boolean | "font-prefixed-only";
  /**
  * Whether to throw an error when font resolution fails.
  * When false (default), font resolution failures are logged as warnings.
  * @default false
  */
  throwOnError?: boolean;
  experimental?: {
    /**
    * You can disable adding local fallbacks for generated font faces, like `local('Font Face')`.
    * @default false
    */
    disableLocalFallbacks?: boolean;
    /**
    * You can enable support for processing CSS variables for font family names.
    * @default 'font-prefixed-only'
    * @deprecated This feature is no longer experimental. Use `processCSSVariables` instead. For Tailwind v4 users, setting this option to `true` is no longer needed or recommended.
    */
    processCSSVariables?: boolean | "font-prefixed-only";
  };
}
//#endregion
//#region src/assets.d.ts
interface NormalizeFontDataContext {
  dev: boolean;
  renderedFontURLs: Map<string, string>;
  assetsBaseURL: string;
  callback?: (filename: string, url: string) => void;
}
declare function normalizeFontData(context: NormalizeFontDataContext, faces: RawFontFaceData | FontFaceData[]): FontFaceData[];
//#endregion
//#region src/css/render.d.ts
declare function generateFontFace(family: string, font: FontFaceData): string;
declare function parseFont(font: string): RemoteFontSource | {
  name: string;
};
//#endregion
//#region src/defaults.d.ts
interface DefaultValues {
  weights: [400];
  styles: ["normal", "italic"];
  subsets: string[];
  formats: FontFormat[];
  fallbacks: typeof DEFAULT_CATEGORY_FALLBACKS;
}
declare const defaultValues: DefaultValues;
declare const defaultOptions: FontlessOptions;
//#endregion
//#region src/providers.d.ts
type AnyProviderFactory = ProviderFactory<string, any, any>;
declare function resolveProviders(_providers: FontlessOptions["providers"] | undefined, opts: {
  root: string;
  alias: Record<string, string>;
}): Promise<Record<string, AnyProviderFactory>>;
//#endregion
//#region src/utils.d.ts
interface FontFaceResolution {
  fonts?: FontFaceData[];
  fallbacks?: string[];
}
interface FontFamilyInjectionPluginOptions {
  esbuildOptions?: TransformOptions;
  lightningcssOptions?: Partial<TransformOptions$1<any>>;
  resolveFontFace: (fontFamily: string, fallbackOptions?: {
    fallbacks: string[];
    generic?: GenericCSSFamily;
  }) => Awaitable<undefined | FontFaceResolution>;
  dev: boolean;
  processCSSVariables?: boolean | "font-prefixed-only";
  shouldPreload: (fontFamily: string, font: FontFaceData) => boolean;
  fontsToPreload: Map<string, Set<string>>;
}
declare function resolveMinifyCssEsbuildOptions(options: ESBuildOptions): TransformOptions;
declare function transformCSS(options: FontFamilyInjectionPluginOptions, code: string, id: string, opts?: {
  relative?: boolean;
}): Promise<MagicString>;
//#endregion
//#region src/resolve.d.ts
interface ResolverContext {
  exposeFont?: (font: ManualFontDetails | ProviderFontDetails) => void;
  normalizeFontData: (faces: RawFontFaceData | FontFaceData[]) => FontFaceData[];
  logger?: ConsolaInstance;
  storage?: UnifontOptions["storage"];
  options: FontlessOptions;
  providers: Record<string, (opts: unknown) => Provider>;
}
type Resolver = (fontFamily: string, override?: FontFamilyManualOverride | FontFamilyProviderOverride, fallbackOptions?: {
  fallbacks: string[];
  generic?: GenericCSSFamily;
}) => Promise<FontFaceResolution | undefined>;
declare function createResolver(context: ResolverContext): Promise<Resolver>;
//#endregion
//#region src/vite.d.ts
declare function fontless(_options?: FontlessOptions): Plugin;
//#endregion
export { type FontFallback, type FontFamilyInjectionPluginOptions, type FontFamilyManualOverride, type FontFamilyOverrides, type FontFamilyProviderOverride, type FontFormat, type FontProviderName, type FontSource, type FontlessOptions, type ManualFontDetails, type NormalizeFontDataContext, type ProviderFamilyOptions, type ProviderFontDetails, type Resolver, createResolver, defaultOptions, defaultValues, fontless, generateFontFace, normalizeFontData, parseFont, resolveMinifyCssEsbuildOptions, resolveProviders, transformCSS };