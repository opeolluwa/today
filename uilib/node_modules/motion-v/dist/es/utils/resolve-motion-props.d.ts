import { LayoutGroupState } from '../components/context';
import { PresenceContext } from '../components/animate-presence/presence';
import { MotionConfigState } from '../components/motion-config/types';
import { Options } from '../types';
export interface MotionContext {
    layoutGroup: LayoutGroupState;
    presenceContext: PresenceContext;
    config: MotionConfigState;
}
/**
 * Merge motion props with context values (layout group, presence, config).
 * Shared by useMotionState (component) and v-motion directive.
 */
export declare function resolveMotionProps(props: Options, context: MotionContext): Options & {
    presenceContext: PresenceContext;
};
