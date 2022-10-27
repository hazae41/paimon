import init from '../../wasm/pkg/paimon.d.js';
export { InitInput, InitOutput, PaddingScheme, RsaPrivateKey, RsaPublicKey, SyncInitInput, initSync } from '../../wasm/pkg/paimon.d.js';

declare function initSyncBundledOnce(): init.InitOutput;
declare function initBundledOnce(): Promise<any>;

export { initBundledOnce, initSyncBundledOnce };
