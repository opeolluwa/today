import fsp, { readFile } from 'node:fs/promises';
import { useLogger, useNuxt, addDevServerHandler, addVitePlugin, createResolver, extendViteConfig, defineNuxtModule, addTemplate, addBuildPlugin } from '@nuxt/kit';
import { join, relative, resolve, extname } from 'pathe';
import { joinURL, withTrailingSlash, withLeadingSlash, withoutLeadingSlash } from 'ufo';
import defu$1, { defu } from 'defu';
import { transformCSS, resolveMinifyCssEsbuildOptions, normalizeFontData, generateFontFace, parseFont, defaultValues, resolveProviders, createResolver as createResolver$1, defaultOptions } from 'fontless';
import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';
import { createUnplugin } from 'unplugin';
import { writeFileSync, existsSync } from 'node:fs';
import { eventHandler, createError, setResponseHeader } from 'h3';
import { $fetch } from 'ofetch';
import { colors } from 'consola/utils';
import { onDevToolsInitialized, extendServerRpc, addCustomTab } from '@nuxt/devtools-kit';
import { toUnifontProvider } from './utils.mjs';
import { glob } from 'tinyglobby';
import { filename } from 'pathe/utils';
import { createRegExp, anyOf, not, wordBoundary } from 'magic-regexp';
import { defineFontProvider } from 'unifont';

const cacheBase = "node_modules/.cache/nuxt/fonts/meta";
const storage = createStorage({
  driver: fsDriver({ base: cacheBase })
});

const SKIP_RE = /\/node_modules\/vite-plugin-vue-inspector\//;
const FontFamilyInjectionPlugin = (options) => createUnplugin(() => {
  return {
    name: "nuxt:fonts:font-family-injection",
    transform: {
      filter: {
        id: {
          include: [IS_CSS_RE, CSS_LANG_QUERY_RE, INLINE_STYLE_ID_RE],
          exclude: [SKIP_RE]
        },
        code: {
          // Early return if no font-family is used in this CSS
          exclude: !options.processCSSVariables ? [/^(?!.*font-family\s*:).*$/s] : void 0
        }
      },
      async handler(code, id) {
        const s = await transformCSS(options, code, id);
        if (s.hasChanged()) {
          return {
            code: s.toString(),
            map: s.generateMap({ hires: true })
          };
        }
      }
    },
    vite: {
      configResolved(config) {
        if (options.dev) {
          return;
        }
        if (config.css?.lightningcss) {
          options.lightningcssOptions = config.css.lightningcss;
        } else if (config.esbuild && !options.esbuildOptions) {
          options.esbuildOptions = resolveMinifyCssEsbuildOptions(config.esbuild);
        }
      },
      renderChunk(code, chunk) {
        if (chunk.facadeModuleId) {
          for (const file of chunk.moduleIds) {
            if (options.fontsToPreload.has(file)) {
              options.fontsToPreload.set(chunk.facadeModuleId, options.fontsToPreload.get(file));
              if (chunk.facadeModuleId !== file) {
                options.fontsToPreload.delete(file);
              }
            }
          }
        }
      },
      generateBundle: {
        enforce: "post",
        async handler(_outputOptions, bundle) {
          for (const key in bundle) {
            const chunk = bundle[key];
            if (chunk?.type === "asset" && isCSS(chunk.fileName)) {
              const s = await transformCSS(options, chunk.source.toString(), key, { relative: true });
              if (s.hasChanged()) {
                chunk.source = s.toString();
              }
            }
          }
        }
      }
    }
  };
});
const IS_CSS_RE = /\.(?:css|scss|sass|postcss|pcss|less|stylus|styl)(?:\?[^.]+)?$/;
const CSS_LANG_QUERY_RE = /&lang\.css/;
const INLINE_STYLE_ID_RE = /[?&]index=\d+\.css$/;
function isCSS(id) {
  return IS_CSS_RE.test(id);
}

const logger = useLogger("@nuxt/fonts");

