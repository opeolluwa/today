import { MotionState } from '../../state';
export interface PresenceContext {
    initial?: boolean;
    custom?: any;
    presenceId?: string;
    onMotionExitComplete?: (container: HTMLElement, state: MotionState) => void;
}
export declare const injectAnimatePresence: <T extends PresenceContext = PresenceContext>(fallback?: T) => T extends null ? PresenceContext : PresenceContext, provideAnimatePresence: (contextValue: PresenceContext) => PresenceContext, animatePresenceInjectionKey: import('vue').InjectionKey<PresenceContext>;
