export declare class SubscriptionManager<T extends Function = VoidFunction> {
    private subscriptions;
    add(handler: T): VoidFunction;
    notify(...args: any[]): void;
    getSize(): number;
    clear(): void;
}
