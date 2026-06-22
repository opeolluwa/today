import { MotionProps } from './types';
import { createVisualElement } from '../../state/create-visual-element';
import { MotionState } from '../../state';
export declare function useMotionState(props: MotionProps, renderer?: typeof createVisualElement): {
    getProps: () => import('../..').Options<any> & {
        presenceContext: import('../animate-presence/presence').PresenceContext;
    };
    getAttrs: () => {
        [x: string]: unknown;
    };
    layoutGroup: import('../context').LayoutGroupState;
    state: MotionState;
};
