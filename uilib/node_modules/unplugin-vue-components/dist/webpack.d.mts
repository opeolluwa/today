import { u as Options } from "./types-BbnOeCab.mjs";

//#region src/webpack.d.ts
declare const webpack: (options: Options) => import("webpack").WebpackPluginInstance;
//#endregion
export { webpack as default, webpack as "module.exports" };