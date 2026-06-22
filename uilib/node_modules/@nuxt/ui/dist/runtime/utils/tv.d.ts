import type { ClassValue, TVVariants, TVCompoundVariants, TVDefaultVariants, TVReturnType, defaultConfig } from 'tailwind-variants';
type TVSlots = Record<string, ClassValue> | undefined;
/**
 * Widen the slot functions of a `tailwind-variants` return type so `class` /
 * `className` also accept the `(defaults) => classes` replacer — `:ui` and the
 * `class` prop flow straight into them. The concrete slot keys (and the
 * extend-readable `slots` / `variants` / … properties) are preserved, so
 * components keep type-checking under `noUncheckedIndexedAccess`.
 */
type WideSlotFn = (slotProps?: Record<string, any>) => string;
type Widen<R> = R extends (props?: infer P) => infer Slots ? {
    (props?: P): Slots extends string ? string : {
        [K in keyof Slots]: WideSlotFn;
    };
} & Omit<R, never> : R;
/**
 * Mirrors `tailwind-variants`' `TV` call signature (so config inference is
 * unchanged) but returns the {@link Widen}-ed result. Component prop types are
 * derived from `typeof theme` via `ComponentConfig`, not from this type, so the
 * widening only affects the internal `ui.slot(...)` calls.
 */
type WideTV = {
    <V extends TVVariants<S, B, EV>, CV extends TVCompoundVariants<V, S, B, EV, ES>, DV extends TVDefaultVariants<V, S, EV, ES>, B extends ClassValue = undefined, S extends TVSlots = undefined, E extends TVReturnType = TVReturnType<V, S, B, EV extends undefined ? {} : EV, ES extends undefined ? {} : ES>, EV extends TVVariants<ES, B, E['variants'], ES> = E['variants'], ES extends TVSlots = E['slots'] extends TVSlots ? E['slots'] : undefined>(options: {
        extend?: E;
        base?: B;
        slots?: S;
        variants?: V;
        compoundVariants?: CV;
        compoundSlots?: any;
        defaultVariants?: DV;
    }, config?: typeof defaultConfig): Widen<TVReturnType<V, S, B, EV, ES, E>>;
};
/**
 * Wraps `tailwind-variants`' `tv` so slot classes can be **replaced** (not just
 * merged) through a function form — `(defaults) => classes` — in `:ui`, the
 * `class` prop and `app.config.ui`. The wrapper is transparent for every other
 * usage: it preserves the `TVReturnType` (so `extend: tv(theme)` keeps working
 * via property reads) and only intercepts the slot functions on invocation.
 */
export declare const tv: WideTV;
export {};
