import type { MaybeRefOrGetter, Ref, ComputedRef } from 'vue';
import type { ReferenceElement } from 'reka-ui';
export interface TourStep {
    /**
     * The element this step points to. Accepts:
     * - a CSS selector (`'#id'`, `'.class'`, or a bare id resolved as `#id`)
     * - an element or a virtual element (anything with `getBoundingClientRect`)
     * - a ref or a getter returning any of the above
     *
     * Omit or pass `null` to anchor the step to the center of the viewport
     * (useful for intro / summary steps with no target).
     */
    target?: MaybeRefOrGetter<string | ReferenceElement | null | undefined>;
    /**
     * Any other fields (title, body, side, …) are passed through untouched
     * and available via `current` — you own the rendering and copy.
     */
    [key: string]: any;
}
export interface UseTourOptions {
    /**
     * The step index the tour starts on.
     * @defaultValue 0
     */
    initialStep?: number;
    /**
     * Loop back to the first step after the last one.
     * @defaultValue false
     */
    loop?: boolean;
    /**
     * Scroll the target into view when a step becomes active.
     * @defaultValue true
     */
    scrollIntoView?: boolean | ScrollIntoViewOptions;
}
export interface UseTourReturn {
    /** Whether the tour is currently open. */
    open: Ref<boolean>;
    /** The current step index (clamped to the steps range). */
    index: Ref<number>;
    /** The current step object, or `undefined` when there are no steps. */
    current: ComputedRef<TourStep | undefined>;
    /** The resolved anchor for the current step, to pass to `<UPopover :reference>`. */
    reference: ComputedRef<ReferenceElement | undefined>;
    /** Total number of steps. */
    total: ComputedRef<number>;
    /** Whether a next step exists. */
    hasNext: ComputedRef<boolean>;
    /** Whether a previous step exists. */
    hasPrev: ComputedRef<boolean>;
    /** Open the tour, optionally at a given index. */
    start: (index?: number) => void;
    /** Go to the next step (loops or finishes at the end depending on `loop`). */
    next: () => void;
    /** Go to the previous step. */
    prev: () => void;
    /** Jump to a specific step and open the tour. */
    goTo: (index: number) => void;
    /** Close the tour. */
    finish: () => void;
}
/**
 * Drive a guided tour with a single `<UPopover>` whose anchor moves between steps.
 *
 * @example
 * ```ts
 * const tour = useTour([
 *   { target: '#cta', title: 'Get started' },
 *   { target: () => card.value, title: 'Profile', side: 'right' },
 *   { target: null, title: 'All set' } // centered, no target
 * ])
 * ```
 * ```vue
 * <UPopover :open="tour.open.value" :reference="tour.reference.value">
 *   <template #content>…your content + buttons…</template>
 * </UPopover>
 * ```
 */
export declare function useTour(steps: MaybeRefOrGetter<TourStep[]>, options?: UseTourOptions): UseTourReturn;
