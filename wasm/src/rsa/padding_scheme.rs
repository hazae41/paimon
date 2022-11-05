extern crate alloc;

use core::ops::Deref;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct PaddingScheme {
    pub(crate) inner: Box<rsa::PaddingScheme>,
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
