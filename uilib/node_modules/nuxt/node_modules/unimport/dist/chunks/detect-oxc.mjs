import { isPackageExists, importModule } from 'local-pkg';
import { c as createEstreeDetector } from '../shared/unimport.DHTXbUD7.mjs';
import 'estree-walker';
import '../shared/unimport.Db-T5AOH.mjs';
import 'node:path';
import 'node:process';
import 'pathe';
import 'scule';
import 'magic-string';
import 'mlly';
import 'strip-literal';

let detectorPromise;
async function loadDetector() {
  let parseSync;
  if (isPackageExists("rolldown")) {
    parseSync = (await importModule("rolldown/utils")).parseSync;
  } else if (isPackageExists("oxc-parser")) {
    parseSync = (await importModule("oxc-parser")).parseSync;
  } else {
    throw new Error(
      "[unimport] the `oxc` parser requires either `rolldown` or `oxc-parser` to be installed."
    );
  }
  return createEstreeDetector((code) => parseSync("", code, { sourceType: "module" }).program);
}
async function detectImportsOxc(code, ctx, options) {
  detectorPromise ??= loadDetector();
  const detector = await detectorPromise;
  return detector(code, ctx, options);
}

export { detectImportsOxc };
