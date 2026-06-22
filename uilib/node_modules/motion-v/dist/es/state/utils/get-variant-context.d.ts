import { VisualElement } from 'motion-dom';
type VariantStateContext = {
    initial?: string | string[];
    animate?: string | string[];
    exit?: string | string[];
    whileHover?: string | string[];
    whileDrag?: string | string[];
    whileFocus?: string | string[];
    whilePress?: string | string[];
};
/**
 * Get variant context from a visual element's parent chain.
 * Uses `any` type for visualElement to avoid circular dependencies.
 */
export declare function getVariantContext(visualElement?: VisualElement): undefined | VariantStateContext;
export {};
