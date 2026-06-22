import { Feature } from '../feature';
import { MotionState } from '../../state/motion-state';
declare const STATE_TYPES: readonly ["initial", "animate", "whileInView", "whileHover", "whilePress", "whileDrag", "whileFocus", "exit"];
export type StateType = typeof STATE_TYPES[number];
export declare class AnimationFeature extends Feature {
    static key: "animation";
    unmountControls?: () => void;
    constructor(state: MotionState);
    updateAnimationControlsSubscription(): void;
    /**
     * Subscribe any provided AnimationControls to the component's VisualElement
     */
    mount(): void;
    update(): void;
    unmount(): void;
}
export {};
