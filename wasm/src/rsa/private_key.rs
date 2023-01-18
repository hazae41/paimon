extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

use crate::rsa::public_key::RsaPublicKey;

#[wasm_bindgen]
pub struct RsaPrivateKey {
    pub(crate) inner: Box<rsa::RsaPrivateKey>,
}

#[wasm_bindgen]
impl RsaPrivateKey {
    #[wasm_bindgen(constructor)]
    pub fn new(length: usize) -> Result<RsaPrivateKey, JsError> {
        let rprivate = rsa::RsaPrivateKey::new(&mut rsa::rand_core::OsRng {}, length);
        let private = rprivate.map_err(|_| JsError::new("RsaPrivateKey::new"))?;
        let inner = Box::new(private);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn from_pkcs1_der(input: &[u8]) -> Result<RsaPrivateKey, JsError> {
        use rsa::pkcs1::DecodeRsaPrivateKey;

        let rprivate = rsa::RsaPrivateKey::from_pkcs1_der(input);
        let private = rprivate.map_err(|_| JsError::new("RsaPrivateKey::from_pkcs1_der"))?;
        let inner = Box::new(private);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn from_pkcs8_der(input: &[u8]) -> Result<RsaPrivateKey, JsError> {
        use rsa::pkcs8::DecodePrivateKey;

        let rprivate = rsa::RsaPrivateKey::from_pkcs8_der(input);
        let private = rprivate.map_err(|_| JsError::new("RsaPrivateKey::from_pkcs8_der"))?;
        let inner = Box::new(private);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_pkcs1_der(&self) -> Result<Vec<u8>, JsError> {
        use rsa::pkcs1::EncodeRsaPrivateKey;

        let rdocument = self.inner.to_pkcs1_der();
        let document = rdocument.map_err(|_| JsError::new("RsaPrivateKey::to_pkcs1_der"))?;

        Ok(document.as_bytes().to_vec())
    }

    #[wasm_bindgen]
    pub fn to_pkcs8_der(&self) -> Result<Vec<u8>, JsError> {
        use rsa::pkcs8::EncodePrivateKey;

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
    pub fn sign_pkcs1v15_raw(&self, input: &[u8]) -> Result<Vec<u8>, JsError> {
        use rsa::Pkcs1v15Sign;

        let routput = self.inner.sign(Pkcs1v15Sign::new_raw(), input);
        let output = routput.map_err(|_| JsError::new("RsaPrivateKey::sign"))?;

        Ok(output)
    }
}
