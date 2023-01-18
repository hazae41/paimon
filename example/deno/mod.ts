import { Paimon, RsaPrivateKey } from "../../src/deno/mod.ts";

await Paimon.initBundledOnce()

const keypair = new RsaPrivateKey(1024)
console.log("keypair.to_pkcs1_der", keypair.to_pkcs1_der())
console.log("keypair.to_pkcs8_der", keypair.to_pkcs8_der())

const identity = keypair.to_public_key()
console.log("identity.to_pkcs1_der", identity.to_pkcs1_der())
console.log("identity.to_public_key_der", identity.to_public_key_der())

const bytes = new TextEncoder().encode("hello world")
console.log("bytes", bytes)

const proof = keypair.sign_pkcs1v15_raw(bytes)
console.log("proof", proof)

const verified = identity.verify_pkcs1v15_raw(bytes, proof)
console.log("verified", verified)