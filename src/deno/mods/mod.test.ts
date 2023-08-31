import { Buffer } from "https://deno.land/std@0.170.0/node/buffer.ts";
import { assert, test } from "npm:@hazae41/phobos";
import { RsaPrivateKey, RsaPublicKey, initBundledOnce } from "./mod.ts";

function equals(a: Uint8Array, b: Uint8Array) {
  const ba = Buffer.from(a.buffer)
  const bb = Buffer.from(b.buffer)

  return ba.equals(bb)
}

function assertKeypairToPkcs1(keypair: RsaPrivateKey) {
  const der = keypair.to_pkcs1_der().bytes.slice()
  const der2 = RsaPrivateKey.from_pkcs1_der(der).to_pkcs1_der().bytes.slice()
  assert(equals(der, der2), `keypair.to_pkcs1_der serialization`)
}

function assertKeypairToPkcs8(keypair: RsaPrivateKey) {
  const der = keypair.to_pkcs8_der().bytes.slice()
  const der2 = RsaPrivateKey.from_pkcs8_der(der).to_pkcs8_der().bytes.slice()
  assert(equals(der, der2), `keypair.to_pkcs8_der serialization`)
}

function assertIdentityToPkcs1(identity: RsaPublicKey) {
  const der = identity.to_pkcs1_der().bytes.slice()
  const der2 = RsaPublicKey.from_pkcs1_der(der).to_pkcs1_der().bytes.slice()
  assert(equals(der, der2), `identity.to_pkcs1_der serialization`)
}

function assertIdentityToPublicKey(identity: RsaPublicKey) {
  const der = identity.to_public_key_der().bytes.slice()
  const der2 = RsaPublicKey.from_public_key_der(der).to_public_key_der().bytes.slice()
  assert(equals(der, der2), `identity.to_public_key_der serialization`)
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

  const signature = keypair.sign_pkcs1v15_raw(hello).bytes.slice()

  assert(identity.verify_pkcs1v15_raw(hello, signature), `signature should be verified`)
})