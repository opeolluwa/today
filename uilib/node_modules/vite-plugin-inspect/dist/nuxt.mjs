import { defineNuxtModule, addVitePlugin } from '@nuxt/kit';
import { P as PluginInspect } from './shared/vite-plugin-inspect.Fv_Ybe1U.mjs';
import 'node:process';
import 'ansis';
import 'perfect-debounce';
import 'sirv';
import 'vite-dev-rpc';
import './dirs.mjs';
import 'node:path';
import 'node:url';
import 'node:fs/promises';
import 'ohash';
import 'node:buffer';
import 'unplugin-utils';
import 'error-stack-parser-es';
import 'obug';
import 'node:http';

const nuxt = defineNuxtModule({
  meta: {
    name: "vite-plugin-inspect",
    configKey: "inspect"
  },
  setup(options) {
    addVitePlugin(() => PluginInspect(options));
  }
});

export { nuxt as default };
