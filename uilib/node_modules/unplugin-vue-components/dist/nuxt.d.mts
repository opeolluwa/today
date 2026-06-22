import { u as Options } from "./types-BbnOeCab.mjs";
import { NuxtModule } from "@nuxt/schema";

//#region src/nuxt.d.ts
declare const module: NuxtModule<Options, Options, false>;
//#endregion
export { module as default };