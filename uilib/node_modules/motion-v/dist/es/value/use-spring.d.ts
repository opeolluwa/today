import { MaybeRef } from 'vue';
import { MotionValue } from 'framer-motion/dom';
import { FollowValueOptions, SpringOptions } from 'motion-dom';
type AnyResolvedKeyframe = string | number;
export declare function useFollowValue<T extends AnyResolvedKeyframe>(source: T | MotionValue<T>, options?: MaybeRef<FollowValueOptions>): MotionValue<T>;
export declare function useSpring(source: MotionValue<string> | string, config?: MaybeRef<SpringOptions>): MotionValue<string>;
export declare function useSpring(source: MotionValue<number> | number, config?: MaybeRef<SpringOptions>): MotionValue<number>;
export {};
