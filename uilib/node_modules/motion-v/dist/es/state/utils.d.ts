import { AsTag, MotionStateContext, Options, VariantType } from '../types';
export declare function resolveVariant(definition?: Options['animate'], variants?: Options['variants'], custom?: Options['custom']): VariantType | undefined;
/**
 * Resolve initial latest values from variant sources.
 * Shared by MotionState constructor and SSR style resolution.
 *
 * @param options - Motion options
 * @param context - Optional parent context for variant inheritance (MotionState passes this)
 */
export declare function resolveInitialValues(options: Options, context?: MotionStateContext): Record<string, any>;
export declare function shallowCompare(next: any[], prev: any[]): boolean;
export declare function isCssVar(name: string): boolean;
export declare const svgElements: readonly ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "svg", "switch", "symbol", "text", "tspan", "use", "view", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "linearGradient", "radialGradient", "textPath"];
type UnionStringArray<T extends Readonly<string[]>> = T[number];
export type SVGElements = UnionStringArray<typeof svgElements>;
export declare function isSVGElement(as: AsTag): as is SVGElements;
export {};
