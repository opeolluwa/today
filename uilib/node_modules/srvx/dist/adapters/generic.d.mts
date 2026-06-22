import { Server, ServerOptions } from "../types.mjs";
declare const FastURL: typeof globalThis.URL;
declare const FastResponse: typeof globalThis.Response;
declare function serve(options: ServerOptions): Server;
export { FastResponse, FastURL, serve };