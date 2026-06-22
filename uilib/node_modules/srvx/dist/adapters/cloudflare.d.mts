import { Server, ServerOptions } from "../types.mjs";
import * as CF from "@cloudflare/workers-types";
declare const FastURL: typeof globalThis.URL;
declare const FastResponse: typeof globalThis.Response;
declare function serve(options: ServerOptions): Server<CF.ExportedHandlerFetchHandler>;
export { FastResponse, FastURL, serve };