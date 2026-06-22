import { ReverseSign, VectorXYZ, WheelEventData } from '../types';
export interface NormalizedWheel {
    axisDelta: VectorXYZ;
    timeStamp: number;
}
export declare function normalizeWheel(e: WheelEventData): NormalizedWheel;
export declare function reverseAxisDeltaSign<T extends Pick<NormalizedWheel, 'axisDelta'>>(wheel: T, reverseSign: ReverseSign): T;
export declare const clampAxisDelta: <T extends Pick<NormalizedWheel, "axisDelta">>(wheel: T) => T & {
    axisDelta: number[];
};
