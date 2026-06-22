export declare function defaults<T, S>(object: T, source: S): NonNullable<S & T>;
export declare function defaults<T, S1, S2>(object: T, source1: S1, source2: S2): NonNullable<S2 & S1 & T>;
export declare function defaults<T, S1, S2, S3>(object: T, source1: S1, source2: S2, source3: S3): NonNullable<S3 & S2 & S1 & T>;
export declare function defaults<T, S1, S2, S3, S4>(object: T, source1: S1, source2: S2, source3: S3, source4: S4): NonNullable<S4 & S3 & S2 & S1 & T>;
export declare function defaults<T>(object: T): NonNullable<T>;
export declare function defaults(object: any, ...sources: any[]): any;
