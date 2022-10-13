'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var paimon = require('../../wasm/pkg/paimon.cjs');
var paimon_wasm = require('../../wasm/pkg/paimon.wasm.cjs');

var output = undefined;
function initSyncBundledOnce() {
    return output !== null && output !== void 0 ? output : (output = paimon.initSync(Buffer.from(paimon_wasm.wasm, "base64")));
}

exports.PaddingScheme = paimon.PaddingScheme;
exports.RsaPrivateKey = paimon.RsaPrivateKey;
exports.RsaPublicKey = paimon.RsaPublicKey;
exports.initSync = paimon.initSync;
exports.initSyncBundledOnce = initSyncBundledOnce;
//# sourceMappingURL=index.cjs.map
