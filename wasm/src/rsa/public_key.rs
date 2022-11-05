extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

use crate::rsa::padding_scheme::PaddingScheme;

use rsa::pkcs1::{DecodeRsaPublicKey, EncodeRsaPublicKey};
use rsa::pkcs8::{DecodePublicKey, EncodePublicKey};

#[wasm_bindgen]
pub struct RsaPublicKey {
    pub(crate) inner: Box<rsa::RsaPublicKey>,
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
        use rsa::PublicKey;

        self.inner.verify(padding.into(), input, signature).is_ok()
    }
}
