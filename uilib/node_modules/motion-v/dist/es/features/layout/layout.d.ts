import { Feature } from '../feature';
import { MotionState } from '../../state/motion-state';
import { Options } from '../../types';
export declare class LayoutFeature extends Feature {
    static key: "layout";
    private hasMountSettled;
    constructor(state: MotionState);
    private updatePrevLead;
    didUpdate(): void;
    mount(): void;
    unmount(): void;
    getSnapshot(newOptions: Options, isPresent?: boolean): void;
}
