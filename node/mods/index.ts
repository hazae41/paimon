export * from "../../wasm/pkg/paimon.js";

import { InitOutput, initSync } from "../../wasm/pkg/paimon.js";
import { wasm } from "../../wasm/pkg/paimon.wasm.js";

let output: InitOutput | undefined = undefined

export function initSyncBundledOnce() {
  return output ??= initSync(Buffer.from(wasm, "base64"))
}

