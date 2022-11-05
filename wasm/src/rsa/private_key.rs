extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

use rand::rngs::OsRng;

use crate::rsa::padding_scheme::PaddingScheme;
use crate::rsa::public_key::RsaPublicKey;

use rsa::pkcs1::{DecodeRsaPrivateKey, EncodeRsaPrivateKey};
use rsa::pkcs8::{DecodePrivateKey, EncodePrivateKey};

#[wasm_bindgen]
pub struct RsaPrivateKey {
    pub(crate) inner: Box<rsa::RsaPrivateKey>,
}

#[wasm_bindgen]
impl RsaPrivateKey {
    #[wasm_bindgen(constructor)]
    pub fn new(length: usize) -> Result<RsaPrivateKey, JsError> {
        let rprivate = rsa::RsaPrivateKey::new(&mut OsRng {}, length);
        let private = rprivate.map_err(|_| JsError::new("RsaPrivateKey::new"))?;
        let inner = Box::new(private);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn from_pkcs1_der(input: &[u8]) -> Result<RsaPrivateKey, JsError> {
        let rprivate = rsa::RsaPrivateKey::from_pkcs1_der(input);
        let private = rprivate.map_err(|_| JsError::new("RsaPrivateKey::from_pkcs1_der"))?;
        let inner = Box::new(private);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn from_pkcs8_der(input: &[u8]) -> Result<RsaPrivateKey, JsError> {
        let rprivate = rsa::RsaPrivateKey::from_pkcs8_der(input);
        let private = rprivate.map_err(|_| JsError::new("RsaPrivateKey::from_pkcs8_der"))?;
        let inner = Box::new(private);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_pkcs1_der(&self) -> Result<Vec<u8>, JsError> {
        let rdocument = self.inner.to_pkcs1_der();
        let document = rdocument.map_err(|_| JsError::new("RsaPrivateKey::to_pkcs1_der"))?;

        Ok(document.as_bytes().to_vec())
    }

    #[wasm_bindgen]
    pub fn to_pkcs8_der(&self) -> Result<Vec<u8>, JsError> {
        let rdocument = self.inner.to_pkcs8_der();
        let document = rdocument.map_err(|_| JsError::new("RsaPrivateKey::to_pkcs8_der"))?;

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
