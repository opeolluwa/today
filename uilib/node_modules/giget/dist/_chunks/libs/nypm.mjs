import { __exportAll as e } from "../rolldown-runtime.mjs";
import { closeSync as t, existsSync as n, openSync as r, readSync as i, statSync as a } from "node:fs";
import { readFile as o } from "node:fs/promises";
import { PassThrough as s } from "node:stream";
import { pipeline as c } from "node:stream/promises";
import { spawn as ee } from "node:child_process";
import { basename as l, delimiter as u, dirname as d, normalize as f, resolve as p } from "node:path";
import { cwd as m } from "node:process";
import te from "node:readline";
const h = /^[A-Za-z]:\//;
function g(e = ``) {
	return e && e.replace(/\\/g, `/`).replace(h, (e) => e.toUpperCase());
}
const ne = /^[/\\]{2}/, _ = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/, v = /^[A-Za-z]:$/, y = /^\/([A-Za-z]:)?$/, b = function(e) {
	if (e.length === 0) return `.`;
	e = g(e);
	let t = e.match(ne), n = T(e), r = e[e.length - 1] === `/`;
	return e = w(e, !n), e.length === 0 ? n ? `/` : r ? `./` : `.` : (r && (e += `/`), v.test(e) && (e += `/`), t ? n ? `//${e}` : `//./${e}` : n && !T(e) ? `/${e}` : e);
}, x = function(...e) {
	let t = ``;
	for (let n of e) if (n) if (t.length > 0) {
		let e = t[t.length - 1] === `/`, r = n[0] === `/`;
		e && r ? t += n.slice(1) : t += e || r ? n : `/${n}`;
	} else t += n;
	return b(t);
};
function S() {
	return typeof process < `u` && typeof process.cwd == `function` ? process.cwd().replace(/\\/g, `/`) : `/`;
}
const C = function(...e) {
	e = e.map((e) => g(e));
	let t = ``, n = !1;
	for (let r = e.length - 1; r >= -1 && !n; r--) {
		let i = r >= 0 ? e[r] : S();
		!i || i.length === 0 || (t = `${i}/${t}`, n = T(i));
	}
	return t = w(t, !n), n && !T(t) ? `/${t}` : t.length > 0 ? t : `.`;
};
function w(e, t) {
	let n = ``, r = 0, i = -1, a = 0, o = null;
	for (let s = 0; s <= e.length; ++s) {
		if (s < e.length) o = e[s];
		else if (o === `/`) break;
		else o = `/`;
		if (o === `/`) {
			if (!(i === s - 1 || a === 1)) if (a === 2) {
				if (n.length < 2 || r !== 2 || n[n.length - 1] !== `.` || n[n.length - 2] !== `.`) {
					if (n.length > 2) {
						let e = n.lastIndexOf(`/`);
						e === -1 ? (n = ``, r = 0) : (n = n.slice(0, e), r = n.length - 1 - n.lastIndexOf(`/`)), i = s, a = 0;
						continue;
					} else if (n.length > 0) {
						n = ``, r = 0, i = s, a = 0;
						continue;
					}
				}
				t && (n += n.length > 0 ? `/..` : `..`, r = 2);
			} else n.length > 0 ? n += `/${e.slice(i + 1, s)}` : n = e.slice(i + 1, s), r = s - i - 1;
			i = s, a = 0;
		} else o === `.` && a !== -1 ? ++a : a = -1;
	}
	return n;
}
const T = function(e) {
	return _.test(e);
}, re = function(e, t) {
	let n = C(e).replace(y, `$1`).split(`/`), r = C(t).replace(y, `$1`).split(`/`);
	if (r[0][1] === `:` && n[0][1] === `:` && n[0] !== r[0]) return r.join(`/`);
	let i = [...n];
	for (let e of i) {
		if (r[0] !== e) break;
		n.shift(), r.shift();
	}
	return [...n.map(() => `..`), ...r].join(`/`);
}, E = function(e) {
	let t = g(e).replace(/\/$/, ``).split(`/`).slice(0, -1);
	return t.length === 1 && v.test(t[0]) && (t[0] += `/`), t.join(`/`) || (T(e) ? `/` : `.`);
}, D = function(e, t) {
	let n = g(e).split(`/`), r = ``;
	for (let e = n.length - 1; e >= 0; e--) {
		let t = n[e];
		if (t) {
			r = t;
			break;
		}
	}
	return t && r.endsWith(t) ? r.slice(0, -t.length) : r;
}, O = /^path$/i, k = {
	key: `PATH`,
	value: ``
};
function A(e) {
	for (let t in e) {
		if (!Object.prototype.hasOwnProperty.call(e, t) || !O.test(t)) continue;
		let n = e[t];
		return n ? {
			key: t,
			value: n
		} : k;
	}
	return k;
}
function j(e, t) {
	let n = t.value.split(u), r = [], i = e, a;
	do
		r.push(p(i, `node_modules`, `.bin`)), a = i, i = d(i);
	while (i !== a);
	r.push(d(process.execPath));
	let o = r.concat(n).join(u);
	return {
		key: t.key,
		value: o
	};
}
function M(e, t, n = !0) {
	let r = {
		...process.env,
		...t
	};
	if (!n) return r;
	let i = j(e, A(r));
	return r[i.key] = i.value, r;
}
const N = (e) => {
	let t = e.length, n = new s(), r = () => {
		--t === 0 && n.end();
	};
	for (let t of e) c(t, n, { end: !1 }).then(r).catch(r);
	return n;
}, P = /([()\][%!^"`<>&|;, *?])/g, F = /^#!\s*(.+)/, I = /\.(?:com|exe)$/i, L = /node_modules[\\/]\.bin[\\/][^\\/]+\.cmd$/i, R = process.platform === `win32`, z = [
	`.EXE`,
	`.CMD`,
	`.BAT`,
	`.COM`
];
function B(e, n = [], a = {}) {
	if (a.shell === !0 || !R) return {
		command: e,
		args: n,
		options: a
	};
	let o = V(e, a), s = null;
	if (o !== null) {
		let e = Buffer.alloc(150), n = null;
		try {
			n = r(o, `r`), i(n, e, 0, 150, 0);
		} catch {} finally {
			n !== null && t(n);
		}
		let a = e.toString().match(F);
		if (a !== null) {
			let e = a[1].trim(), t = e.indexOf(` `), n = t === -1 ? e : e.slice(0, t), r = t === -1 ? `` : e.slice(t + 1), i = l(n);
			s = i === `env` ? r || null : i;
		}
	}
	if (s !== null && o !== null && (n = [o, ...n], e = s, o = V(e, a)), o === null || !I.test(o)) {
		let t = o !== null && L.test(o);
		e = f(e), e = e.replace(P, `^$1`), n = n.map((e) => (e = e.replace(/(?=(\\+?)?)\1"/g, `$1$1\\"`), e = e.replace(/(?=(\\+?)?)\1$/, `$1$1`), e = `"${e}"`, e = e.replace(P, `^$1`), t && (e = e.replace(P, `^$1`)), e)), n = [
			`/d`,
			`/s`,
			`/c`,
			`"${[e, ...n].join(` `)}"`
		], e = a.env?.comspec ?? `cmd.exe`, a = {
			...a,
			windowsVerbatimArguments: !0
		};
	}
	return {
		command: e,
		args: n,
		options: a
	};
}
function V(e, t) {
	let n = (t.cwd ?? m()).toString(), r = t.env ?? process.env, i = A(r).value, o = e.includes(`/`) || e.includes(`\\`) ? [``] : [n, ...i.split(u)], s = r.PATHEXT ? r.PATHEXT.split(u) : z;
	e.includes(`.`) && s[0] !== `` && s.unshift(``);
	for (let t of o) {
		let r = p(n, t.startsWith(`"`) && t.endsWith(`"`) && t.length > 1 ? t.slice(1, -1) : t, e);
		for (let e of s) {
			let t = r + e;
			try {
				if (a(t).isFile()) return t;
			} catch {}
		}
	}
	return null;
}
var H = class extends Error {
	result;
	output;
	get exitCode() {
		if (this.result.exitCode !== null) return this.result.exitCode;
	}
	constructor(e, t) {
		super(`Process exited with non-zero status (${e.exitCode})`), this.result = e, this.output = t;
	}
};
const U = {
	timeout: void 0,
	persist: !1
}, W = { windowsHide: !0 };
function G(e) {
	let t = new AbortController();
	for (let n of e) {
		if (n.aborted) return t.abort(), n;
		n.addEventListener(`abort`, () => {
			t.abort(n.reason);
		}, { signal: t.signal });
	}
	return t.signal;
}
async function K(e) {
	let t = ``;
	try {
		for await (let n of e) t += n.toString();
	} catch {}
	return t;
}
var q = class {
	_process;
	_aborted = !1;
	_options;
	_command;
	_args;
	_resolveClose;
	_processClosed;
	_thrownError;
	get process() {
		return this._process;
	}
	get pid() {
		return this._process?.pid;
	}
	get exitCode() {
		if (this._process && this._process.exitCode !== null) return this._process.exitCode;
	}
	constructor(e, t, n) {
		this._options = {
			...U,
			...n
		}, this._command = e, this._args = t ?? [], this._processClosed = new Promise((e) => {
			this._resolveClose = e;
		});
	}
	kill(e) {
		return this._process?.kill(e) === !0;
	}
	get aborted() {
		return this._aborted;
	}
	get killed() {
		return this._process?.killed === !0;
	}
	pipe(e, t, n) {
		return Y(e, t, {
			...n,
			stdin: this
		});
	}
	async *[Symbol.asyncIterator]() {
		let e = this._process;
		if (!e) return;
		let t = [];
		this._streamErr && t.push(this._streamErr), this._streamOut && t.push(this._streamOut);
		let n = N(t), r = te.createInterface({ input: n });
		for await (let e of r) yield e.toString();
		if (await this._processClosed, e.removeAllListeners(), this._thrownError) throw this._thrownError;
		if (this._options?.throwOnError && this.exitCode !== 0 && this.exitCode !== void 0) throw new H(this);
	}
	async _waitForOutput() {
		let e = this._process;
		if (!e) throw Error(`No process was started`);
		let [t, n] = await Promise.all([this._streamOut ? K(this._streamOut) : ``, this._streamErr ? K(this._streamErr) : ``]);
		await this._processClosed;
		let { stdin: r } = this._options;
		if (r && typeof r != `string` && await r, e.removeAllListeners(), this._thrownError) throw this._thrownError;
		let i = {
			stderr: n,
			stdout: t,
			exitCode: this.exitCode
		};
		if (this._options.throwOnError && this.exitCode !== 0 && this.exitCode !== void 0) throw new H(this, i);
		return i;
	}
	then(e, t) {
		return this._waitForOutput().then(e, t);
	}
	_streamOut;
	_streamErr;
	spawn() {
		let e = m(), t = this._options, n = {
			...W,
			...t.nodeOptions
		}, r = [];
		this._resetState(), t.timeout !== void 0 && r.push(AbortSignal.timeout(t.timeout)), t.signal !== void 0 && r.push(t.signal), t.persist === !0 && (n.detached = !0), r.length > 0 && (n.signal = G(r)), n.env = M(e, n.env, t.nodePath);
		let i = B(this._command, this._args, n), a = ee(i.command, i.args, i.options);
		if (a.stderr && (this._streamErr = a.stderr), a.stdout && (this._streamOut = a.stdout), this._process = a, a.once(`error`, this._onError), a.once(`close`, this._onClose), a.stdin) {
			let { stdin: e } = t;
			typeof e == `string` ? a.stdin.end(e) : e?.process?.stdout?.pipe(a.stdin);
		}
	}
	_resetState() {
		this._aborted = !1, this._processClosed = new Promise((e) => {
			this._resolveClose = e;
		}), this._thrownError = void 0;
	}
	_onError = (e) => {
		if (e.name === `AbortError` && (!(e.cause instanceof Error) || e.cause.name !== `TimeoutError`)) {
			this._aborted = !0;
			return;
		}
		this._thrownError = e;
	};
	_onClose = () => {
		this._resolveClose && this._resolveClose();
	};
};
const J = (e, t, n) => {
	let r = new q(e, t, n);
	return r.spawn(), r;
}, Y = J;
var X = e({
	detectPackageManager: () => $,
	installDependencies: () => le,
	packageManagers: () => Q
});
async function ie(e, t, n = {}) {
	let r = b(e).split(`/`);
	for (; r.length > 0;) {
		let e = await t(r.join(`/`) || `/`);
		if (e || !n.includeParentDirs) return e;
		r.pop();
	}
}
function ae(e) {
	let t;
	return () => (t === void 0 && (t = e().then((e) => (t = e, t))), t);
}
const oe = ae(async () => {
	if (globalThis.process?.versions?.webcontainer) return !1;
	try {
		let { exitCode: e } = await J(`corepack`, [`--version`]);
		return e === 0;
	} catch {
		return !1;
	}
});
async function se(e, t, n = {}) {
	let r = e !== `npm` && e !== `bun` && e !== `deno` && n.corepack !== !1 && await oe() ? [`corepack`, [e, ...t]] : [e, t], { exitCode: i, stdout: a, stderr: o } = await J(r[0], r[1], { nodeOptions: {
		cwd: C(n.cwd || process.cwd()),
		env: n.env,
		stdio: n.silent ? `pipe` : `inherit`
	} });
	if (i !== 0) throw Error(`\`${r.flat().join(` `)}\` failed.${n.silent ? [
		``,
		a,
		o
	].join(`
`) : ``}`);
}
async function ce(e = {}) {
	let t = e.cwd || process.cwd(), n = {
		...process.env,
		...e.env
	}, r = (typeof e.packageManager == `string` ? Q.find((t) => t.name === e.packageManager) : e.packageManager) || await $(e.cwd || process.cwd());
	if (!r) throw Error(`No package manager auto-detected.`);
	return {
		cwd: t,
		env: n,
		silent: e.silent ?? !1,
		packageManager: r,
		dev: e.dev ?? !1,
		workspace: e.workspace,
		global: e.global ?? !1,
		dry: e.dry ?? !1,
		corepack: e.corepack ?? !0
	};
}
function Z(e) {
	let [t, n] = (e || ``).split(`@`), [r, i] = n?.split(`+`) || [];
	if (t && t !== `-` && /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(t)) return {
		name: t,
		version: r,
		buildMeta: i
	};
	let a = (t || ``).replace(/\W+/g, ``);
	return {
		name: a,
		version: r,
		buildMeta: i,
		warnings: [`Abnormal characters found in \`packageManager\` field, sanitizing from \`${t}\` to \`${a}\``]
	};
}
const Q = [
	{
		name: `npm`,
		command: `npm`,
		lockFile: `package-lock.json`
	},
	{
		name: `pnpm`,
		command: `pnpm`,
		lockFile: `pnpm-lock.yaml`,
		files: [`pnpm-workspace.yaml`]
	},
	{
		name: `bun`,
		command: `bun`,
		lockFile: [`bun.lockb`, `bun.lock`]
	},
	{
		name: `yarn`,
		command: `yarn`,
		lockFile: `yarn.lock`,
		files: [`.yarnrc.yml`]
	},
	{
		name: `deno`,
		command: `deno`,
		lockFile: `deno.lock`,
		files: [`deno.json`]
	}
];
async function $(e, t = {}) {
	let r = await ie(C(e || `.`), async (e) => {
		if (!t.ignorePackageJSON) {
			let t = x(e, `package.json`);
			if (n(t)) {
				let e = JSON.parse(await o(t, `utf8`));
				if (e?.packageManager) {
					let { name: t, version: n = `0.0.0`, buildMeta: r, warnings: i } = Z(e.packageManager);
					if (t) {
						let e = n.split(`.`)[0], a = Q.find((n) => n.name === t && n.majorVersion === e) || Q.find((e) => e.name === t);
						return {
							name: t,
							command: t,
							version: n,
							majorVersion: e,
							buildMeta: r,
							warnings: i,
							files: a?.files,
							lockFile: a?.lockFile
						};
					}
				}
			}
			if (n(x(e, `deno.json`))) return Q.find((e) => e.name === `deno`);
		}
		if (!t.ignoreLockFile) {
			for (let t of Q) if ([t.lockFile, t.files].flat().filter(Boolean).some((t) => n(C(e, t)))) return { ...t };
		}
	}, { includeParentDirs: t.includeParentDirs ?? !0 });
	if (!r && !t.ignoreArgv) {
		let e = process.argv[1];
		if (e) {
			for (let t of Q) if (RegExp(`[/\\\\]\\.?${t.command}`).test(e)) return t;
		}
	}
	return r;
}
async function le(e = {}) {
	let t = await ce(e), n = e.frozenLockFile ? {
		npm: [`ci`],
		yarn: [`install`, `--immutable`],
		bun: [`install`, `--frozen-lockfile`],
		pnpm: [`install`, `--frozen-lockfile`],
		deno: [`install`, `--frozen`]
	}[t.packageManager.name] : [`install`];
	return e.ignoreWorkspace && t.packageManager.name === `pnpm` && n.push(`--ignore-workspace`), t.dry || await se(t.packageManager.command, n, {
		cwd: t.cwd,
		silent: t.silent,
		corepack: t.corepack
	}), { exec: {
		command: t.packageManager.command,
		args: n
	} };
}
export { D as basename, E as dirname, X as dist_exports, re as relative, C as resolve };
