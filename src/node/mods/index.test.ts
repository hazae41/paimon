import { assert, test } from "@hazae41/phobos";
import { Memory, RsaPrivateKey, RsaPublicKey, initBundledOnce } from "./index.js";

function equals(a: Uint8Array, b: Uint8Array) {
  const ba = Buffer.from(a.buffer)
  const bb = Buffer.from(b.buffer)

  return ba.equals(bb)
}

function assertKeypairToPkcs1(keypair: RsaPrivateKey) {
  const der = keypair.to_pkcs1_der().freeNextTick()
  const der2 = RsaPrivateKey.from_pkcs1_der(der).to_pkcs1_der().freeNextTick()
  assert(equals(der.bytes, der2.bytes), `keypair.to_pkcs1_der serialization`)
}

function assertKeypairToPkcs8(keypair: RsaPrivateKey) {
  const der = keypair.to_pkcs8_der().freeNextTick()
  const der2 = RsaPrivateKey.from_pkcs8_der(der).to_pkcs8_der().freeNextTick()
  assert(equals(der.bytes, der2.bytes), `keypair.to_pkcs8_der serialization`)
}

function assertIdentityToPkcs1(identity: RsaPublicKey) {
  const der = identity.to_pkcs1_der().freeNextTick()
  const der2 = RsaPublicKey.from_pkcs1_der(der).to_pkcs1_der().freeNextTick()
  assert(equals(der.bytes, der2.bytes), `identity.to_pkcs1_der serialization`)
}

function assertIdentityToPublicKey(identity: RsaPublicKey) {
  const der = identity.to_public_key_der().freeNextTick()
  const der2 = RsaPublicKey.from_public_key_der(der).to_public_key_der().freeNextTick()
  assert(equals(der.bytes, der2.bytes), `identity.to_public_key_der serialization`)
}

test("RSA", async () => {
  await initBundledOnce()

  const hello = new TextEncoder().encode("hello world")

  const keypair = new RsaPrivateKey(2048)
  const identity = keypair.to_public_key()

  assertKeypairToPkcs1(keypair)
  assertKeypairToPkcs8(keypair)

  assertIdentityToPkcs1(identity)
  assertIdentityToPublicKey(identity)

  const presignature = new Memory(hello).freeNextTick()
  const signature = keypair.sign_pkcs1v15_unprefixed(presignature).freeNextTick()
  assert(identity.verify_pkcs1v15_unprefixed(presignature, signature), `signature should be verified`)
})