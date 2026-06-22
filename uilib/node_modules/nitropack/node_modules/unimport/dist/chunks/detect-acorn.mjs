import { parse } from 'acorn';
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

const detectImportsAcorn = createEstreeDetector(
  (code) => parse(code, {
    sourceType: "module",
    ecmaVersion: "latest",
    locations: true
  })
);

export { detectImportsAcorn };
