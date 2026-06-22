import { App, Directive } from 'vue';
import { Options } from '../types';
import { FeatureBundle } from '../features/dom-animation';
/**
 * Create a v-motion directive with the given feature bundle.
 * If no bundle is provided, defaults to domMax (all features).
 *
 * @param featureBundle - Optional feature bundle (domAnimation or domMax)
 * @param defaultOptions - Optional default motion props merged under user props
 */
export declare function createMotionDirective(featureBundle?: FeatureBundle, defaultOptions?: Options): Directive<HTMLElement | SVGElement, Options>;
/**
 * Create a preset directive with default motion options baked in.
 * Users can still override any option via binding value or VNode props.
 *
 * @example
 * ```ts
 * const vFadeIn = createPresetDirective({
 *   initial: { opacity: 0 },
 *   animate: { opacity: 1 },
 * })
 * app.directive('fade-in', vFadeIn)
 * ```
 */
export declare function createPresetDirective(preset: Options, featureBundle?: FeatureBundle): Directive<HTMLElement | SVGElement, Options>;
export declare const vMotion: Directive<HTMLElement | SVGElement, Options<any>>;
export interface MotionPluginOptions {
    /** Custom preset directives (e.g. { 'fade-in': { initial: { opacity: 0 }, animate: { opacity: 1 } } }) */
    presets?: Record<string, Options>;
}
/** Structural type for app.use(MotionPlugin, options) — avoids Vue version mismatch on Plugin<> */
export interface MotionPluginType {
    install: (app: App, options?: MotionPluginOptions) => void;
}
/**
 * Vue plugin for global v-motion directive registration.
 *
 * @example
 * ```ts
 * import { MotionPlugin } from 'motion-v'
 * app.use(MotionPlugin)
 *
 * // With custom presets
 * app.use(MotionPlugin, {
 *   presets: {
 *     'fade-in': { initial: { opacity: 0 }, animate: { opacity: 1 } },
 *   },
 * })
 * ```
 */
export declare const MotionPlugin: MotionPluginType;
declare module 'vue' {
    interface GlobalDirectives {
        vMotion: typeof vMotion;
    }
}
