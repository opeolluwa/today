"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traceConnect = exports.traceBatch = exports.traceCommand = exports.sanitizeArgs = void 0;
// Argument sanitization rules adapted from @opentelemetry/redis-common (Apache 2.0).
// https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/packages/redis-common/src/index.ts
//
// Each entry specifies how many positional args (after the command name) are safe
// to emit. -1 means all args are safe (read-only/structural commands).
// Unlisted commands default to 0 (all args redacted) for safe-by-default behavior,
// which covers AUTH, HELLO, and unknown/custom commands.
const SERIALIZATION_SUBSETS = [
    { regex: /^ECHO/i, args: 0 },
    {
        regex: /^(LPUSH|MSET|PFA|PUBLISH|RPUSH|SADD|SET|SPUBLISH|XADD|ZADD)/i,
        args: 1,
    },
    { regex: /^(HSET|HMSET|LSET|LINSERT)/i, args: 2 },
    {
        regex: /^(ACL|BIT|B[LRZ]|CLIENT|CLUSTER|CONFIG|COMMAND|DECR|DEL|EVAL|EX|FUNCTION|GEO|GET|HINCR|HMGET|HSCAN|INCR|L[TRLM]|MEMORY|P[EFISTU]|RPOP|S[CDIMORSU]|XACK|X[CDGILPRT]|Z[CDILMPRS])/i,
        args: -1,
    },
];
function sanitizeArgs(commandName, args) {
    let allowedArgCount = 0;
    for (const subset of SERIALIZATION_SUBSETS) {
        if (subset.regex.test(commandName)) {
            allowedArgCount = subset.args;
            break;
        }
    }
    if (allowedArgCount === -1) {
        return args.map((a) => String(a));
    }
    const result = [];
    for (let i = 0; i < args.length; i++) {
        if (i < allowedArgCount) {
            result.push(String(args[i]));
        }
        else {
            result.push("?");
        }
    }
    return result;
}
exports.sanitizeArgs = sanitizeArgs;
// Load diagnostics_channel with Node 18 compatibility
const dc = (() => {
    try {
        return "getBuiltinModule" in process
            ? process.getBuiltinModule("node:diagnostics_channel")
            : require("node:diagnostics_channel");
    }
    catch {
        return undefined;
    }
})();
const hasTracingChannel = dc && typeof dc.tracingChannel === "function";
const commandChannel = hasTracingChannel
    ? dc.tracingChannel("ioredis:command")
    : undefined;
const batchChannel = hasTracingChannel
    ? dc.tracingChannel("ioredis:batch")
    : undefined;
const connectChannel = hasTracingChannel
    ? dc.tracingChannel("ioredis:connect")
    : undefined;
function shouldTrace(channel) {
    return !!channel && channel.hasSubscribers !== false;
}
const noop = () => { };
function traceCommand(fn, contextFactory) {
    if (!shouldTrace(commandChannel))
        return fn();
    // tracePromise returns a wrapper promise that re-rejects on error.
    // Silence the wrapper to prevent unhandled rejections when callers
    // (e.g. Pipeline) discard the return value. Callers that await this
    // promise still see the rejection through their own .then() chain.
    const traced = commandChannel.tracePromise(fn, contextFactory());
    traced.catch(noop);
    return traced;
}
exports.traceCommand = traceCommand;
function traceBatch(fn, contextFactory) {
    if (!shouldTrace(batchChannel))
        return fn();
    const traced = batchChannel.tracePromise(fn, contextFactory());
    traced.catch(noop);
    return traced;
}
exports.traceBatch = traceBatch;
function traceConnect(fn, contextFactory) {
    if (!shouldTrace(connectChannel))
        return fn();
    return connectChannel.tracePromise(fn, contextFactory());
}
exports.traceConnect = traceConnect;
