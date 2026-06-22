import { u as Options } from "./types-BbnOeCab.mjs";

//#region src/rolldown.d.ts
declare const rolldown: (options: Options) => import("rolldown").Plugin<any>[] | import("rolldown").Plugin<any>;
//#endregion
export { rolldown as default, rolldown as "module.exports" };