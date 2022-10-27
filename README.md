# RSA for WebAssembly

WebAssembly port of RustCrypto's [RSA](https://github.com/RustCrypto/RSA), a
Rust implementation of RSA encryption and signatures.

```bash
npm i @hazae41/paimon
```

### Usage

```ts
import { Paimon, PaddingScheme, RsaPrivateKey } from "@hazae41/paimon";

// Wait for WASM to load
Paimon.initSyncBundledOnce()

// Generate an identity
const keypair = new RsaPrivateKey(1024)
const identity = keypair.to_public_key()

// Define bytes to sign and padding to use
const bytes = new TextEncoder().encode("hello world")
const padding = PaddingScheme.new_pkcs1v15_sign_raw()

// Sign and verify
const proof = keypair.sign(padding, bytes)
const verified = identity.verify(padding, bytes, proof)
```

### Building

- Install [Deno](https://github.com/denoland/deno)

https://deno.land

- Install [binaryen](https://github.com/WebAssembly/binaryen) (for wasm-opt) and
  add it your PATH

https://github.com/WebAssembly/binaryen/releases

- Install [wasm-pack](https://github.com/rustwasm/wasm-pack)

```bash
cargo install wasm-pack
```

- Install dependencies

```bash
npm install
```

- Build wasm and module

```bash
npm run build
```
