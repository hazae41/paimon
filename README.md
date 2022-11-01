# RSA for WebAssembly

WebAssembly port of RustCrypto's [RSA](https://github.com/RustCrypto/RSA), a
Rust implementation of RSA encryption and signatures.

```bash
npm i @hazae41/paimon
```

[**Next.js CodeSandbox 🪣**](https://codesandbox.io/p/sandbox/6t599p) • [**Deno CodeSandbox 🪣**](https://codesandbox.io/p/sandbox/drxshp) • [**Node CodeSandbox 🪣**](https://codesandbox.io/p/sandbox/5h73kh)

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