import fs from 'node:fs/promises';
import { addVitePlugin, logger, addTemplate, defineNuxtModule, createResolver, addPlugin, addComponent, addServerHandler, hasNuxtModule, resolvePath as resolvePath$1, updateTemplates } from '@nuxt/kit';
import { addCustomTab } from '@nuxt/devtools-kit';
import { resolvePath } from 'mlly';
import { isAbsolute, join, parse, normalize } from 'node:path';
import { glob } from 'tinyglobby';
import { convertParsedSVG, parseSVGContent } from '@iconify/utils/lib/svg/parse';
import { isPackageExists } from 'local-pkg';
import { provider } from 'std-env';
import pm from 'picomatch';

const schema = {
  $schema: {
    title: "Nuxt Icon",
    description: "Configure Nuxt Icon module preferences.",
    tags: ["@studioIcon material-symbols:star"]
  },
  size: {
    $default: void 0,
    $schema: {
      title: "Icon Size",
      description: "Set the default icon size.",
      tags: ["@studioIcon material-symbols:format-size-rounded"],
      tsType: "string | undefined"
    }
  },
  class: {
    $default: "",
    $schema: {
      title: "CSS Class",
      description: "Set the default CSS class.",
      tags: ["@studioIcon material-symbols:css"]
    }
  },
  attrs: {
    $default: {
      "aria-hidden": true
    },
    $schema: {
      title: "Default Attributes",
      description: [
        "Attributes applied to every icon component.",
        "",
        '@default { "aria-hidden": true }'
      ].join("\n"),
      tags: ["@studioIcon material-symbols:settings"],
      tsType: "Record<string, string | number | boolean>"
    }
  },
  mode: {
    $default: "css",
    $schema: {
      title: "Default Rendering Mode",
      description: "Set the default rendering mode for the icon component",
      enum: ["css", "svg"],
      tags: ["@studioIcon material-symbols:move-down-rounded"]
    }
  },
  aliases: {
    $default: {},
    $schema: {
      title: "Icon aliases",
      description: "Define Icon aliases to update them easily without code changes.",
      tags: ["@studioIcon material-symbols:star-rounded"],
      tsType: "{ [alias: string]: string }"
    }
  },
  cssSelectorPrefix: {
    $default: "i-",
    $schema: {
      title: "CSS Selector Prefix",
      description: "Set the default CSS selector prefix.",
      tags: ["@studioIcon material-symbols:format-textdirection-l-to-r"]
    }
  },
  cssLayer: {
    $default: void 0,
    $schema: {
      title: "CSS Layer Name",
      description: "Set the default CSS `@layer` name.",
      tags: ["@studioIcon material-symbols:layers"],
      tsType: "string | undefined"
    }
  },
  cssWherePseudo: {
    $default: true,
    $schema: {
      title: "Use CSS `:where()` Pseudo Selector",
      description: "Use CSS `:where()` pseudo selector to reduce specificity.",
      tags: ["@studioIcon material-symbols:low-priority"]
    }
  },
  collections: {
    $default: null,
    $schema: {
      title: "Icon Collections",
      description: [
        "List of known icon collections name. Used to resolve collection name ambiguity.",
        "e.g. `simple-icons-github` -> `simple-icons:github` instead of `simple:icons-github`",
        "",
        "When not provided, will use the full Iconify collection list."
      ].join("\n"),
      tags: ["@studioIcon material-symbols:format-list-bulleted"],
      tsType: "string[] | null"
    }
  },
  customCollections: {
    $default: null,
    $schema: {
      title: "Custom Icon Collections",
      tags: ["@studioIcon material-symbols:format-list-bulleted"],
      tsType: "string[] | null"
    }
  },
  provider: {
    $default: void 0,
    $schema: {
      title: "Icon Provider",
      description: [
        "Provider to use for fetching icons",
        "",
        "- `server` - Fetch icons with a server handler",
        "- `iconify` - Fetch icons with Iconify API, purely client-side",
        "- `none` - Do not fetch icons (use client bundle only)",
        "",
        "`server` by default; `iconify` when `ssr: false`"
      ].join("\n"),
      enum: ["server", "iconify", "none"],
      tags: ["@studioIcon material-symbols:cloud"],
      type: '"server" | "iconify" | "none" | undefined'
    }
  },
  iconifyApiEndpoint: {
    $default: "https://api.iconify.design",
    $schema: {
      title: "Iconify API Endpoint URL",
      description: "Define a custom Iconify API endpoint URL. Useful if you want to use a self-hosted Iconify API. Learn more: https://iconify.design/docs/api.",
      tags: ["@studioIcon material-symbols:api"]
    }
  },
  fallbackToApi: {
    $default: true,
    $schema: {
      title: "Fallback to Iconify API",
      description: "Fallback to Iconify API if server provider fails to found the collection.",
      tags: ["@studioIcon material-symbols:public"],
      enum: [true, false, "server-only", "client-only"],
      type: 'boolean | "server-only" | "client-only"'
    }
  },
  localApiEndpoint: {
    $default: "/api/_nuxt_icon",
    $schema: {
      title: "Local API Endpoint Path",
      description: "Define a custom path for the local API endpoint.",
      tags: ["@studioIcon material-symbols:api"]
    }
  },
  fetchTimeout: {
    $default: 1500,
    $schema: {
      title: "Fetch Timeout",
      description: "Set the timeout for fetching icons.",
      tags: ["@studioIcon material-symbols:timer"]
    }
  },
  customize: {
    $default: void 0,
    $schema: {
      title: "Customize callback",
      description: "Customize icon content (replace stroke-width, colors, etc...).",
      tags: ["@studioIcon material-symbols:edit"],
      type: "IconifyIconCustomizeCallback"
    }
  }
};

