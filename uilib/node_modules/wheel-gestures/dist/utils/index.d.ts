export * from './projection';
export declare function lastOf<T>(array: T[]): T;
export declare function average(numbers: number[]): number;
export declare const clamp: (value: number, min: number, max: number) => number;
export declare function addVectors<T extends number[]>(v1: T, v2: T): T;
export declare function absMax(numbers: number[]): number;
export declare function deepFreeze<T extends object>(o: T): Readonly<T>;
