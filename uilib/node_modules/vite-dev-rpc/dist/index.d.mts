import * as _$birpc from "birpc";
import { BirpcOptions, EventOptions } from "birpc";
import { WebSocketServer } from "vite";
import { ViteHotContext } from "vite-hot-client";

//#region src/index.d.ts
declare function createRPCServer<ClientFunction extends object, ServerFunctions extends object>(name: string, ws: WebSocketServer, functions: ServerFunctions, options?: EventOptions<ClientFunction, ServerFunctions>): _$birpc.ProxifiedRemoteFunctions<ClientFunction> & _$birpc.BirpcGroupReturnBuiltin<ClientFunction>;
declare function createRPCClient<ServerFunctions extends object, ClientFunctions extends object>(name: string, hot: ViteHotContext | undefined | Promise<ViteHotContext | undefined>, functions?: ClientFunctions, options?: Omit<BirpcOptions<ServerFunctions, ClientFunctions>, 'on' | 'post'>): _$birpc.ProxifiedRemoteFunctions<ServerFunctions> & _$birpc.BirpcReturnBuiltin<ServerFunctions, ClientFunctions>;
//#endregion
export { createRPCClient, createRPCServer };