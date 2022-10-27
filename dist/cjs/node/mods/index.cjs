'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var paimon = require('../../wasm/pkg/paimon.cjs');
var paimon_wasm = require('../../wasm/pkg/paimon.wasm.cjs');

var output = undefined;
function initSyncBundledOnce() {
    return output !== null && output !== void 0 ? output : (output = paimon.initSync(Buffer.from(paimon_wasm.wasm, "base64")));
}
function initBundledOnce() {
    return tslib.__awaiter(this, void 0, void 0, function () {
        return tslib.__generator(this, function (_a) {
            return [2 /*return*/, output !== null && output !== void 0 ? output : (output = paimon["default"](Buffer.from(paimon_wasm.wasm, "base64")))];
        });
    });
}

exports.PaddingScheme = paimon.PaddingScheme;
exports.RsaPrivateKey = paimon.RsaPrivateKey;
exports.RsaPublicKey = paimon.RsaPublicKey;
exports.initSync = paimon.initSync;
exports.initBundledOnce = initBundledOnce;
exports.initSyncBundledOnce = initSyncBundledOnce;
//# sourceMappingURL=index.cjs.map
