function quietFixPredicate(message) {
  return message.severity === 2;
}
function translateOptionsLegacy({
  cache,
  cacheFile,
  cacheLocation,
  cacheStrategy,
  config,
  env,
  errorOnUnmatchedPattern,
  eslintrc,
  ext,
  fix,
  fixDryRun,
  fixType,
  global,
  ignore,
  ignorePath,
  ignorePattern,
  inlineConfig,
  parser,
  parserOptions,
  plugin,
  quiet,
  reportUnusedDisableDirectives,
  resolvePluginsRelativeTo,
  rule,
  rulesdir
}) {
  return {
    allowInlineConfig: inlineConfig,
    cache,
    cacheLocation: cacheLocation || cacheFile,
    cacheStrategy,
    errorOnUnmatchedPattern,
    extensions: ext,
    fix: (fix || fixDryRun) && (quiet ? quietFixPredicate : true),
    fixTypes: fixType,
    ignore,
    ignorePath,
    overrideConfig: {
      env: (
        // @ts-expect-error
        env == null ? void 0 : env.reduce((obj, name) => {
          obj[name] = true;
          return obj;
        }, {})
      ),
      // @ts-expect-error
      globals: global == null ? void 0 : global.reduce((obj, name) => {
        if (name.endsWith(":true")) {
          obj[name.slice(0, -5)] = "writable";
        } else {
          obj[name] = "readonly";
        }
        return obj;
      }, {}),
      ignorePatterns: ignorePattern,
      parser,
      parserOptions,
      plugins: plugin,
      rules: rule
    },
    overrideConfigFile: config,
    reportUnusedDisableDirectives: reportUnusedDisableDirectives ? "error" : void 0,
    resolvePluginsRelativeTo,
    rulePaths: rulesdir,
    useEslintrc: eslintrc
  };
}
function translateOptionsFlatConfig({
  cache,
  cacheFile,
  cacheLocation,
  cacheStrategy,
  config,
  errorOnUnmatchedPattern,
  fix,
  fixDryRun,
  fixType,
  global,
  ignore,
  ignorePattern,
  inlineConfig,
  parser,
  parserOptions,
  plugin,
  quiet,
  rule
}) {
  const languageOptions = {
    globals: (global == null ? void 0 : global.reduce((obj, name) => {
      if (name.endsWith(":true")) {
        obj[name.slice(0, -5)] = "writable";
      } else {
        obj[name] = "readonly";
      }
      return obj;
    }, {})) || {}
  };
  if (parser) languageOptions.parser = parser;
  if (parserOptions) languageOptions.parserOptions = parserOptions;
  const overrideConfig = {
    languageOptions,
    ignores: ignorePattern || [],
    rules: rule || {}
  };
  if (plugin) overrideConfig.plugins = plugin;
  return {
    allowInlineConfig: inlineConfig,
    cache,
    cacheLocation: cacheLocation || cacheFile,
    cacheStrategy,
    errorOnUnmatchedPattern,
    fix: (fix || fixDryRun) && (quiet ? quietFixPredicate : true),
    fixTypes: fixType,
    ignore,
    overrideConfig,
    overrideConfigFile: config
  };
}
function translateOptions(options, useFlatConfig = true) {
  if (useFlatConfig) {
    return translateOptionsFlatConfig(options);
  }
  return translateOptionsLegacy(options);
}
export {
  translateOptions
};
//# sourceMappingURL=cli.js.map