import "css-tree";
import { Font } from "@capsizecss/unpack";
import { createUnplugin } from "unplugin";

//#region src/css.d.ts

/**
* Generates a fallback name based on the first font family specified in the input string.
* @param {string} name - The full font family string.
* @returns {string} - The fallback font name.
*/
declare function generateFallbackName(name: string): string;
interface FallbackOptions {
  /**
  * The name of the fallback font.
  */
  name: string;
  /**
  * The fallback font family name.
  */
  font: string;
  /**
  * Metrics for fallback face calculations.
  * @optional
  */
  metrics?: FontFaceMetrics;
  /**
  * Additional properties that may be included dynamically
  */
  [key: string]: any;
}
type FontFaceMetrics = Pick<Font, "ascent" | "descent" | "lineGap" | "unitsPerEm" | "xWidthAvg"> & {
  category?: string;
};
/**
* Generates a CSS `@font-face' declaration for a font, taking fallback and resizing into account.
* @param {FontFaceMetrics} metrics - The metrics of the preferred font. See {@link FontFaceMetrics}.
* @param {FallbackOptions} fallback - The fallback options, including name, font and optional metrics. See {@link FallbackOptions}.
* @returns {string} - The full `@font-face` CSS declaration.
*/
declare function generateFontFace(metrics: FontFaceMetrics, fallback: FallbackOptions): string;
//#endregion
//#region src/fallbacks.d.ts
type FontCategory = "sans-serif" | "serif" | "monospace" | "display" | "handwriting" | "cursive" | "fantasy" | "system-ui" | "ui-serif" | "ui-sans-serif" | "ui-monospace" | "ui-rounded" | "emoji" | "math" | "fangsong";
/**
* Default fallback font stacks for each font category.
* These are system fonts that work across different platforms.
*/
declare const DEFAULT_CATEGORY_FALLBACKS: Partial<Record<FontCategory, string[]>>;
interface ResolveCategoryFallbacksOptions {
  /** Font family name to resolve fallbacks for */
  fontFamily: string;
  /** Global fallbacks (array) or per-family fallbacks (object). Array overrides all category-based resolution. */
  fallbacks: string[] | Record<string, string[]>;
  /** Font metrics containing category information */
  metrics?: {
    category?: string;
  } | null;
  /** User-provided category fallback overrides */
  categoryFallbacks?: Partial<Record<FontCategory, string[]>>;
}
/**
* Resolves the appropriate fallback fonts for a given font family.
*
* Resolution order:
* 1. If fallbacks is an array, use it as a global override
* 2. If fallbacks is an object with the font family key, use that override
* 3. If metrics contain a category, use the category-based fallbacks
* 4. Default to sans-serif category fallbacks
*
* @param options - Configuration for fallback resolution
* @returns Array of fallback font family names
*/
declare function resolveCategoryFallbacks(options: ResolveCategoryFallbacksOptions): string[];
//#endregion
//#region src/metrics.d.ts
/**
* Retrieves the font metrics for a given font family from the metrics collection. Uses caching to avoid redundant calculations.
* @param {string} family - The name of the font family for which metrics are requested.
* @returns {Promise<FontFaceMetrics | null>} - A promise that resolves with the filtered font metrics or null if not found. See {@link FontFaceMetrics}.
* @async
*/
declare function getMetricsForFamily(family: string): Promise<FontFaceMetrics | null>;
/**
* Reads font metrics from a specified source URL or file path. This function supports both local files and remote URLs.
* It caches the results to optimise subsequent requests for the same source.
* @param {URL | string} _source - The source URL or local file path from which to read the font metrics.
* @returns {Promise<FontFaceMetrics | null>} - A promise that resolves to the filtered font metrics or null if the source cannot be processed.
* @async
*/
declare function readMetrics(_source: URL | string): Promise<FontFaceMetrics | null>;
//#endregion
//#region src/transform.d.ts
interface FontaineTransformOptions {
  /**
  * Configuration options for the CSS transformation.
  * @optional
  */
  css?: {
    /**
    * Holds the current value of the CSS being transformed.
    * @optional
    */
    value?: string;
  };
  /**
  * Font family fallbacks to use.
  * Can be an array of fallback font family names to use for all fonts,
  * or an object where keys are font family names and values are arrays of fallback font families.
  */
  fallbacks: string[] | Record<string, string[]>;
  /**
  * Category-specific fallback font stacks.
  * When a font's category is detected (serif, sans-serif, monospace, etc.),
  * these fallbacks will be used if no explicit per-family override is provided.
  * @optional
  */
  categoryFallbacks?: Partial<Record<FontCategory, string[]>>;
  /**
  * Function to resolve a given path to a valid URL or local path.
  * This is typically used to resolve font file paths.
  * @optional
  */
  resolvePath?: (path: string) => string | URL;
  /**
  * A function to determine whether to skip font face generation for a given fallback name.
  * @optional
  */
  skipFontFaceGeneration?: (fallbackName: string) => boolean;
  /**
  * Function to generate an unquoted font family name to use as a fallback.
  * This should return a valid CSS font family name and should not include quotes.
  * @optional
  */
  fallbackName?: (name: string) => string;
  /** @deprecated use fallbackName */
  overrideName?: (name: string) => string;
  /**
  * Specifies whether to create a source map for the transformation.
  * @optional
  */
  sourcemap?: boolean;
}
/**
* Transforms CSS files to include font fallbacks.
*
* @param options - The transformation options. See {@link FontaineTransformOptions}.
* @returns The unplugin instance.
*/
declare const FontaineTransform: ReturnType<typeof createUnplugin<FontaineTransformOptions>>;
//#endregion
export { DEFAULT_CATEGORY_FALLBACKS, type FontCategory, FontaineTransform, type FontaineTransformOptions, type ResolveCategoryFallbacksOptions, generateFallbackName, generateFontFace, getMetricsForFamily, readMetrics, resolveCategoryFallbacks };