function unocssIntegration(nuxt, options) {
  let uno;
  function getKnownIconClasses() {
    const cache = uno?._cache;
    if (cache)
      return Array.from(cache.entries()).filter(([key, value]) => value && key.startsWith(options.cssSelectorPrefix || "i-")).map(([key]) => key);
    return [];
  }
  nuxt.hook("vite:configResolved", (config, { isClient }) => {
    if (!isClient)
      return;
    uno = config.plugins?.flat().find((p) => p && "name" in p && p.name === "unocss:api")?.api?.getContext?.()?.uno;
  });
  if (!nuxt.options.dev) {
    addVitePlugin(
      {
        name: "nuxt-icon:client-build-end",
        generateBundle() {
          if (uno) {
            options.serverKnownCssClasses ||= [];
            options.serverKnownCssClasses.push(...getKnownIconClasses());
          }
        }
      },
      { client: true, server: false }
    );
  }
  if (nuxt.options.dev) {
    nuxt.hook("nitro:init", async (_nitro) => {
      _nitro.options.runtimeConfig.icon ||= {};
      Object.defineProperty(_nitro.options.runtimeConfig.icon, "serverKnownCssClasses", {
        get() {
          return [
            ...options.serverKnownCssClasses || [],
            ...getKnownIconClasses()
          ];
        }
      });
    });
  }
}

