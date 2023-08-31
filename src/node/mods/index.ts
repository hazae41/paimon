export * from "../../../wasm/pkg/paimon.js";

import { __wbg_init, InitOutput } from "../../../wasm/pkg/paimon.js";
import { data } from "../../../wasm/pkg/paimon.wasm.js";

let output: InitOutput | undefined = undefined

export async function initBundledOnce() {
  return output ??= await __wbg_init(data)
}
