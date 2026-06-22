import { FeatureBundle } from '../../features/dom-animation';
import { Ref } from 'vue';
export type LazyMotionContext = {
    features: Ref<Partial<FeatureBundle>>;
    strict: boolean;
};
export declare const useLazyMotionContext: <T extends LazyMotionContext = LazyMotionContext>(fallback?: T) => T extends null ? LazyMotionContext : LazyMotionContext, lazyMotionContextProvider: (contextValue: LazyMotionContext) => LazyMotionContext;