const collectionNames = [
  "academicons",
  "akar-icons",
  "ant-design",
  "arcticons",
  "basil",
  "bi",
  "bitcoin-icons",
  "bpmn",
  "brandico",
  "bx",
  "bxl",
  "bxs",
  "bytesize",
  "carbon",
  "catppuccin",
  "cbi",
  "charm",
  "ci",
  "cib",
  "cif",
  "cil",
  "circle-flags",
  "circum",
  "clarity",
  "codex",
  "codicon",
  "covid",
  "cryptocurrency",
  "cryptocurrency-color",
  "cuida",
  "dashicons",
  "devicon",
  "devicon-plain",
  "dinkie-icons",
  "duo-icons",
  "ei",
  "el",
  "emojione",
  "emojione-monotone",
  "emojione-v1",
  "entypo",
  "entypo-social",
  "eos-icons",
  "ep",
  "et",
  "eva",
  "f7",
  "fa",
  "fa-brands",
  "fa-regular",
  "fa-solid",
  "fa6-brands",
  "fa6-regular",
  "fa6-solid",
  "fa7-brands",
  "fa7-regular",
  "fa7-solid",
  "fad",
  "famicons",
  "fe",
  "feather",
  "file-icons",
  "flag",
  "flagpack",
  "flat-color-icons",
  "flat-ui",
  "flowbite",
  "fluent",
  "fluent-color",
  "fluent-emoji",
  "fluent-emoji-flat",
  "fluent-emoji-high-contrast",
  "fluent-mdl2",
  "fontelico",
  "fontisto",
  "formkit",
  "foundation",
  "fxemoji",
  "gala",
  "game-icons",
  "garden",
  "geo",
  "gg",
  "gis",
  "gravity-ui",
  "gridicons",
  "grommet-icons",
  "guidance",
  "healthicons",
  "heroicons",
  "heroicons-outline",
  "heroicons-solid",
  "hugeicons",
  "humbleicons",
  "ic",
  "icomoon-free",
  "icon-park",
  "icon-park-outline",
  "icon-park-solid",
  "icon-park-twotone",
  "iconamoon",
  "iconoir",
  "icons8",
  "il",
  "ion",
  "iwwa",
  "ix",
  "jam",
  "la",
  "lets-icons",
  "line-md",
  "lineicons",
  "logos",
  "ls",
  "lsicon",
  "lucide",
  "lucide-lab",
  "mage",
  "majesticons",
  "maki",
  "map",
  "marketeq",
  "material-icon-theme",
  "material-symbols",
  "material-symbols-light",
  "mdi",
  "mdi-light",
  "medical-icon",
  "memory",
  "meteocons",
  "meteor-icons",
  "mi",
  "mingcute",
  "mono-icons",
  "mynaui",
  "nimbus",
  "nonicons",
  "noto",
  "noto-v1",
  "nrk",
  "octicon",
  "oi",
  "ooui",
  "openmoji",
  "oui",
  "pajamas",
  "pepicons",
  "pepicons-pencil",
  "pepicons-pop",
  "pepicons-print",
  "ph",
  "picon",
  "pixel",
  "pixelarticons",
  "prime",
  "proicons",
  "ps",
  "qlementine-icons",
  "quill",
  "radix-icons",
  "raphael",
  "ri",
  "rivet-icons",
  "roentgen",
  "si",
  "si-glyph",
  "sidekickicons",
  "simple-icons",
  "simple-line-icons",
  "skill-icons",
  "solar",
  "stash",
  "streamline",
  "streamline-block",
  "streamline-color",
  "streamline-cyber",
  "streamline-cyber-color",
  "streamline-emojis",
  "streamline-flex",
  "streamline-flex-color",
  "streamline-freehand",
  "streamline-freehand-color",
  "streamline-kameleon-color",
  "streamline-logos",
  "streamline-pixel",
  "streamline-plump",
  "streamline-plump-color",
  "streamline-sharp",
  "streamline-sharp-color",
  "streamline-stickies-color",
  "streamline-ultimate",
  "streamline-ultimate-color",
  "subway",
  "svg-spinners",
  "system-uicons",
  "tabler",
  "tdesign",
  "teenyicons",
  "temaki",
  "token",
  "token-branded",
  "topcoat",
  "twemoji",
  "typcn",
  "uil",
  "uim",
  "uis",
  "uit",
  "uiw",
  "unjs",
  "vaadin",
  "vs",
  "vscode-icons",
  "websymbol",
  "weui",
  "whh",
  "wi",
  "wpf",
  "zmdi",
  "zondicons"
];

