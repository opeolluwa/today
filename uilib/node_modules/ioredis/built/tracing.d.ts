import type { CommandParameter } from "./types";
export declare function sanitizeArgs(commandName: string, args: CommandParameter[]): string[];
export interface CommandTraceContext {
    command: string;
    args: string[];
    database: number;
    serverAddress: string;
    serverPort: number | undefined;
}
export interface BatchOperationContext {
    batchMode: "MULTI";
    batchSize: number;
    database: number;
    serverAddress: string;
    serverPort: number | undefined;
}
export interface ConnectTraceContext {
    serverAddress: string;
    serverPort: number | undefined;
    connectionEpoch: number;
}
declare type CommandContext = CommandTraceContext;
export declare function traceCommand<T>(fn: () => Promise<T>, contextFactory: () => CommandContext): Promise<T>;
export declare function traceBatch<T>(fn: () => Promise<T>, contextFactory: () => BatchOperationContext): Promise<T>;
export declare function traceConnect<T>(fn: () => Promise<T>, contextFactory: () => ConnectTraceContext): Promise<T>;
export {};