async function setupPublicAssetStrategy(options = {}) {
  const nuxt = useNuxt();
  const context = {
    dev: nuxt.options.dev,
    renderedFontURLs: /* @__PURE__ */ new Map(),
    assetsBaseURL: options.prefix || "/_fonts"
  };
  nuxt.hook("modules:done", () => nuxt.callHook("fonts:public-asset-context", context));
  async function devEventHandler(event) {
    const filename = event.path.slice(1);
    const url = context.renderedFontURLs.get(event.path.slice(1));
    if (!url) {
      throw createError({ statusCode: 404 });
    }
    const key = "data:fonts:" + filename;
    let res = await storage.getItemRaw(key);
    if (!res) {
      res = await $fetch(url, { responseType: "arrayBuffer" }).then((b) => Buffer.from(b));
      await storage.setItemRaw(key, res);
    }
    setResponseHeader(event, "Cache-Control", "public, max-age=31536000, immutable");
    return res;
  }
  addDevServerHandler({
    route: joinURL(nuxt.options.runtimeConfig.app.baseURL || nuxt.options.app.baseURL, context.assetsBaseURL),
    handler: eventHandler(devEventHandler)
  });
  addVitePlugin({
    name: "nuxt-fonts-public-assets",
    async configureServer(server) {
      if (server.config.appType !== "custom" || nuxt.options.buildId === "storybook") {
        server.middlewares.use(
          context.assetsBaseURL,
          async (req, res) => {
            res.end(await devEventHandler({ path: req.url }));
          }
        );
      }
    }
  }, { client: true, server: false });
  if (nuxt.options.dev) {
    nuxt.options.routeRules ||= {};
    nuxt.options.routeRules[joinURL(context.assetsBaseURL, "**")] = {
      cache: {
        maxAge: ONE_YEAR_IN_SECONDS
      }
    };
  }
  nuxt.options.nitro.publicAssets ||= [];
  const cacheDir = join(nuxt.options.buildDir, "cache", "fonts");
  if (!nuxt.options.dev) {
    await fsp.mkdir(cacheDir, { recursive: true });
    context.callback = (filename) => writeFileSync(join(cacheDir, filename), "");
  }
  nuxt.options.nitro = defu(nuxt.options.nitro, {
    publicAssets: [{
      dir: cacheDir,
      maxAge: ONE_YEAR_IN_SECONDS,
      baseURL: context.assetsBaseURL
    }],
    ignore: [`!${join(cacheDir, "**/*")}`],
    prerender: {
      ignore: [context.assetsBaseURL]
    }
  });
  nuxt.hook("nitro:init", (nitro) => {
    if (nuxt.options.dev) {
      return;
    }
    let built = false;
    nuxt.hook("vite:compiled", () => {
      built = true;
    });
    nuxt.hook("webpack:compiled", () => {
      built = true;
    });
    nitro.hooks.hook("rollup:before", async () => {
      if (!built) {
        return;
      }
      await fsp.rm(cacheDir, { recursive: true, force: true });
      await fsp.mkdir(cacheDir, { recursive: true });
      let banner = false;
      for (const [filename, url] of context.renderedFontURLs) {
        const key = "data:fonts:" + filename;
        let res = await storage.getItemRaw(key);
        if (!res) {
          if (!banner) {
            banner = true;
            logger.info("Downloading fonts...");
          }
          logger.log(colors.gray("  \u251C\u2500 " + url));
          const r = await $fetch(url, { responseType: "arrayBuffer" });
          res = Buffer.from(r);
          await storage.setItemRaw(key, res);
        }
        await fsp.writeFile(join(cacheDir, filename), res);
      }
      if (banner) {
        logger.success("Fonts downloaded and cached.");
      }
    });
  });
  return {
    normalizeFontData: normalizeFontData.bind(null, context)
  };
}
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

const DEVTOOLS_UI_PATH = "/__nuxt-devtools-fonts";
const DEVTOOLS_UI_PORT = 3300;
const DEVTOOLS_RPC_NAMESPACE = "nuxt-devtools-fonts";