function getResolvePaths(nuxt) {
  return Array.from(new Set(
    [nuxt.options.rootDir, nuxt.options.workspaceDir].filter(Boolean)
  ));
}
function hasFullCollection(nuxt) {
  return isPackageExists("@iconify/json", { paths: getResolvePaths(nuxt) });
}
async function resolveCollection(nuxt, collection) {
  if (typeof collection === "string")
    return collection;
  if ("dir" in collection) {
    return await loadCustomCollection(collection, nuxt);
  }
  return collection;
}
function getCollectionPath(collection, nuxt) {
  return hasFullCollection(nuxt) ? `@iconify/json/json/${collection}.json` : `@iconify-json/${collection}/icons.json`;
}
const validIconNameRE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
async function loadCustomCollection(collection, nuxt) {
  if ("dir" in collection) {
    return parseCustomCollection(collection, nuxt);
  }
  logger.success(`Nuxt Icon loaded local collection \`${collection.prefix}\` with ${Object.keys(collection.icons).length} icons`);
  return collection;
}
async function parseCustomCollection(collection, nuxt) {
  const dir = isAbsolute(collection.dir) ? collection.dir : join(nuxt.options.rootDir, collection.dir);
  const {
    // TODO: next major flip this
    normalizeIconName = true,
    recursive = false
  } = collection;
  const pattern = recursive ? "**/*.svg" : "*.svg";
  const files = (await glob([pattern], {
    cwd: dir,
    onlyFiles: true,
    expandDirectories: recursive
  })).sort();
  const parsedIcons = await Promise.all(files.map(async (file) => {
    const { dir: path, name: filename } = parse(file);
    const pathNormalized = path ? normalize(path).replace(/[/\\]/g, "-") : "";
    let name = pathNormalized ? `${pathNormalized}-${filename}` : filename;
    if (normalizeIconName && !validIconNameRE.test(name)) {
      const normalized = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
      if (normalized !== name)
        logger.warn(`Custom icon \`${name}\` is normalized to \`${normalized}\`, we recommend to change the file name to match the icon name, or pass \`normalizeIconName: false\` to your custom collection options`);
      name = normalized;
    }
    let svg = await fs.readFile(join(dir, file), "utf-8");
    const cleanupIdx = svg.indexOf("<svg");
    if (cleanupIdx > 0)
      svg = svg.slice(cleanupIdx);
    const data = convertParsedSVG(parseSVGContent(svg));
    if (!data) {
      logger.error(`Nuxt Icon could not parse the SVG content for icon \`${name}\``);
      return null;
    }
    if (data.top === 0)
      delete data.top;
    if (data.left === 0)
      delete data.left;
    return [name, data];
  }));
  const successfulIcons = parsedIcons.filter((entry) => entry !== null);
  logger.success(`Nuxt Icon loaded local collection \`${collection.prefix}\` with ${successfulIcons.length} icons`);
  const result = {
    ...collection,
    icons: Object.fromEntries(successfulIcons)
  };
  delete result.dir;
  return result;
}
async function discoverInstalledCollections(nuxt) {
  const paths = getResolvePaths(nuxt);
  const fullCollectionInstalled = hasFullCollection(nuxt);
  const collections = fullCollectionInstalled ? collectionNames : collectionNames.filter((collection) => isPackageExists("@iconify-json/" + collection, { paths }));
  if (fullCollectionInstalled)
    logger.success(`Nuxt Icon discovered local-installed ${collections.length} collections (@iconify/json)`);
  else if (collections.length)
    logger.success(`Nuxt Icon discovered local-installed ${collections.length} collections:`, collections.join(", "));
  if (fullCollectionInstalled)
    logger.warn("Currently all iconify collections are included in the bundle, which might be inefficient, consider explicit name the collections you use in the `icon.serverBundle.collections` option");
  return collections;
}

function registerServerBundle(ctx) {
  const { nuxt } = ctx;
  const templateServer = addTemplate({
    filename: "nuxt-icon-server-bundle.mjs",
    write: true,
    async getContents() {
      const { collections, remote } = await ctx.resolveServerBundle();
      nuxt.options.appConfig.icon ||= {};
      const appIcons = nuxt.options.appConfig.icon;
      appIcons.collections ||= [];
      for (const collection of collections) {
        const prefix = typeof collection === "string" ? collection : collection.prefix;
        if (!appIcons.collections.includes(prefix))
          appIcons.collections.push(prefix);
      }
      const isBundling = !nuxt.options.dev;
      function getRemoteEndpoint(name) {
        if (typeof remote === "function")
          return remote(name);
        switch (remote) {
          case "jsdelivr":
            return `https://cdn.jsdelivr.net/npm/@iconify-json/${name}/icons.json`;
          case "unpkg":
            return `https://unpkg.com/@iconify-json/${name}/icons.json`;
          case "github-raw":
            return `https://raw.githubusercontent.com/iconify/icon-sets/master/json/${name}.json`;
          default:
            throw new Error(`Unknown remote collection source: ${remote}`);
        }
      }
      const collectionsValues = collections.map((collection) => {
        if (typeof collection === "string") {
          if (remote) {
            return `  '${collection}': createRemoteCollection(${JSON.stringify(getRemoteEndpoint(collection))}),`;
          }
          const path = getCollectionPath(collection, nuxt);
          return isBundling ? `  '${collection}': () => import('${path}', { with: { type: 'json' } }).then(m => m.default),` : `  '${collection}': () => require('${path}'),`;
        } else {
          const { prefix } = collection;
          if ("fetchEndpoint" in collection)
            return `  '${prefix}': createRemoteCollection(${JSON.stringify(collection.fetchEndpoint)}),`;
          return `  '${prefix}': () => (${JSON.stringify(collection)}),`;
        }
      });
      const lines = [
        ...isBundling ? [] : [
          `import { createRequire } from 'node:module'`,
          `const require = createRequire(import.meta.url)`
        ],
        `function createRemoteCollection(fetchEndpoint) {`,
        "  let _cache",
        "  return async () => {",
        "    if (_cache)",
        "      return _cache",
        "    const res = await fetch(fetchEndpoint).then(r => r.json())",
        "    _cache = res",
        "    return res",
        "  }",
        "}",
        "",
        `export const collections = {`,
        ...collectionsValues,
        "}"
      ];
      return lines.join("\n");
    }
  });
  nuxt.options.nitro.alias ||= {};
  nuxt.options.nitro.alias["#nuxt-icon-server-bundle"] = templateServer.dst;
}

