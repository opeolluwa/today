import { MotionValue } from 'motion-dom';
export declare function useCombineMotionValues<T>(combineValues: () => T): {
    subscribe: (values: MotionValue[]) => void;
    unsubscribe: () => void;
    value: MotionValue<T>;
    updateValue: () => void;
};
