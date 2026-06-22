/**
 * the timeout is automatically adjusted during a gesture
 * the initial timeout period is pretty long, so even old mouses, which emit wheel events less often, can produce a continuous gesture
 */
import { WheelGesturesInternalState } from './internal-types';
export declare function createWheelGesturesState(): WheelGesturesInternalState;