function registerClientBundle(ctx) {
  let cacheSize = 0;
  let cacheVersion = -1;
  let cacheData = null;
  addTemplate({
    filename: "nuxt-icon-client-bundle.mjs",
    write: true,
    async getContents() {
      const {
        sizeLimitKb = 256
      } = ctx.options.clientBundle || {};
      const { collections, count, failed } = await ctx.loadClientBundleCollections();
      if (cacheSize === count && cacheData && cacheVersion === ctx.clientBundleVersion) {
        return cacheData;
      }
      if (failed.length) {
        const msg = `Nuxt Icon could not fetch the icon data for client bundle:
${failed.map((f) => " - " + f).join("\n")}`;
        if (!ctx.nuxt.options.dev)
          throw new Error(msg);
        else
          logger.warn(msg);
      }
      if (!collections.length)
        return "export function init() {}";
      const values = [...collections.values()];
      const valuesCompat = JSON.stringify(values);
      const bundleSizeKb = Buffer.byteLength(valuesCompat, "utf-8") / 1024;
      if (sizeLimitKb > 0) {
        if (bundleSizeKb > sizeLimitKb) {
          throw new Error(`Nuxt Icon client bundle size limit exceeded: \`${bundleSizeKb.toFixed(2)}KB\` > \`${sizeLimitKb}KB\``);
        }
        if (bundleSizeKb > sizeLimitKb * 0.75) {
          logger.warn(`Nuxt Icon client bundle size is close to the limit: \`${bundleSizeKb.toFixed(2)}KB\` -> \`${sizeLimitKb}KB\``);
        }
      }
      logger.info(`Nuxt Icon client bundle consist of \`${count}\` icons with \`${bundleSizeKb.toFixed(2)}KB\`(uncompressed) in size`);
      const collectionsRaw = `JSON.parse(${JSON.stringify(valuesCompat)})`;
      cacheData = [
        "let _initialized = false",
        "export function init(addIcon) {",
        "  if (_initialized)",
        "    return",
        `  const collections = ${collectionsRaw}`,
        `  for (const collection of collections) {`,
        `    for (const [name, data] of Object.entries(collection.icons)) {`,
        `      addIcon(collection.prefix ? (collection.prefix + ':' + name) : name, data)`,
        `    }`,
        "  }",
        "  _initialized = true",
        "}"
      ].join("\n");
      cacheSize = count;
      cacheVersion = ctx.clientBundleVersion;
      return cacheData;
    }
  });
}

class IconUsageScanner {
  globInclude;
  globExclude;
  matchRegex;
  constructor(scanOptions) {
    const {
      globInclude = ["**/*.{vue,jsx,tsx,md,mdc,mdx,yml,yaml}"],
      globExclude = ["node_modules", "dist", "build", "coverage", "test", "tests", ".*"],
      ignoreCollections = [],
      additionalCollections = []
    } = scanOptions === true ? {} : scanOptions;
    const collections = /* @__PURE__ */ new Set([
      ...collectionNames,
      ...additionalCollections
    ]);
    for (const collection of ignoreCollections) {
      collections.delete(collection);
    }
    this.matchRegex = createMatchRegex(collections);
    this.globInclude = globInclude;
    this.globExclude = globExclude;
  }
  extractFromCode(code, set) {
    for (const match of code.matchAll(this.matchRegex)) {
      if (match) {
        set.add(`${match[1]}:${match[2]}`);
      }
    }
  }
  isFileMatch(path) {
    return pm.isMatch(path, this.globInclude) && !pm.isMatch(path, this.globExclude);
  }
  async scanFiles(nuxt, set = /* @__PURE__ */ new Set()) {
    const files = await glob(
      this.globInclude,
      {
        ignore: this.globExclude,
        cwd: nuxt.options.rootDir,
        absolute: true,
        expandDirectories: false
      }
    );
    await Promise.all(
      files.map(async (file) => {
        const code = await fs.readFile(file, "utf-8").catch(() => "");
        this.extractFromCode(code, set);
      })
    );
    return set;
  }
}
function createMatchRegex(collections) {
  const collectionsRegex = [...collections].sort((a, b) => b.length - a.length).join("|");
  return new RegExp("\\b(?:i-)?(" + collectionsRegex + ")[:-]([a-z0-9-]+)\\b", "g");
}