function setupDevToolsUI() {
  const nuxt = useNuxt();
  const resolver = createResolver(import.meta.url);
  const clientPath = resolver.resolve("./client");
  const isProductionBuild = existsSync(clientPath);
  if (isProductionBuild) {
    nuxt.hook("vite:serverCreated", async (server) => {
      const sirv = await import('sirv').then((r) => r.default || r);
      server.middlewares.use(
        DEVTOOLS_UI_PATH,
        sirv(clientPath, { dev: true, single: true })
      );
    });
  } else {
    extendViteConfig((config) => {
      config.server = config.server || {};
      config.server.proxy = config.server.proxy || {};
      config.server.proxy[DEVTOOLS_UI_PATH] = {
        target: `http://localhost:${DEVTOOLS_UI_PORT}${DEVTOOLS_UI_PATH}`,
        changeOrigin: true,
        followRedirects: true,
        rewrite: (path) => path.replace(DEVTOOLS_UI_PATH, "")
      };
    });
  }
  addCustomTab({
    name: "fonts",
    title: "Fonts",
    icon: "carbon:text-font",
    view: {
      type: "iframe",
      src: joinURL(nuxt.options.app?.baseURL || "/", DEVTOOLS_UI_PATH)
    }
  });
}
function setupDevtoolsConnection(enabled) {
  if (!enabled) {
    return { exposeFont: () => {
    } };
  }
  setupDevToolsUI();
  let rpc;
  const fonts = [];
  onDevToolsInitialized(() => {
    rpc = extendServerRpc(DEVTOOLS_RPC_NAMESPACE, {
      getFonts: () => fonts,
      generateFontFace
    });
    rpc.broadcast.exposeFonts.asEvent(fonts);
  });
  function exposeFonts(font) {
    fonts.push(font);
    rpc?.broadcast.exposeFonts.asEvent(fonts);
  }
  return {
    exposeFont: exposeFonts
  };
}

