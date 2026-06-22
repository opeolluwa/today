import { MotionStateContext, Options } from '../types';
import { DOMKeyframesDefinition, VisualElement, VisualElementOptions } from 'motion-dom';
import { Feature, StateType } from '../features';
import { PresenceContext } from '../components/animate-presence/presence';
export declare const mountedStates: WeakMap<Element, MotionState>;
/**
 * Core class that manages animation state and orchestrates animations.
 * Handles component lifecycle methods in the correct order based on component tree position.
 */
export declare class MotionState {
    type: 'html' | 'svg';
    element: HTMLElement | SVGElement | null;
    parent?: MotionState;
    isExiting: boolean;
    presenceContainer: HTMLElement | null;
    options: Options & {
        presenceContext?: PresenceContext;
        features?: Array<typeof Feature>;
    };
    private children?;
    latestValues: DOMKeyframesDefinition;
    private features;
    visualElement: VisualElement<Element>;
    constructor(options: Options, parent?: MotionState);
    private _context;
    get context(): MotionStateContext;
    /**
     * Initialize features from options and global lazy features
     * Features are stored by key to avoid duplicate instantiation
     */
    updateFeatures(): void;
    updateOptions(options: Options): void;
    mount(element: HTMLElement | SVGElement): void;
    beforeUnmount(): void;
    unmount(): void;
    beforeUpdate(): void;
    update(): void;
    tryExitComplete(): void;
    setActive(name: StateType, isActive: boolean): void;
    isMounted(): boolean;
    /**
     * Create and attach a visual element using the given renderer.
     * Shared by both the Motion component and v-motion directive.
     */
    initVisualElement(renderer: (tag: string, options: VisualElementOptions<any, any>) => VisualElement<Element>): void;
    getSnapshot(options: Options, isPresent?: boolean): void;
    didUpdate(): void;
}