const KEYWORDS_EDGE_TARGETS = [
  "edge",
  "cloudflare",
  "worker"
];
class NuxtIconModuleContext {
  constructor(nuxt, options) {
    this.nuxt = nuxt;
    this.options = options;
  }
  clientBundleVersion = 0;
  scannedIcons = /* @__PURE__ */ new Set();
  scanner;
  getRuntimeCollections(runtimeOptions) {
    const resolved = runtimeOptions.fallbackToApi ? collectionNames : typeof this.options.serverBundle === "string" ? collectionNames : this.options.serverBundle ? this.options.serverBundle.collections?.map((c) => typeof c === "string" ? c : c.prefix) || [] : [];
    for (const collection of this.options.customCollections || []) {
      if (collection.prefix && !resolved.includes(collection.prefix))
        resolved.push(collection.prefix);
    }
    return resolved;
  }
  _customCollections;
  _serverBundle;
  _nitroPreset;
  setNitroPreset(preset) {
    this._nitroPreset = preset || this._nitroPreset;
  }
  async resolveServerBundle() {
    if (!this._serverBundle) {
      this._serverBundle = this._resolveServerBundle().then((bundle) => {
        if (this._serverBundle)
          this._serverBundle = bundle;
        return bundle;
      });
    }
    return this._serverBundle;
  }
  async _resolveServerBundle() {
    let serverBundle = this.options.serverBundle;
    if (serverBundle === "auto") {
      const preset = this._nitroPreset || (typeof this.nuxt.options.nitro.preset === "string" ? this.nuxt.options.nitro.preset || provider : provider);
      serverBundle = "local";
      if (!this.nuxt.options.dev && KEYWORDS_EDGE_TARGETS.some(
        (word) => typeof preset === "string" && preset.includes(word) || process.env.NITRO_PRESET?.includes(word) || process.env.SERVER_PRESET?.includes(word)
      ))
        serverBundle = "remote";
      logger.info(`Nuxt Icon server bundle mode is set to \`${serverBundle}\``);
    }
    const resolved = !serverBundle || this.options.provider !== "server" ? { disabled: true } : typeof serverBundle === "string" ? { remote: serverBundle === "remote" } : serverBundle;
    if (resolved.disabled) {
      return {
        disabled: true,
        remote: false,
        externalizeIconsJson: false,
        collections: []
      };
    }
    if (!resolved.collections)
      resolved.collections = resolved.remote ? collectionNames : await discoverInstalledCollections(this.nuxt);
    const collections = await Promise.all(
      (resolved.collections || []).map((c) => resolveCollection(this.nuxt, c))
    );
    return {
      disabled: false,
      remote: resolved.remote === true ? "jsdelivr" : resolved.remote || false,
      externalizeIconsJson: !!resolved.externalizeIconsJson,
      collections: [
        ...collections,
        ...await this.loadCustomCollection()
      ]
    };
  }
  async loadCustomCollection(force = false) {
    if (force) {
      this.clientBundleVersion += 1;
      this._customCollections = void 0;
    }
    if (!this._customCollections) {
      this._customCollections = this._loadCustomCollection().then((collections) => {
        if (this._customCollections)
          this._customCollections = collections;
        return collections;
      });
    }
    return this._customCollections;
  }
  async _loadCustomCollection() {
    return Promise.all(
      (this.options.customCollections || []).map((collection) => loadCustomCollection(collection, this.nuxt))
    );
  }
  async loadClientBundleCollections() {
    const {
      includeCustomCollections = this.options.provider !== "server",
      scan = false
    } = this.options.clientBundle || {};
    const userIcons = new Set((this.options.clientBundle?.icons || []).map((i) => i.replace(/^i[-:]/, "")));
    let customCollections = [];
    if (this.options.customCollections?.length) {
      customCollections = await this.loadCustomCollection();
    }
    if (scan && !this.scanner) {
      const additionalCollections = customCollections.map((c) => c.prefix);
      const scanOptions = scan === true ? { additionalCollections } : { additionalCollections, ...scan };
      this.scanner = new IconUsageScanner(scanOptions);
      await this.scanner.scanFiles(this.nuxt, this.scannedIcons);
    }
    const icons = /* @__PURE__ */ new Set([...userIcons, ...this.scannedIcons]);
    await this.nuxt.callHook("icon:clientBundleIcons", icons);
    if (!icons.size && !customCollections.length) {
      return {
        count: 0,
        collections: [],
        failed: []
      };
    }
    const iconifyCollectionMap = /* @__PURE__ */ new Map();
    const { getIconData } = await import('@iconify/utils');
    const { loadCollectionFromFS } = await import('@iconify/utils/lib/loader/fs');
    const failed = [];
    let count = 0;
    const customCollectionNames = new Set(customCollections.map((c) => c.prefix));
    const collections = /* @__PURE__ */ new Map();
    function loadCollection(prefix) {
      if (customCollectionNames.has(prefix)) {
        const collection = customCollections.find((c) => c.prefix === prefix);
        if (collection) {
          return Promise.resolve(collection);
        }
      }
      return loadCollectionFromFS(prefix);
    }
    function addIcon(prefix, name, data) {
      let collection = collections.get(prefix);
      if (!collection) {
        collection = {
          prefix,
          icons: {}
        };
        collections.set(prefix, collection);
      }
      if (!collection.icons[name]) {
        count += 1;
      }
      collection.icons[name] = data;
    }
    await Promise.all([...icons].map(async (icon) => {
      try {
        const [prefix, name] = icon.split(":");
        if (prefix === void 0 || name === void 0) {
          throw new Error(`Invalid icon ${icon}. Expected "prefix:name" format.`);
        }
        if (!iconifyCollectionMap.has(prefix))
          iconifyCollectionMap.set(prefix, loadCollection(prefix));
        let data = null;
        const collection = await iconifyCollectionMap.get(prefix);
        if (collection)
          data = getIconData(collection, name);
        if (!data) {
          if (!this.scannedIcons.has(icon) || userIcons.has(icon)) {
            failed.push(icon);
          }
        } else {
          addIcon(prefix, name, data);
        }
      } catch (e) {
        console.error(e);
        failed.push(icon);
      }
    }));
    if (includeCustomCollections && customCollections.length) {
      customCollections.flatMap((collection) => Object.keys(collection.icons).map((name) => {
        const data = getIconData(collection, name);
        if (data) {
          addIcon(collection.prefix, name, data);
        }
      }));
    }
    for (const collection of collections.values()) {
      const sortedEntries = Object.entries(collection.icons).sort(([nameA], [nameB]) => nameA.localeCompare(nameB));
      collection.icons = Object.fromEntries(sortedEntries);
    }
    return {
      collections: [...collections.values()],
      count,
      failed
    };
  }
}

