import { PanInfo } from './PanSession';
import { Feature } from '../../feature';
export declare class PanGesture extends Feature {
    static key: "pan";
    private session?;
    private removePointerDownListener;
    onPointerDown(pointerDownEvent: PointerEvent): void;
    createPanHandlers(): {
        onSessionStart: (event: PointerEvent, info: PanInfo) => void;
        onStart: (event: PointerEvent, info: PanInfo) => void;
        onMove: (event: any, info: any) => void;
        onEnd: (event: PointerEvent, info: PanInfo) => void;
    };
    mount(): void;
    update(): void;
    unmount(): void;
}
