declare function normalizePath(p: string, cwd: string): string;
declare function readSources(files: string[]): Promise<Map<string, string>>;

export { normalizePath, readSources };
