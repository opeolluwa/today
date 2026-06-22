import { AnimationDefinition, VisualElement, VisualElementAnimationOptions } from 'motion-dom';
declare const variantPriorityOrder: readonly ["animate", "whileInView", "whileFocus", "whileHover", "whilePress", "whileDrag", "exit"];
export type AnimationType = (typeof variantPriorityOrder)[number];
export interface AnimationTypeState {
    isActive: boolean;
    protectedKeys: Record<string, true>;
    needsAnimating: Record<string, boolean>;
    prevResolvedValues: Record<string, any>;
    prevProp?: any;
}
declare function checkVariantsDidChange(prev: any, next: any): boolean;
export interface AnimationStateAPI {
    animateChanges: (changedActiveType?: AnimationType) => Promise<any>;
    setActive: (type: AnimationType, isActive: boolean) => Promise<any>;
    setAnimateFunction: (fn: (visualElement: VisualElement<Element>) => (animations: any[]) => Promise<any>) => void;
    getState: () => Record<string, AnimationTypeState>;
    reset: () => void;
}
interface DefinitionAndOptions {
    animation: AnimationDefinition;
    options?: VisualElementAnimationOptions;
}
/**
 * Type for the animate function that can be injected.
 * This allows the animation implementation to be provided by the framework layer.
 */
export type AnimateFunction = (animations: DefinitionAndOptions[]) => Promise<any>;
/**
 * Create animation state manager.
 *
 * Ported from motion-dom's createAnimationState.
 * The resolution logic mirrors motion-dom so upstream diffs are easy to apply.
 * Execution is Vue-specific (injected via setAnimateFunction).
 *
 * @param visualElement - The visual element instance (aligned with motion-dom signature)
 */
export declare function createAnimationState(visualElement: VisualElement<any>): AnimationStateAPI;
export { checkVariantsDidChange };
