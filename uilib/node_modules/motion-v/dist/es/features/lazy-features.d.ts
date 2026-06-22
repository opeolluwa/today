import { Feature } from './feature';
/**
 * Global lazy-loaded features registry
 * Updated by useMotionState when LazyMotion context provides features
 * Read by MotionState during feature initialization
 */
export declare const lazyFeatures: Array<typeof Feature>;
/**
 * Update the global lazy features array
 * Called from useMotionState when LazyMotion context features change
 */
export declare function updateLazyFeatures(features: Array<typeof Feature>): void;
