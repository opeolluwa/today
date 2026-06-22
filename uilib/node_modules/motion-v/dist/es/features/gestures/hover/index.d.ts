import { Feature } from '../../feature';
export declare class HoverGesture extends Feature {
    static key: "hover";
    private removeHover;
    constructor(state: any);
    private isActive;
    private register;
    mount(): void;
    update(): void;
    unmount(): void;
}
