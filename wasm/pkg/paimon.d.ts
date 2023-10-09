
import type { Box, Copiable, Copied } from "@hazae41/box"

/* tslint:disable */
/* eslint-disable */
/**
*/
export class RsaPrivateKey {

  get freed(): boolean

  [Symbol.dispose](): void

  free(): void;
/**
* @param {number} length
*/
  constructor(length: number);
/**
* @param {Uint8Array} input
* @returns {RsaPrivateKey}
*/
  static from_pkcs1_der(input: Box<Copiable>): RsaPrivateKey;
/**
* @param {Uint8Array} input
* @returns {RsaPrivateKey}
*/
  static from_pkcs8_der(input: Box<Copiable>): RsaPrivateKey;
/**
* @returns {Slice}
*/
  to_pkcs1_der(): Slice;
/**
* @returns {Slice}
*/
  to_pkcs8_der(): Slice;
/**
* @returns {RsaPublicKey}
*/
  to_public_key(): RsaPublicKey;
/**
* @param {Uint8Array} input
* @returns {Slice}
*/
  sign_pkcs1v15_unprefixed(input: Box<Copiable>): Slice;
}
/**
*/
export class RsaPublicKey {

  get freed(): boolean

  [Symbol.dispose](): void

  free(): void;
/**
* @param {Uint8Array} input
* @returns {RsaPublicKey}
*/
  static from_pkcs1_der(input: Box<Copiable>): RsaPublicKey;
/**
* @param {Uint8Array} input
* @returns {RsaPublicKey}
*/
  static from_public_key_der(input: Box<Copiable>): RsaPublicKey;
/**
* @returns {Slice}
*/
  to_pkcs1_der(): Slice;
/**
* @returns {Slice}
*/
  to_public_key_der(): Slice;
/**
* @param {Uint8Array} input
* @param {Uint8Array} signature
* @returns {boolean}
*/
  verify_pkcs1v15_unprefixed(input: Box<Copiable>, signature: Box<Copiable>): boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_rsaprivatekey_free: (a: number) => void;
  readonly rsaprivatekey_new: (a: number, b: number) => void;
  readonly rsaprivatekey_from_pkcs1_der: (a: number, b: number, c: number) => void;
  readonly rsaprivatekey_from_pkcs8_der: (a: number, b: number, c: number) => void;
  readonly rsaprivatekey_to_pkcs1_der: (a: number, b: number) => void;
  readonly rsaprivatekey_to_pkcs8_der: (a: number, b: number) => void;
  readonly rsaprivatekey_to_public_key: (a: number) => number;
  readonly rsaprivatekey_sign_pkcs1v15_unprefixed: (a: number, b: number, c: number, d: number) => void;
  readonly __wbg_rsapublickey_free: (a: number) => void;
  readonly rsapublickey_from_pkcs1_der: (a: number, b: number, c: number) => void;
  readonly rsapublickey_from_public_key_der: (a: number, b: number, c: number) => void;
  readonly rsapublickey_to_pkcs1_der: (a: number, b: number) => void;
  readonly rsapublickey_to_public_key_der: (a: number, b: number) => void;
  readonly rsapublickey_verify_pkcs1v15_unprefixed: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
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
export function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;


export class Slice {

  readonly ptr: number

  readonly len: number

  constructor(ptr: number, len: number);

  /**
   * Free the bytes
   **/
  [Symbol.dispose](): void

  /**
   * Get the bytes in memory
   **/
  get bytes(): Uint8Array

  /**
   * Is the memory freed?
   **/
  get freed(): boolean

  /**
   * Free the bytes (do nothing if already freed)
   **/
  free(): void

  /**
   * Copy the bytes and free them
   **/
  copyAndDispose(): Copied

}