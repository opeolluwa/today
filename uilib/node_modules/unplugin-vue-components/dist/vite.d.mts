import { d as PublicPluginAPI, u as Options } from "./types-BbnOeCab.mjs";
import { Plugin } from "vite";

//#region src/vite.d.ts
declare const vite: (options?: Options | undefined) => Plugin<any> & {
  api: PublicPluginAPI;
};
//#endregion
export { vite as default, vite as "module.exports" };