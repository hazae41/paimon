import { PaddingScheme, Paimon, RsaPrivateKey } from "../../src/deno/mod.ts";

await Paimon.initBundledOnce()

const keypair = new RsaPrivateKey(1024)
console.log("keypair.to_pkcs1_der", keypair.to_pkcs1_der())
console.log("keypair.to_pkcs8_der", keypair.to_pkcs8_der())

const identity = keypair.to_public_key()
console.log("identity.to_pkcs1_der", identity.to_pkcs1_der())
console.log("identity.to_public_key_der", identity.to_public_key_der())

const bytes = new TextEncoder().encode("hello world")
console.log("bytes", bytes)

const padding = PaddingScheme.new_pkcs1v15_sign_raw()
const proof = keypair.sign(padding, bytes)
console.log("proof", proof)

const padding2 = PaddingScheme.new_pkcs1v15_sign_raw()
const verified = identity.verify(padding2, bytes, proof)
console.log("verified", verified)