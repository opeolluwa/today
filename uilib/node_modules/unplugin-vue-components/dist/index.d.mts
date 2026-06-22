import { a as ComponentResolverObject, c as ImportInfoLegacy, d as PublicPluginAPI, f as ResolvedOptions, h as TypeImport, i as ComponentResolverFunction, l as Matcher, m as Transformer, n as ComponentResolveResult, o as ComponentsImportMap, p as SideEffectsInfo, r as ComponentResolver, s as ImportInfo, t as ComponentInfo, u as Options } from "./types-BbnOeCab.mjs";
import { FilterPattern } from "unplugin-utils";
//#region src/core/unplugin.d.ts
declare const _default: import("unplugin").UnpluginInstance<Options, boolean>;
//#endregion
//#region src/core/utils.d.ts
declare function pascalCase(str: string): string;
declare function camelCase(str: string): string;
declare function kebabCase(key: string): string;
//#endregion
export { ComponentInfo, ComponentResolveResult, ComponentResolver, ComponentResolverFunction, ComponentResolverObject, ComponentsImportMap, ImportInfo, ImportInfoLegacy, Matcher, Options, PublicPluginAPI, ResolvedOptions, SideEffectsInfo, Transformer, TypeImport, camelCase, _default as default, kebabCase, pascalCase };