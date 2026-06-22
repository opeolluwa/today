import { installDependencies } from "./_chunks/libs/nypm.mjs";
import { Readable } from "node:stream";
interface GitInfo {
  provider: "github" | "gitlab" | "bitbucket" | "sourcehut";
  repo: string;
  subdir: string;
  ref: string;
}
type TarOutput = Readable | ReadableStream<Uint8Array>;
interface TemplateInfo {
  name: string;
  tar: string | ((options?: {
    auth?: string;
  }) => TarOutput | Promise<TarOutput>);
  version?: string;
  subdir?: string;
  url?: string;
  defaultDir?: string;
  headers?: Record<string, string | undefined>;
  source?: never;
  dir?: never;
  [key: string]: any;
}
type TemplateProvider = (input: string, options: {
  auth?: string;
}) => TemplateInfo | Promise<TemplateInfo> | null;
type InstallOptions = Parameters<typeof installDependencies>[0];
interface DownloadTemplateOptions {
  provider?: string;
  force?: boolean;
  forceClean?: boolean;
  offline?: boolean;
  preferOffline?: boolean;
  providers?: Record<string, TemplateProvider>;
  dir?: string;
  registry?: false | string;
  cwd?: string;
  auth?: string;
  install?: boolean | InstallOptions;
  silent?: boolean;
  /**
   * Ignore files when extracting the template.
   *
   * Can be either:
   * - An array of glob patterns of files to ignore (skip extracting), matched
   *   with [`path.matchesGlob`](https://nodejs.org/api/path.html#pathmatchesglobpath-pattern)
   *   (Node.js >= v22.5.0 or v20.17.0).
   * - A callback receiving the relative path of each entry (after `subdir` is
   *   applied) that returns `true` to skip the entry, or `false` to keep it.
   *
   * @example
   * // Ignore lockfiles via patterns
   * ignore: ["pnpm-lock.yaml", "*.lock"]
   * @example
   * // Ignore lockfiles via callback
   * ignore: (path) => /(?:^|\/)(?:pnpm-lock\.yaml|package-lock\.json|yarn\.lock)$/.test(path)
   */
  ignore?: ((path: string) => boolean) | string[];
}
type DownloadTemplateResult = Omit<TemplateInfo, "dir" | "source"> & {
  dir: string;
  source: string;
};
declare function downloadTemplate(input: string, options?: DownloadTemplateOptions): Promise<DownloadTemplateResult>;
declare const registryProvider: (registryEndpoint?: string, options?: {
  auth?: string;
}) => TemplateProvider;
declare function startShell(cwd: string): void;
export { DownloadTemplateOptions, DownloadTemplateResult, GitInfo, TarOutput, TemplateInfo, TemplateProvider, downloadTemplate, registryProvider, startShell };