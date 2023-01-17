extern crate alloc;

use alloc::vec::Vec;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct PaddingScheme {
    pub(crate) inner: Option<rsa::PaddingScheme>,
}

#[wasm_bindgen]
impl PaddingScheme {
    #[wasm_bindgen]
    pub fn new_pkcs1v15_sign_raw() -> Self {
        let padding = rsa::PaddingScheme::new_pkcs1v15_sign_raw();
        let inner = Option::Some(padding);

        Self { inner }
    }

    #[wasm_bindgen]
    pub fn new_pkcs1v15_sign_digest(length: usize, prefix: Vec<u8>) -> Self {
        let padding = rsa::PaddingScheme::PKCS1v15Sign {
            hash_len: Some(length),
            prefix: prefix.into_boxed_slice(),
        };
        let inner = Option::Some(padding);

        Self { inner }
    }
}
