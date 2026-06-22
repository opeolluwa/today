import { WheelEventData } from '../types';
type UnobserveTarget = () => void;
export declare function WheelTargetObserver(eventListener: (wheelEvent: WheelEventData) => void): Readonly<{
    observe: (target: EventTarget) => UnobserveTarget;
    unobserve: (target: EventTarget) => void;
    disconnect: () => void;
}>;
export {};
