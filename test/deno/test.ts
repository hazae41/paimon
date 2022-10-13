import * as Paimon from "../../deno/mod.ts";
import { PaddingScheme, RsaPrivateKey } from "../../deno/mod.ts";

Paimon.initSyncBundledOnce()

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

const verified = identity.verify(padding, bytes, proof)
console.log("verified", verified)