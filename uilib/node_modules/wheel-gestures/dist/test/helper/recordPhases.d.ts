import { WheelEventData, WheelEventState } from '../../types';
interface SubAndFeedProps {
    beforeFeed?: (e: WheelEventData, i: number) => void;
    callback?: (data: WheelEventState) => void;
    wheelEvents?: WheelEventData[];
}
export declare function subscribeAndFeedWheelEvents({ beforeFeed, callback, wheelEvents }?: SubAndFeedProps): {
    wheelGestures: Readonly<{
        on: <EK extends "wheel">(type: EK, listener: import("../../events/EventBus").EventListener<import("../../types").WheelGesturesEventMap[EK]>) => import("../../events/EventBus").Off;
        off: <EK extends "wheel">(type: EK, listener: import("../../events/EventBus").EventListener<import("../../types").WheelGesturesEventMap[EK]>) => void;
        observe: (target: EventTarget) => () => void;
        unobserve: (target: EventTarget) => void;
        disconnect: () => void;
        feedWheel: (wheelEvents: WheelEventData | WheelEventData[]) => void;
        updateOptions: (newOptions?: import("../../types").WheelGesturesOptions) => import("../../types").WheelGesturesConfig;
    }>;
    allPhaseData: WheelEventState[];
    feedEvents: (eventsToFeed: WheelEventData[]) => void;
};
export type Range = [number, number];
export type RangeWheelType = 'user' | 'momentum';
export interface PhaseRange extends Omit<WheelEventState, 'previous' | 'axisMovementProjection'> {
    wheelType: RangeWheelType;
    range: Range;
    hasPrevious: boolean;
}
export declare function recordPhases(wheelEvents: WheelEventData[]): {
    phases: PhaseRange[];
};
export {};