const local = defineFontProvider("local", () => {
  const providerContext = {
    rootPaths: [],
    registry: {}
  };
  const nuxt = useNuxt();
  function registerFont(path) {
    const slugs = generateSlugs(path);
    for (const slug of slugs) {
      providerContext.registry[slug] ||= [];
      providerContext.registry[slug].push(path);
    }
  }
  function unregisterFont(path) {
    const slugs = generateSlugs(path);
    for (const slug of slugs) {
      providerContext.registry[slug] ||= [];
      providerContext.registry[slug] = providerContext.registry[slug].filter((p) => p !== path);
    }
  }
  const extensionPriority = [".woff2", ".woff", ".ttf", ".otf", ".eot"];
  function lookupFont(family, suffixes) {
    const slug = [fontFamilyToSlug(family), ...suffixes].join("-");
    const paths = providerContext.registry[slug];
    if (!paths || paths.length === 0) {
      return [];
    }
    const fonts = /* @__PURE__ */ new Set();
    for (const path of paths) {
      const base = providerContext.rootPaths.find((root) => path.startsWith(root));
      fonts.add(base ? withLeadingSlash(relative(base, path)) : path);
    }
    return [...fonts].sort((a, b) => {
      const extA = extname(a);
      const extB = extname(b);
      return extensionPriority.indexOf(extA) - extensionPriority.indexOf(extB);
    });
  }
  nuxt.hook("nitro:init", async (nitro) => {
    for (const assetsDir of nitro.options.publicAssets) {
      const possibleFontFiles = await glob(["**/*.{ttf,woff,woff2,eot,otf}"], {
        absolute: true,
        cwd: assetsDir.dir
      });
      providerContext.rootPaths.push(withTrailingSlash(assetsDir.dir));
      for (const file of possibleFontFiles) {
        registerFont(file.replace(assetsDir.dir, join(assetsDir.dir, assetsDir.baseURL || "/")));
      }
    }
    providerContext.rootPaths = providerContext.rootPaths.sort((a, b) => b.length - a.length);
  });
  nuxt.hook("builder:watch", (event, relativePath) => {
    relativePath = relative(nuxt.options.srcDir, resolve(nuxt.options.srcDir, relativePath));
    const path = resolve(nuxt.options.srcDir, relativePath);
    if (event === "add" && isFontFile(path)) {
      registerFont(path);
    }
    if (event === "unlink" && isFontFile(path)) {
      unregisterFont(path);
    }
  });
  return {
    resolveFont(fontFamily, options) {
      const fonts = [];
      for (const weight of options.weights) {
        for (const style of options.styles) {
          for (const subset of options.subsets) {
            const resolved = lookupFont(fontFamily, [weightMap[weight] || weight, style, subset]);
            if (resolved.length > 0) {
              fonts.push({
                src: resolved.map((url) => parseFont(url)),
                weight,
                style
              });
            }
          }
        }
      }
      if (fonts.length > 0) {
        return {
          fonts
        };
      }
    }
  };
});
const FONT_RE = /\.(?:ttf|woff|woff2|eot|otf)(?:\?[^.]+)?$/;
const NON_WORD_RE = /\W+/g;
const isFontFile = (id) => FONT_RE.test(id);
const weightMap = {
  100: "thin",
  200: "extra-light",
  300: "light",
  400: "normal",
  500: "medium",
  600: "semi-bold",
  700: "bold",
  800: "extra-bold",
  900: "black"
};
const weights = Object.entries(weightMap).flatMap((e) => e).filter((r) => r !== "normal");
const WEIGHT_RE = createRegExp(anyOf(.../* @__PURE__ */ new Set([...weights, ...weights.map((w) => w.replace("-", ""))])).groupedAs("weight").after(not.digit).before(not.digit.or(wordBoundary)), ["i"]);
const styles = ["italic", "oblique"];
const STYLE_RE = createRegExp(anyOf(...styles).groupedAs("style").before(not.wordChar.or(wordBoundary)), ["i"]);
const subsets = [
  "cyrillic-ext",
  "cyrillic",
  "greek-ext",
  "greek",
  "vietnamese",
  "latin-ext",
  "latin"
];
const SUBSET_RE = createRegExp(anyOf(...subsets).groupedAs("subset").before(not.wordChar.or(wordBoundary)), ["i"]);
function generateSlugs(path) {
  let name = filename(path) || path;
  const weight = name.match(WEIGHT_RE)?.groups?.weight || "normal";
  const style = name.match(STYLE_RE)?.groups?.style || "normal";
  const subset = name.match(SUBSET_RE)?.groups?.subset || "latin";
  for (const slug of [weight, style, subset]) {
    name = name.replace(slug, "");
  }
  const slugs = /* @__PURE__ */ new Set();
  for (const slug of [name.replace(/\.\w*$/, ""), name.replace(/[._-]\w*$/, "")]) {
    slugs.add([
      fontFamilyToSlug(slug.replace(/[\W_]+$/, "")),
      weightMap[weight] || weight,
      style,
      subset
    ].join("-").toLowerCase());
  }
  return [...slugs];
}
function fontFamilyToSlug(family) {
  return family.toLowerCase().replace(NON_WORD_RE, "");
}

