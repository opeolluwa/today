import { WheelEventData, WheelGesturesConfig, WheelGesturesEventMap, WheelGesturesOptions } from '../types';
export declare function WheelGestures(optionsParam?: WheelGesturesOptions): Readonly<{
    on: <EK extends "wheel">(type: EK, listener: import("../events/EventBus").EventListener<WheelGesturesEventMap[EK]>) => import("../events/EventBus").Off;
    off: <EK extends "wheel">(type: EK, listener: import("../events/EventBus").EventListener<WheelGesturesEventMap[EK]>) => void;
    observe: (target: EventTarget) => () => void;
    unobserve: (target: EventTarget) => void;
    disconnect: () => void;
    feedWheel: (wheelEvents: WheelEventData | WheelEventData[]) => void;
    updateOptions: (newOptions?: WheelGesturesOptions) => WheelGesturesConfig;
}>;