const module$1 = defineNuxtModule({
  meta: {
    name: "@nuxt/icon",
    configKey: "icon",
    compatibility: {
      nuxt: ">=4.0.0"
    }
  },
  defaults: {
    // Module options
    componentName: "Icon",
    serverBundle: "auto",
    serverKnownCssClasses: [],
    clientBundle: {
      icons: []
    },
    // Runtime options
    provider: schema["provider"].$default,
    class: schema["class"].$default,
    size: schema["size"].$default,
    aliases: schema["aliases"].$default,
    iconifyApiEndpoint: schema["iconifyApiEndpoint"].$default,
    localApiEndpoint: schema["localApiEndpoint"].$default,
    fallbackToApi: schema["fallbackToApi"].$default,
    cssSelectorPrefix: schema["cssSelectorPrefix"].$default,
    cssWherePseudo: schema["cssWherePseudo"].$default,
    cssLayer: schema["cssLayer"].$default,
    mode: schema["mode"].$default,
    attrs: schema["attrs"].$default,
    collections: schema["collections"].$default,
    fetchTimeout: schema["fetchTimeout"].$default
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    if (typeof options.customize === "function") {
      throw new TypeError("`customize` callback cannot be set in module options, use `app.config.ts` or component props instead.");
    }
    if (!options.provider) {
      options.provider = !nuxt.options.ssr || nuxt.options.nitro.static || nuxt.options._generate ? "iconify" : "server";
    }
    nuxt.options.vite ||= {};
    nuxt.options.vite.resolve ||= {};
    nuxt.options.vite.resolve.dedupe ||= [];
    nuxt.options.vite.resolve.dedupe.push("@iconify/vue");
    const ctx = new NuxtIconModuleContext(nuxt, options);
    addPlugin(
      resolver.resolve("./runtime/plugin")
    );
    addComponent({
      name: options.componentName || "Icon",
      global: true,
      filePath: await resolver.resolvePath("./runtime/components/index")
    });
    addServerHandler({
      route: `${options.localApiEndpoint || "/api/_nuxt_icon"}/:collection`,
      handler: resolver.resolve("./runtime/server/api")
    });
    await setupCustomCollectionsWatcher(options, nuxt, ctx);
    const runtimeOptions = Object.fromEntries(
      Object.entries(options).filter(([key]) => key in schema)
    );
    if (!runtimeOptions.collections) {
      runtimeOptions.collections = ctx.getRuntimeCollections(runtimeOptions);
    }
    nuxt.options.appConfig.icon = Object.assign(
      nuxt.options.appConfig.icon || {},
      runtimeOptions,
      {
        customCollections: options.customCollections?.map((i) => i.prefix)
      }
    );
    nuxt.hook("schema:extend", (schemas) => {
      schemas.push({
        appConfig: {
          icon: schema
        }
      });
    });
    nuxt.hook("nitro:config", async (nitroConfig) => {
      ctx.setNitroPreset(nitroConfig.preset);
      const bundle = await ctx.resolveServerBundle();
      if (bundle.remote || !bundle.externalizeIconsJson)
        return;
      logger.warn("Nuxt Icon's `serverBundle.externalizeIconsJson` is an experimental feature, it requires that your production Node.js server is able to import JSON modules.");
      const collections = bundle.collections.filter((collection) => typeof collection === "string").map((collection) => getCollectionPath(collection, nuxt));
      const resolvedPaths = await Promise.all(
        collections.map((collection) => resolvePath(collection, {
          url: nuxt.options.rootDir
        }))
      );
      nitroConfig.externals ||= {};
      nitroConfig.externals.traceInclude ||= [];
      nitroConfig.externals.traceInclude.push(...resolvedPaths);
      nitroConfig.rollupConfig ||= {};
      nitroConfig.rollupConfig.plugins ||= [];
      nitroConfig.rollupConfig.plugins.unshift({
        name: "@nuxt/icon:rollup",
        resolveId(id) {
          if (id.match(/(?:[\\/]|^)(@iconify-json[\\/]|@iconify[\\/]json)/)) {
            return { id, external: true };
          }
        }
      });
    });
    registerServerBundle(ctx);
    registerClientBundle(ctx);
    addCustomTab({
      name: "icones",
      title: "Ic\xF4nes",
      icon: "https://icones.js.org/favicon.svg",
      view: {
        type: "iframe",
        src: "https://icones.js.org"
      }
    });
    options.serverKnownCssClasses ||= [];
    const serverKnownCssClasses = options.serverKnownCssClasses || [];
    nuxt.options.runtimeConfig.icon = {
      serverKnownCssClasses
    };
    nuxt.hook("nitro:init", async (_nitro) => {
      _nitro.options.runtimeConfig.icon = {
        serverKnownCssClasses
      };
    });
    if (hasNuxtModule("@unocss/nuxt"))
      unocssIntegration(nuxt, options);
    await nuxt.callHook("icon:serverKnownCssClasses", serverKnownCssClasses);
  }
});
async function setupCustomCollectionsWatcher(options, nuxt, ctx) {
  if (!options.customCollections?.length)
    return;
  let viteDevServer;
  const collectionDirs = await Promise.all(options.customCollections.filter((x) => "dir" in x).map((x) => resolvePath$1(x.dir)));
  if (options.clientBundle?.includeCustomCollections) {
    addVitePlugin({
      name: "nuxt-icon/client-bundle-updater",
      apply: "serve",
      configureServer(server) {
        viteDevServer = server;
      }
    });
  }
  nuxt.hook("builder:watch", async (event, path) => {
    const resolvedPath = await resolvePath$1(path);
    if (ctx.scanner) {
      ctx.scanner.extractFromCode(
        await fs.readFile(resolvedPath, "utf-8").catch(() => ""),
        ctx.scannedIcons
      );
    }
    if (collectionDirs.some((cd) => resolvedPath.startsWith(cd))) {
      await ctx.loadCustomCollection(true);
      await updateTemplates({
        filter: (template) => template.filename.startsWith("nuxt-icon-")
      });
      if (viteDevServer) {
        const nuxtIconClientBundleModule = await viteDevServer.moduleGraph.getModuleByUrl("/.nuxt/nuxt-icon-client-bundle.mjs");
        if (nuxtIconClientBundleModule) {
          viteDevServer.moduleGraph.invalidateModule(nuxtIconClientBundleModule);
          await viteDevServer.reloadModule(nuxtIconClientBundleModule);
        }
      }
    }
  });
}

export { module$1 as default };
