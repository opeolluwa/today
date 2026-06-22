import { Feature } from '../../feature';
export declare class FocusGesture extends Feature {
    static key: "focus";
    private isFocused;
    private removeFocus;
    constructor(state: any);
    private onFocus;
    private onBlur;
    mount(): void;
    unmount(): void;
}
