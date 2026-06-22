import { exec } from "node:child_process";
import { stripVTControlCharacters as strip } from "node:util";
import { createFrame } from "../../codeFrame.js";
import { normalizePath, readSources } from "../../sources.js";
import { DiagnosticLevel } from "../../types.js";
const severityMap = {
  error: DiagnosticLevel.Error,
  warning: DiagnosticLevel.Warning,
  info: DiagnosticLevel.Suggestion,
  information: DiagnosticLevel.Suggestion
};
function getBiomeCommand(command, flags, files) {
  const defaultFlags = "--reporter json";
  if (flags.includes("--flags")) {
    throw Error(
      `vite-plugin-checker will force append "--reporter json" to the flags in dev mode, please don't use "--flags" in "config.biome.flags".
If you need to customize "--flags" in build mode, please use "config.biome.build.flags" instead.`
    );
  }
  return ["biome", command, flags, defaultFlags, files].filter(Boolean).join(" ");
}
function runBiome(command, cwd) {
  return new Promise((resolve, _reject) => {
    exec(
      command,
      {
        cwd,
        maxBuffer: Number.POSITIVE_INFINITY
      },
      (_error, stdout, _stderr) => {
        parseBiomeOutput(stdout, cwd).then(resolve).catch(() => resolve([]));
      }
    );
  });
}
function isModernDiagnostic(d) {
  return d.location !== void 0 && typeof d.location.path === "string";
}
function isLegacyDiagnostic(d) {
  return d.location !== void 0 && typeof d.location.path === "object" && d.location.path !== null && "file" in d.location.path;
}
function getEntries(parsed, cwd) {
  return parsed.diagnostics.flatMap((d) => {
    var _a, _b, _c;
    if (!d.location) return [];
    if (isModernDiagnostic(d)) {
      return [
        {
          file: normalizePath(d.location.path, cwd),
          message: d.message,
          category: d.category ?? "",
          severity: d.severity,
          start: d.location.start,
          end: d.location.end
        }
      ];
    }
    if (isLegacyDiagnostic(d)) {
      const file = ((_a = d.location.path) == null ? void 0 : _a.file) ?? "";
      return [
        {
          file: normalizePath(file, cwd),
          message: d.description,
          category: d.category ?? "",
          severity: d.severity,
          start: getLineAndColumn(d.location.sourceCode, (_b = d.location.span) == null ? void 0 : _b[0]),
          end: getLineAndColumn(d.location.sourceCode, (_c = d.location.span) == null ? void 0 : _c[1]),
          sourceCode: d.location.sourceCode
        }
      ];
    }
    return [];
  });
}
function getUniqueFiles(entries) {
  return Array.from(new Set(entries.map((e) => e.file)));
}
function buildDiagnostics(entries, sources) {
  return entries.flatMap((entry) => {
    const source = entry.sourceCode ?? sources.get(entry.file);
    if (!source) return [];
    const loc = {
      file: entry.file,
      start: entry.start,
      end: entry.end
    };
    const codeFrame = createFrame(source, loc);
    return [
      {
        message: `[${entry.category}] ${entry.message}`,
        level: severityMap[entry.severity] ?? DiagnosticLevel.Error,
        checker: "Biome",
        id: entry.file,
        codeFrame,
        stripedCodeFrame: codeFrame && strip(codeFrame),
        loc
      }
    ];
  });
}
function sanitizeBiomeOutput(output) {
  return output.replace(/\\(?!["\\/bfnrtu])/g, "\\\\");
}
function getLineAndColumn(text, offset) {
  if (!text || !offset) return { line: 0, column: 0 };
  let line = 1;
  let column = 1;
  for (let i = 0; i < offset; i++) {
    if (text[i] === "\n") {
      line++;
      column = 1;
    } else {
      column++;
    }
  }
  return { line, column };
}
async function parseBiomeOutput(output, cwd) {
  let parsed;
  try {
    parsed = JSON.parse(sanitizeBiomeOutput(output));
  } catch {
    return [];
  }
  const entries = getEntries(parsed, cwd);
  const filesNeedingRead = getUniqueFiles(entries.filter((e) => !e.sourceCode));
  const sourceCache = await readSources(filesNeedingRead);
  return buildDiagnostics(entries, sourceCache);
}
export {
  getBiomeCommand,
  runBiome,
  severityMap
};
//# sourceMappingURL=cli.js.map