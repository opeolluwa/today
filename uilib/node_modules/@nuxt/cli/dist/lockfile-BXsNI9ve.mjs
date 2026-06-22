import { n as themeColor } from "./ascii-B6JJ3B2W.mjs";
import process from "node:process";
import { colors } from "consola/utils";
import { isAgent } from "std-env";
import { box } from "@clack/prompts";
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join, relative } from "pathe";
//#region ../nuxi/src/utils/profile.ts
const RELATIVE_PATH_RE = /^(?![^.]{1,2}\/)/;
let session;
let profileCount = 0;
async function startCpuProfile() {
	const cli = globalThis.__nuxt_cli__;
	if (cli?.cpuProfileSession) {
		session = cli.cpuProfileSession;
		delete cli.cpuProfileSession;
		return;
	}
	session = new (await (import("node:inspector"))).Session();
	session.connect();
	try {
		await new Promise((res, rej) => {
			session.post("Profiler.enable", (err) => {
				if (err) return rej(err);
				session.post("Profiler.start", (err) => {
					if (err) return rej(err);
					res();
				});
			});
		});
	} catch (err) {
		session.disconnect();
		session = void 0;
		throw err;
	}
}
async function stopCpuProfile(outDir, command) {
	if (!session) return;
	const s = session;
	session = void 0;
	const count = profileCount++;
	const outPath = join(outDir, `nuxt-${command}${count ? `-${count}` : ""}.cpuprofile`);
	const relativeOutPath = relative(process.cwd(), outPath).replace(RELATIVE_PATH_RE, "./");
	try {
		await new Promise((resolve, reject) => {
			s.post("Profiler.stop", (err, params) => {
				if (err) return reject(err);
				if (!params?.profile) return resolve(params);
				try {
					mkdirSync(outDir, { recursive: true });
					writeFileSync(outPath, JSON.stringify(params.profile));
					box(`\n${[`CPU profile written to ${colors.cyan(relativeOutPath)}.`, `Open it in a CPU profile viewer like your IDE, or ${colors.cyan("https://discoveryjs.github.io/cpupro")}.`].map((step) => ` › ${step}`).join("\n")}\n`, "", {
						contentAlign: "left",
						titleAlign: "left",
						width: "auto",
						titlePadding: 2,
						contentPadding: 2,
						rounded: true,
						withGuide: false,
						formatBorder: (text) => `${themeColor + text}\x1B[0m`
					});
				} catch {}
				resolve(params);
			});
		});
	} finally {
		s.disconnect();
	}
}
//#endregion
//#region ../nuxi/src/utils/lockfile.ts
const LOCK_FILENAME = "nuxt.lock";
const MAX_LOCK_AGE_MS = 1440 * 60 * 1e3;
function isProcessAlive(pid) {
	try {
		process.kill(pid, 0);
		return true;
	} catch (err) {
		return err.code === "EPERM";
	}
}
function readLockFile(lockPath) {
	try {
		return JSON.parse(readFileSync(lockPath, "utf-8"));
	} catch {
		return;
	}
}
function tryUnlink(lockPath) {
	try {
		unlinkSync(lockPath);
	} catch {}
}
function isLockActive(info) {
	if (info.pid === process.pid) return false;
	if (!isProcessAlive(info.pid)) return false;
	if (Date.now() - info.startedAt > MAX_LOCK_AGE_MS) return false;
	return true;
}
/**
* Locking is enabled for agents by default. `NUXT_LOCK=1` forces it on for
* non-agents; `NUXT_IGNORE_LOCK=1` forces it off.
*/
function isLockEnabled() {
	if (process.env.NUXT_IGNORE_LOCK) return false;
	if (process.env.NUXT_LOCK === "1" || process.env.NUXT_LOCK === "true") return true;
	return isAgent;
}
/**
* Atomically acquire a build/dev lock.
* Returns `{ existing }` if another live process holds the lock, otherwise
* `{ release }` to be invoked on shutdown. No-op when locking is disabled.
*/
function acquireLock(buildDir, info) {
	if (!isLockEnabled()) return { release: () => {} };
	const lockPath = join(buildDir, LOCK_FILENAME);
	const fullInfo = {
		pid: process.pid,
		startedAt: Date.now(),
		...info
	};
	try {
		mkdirSync(buildDir, { recursive: true });
	} catch {}
	for (let attempt = 0; attempt < 2; attempt++) try {
		writeFileSync(lockPath, JSON.stringify(fullInfo, null, 2), { flag: "wx" });
		return { release: makeRelease(lockPath) };
	} catch (err) {
		if (err.code !== "EEXIST") throw err;
		const existing = readLockFile(lockPath);
		if (existing && isLockActive(existing)) return { existing };
		tryUnlink(lockPath);
	}
	const existing = readLockFile(lockPath);
	if (existing && isLockActive(existing)) return { existing };
	return { release: () => {} };
}
/**
* Overwrite an existing lock we already own with updated metadata (e.g. port
* information learned after the listener binds). Callers must hold the lock
* via a prior successful `acquireLock`. Does nothing when locking is disabled.
*/
function updateLock(buildDir, info) {
	if (!isLockEnabled()) return;
	const lockPath = join(buildDir, LOCK_FILENAME);
	const current = readLockFile(lockPath);
	if (current && current.pid !== process.pid) return;
	const next = {
		pid: process.pid,
		startedAt: current?.startedAt ?? Date.now(),
		...info
	};
	try {
		writeFileSync(lockPath, JSON.stringify(next, null, 2));
	} catch {}
}
function makeRelease(lockPath) {
	let released = false;
	function release() {
		if (released) return;
		released = true;
		process.off("exit", release);
		const current = readLockFile(lockPath);
		if (!current || current.pid === process.pid) tryUnlink(lockPath);
	}
	process.on("exit", release);
	return release;
}
/**
* Format an error message when a Nuxt process is already running.
* Designed to be actionable for both humans and LLM agents.
*/
function formatLockError(info) {
	const killCmd = process.platform === "win32" ? `taskkill /PID ${info.pid} /F` : `kill ${info.pid}`;
	const lines = [
		"",
		`Another Nuxt ${info.command === "dev" ? "dev server" : "build"} is already running:`,
		""
	];
	if (info.url) lines.push(`  URL:     ${info.url}`);
	lines.push(`  PID:     ${info.pid}`);
	lines.push(`  Dir:     ${info.cwd}`);
	lines.push(`  Started: ${new Date(info.startedAt).toLocaleString()}`);
	lines.push("");
	if (info.command === "dev" && info.url) lines.push(`Run \`${killCmd}\` to stop it, or connect to ${info.url}`);
	else lines.push(`Run \`${killCmd}\` to stop it.`);
	lines.push(`Set NUXT_IGNORE_LOCK=1 to bypass this check.`);
	lines.push("");
	return lines.join("\n");
}
//#endregion
export { stopCpuProfile as a, startCpuProfile as i, formatLockError as n, updateLock as r, acquireLock as t };
