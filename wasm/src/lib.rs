#![no_std]

extern crate alloc;

use core::ops::Deref;

use alloc::{boxed::Box, vec::Vec};

use rsa::pkcs1::{
    DecodeRsaPrivateKey, DecodeRsaPublicKey, EncodeRsaPrivateKey, EncodeRsaPublicKey,
};
use rsa::pkcs8::{DecodePrivateKey, DecodePublicKey, EncodePrivateKey, EncodePublicKey};
use rsa::PublicKey;

use wasm_bindgen::prelude::*;

use rand::rngs::OsRng;

#[wasm_bindgen]
pub struct PaddingScheme {
    inner: Box<rsa::PaddingScheme>,
}

#[wasm_bindgen]
impl PaddingScheme {
    #[wasm_bindgen]
    pub fn new_pkcs1v15_sign_raw() -> Self {
        let padding = rsa::PaddingScheme::new_pkcs1v15_sign_raw();
        let inner = Box::new(padding);

        Self { inner }
    }

    #[wasm_bindgen]
    pub fn new_pkcs1v15_sign_digest(length: usize, prefix: Vec<u8>) -> Self {
        let padding = rsa::PaddingScheme::PKCS1v15Sign {
            hash_len: Some(length),
            prefix: prefix.into_boxed_slice(),
        };
        let inner = Box::new(padding);

        Self { inner }
    }
}

impl Into<rsa::PaddingScheme> for &PaddingScheme {
    fn into(self) -> rsa::PaddingScheme {
        match self.inner.deref() {
            rsa::PaddingScheme::PKCS1v15Sign { hash_len, prefix } => {
                rsa::PaddingScheme::PKCS1v15Sign {
                    hash_len: hash_len.clone(),
                    prefix: prefix.clone(),
                }
            }
            rsa::PaddingScheme::PKCS1v15Encrypt => rsa::PaddingScheme::PKCS1v15Encrypt,
            rsa::PaddingScheme::OAEP {
                digest,
                mgf_digest,
                label,
            } => rsa::PaddingScheme::OAEP {
                digest: digest.clone(),
                mgf_digest: mgf_digest.clone(),
                label: label.clone(),
            },
            rsa::PaddingScheme::PSS { digest, salt_len } => rsa::PaddingScheme::PSS {
                digest: digest.clone(),
                salt_len: salt_len.clone(),
            },
        }
    }
}

#[wasm_bindgen]
pub struct RsaPrivateKey {
    inner: Box<rsa::RsaPrivateKey>,
}

#[wasm_bindgen]
impl RsaPrivateKey {
    #[wasm_bindgen(constructor)]
    pub fn new(length: usize) -> Result<RsaPrivateKey, JsValue> {
        let rprivate = rsa::RsaPrivateKey::new(&mut OsRng {}, length);
        let private = rprivate.map_err(|_| JsValue::from("Error"))?;
        let inner = Box::new(private);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn from_pkcs1_der(input: &[u8]) -> Result<RsaPrivateKey, JsValue> {
        let rprivate = rsa::RsaPrivateKey::from_pkcs1_der(input);
        let private = rprivate.map_err(|_| JsValue::from("Error"))?;
        let inner = Box::new(private);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn from_pkcs8_der(input: &[u8]) -> Result<RsaPrivateKey, JsValue> {
        let rprivate = rsa::RsaPrivateKey::from_pkcs8_der(input);
        let private = rprivate.map_err(|_| JsValue::from("Error"))?;
        let inner = Box::new(private);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_pkcs1_der(&self) -> Result<Vec<u8>, JsValue> {
        let rdocument = self.inner.to_pkcs1_der();
        let document = rdocument.map_err(|_| JsValue::from("Error"))?;

        Ok(document.as_bytes().to_vec())
    }

    #[wasm_bindgen]
    pub fn to_pkcs8_der(&self) -> Result<Vec<u8>, JsValue> {
        let rdocument = self.inner.to_pkcs8_der();
        let document = rdocument.map_err(|_| JsValue::from("Error"))?;

        Ok(document.as_bytes().to_vec())
    }

    #[wasm_bindgen]
    pub fn to_public_key(&self) -> RsaPublicKey {
        let public = self.inner.to_public_key();
        let inner = Box::new(public);

        RsaPublicKey { inner }
    }

    #[wasm_bindgen]
    pub fn sign(&self, padding: &PaddingScheme, input: &[u8]) -> Result<Vec<u8>, JsValue> {
        let routput = self.inner.sign(padding.into(), input);
        let output = routput.map_err(|_| JsValue::from("Error"))?;

        Ok(output)
    }
}

#[wasm_bindgen]
pub struct RsaPublicKey {
    inner: Box<rsa::RsaPublicKey>,
}

#[wasm_bindgen]
impl RsaPublicKey {
    #[wasm_bindgen]
    pub fn from_pkcs1_der(input: &[u8]) -> Result<RsaPublicKey, JsValue> {
        let rpublic = rsa::RsaPublicKey::from_pkcs1_der(input);
        let public = rpublic.map_err(|_| JsValue::from("Error"))?;
        let inner = Box::new(public);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn from_public_key_der(input: &[u8]) -> Result<RsaPublicKey, JsValue> {
        let rpublic = rsa::RsaPublicKey::from_public_key_der(input);
        let public = rpublic.map_err(|_| JsValue::from("Error"))?;
        let inner = Box::new(public);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_pkcs1_der(&self) -> Result<Vec<u8>, JsValue> {
        let rdocument = self.inner.to_pkcs1_der();
        let document = rdocument.map_err(|_| JsValue::from("Error"))?;

        Ok(document.as_bytes().to_vec())
    }

    #[wasm_bindgen]
    pub fn to_public_key_der(&self) -> Result<Vec<u8>, JsValue> {
        let rdocument = self.inner.to_public_key_der();
        let document = rdocument.map_err(|_| JsValue::from("Error"))?;

        Ok(document.as_bytes().to_vec())
    }

    #[wasm_bindgen]
    pub fn verify(&self, padding: &PaddingScheme, input: &[u8], signature: &[u8]) -> bool {
        self.inner.verify(padding.into(), input, signature).is_ok()
    }
}
