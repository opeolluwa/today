import { ServerMiddleware } from "./types.mjs";
interface LogOptions {}
declare const log: (options?: LogOptions) => ServerMiddleware;
export { LogOptions, log };