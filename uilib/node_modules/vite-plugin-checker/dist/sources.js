import fs from "node:fs/promises";
import path from "node:path";
function normalizePath(p, cwd) {
  let filename = p;
  if (filename) {
    filename = path.isAbsolute(filename) ? filename : path.resolve(cwd, filename);
    filename = path.normalize(filename);
  }
  return filename;
}
async function readSources(files) {
  const cache = /* @__PURE__ */ new Map();
  await Promise.all(
    files.map(async (file) => {
      try {
        const source = await fs.readFile(file, "utf8");
        cache.set(file, source);
      } catch {
      }
    })
  );
  return cache;
}
export {
  normalizePath,
  readSources
};
//# sourceMappingURL=sources.js.map