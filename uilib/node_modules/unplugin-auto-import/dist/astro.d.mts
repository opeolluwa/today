import { l as Options } from "./types-CZdqb5KI.mjs";

//#region src/astro.d.ts
declare function export_default(options: Options): {
  name: string;
  hooks: {
    'astro:config:setup': (astro: any) => Promise<void>;
  };
};
//#endregion
export { export_default as default };