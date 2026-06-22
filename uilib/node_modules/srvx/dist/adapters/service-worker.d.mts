import { Server, ServerOptions, ServerRequest } from "../types.mjs";
declare const FastURL: typeof globalThis.URL;
declare const FastResponse: typeof globalThis.Response;
type ServiceWorkerHandler = (request: ServerRequest, event: FetchEvent) => Response | Promise<Response>;
declare function serve(options: ServerOptions): Server<ServiceWorkerHandler>;
export { FastResponse, FastURL, ServiceWorkerHandler, serve };