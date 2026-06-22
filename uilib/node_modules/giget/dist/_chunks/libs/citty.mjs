import { parseArgs as e } from "node:util";
const t = /\d/, n = [
	`-`,
	`_`,
	`/`,
	`.`
];
function r(e = ``) {
	if (!t.test(e)) return e !== e.toLowerCase();
}
function i(e, t) {
	let i = t ?? n, a = [];
	if (!e || typeof e != `string`) return a;
	let o = ``, s, c;
	for (let t of e) {
		let e = i.includes(t);
		if (e === !0) {
			a.push(o), o = ``, s = void 0;
			continue;
		}
		let n = r(t);
		if (c === !1) {
			if (s === !1 && n === !0) {
				a.push(o), o = t, s = n;
				continue;
			}
			if (s === !0 && n === !1 && o.length > 1) {
				let e = o.at(-1);
				a.push(o.slice(0, Math.max(0, o.length - 1))), o = e + t, s = n;
				continue;
			}
		}
		o += t, s = n, c = e;
	}
	return a.push(o), a;
}
function a(e) {
	return e ? e[0].toUpperCase() + e.slice(1) : ``;
}
function o(e) {
	return e ? e[0].toLowerCase() + e.slice(1) : ``;
}
function s(e, t) {
	return e ? (Array.isArray(e) ? e : i(e)).map((e) => a(t?.normalize ? e.toLowerCase() : e)).join(``) : ``;
}
function c(e, t) {
	return o(s(e || ``, t));
}
function l(e, t) {
	return e ? (Array.isArray(e) ? e : i(e)).map((e) => e.toLowerCase()).join(t ?? `-`) : ``;
}
function u(e) {
	return l(e || ``, `_`);
}
function d(e) {
	return Array.isArray(e) ? e : e === void 0 ? [] : [e];
}
function f(e, t = ``) {
	let n = [];
	for (let t of e) for (let [e, r] of t.entries()) n[e] = Math.max(n[e] || 0, r.length);
	return e.map((e) => e.map((e, r) => t + e[r === 0 ? `padStart` : `padEnd`](n[r])).join(`  `)).join(`
`);
}
function p(e) {
	return typeof e == `function` ? e() : e;
}
var m = class extends Error {
	code;
	constructor(e, t) {
		super(e), this.name = `CLIError`, this.code = t;
	}
};
function h(t = [], n = {}) {
	let r = new Set(n.boolean || []), i = new Set(n.string || []), a = n.alias || {}, o = n.default || {}, s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
	for (let [e, t] of Object.entries(a)) {
		let n = t;
		for (let t of n) s.set(e, t), c.has(t) || c.set(t, []), c.get(t).push(e), s.set(t, e), c.has(e) || c.set(e, []), c.get(e).push(t);
	}
	let l = {};
	function u(e) {
		if (r.has(e)) return `boolean`;
		let t = c.get(e) || [];
		for (let e of t) if (r.has(e)) return `boolean`;
		return `string`;
	}
	function d(e) {
		if (i.has(e)) return !0;
		let t = c.get(e) || [];
		for (let e of t) if (i.has(e)) return !0;
		return !1;
	}
	let f = new Set([
		...r,
		...i,
		...Object.keys(a),
		...Object.values(a).flat(),
		...Object.keys(o)
	]);
	for (let e of f) l[e] || (l[e] = {
		type: u(e),
		default: o[e]
	});
	for (let [e, t] of s.entries()) e.length === 1 && l[t] && !l[t].short && (l[t].short = e);
	let p = [], m = {};
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (n === `--`) {
			p.push(...t.slice(e));
			break;
		}
		if (n.startsWith(`--no-`)) {
			let e = n.slice(5);
			m[e] = !0;
			continue;
		}
		p.push(n);
	}
	let h;
	try {
		h = e({
			args: p,
			options: Object.keys(l).length > 0 ? l : void 0,
			allowPositionals: !0,
			strict: !1
		});
	} catch {
		h = {
			values: {},
			positionals: p
		};
	}
	let g = { _: [] };
	g._ = h.positionals;
	for (let [e, t] of Object.entries(h.values)) {
		let n = t;
		u(e) === `boolean` && typeof t == `string` ? n = t !== `false` : d(e) && typeof t == `boolean` && (n = ``), g[e] = n;
	}
	for (let [e] of Object.entries(m)) {
		g[e] = !1;
		let t = s.get(e);
		t && (g[t] = !1);
		let n = c.get(e);
		if (n) for (let e of n) g[e] = !1;
	}
	for (let [e, t] of s.entries()) g[e] !== void 0 && g[t] === void 0 && (g[t] = g[e]), g[t] !== void 0 && g[e] === void 0 && (g[e] = g[t]), g[e] !== g[t] && o[t] === g[t] && (g[t] = g[e]);
	return g;
}
const g = (() => {
	let e = globalThis.process?.env ?? {};
	return e.NO_COLOR === `1` || e.TERM === `dumb` || e.TEST || e.CI;
})(), _ = (e, t = 39) => (n) => g ? n : `\u001B[${e}m${n}\u001B[${t}m`, v = _(1, 22), y = _(36), b = _(90), x = _(4, 24);
function S(e, t) {
	let n = {
		boolean: [],
		string: [],
		alias: {},
		default: {}
	}, r = C(t);
	for (let e of r) {
		if (e.type === `positional`) continue;
		e.type === `string` || e.type === `enum` ? n.string.push(e.name) : e.type === `boolean` && n.boolean.push(e.name), e.default !== void 0 && (n.default[e.name] = e.default), e.alias && (n.alias[e.name] = e.alias);
		let t = c(e.name), r = l(e.name);
		if (t !== e.name || r !== e.name) {
			let i = d(n.alias[e.name] || []);
			t !== e.name && !i.includes(t) && i.push(t), r !== e.name && !i.includes(r) && i.push(r), i.length > 0 && (n.alias[e.name] = i);
		}
	}
	let i = h(e, n), [ ...a] = i._, o = new Proxy(i, { get(e, t) {
		return e[t] ?? e[c(t)] ?? e[l(t)];
	} });
	for (let [, e] of r.entries()) if (e.type === `positional`) {
		let t = a.shift();
		if (t !== void 0) o[e.name] = t;
		else if (e.default === void 0 && e.required !== !1) throw new m(`Missing required positional argument: ${e.name.toUpperCase()}`, `EARG`);
		else o[e.name] = e.default;
	} else if (e.type === `enum`) {
		let t = o[e.name], n = e.options || [];
		if (t !== void 0 && n.length > 0 && !n.includes(t)) throw new m(`Invalid value for argument: ${y(`--${e.name}`)} (${y(t)}). Expected one of: ${n.map((e) => y(e)).join(`, `)}.`, `EARG`);
	} else if (e.required && o[e.name] === void 0) throw new m(`Missing required argument: --${e.name}`, `EARG`);
	return o;
}
function C(e) {
	let t = [];
	for (let [n, r] of Object.entries(e || {})) t.push({
		...r,
		name: n,
		alias: d(r.alias)
	});
	return t;
}
async function w(e) {
	return Promise.all(e.map((e) => p(e)));
}
function T(e) {
	return e;
}
async function E(e, t) {
	let n = await p(e.args || {}), r = S(t.rawArgs, n), i = {
		rawArgs: t.rawArgs,
		args: r,
		data: t.data,
		cmd: e
	}, a = await w(e.plugins ?? []), o, s;
	try {
		for (let e of a) await e.setup?.(i);
		typeof e.setup == `function` && await e.setup(i);
		let r = await p(e.subCommands);
		if (r && Object.keys(r).length > 0) {
			let i = k(t.rawArgs, n), a = t.rawArgs[i];
			if (a) {
				let e = await O(r, a);
				if (!e) throw new m(`Unknown command ${y(a)}`, `E_UNKNOWN_COMMAND`);
				await E(e, { rawArgs: t.rawArgs.slice(i + 1) });
			} else {
				let n = await p(e.default);
				if (n) {
					if (e.run) throw new m(`Cannot specify both 'run' and 'default' on the same command.`, `E_DEFAULT_CONFLICT`);
					let i = await O(r, n);
					if (!i) throw new m(`Default sub command ${y(n)} not found in subCommands.`, `E_UNKNOWN_COMMAND`);
					await E(i, { rawArgs: t.rawArgs });
				} else if (!e.run) throw new m(`No command specified.`, `E_NO_COMMAND`);
			}
		}
		typeof e.run == `function` && (o = await e.run(i));
	} catch (e) {
		s = e;
	}
	let c = [];
	if (typeof e.cleanup == `function`) try {
		await e.cleanup(i);
	} catch (e) {
		c.push(e);
	}
	for (let e of [...a].reverse()) try {
		await e.cleanup?.(i);
	} catch (e) {
		c.push(e);
	}
	if (s) throw s;
	if (c.length === 1) throw c[0];
	if (c.length > 1) throw Error(`Multiple cleanup errors`, { cause: c });
	return { result: o };
}
async function D(e, t, n) {
	let r = await p(e.subCommands);
	if (r && Object.keys(r).length > 0) {
		let n = k(t, await p(e.args || {})), i = t[n], a = await O(r, i);
		if (a) return D(a, t.slice(n + 1), e);
	}
	return [e, n];
}
async function O(e, t) {
	if (t in e) return p(e[t]);
	for (let n of Object.values(e)) {
		let e = await p(n), r = await p(e?.meta);
		if (r?.alias && d(r.alias).includes(t)) return e;
	}
}
function k(e, t) {
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === `--`) return -1;
		if (r.startsWith(`-`)) {
			!r.includes(`=`) && A(r, t) && n++;
			continue;
		}
		return n;
	}
	return -1;
}
function A(e, t) {
	let n = e.replace(/^-{1,2}/, ``), r = c(n);
	for (let [e, i] of Object.entries(t)) if (!(i.type !== `string` && i.type !== `enum`) && (r === c(e) || (Array.isArray(i.alias) ? i.alias : i.alias ? [i.alias] : []).includes(n))) return !0;
	return !1;
}
async function j(e, t) {
	try {
		console.log(await N(e, t) + `
`);
	} catch (e) {
		console.error(e);
	}
}
const M = /^no[-A-Z]/;
async function N(e, t) {
	let n = await p(e.meta || {}), r = C(await p(e.args || {})), i = await p(t?.meta || {}), a = `${i.name ? `${i.name} ` : ``}` + (n.name || process.argv[1]), o = [], s = [], c = [], l = [];
	for (let e of r) if (e.type === `positional`) {
		let t = e.name.toUpperCase(), n = e.required !== !1 && e.default === void 0;
		s.push([y(t + P(e)), F(e, n)]), l.push(n ? `<${t}>` : `[${t}]`);
	} else {
		let t = e.required === !0 && e.default === void 0, n = [...(e.alias || []).map((e) => `-${e}`), `--${e.name}`].join(`, `) + P(e);
		if (o.push([y(n), F(e, t)]), e.type === `boolean` && (e.default === !0 || e.negativeDescription) && !M.test(e.name)) {
			let n = [...(e.alias || []).map((e) => `--no-${e}`), `--no-${e.name}`].join(`, `);
			o.push([y(n), [e.negativeDescription, t ? b(`(Required)`) : ``].filter(Boolean).join(` `)]);
		}
		t && l.push(`--${e.name}` + P(e));
	}
	if (e.subCommands) {
		let t = [], n = await p(e.subCommands);
		for (let [e, r] of Object.entries(n)) {
			let n = await p((await p(r))?.meta);
			if (n?.hidden) continue;
			let i = d(n?.alias), a = [e, ...i].join(`, `);
			c.push([y(a), n?.description || ``]), t.push(e, ...i);
		}
		l.push(t.join(`|`));
	}
	let u = [], m = n.version || i.version;
	u.push(b(`${n.description} (${a + (m ? ` v${m}` : ``)})`), ``);
	let h = o.length > 0 || s.length > 0;
	return u.push(`${x(v(`USAGE`))} ${y(`${a}${h ? ` [OPTIONS]` : ``} ${l.join(` `)}`)}`, ``), s.length > 0 && (u.push(x(v(`ARGUMENTS`)), ``), u.push(f(s, `  `)), u.push(``)), o.length > 0 && (u.push(x(v(`OPTIONS`)), ``), u.push(f(o, `  `)), u.push(``)), c.length > 0 && (u.push(x(v(`COMMANDS`)), ``), u.push(f(c, `  `)), u.push(``, `Use ${y(`${a} <command> --help`)} for more information about a command.`)), u.filter((e) => typeof e == `string`).join(`
`);
}
function P(e) {
	let t = e.valueHint ? `=<${e.valueHint}>` : ``, n = t || `=<${u(e.name)}>`;
	return !e.type || e.type === `positional` || e.type === `boolean` ? t : e.type === `enum` && e.options?.length ? `=<${e.options.join(`|`)}>` : n;
}
function F(e, t) {
	let n = t ? b(`(Required)`) : ``, r = e.default === void 0 ? `` : b(`(Default: ${e.default})`);
	return [
		e.description,
		n,
		r
	].filter(Boolean).join(` `);
}
async function I(e, t = {}) {
	let n = t.rawArgs || process.argv.slice(2), r = t.showUsage || j;
	try {
		let t = await L(e);
		if (t.help.length > 0 && n.some((e) => t.help.includes(e))) await r(...await D(e, n)), process.exit(0);
		else if (n.length === 1 && t.version.includes(n[0])) {
			let t = typeof e.meta == `function` ? await e.meta() : await e.meta;
			if (!t?.version) throw new m(`No version specified`, `E_NO_VERSION`);
			console.log(t.version);
		} else await E(e, { rawArgs: n });
	} catch (t) {
		t instanceof m ? (await r(...await D(e, n)), console.error(t.message)) : console.error(t, `
`), process.exit(1);
	}
}
async function L(e) {
	let t = await p(e.args || {}), n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
	for (let [e, i] of Object.entries(t)) {
		n.add(e);
		for (let e of d(i.alias)) r.add(e);
	}
	return {
		help: R(`help`, `h`, n, r),
		version: R(`version`, `v`, n, r)
	};
}
function R(e, t, n, r) {
	return n.has(e) || r.has(e) ? [] : n.has(t) || r.has(t) ? [`--${e}`] : [`--${e}`, `-${t}`];
}
export { T as defineCommand, I as runMain };
