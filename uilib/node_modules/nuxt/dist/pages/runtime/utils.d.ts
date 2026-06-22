import type { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';
type InstanceOf<T> = T extends new (...args: any[]) => infer R ? R : never;
type RouterViewSlot = Exclude<InstanceOf<typeof RouterView>['$slots']['default'], undefined>;
export type RouterViewSlotProps = Parameters<RouterViewSlot>[0];
type SerializablePrimitive = string | number | boolean | null | undefined;
export type MaybeArray<T> = T | T[];
/** JSON-serializable value (non-recursive definition to avoid excessive type depth) */
export type SerializableValue = MaybeArray<SerializablePrimitive | Record<string, SerializablePrimitive>>;
/** Constrains T to only contain serializable properties. Non-serializable properties become `never`. */
export type MakeSerializableObject<T> = T extends Function | symbol ? never : {
    [K in keyof T]: T[K] extends SerializableValue ? T[K] : never;
};
export declare const generateRouteKey: (routeProps: RouterViewSlotProps, override?: string | ((route: RouteLocationNormalizedLoaded) => string)) => string | false | undefined;
export declare const wrapInKeepAlive: (props: any, children: any) => {
    default: () => any;
};
/** @since 3.9.0 */
export declare function toArray<T>(value: T | T[]): T[];
export {};
