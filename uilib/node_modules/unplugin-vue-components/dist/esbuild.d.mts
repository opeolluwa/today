import { u as Options } from "./types-BbnOeCab.mjs";

//#region src/esbuild.d.ts
declare const esbuild: (options: Options) => EsbuildPlugin;
//#endregion
export { esbuild as default, esbuild as "module.exports" };