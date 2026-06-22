import { MotionState } from '../state/motion-state';
export type FeatureKey = 'animation' | 'projection' | 'layout' | 'hover' | 'press' | 'focus' | 'drag' | 'pan' | 'inView';
export declare class Feature {
    static key: FeatureKey;
    isMount: boolean;
    state: MotionState;
    constructor(state: MotionState);
    mount(): void;
    unmount(): void;
    update(): void;
}