const module$1 = defineNuxtModule({
  meta: {
    name: "@nuxt/fonts",
    configKey: "fonts"
  },
  defaults: (nuxt) => defu$1(
    {
      providers: { local },
      npm: {
        root: nuxt.options.rootDir,
        readFile: (path) => readFile(path, "utf-8")
      },
      devtools: true,
      weights: ["400 700"]
    },
    defaultOptions
  ),
  async setup(options, nuxt) {
    if (nuxt.options._prepare) return;
    if (!options.defaults?.fallbacks || !Array.isArray(options.defaults.fallbacks)) {
      const fallbacks = options.defaults.fallbacks ||= {};
      for (const _key in defaultValues.fallbacks) {
        const key = _key;
        fallbacks[key] ||= defaultValues.fallbacks[key];
      }
    }
    const _providers = resolveProviders(options.providers, { root: nuxt.options.rootDir, alias: nuxt.options.alias });
    const { normalizeFontData } = await setupPublicAssetStrategy(options.assets);
    const { exposeFont } = setupDevtoolsConnection(nuxt.options.dev && !!options.devtools);
    let resolveFontFaceWithOverride;
    let resolvePromise;
    nuxt.hook("modules:done", async () => {
      const providers = await _providers;
      await nuxt.callHook("fonts:providers", providers);
      for (const key in providers) {
        const provider = providers[key];
        if (provider && typeof provider === "object") {
          providers[key] = toUnifontProvider(key, provider);
        }
      }
      resolvePromise = createResolver$1({ options, logger, providers, storage, exposeFont, normalizeFontData });
    });
    nuxt.options.css.push("#build/nuxt-fonts-global.css");
    addTemplate({
      filename: "nuxt-fonts-global.css",
      // Seemingly necessary to allow vite to process file 🤔
      write: true,
      async getContents() {
        let css = "";
        for (const family of options.families || []) {
          if (!family.global) continue;
          resolveFontFaceWithOverride ||= await resolvePromise;
          const result = await resolveFontFaceWithOverride(family.name, family);
          for (const font of result?.fonts || []) {
            css += generateFontFace(family.name, font) + "\n";
          }
        }
        return css;
      }
    });
    const fontMap = /* @__PURE__ */ new Map();
    let viteEntry;
    nuxt.hook("vite:extend", (ctx) => {
      viteEntry = relative(ctx.config.root || nuxt.options.srcDir, ctx.entry);
    });
    nuxt.hook("build:manifest", (manifest) => {
      const unprocessedPreloads = /* @__PURE__ */ new Set([...fontMap.keys()]);
      function addPreloadLinks(chunk, urls, id) {
        chunk.assets ||= [];
        for (const url of urls) {
          if (!chunk.assets.includes(url)) {
            chunk.assets.push(url);
            if (id) {
              unprocessedPreloads.delete(id);
            }
          }
          if (!manifest[url]) {
            manifest[url] = {
              file: relative(nuxt.options.app.buildAssetsDir, url),
              resourceType: "font",
              preload: true
            };
          }
        }
      }
      let entry;
      for (const chunk of Object.values(manifest)) {
        if (chunk.isEntry && chunk.src === viteEntry) {
          entry = chunk;
        }
        if (!chunk.css || chunk.css.length === 0) continue;
        for (const css of chunk.css) {
          const assetName = withoutLeadingSlash(join(nuxt.options.app.buildAssetsDir, css));
          if (fontMap.has(assetName)) {
            addPreloadLinks(chunk, fontMap.get(assetName), assetName);
          }
        }
      }
      for (const [id, urls] of fontMap) {
        const chunk = manifest[relative(nuxt.options.srcDir, id)];
        if (!chunk) continue;
        addPreloadLinks(chunk, urls, id);
      }
      if (entry) {
        addPreloadLinks(entry, new Set([...unprocessedPreloads].flatMap((v) => [...fontMap.get(v) || []])));
      }
    });
    addBuildPlugin(FontFamilyInjectionPlugin({
      dev: nuxt.options.dev,
      fontsToPreload: fontMap,
      processCSSVariables: options.experimental?.processCSSVariables ?? options.processCSSVariables,
      shouldPreload(fontFamily, fontFace) {
        const override = options.families?.find((f) => f.name === fontFamily);
        if (override && override.preload !== void 0) {
          return override.preload;
        }
        if (options.defaults?.preload !== void 0) {
          return options.defaults.preload;
        }
        return fontFace.src.some((s) => "url" in s) && !fontFace.unicodeRange;
      },
      async resolveFontFace(fontFamily, fallbackOptions) {
        const override = options.families?.find((f) => f.name === fontFamily);
        if (override?.global) {
          return;
        }
        resolveFontFaceWithOverride ||= await resolvePromise;
        return resolveFontFaceWithOverride(fontFamily, override, fallbackOptions);
      }
    }));
  }
});

export { module$1 as default };
