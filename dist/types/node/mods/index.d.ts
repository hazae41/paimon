import { InitOutput } from '../../wasm/pkg/paimon.d.js';
export { InitInput, InitOutput, PaddingScheme, RsaPrivateKey, RsaPublicKey, SyncInitInput, initSync } from '../../wasm/pkg/paimon.d.js';

declare function initSyncBundledOnce(): InitOutput;

export { initSyncBundledOnce };