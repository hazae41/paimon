<div>
  <img align="right" width="128" src="https://user-images.githubusercontent.com/4405263/216624328-4827e1fd-1d1c-406e-9fb1-11b2612ac3d6.png"/>
  <p></p>
</div>

# Paimon

WebAssembly port of RSA encryption and signatures

```bash
npm i @hazae41/paimon
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/paimon) • [**Deno Module 🦖**](https://deno.land/x/paimon) • [**Next.js CodeSandbox 🪣**](https://codesandbox.io/p/github/hazae41/paimon-example-next)

## Algorithms
- RSA from RustCrypto (rsa)

## Features
- Reproducible building
- Pre-bundled and streamed
- Zero-copy memory slices

## Usage

```ts
import { Paimon, RsaPrivateKey } from "@hazae41/paimon";

// Wait for WASM to load
await Paimon.initBundledOnce()

// Generate an identity
const keypair = new RsaPrivateKey(1024)
const identity = keypair.to_public_key()

// Define bytes to sign and padding to use
const bytes = new TextEncoder().encode("hello world")

// Sign and verify
const proof = keypair.sign_pkcs1v15_raw(bytes).copy()
const verified = identity.verify_pkcs1v15_raw(bytes, proof)
```

## Building

### Unreproducible building

You need to install [Rust](https://www.rust-lang.org/tools/install)

Then, install [wasm-pack](https://github.com/rustwasm/wasm-pack)

```bash
cargo install wasm-pack
```

Finally, do a clean install and build

```bash
npm ci && npm run build
```

### Reproducible building

You can build the exact same bytecode using Docker, just be sure you're on a `linux/amd64` host

```bash
docker compose up --build
```

Then check that all the files are the same using `git status`

```bash
git status --porcelain
```

If the output is empty then the bytecode is the same as the one I commited

### Automated checks

Each time I commit to the repository, the GitHub's CI does the following:
- Clone the repository
- Reproduce the build using `docker compose up --build`
- Throw an error if the `git status --porcelain` output is not empty

Each time I release a new version tag on GitHub, the GitHub's CI does the following:
- Clone the repository
- Do not reproduce the build, as it's already checked by the task above
- Throw an error if there is a `npm diff` between the cloned repository and the same version tag on NPM

If a version is present on NPM but not on GitHub, do not use!
