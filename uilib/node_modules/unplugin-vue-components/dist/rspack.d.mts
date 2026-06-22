import { u as Options } from "./types-BbnOeCab.mjs";

//#region src/rspack.d.ts
declare const rspack: (options: Options) => RspackPluginInstance;
//#endregion
export { rspack as default, rspack as "module.exports" };