import { Feature } from '../../feature';
export declare class PressGesture extends Feature {
    static key: "press";
    private removePress;
    constructor(state: any);
    private isActive;
    private register;
    mount(): void;
    update(): void;
    unmount(): void;
}
