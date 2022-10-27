/* tslint:disable */
/* eslint-disable */
/**
*/
export class PaddingScheme {
  free(): void;
/**
* @returns {PaddingScheme}
*/
  static new_pkcs1v15_sign_raw(): PaddingScheme;
/**
* @param {number} length
* @param {Uint8Array} prefix
* @returns {PaddingScheme}
*/
  static new_pkcs1v15_sign_digest(length: number, prefix: Uint8Array): PaddingScheme;
}
/**
*/
export class RsaPrivateKey {
  free(): void;
/**
* @param {number} length
*/
  constructor(length: number);
/**
* @param {Uint8Array} input
* @returns {RsaPrivateKey}
*/
  static from_pkcs1_der(input: Uint8Array): RsaPrivateKey;
/**
* @param {Uint8Array} input
* @returns {RsaPrivateKey}
*/
  static from_pkcs8_der(input: Uint8Array): RsaPrivateKey;
/**
* @returns {Uint8Array}
*/
  to_pkcs1_der(): Uint8Array;
/**
* @returns {Uint8Array}
*/
  to_pkcs8_der(): Uint8Array;
/**
* @returns {RsaPublicKey}
*/
  to_public_key(): RsaPublicKey;
/**
* @param {PaddingScheme} padding
* @param {Uint8Array} input
* @returns {Uint8Array}
*/
  sign(padding: PaddingScheme, input: Uint8Array): Uint8Array;
}
/**
*/
export class RsaPublicKey {
  free(): void;
/**
* @param {Uint8Array} input
* @returns {RsaPublicKey}
*/
  static from_pkcs1_der(input: Uint8Array): RsaPublicKey;
/**
* @param {Uint8Array} input
* @returns {RsaPublicKey}
*/
  static from_public_key_der(input: Uint8Array): RsaPublicKey;
/**
* @returns {Uint8Array}
*/
  to_pkcs1_der(): Uint8Array;
/**
* @returns {Uint8Array}
*/
  to_public_key_der(): Uint8Array;
/**
* @param {PaddingScheme} padding
* @param {Uint8Array} input
* @param {Uint8Array} signature
* @returns {boolean}
*/
  verify(padding: PaddingScheme, input: Uint8Array, signature: Uint8Array): boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_paddingscheme_free: (a: number) => void;
  readonly paddingscheme_new_pkcs1v15_sign_raw: () => number;
  readonly paddingscheme_new_pkcs1v15_sign_digest: (a: number, b: number, c: number) => number;
  readonly __wbg_rsaprivatekey_free: (a: number) => void;
  readonly rsaprivatekey_new: (a: number, b: number) => void;
  readonly rsaprivatekey_from_pkcs1_der: (a: number, b: number, c: number) => void;
  readonly rsaprivatekey_from_pkcs8_der: (a: number, b: number, c: number) => void;
  readonly rsaprivatekey_to_pkcs1_der: (a: number, b: number) => void;
  readonly rsaprivatekey_to_pkcs8_der: (a: number, b: number) => void;
  readonly rsaprivatekey_to_public_key: (a: number) => number;
  readonly rsaprivatekey_sign: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbg_rsapublickey_free: (a: number) => void;
  readonly rsapublickey_from_pkcs1_der: (a: number, b: number, c: number) => void;
  readonly rsapublickey_from_public_key_der: (a: number, b: number, c: number) => void;
  readonly rsapublickey_to_pkcs1_der: (a: number, b: number) => void;
  readonly rsapublickey_to_public_key_der: (a: number, b: number) => void;
  readonly rsapublickey_verify: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
