import { Feature } from '../../feature';
export declare class InViewGesture extends Feature {
    static key: "inView";
    private removeObserver;
    constructor(state: any);
    private isActive;
    private startObserver;
    mount(): void;
    update(): void;
    unmount(): void;
}
