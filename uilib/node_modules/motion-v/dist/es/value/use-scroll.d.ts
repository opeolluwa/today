import { MaybeRefOrGetter } from 'vue';
import { ScrollInfoOptions } from '../types';
import { MaybeComputedElementRef } from '@vueuse/core';
export interface UseScrollOptions extends Omit<ScrollInfoOptions, 'container' | 'target'> {
    container?: MaybeComputedElementRef;
    target?: MaybeComputedElementRef;
}
export declare function useScroll(options?: MaybeRefOrGetter<UseScrollOptions>): {
    scrollX: import('motion-dom').MotionValue<number>;
    scrollY: import('motion-dom').MotionValue<number>;
    scrollXProgress: import('motion-dom').MotionValue<number>;
    scrollYProgress: import('motion-dom').MotionValue<number>;
};
