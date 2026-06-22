"use strict";
/*
 * Derived from `src/compat/object/defaults.ts` in es-toolkit
 * (https://github.com/toss/es-toolkit).
 *
 * Copyright (c) 2024 Viva Republica, Inc
 * Copyright OpenJS Foundation and other contributors
 *
 * Parts of the compatibility layer in `es-toolkit/compat` are derived from
 * Lodash (https://github.com/lodash/lodash) by the OpenJS Foundation
 * (https://openjsf.org/) and Underscore.js by Jeremy Ashkenas, DocumentCloud
 * and Investigative Reporters & Editors (http://underscorejs.org/).
 *
 * This file has been modified from the original source to create a standalone
 * adaptation.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = void 0;
const IS_UNSIGNED_INTEGER = /^(?:0|[1-9]\d*)$/;
function isNil(value) {
    return value == null;
}
function eq(value, other) {
    return value === other || (Number.isNaN(value) && Number.isNaN(other));
}
function isLength(value) {
    return Number.isSafeInteger(value) && value >= 0;
}
function isArrayLike(value) {
    return (value != null &&
        typeof value !== "function" &&
        isLength(value.length));
}
function isObject(value) {
    return (value !== null && (typeof value === "object" || typeof value === "function"));
}
function isIndex(value, length = Number.MAX_SAFE_INTEGER) {
    switch (typeof value) {
        case "number":
            return Number.isInteger(value) && value >= 0 && value < length;
        case "symbol":
            return false;
        case "string":
            return IS_UNSIGNED_INTEGER.test(value);
    }
}
function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
        return false;
    }
    if ((typeof index === "number" &&
        isArrayLike(object) &&
        isIndex(index) &&
        index < object.length) ||
        (typeof index === "string" && index in object)) {
        return eq(object[index], value);
    }
    return false;
}
function defaults(object, ...sources) {
    object = Object(object);
    const objectProto = Object.prototype;
    let length = sources.length;
    const guard = length > 2 ? sources[2] : undefined;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        length = 1;
    }
    for (let i = 0; i < length; i++) {
        if (isNil(sources[i])) {
            continue;
        }
        const source = sources[i];
        for (const key in source) {
            const value = object[key];
            if (value === undefined ||
                (!objectProto.hasOwnProperty.call(object, key) &&
                    eq(value, objectProto[key]))) {
                object[key] = source[key];
            }
        }
    }
    return object;
}
exports.defaults = defaults;
