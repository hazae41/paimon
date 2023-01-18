extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct RsaPublicKey {
    pub(crate) inner: Box<rsa::RsaPublicKey>,
}

#[wasm_bindgen]
impl RsaPublicKey {
    #[wasm_bindgen]
    pub fn from_pkcs1_der(input: &[u8]) -> Result<RsaPublicKey, JsError> {
        use rsa::pkcs1::DecodeRsaPublicKey;

        let rpublic = rsa::RsaPublicKey::from_pkcs1_der(input);
        let public = rpublic.map_err(|_| JsError::new("RsaPublicKey::from_pkcs1_der"))?;
        let inner = Box::new(public);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn from_public_key_der(input: &[u8]) -> Result<RsaPublicKey, JsError> {
        use rsa::pkcs8::DecodePublicKey;

        let rpublic = rsa::RsaPublicKey::from_public_key_der(input);
        let public = rpublic.map_err(|_| JsError::new("RsaPublicKey::from_public_key_der"))?;
        let inner = Box::new(public);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_pkcs1_der(&self) -> Result<Vec<u8>, JsError> {
        use rsa::pkcs1::EncodeRsaPublicKey;

        let rdocument = self.inner.to_pkcs1_der();
        let document = rdocument.map_err(|_| JsError::new("RsaPublicKey::to_pkcs1_der"))?;

        Ok(document.as_bytes().to_vec())
    }

    #[wasm_bindgen]
    pub fn to_public_key_der(&self) -> Result<Vec<u8>, JsError> {
        use rsa::pkcs8::EncodePublicKey;

        let rdocument = self.inner.to_public_key_der();
        let document = rdocument.map_err(|_| JsError::new("RsaPublicKey::to_public_key_der"))?;

        Ok(document.as_bytes().to_vec())
    }

    #[wasm_bindgen]
    pub fn verify_pkcs1v15_raw(&self, input: &[u8], signature: &[u8]) -> bool {
        use rsa::Pkcs1v15Sign;
        use rsa::PublicKey;

        self.inner
            .verify(Pkcs1v15Sign::new_raw(), input, signature)
            .is_ok()
    }
}
