import { WheelEventData } from '../../types';
interface GenerateEventsProps {
    deltaTotal: number[];
    durationMs: number;
    eventEveryMs?: number;
    deltaMode?: number;
}
export declare function createWheelEvent({ deltaX, deltaY, deltaZ, deltaMode, timeStamp, ...rest }?: Partial<WheelEventData>): WheelEventData;
export declare function generateEvents({ deltaTotal, durationMs, eventEveryMs, deltaMode, }: GenerateEventsProps): {
    wheelEvents: WheelEventData[];
};
export {};
