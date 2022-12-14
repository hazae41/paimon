export * from "../../../wasm/pkg/paimon.js";

import init, { InitOutput, initSync } from "../../../wasm/pkg/paimon.js";
import { wasm } from "../../../wasm/pkg/paimon.wasm.js";

let output: InitOutput | undefined = undefined

export function initSyncBundledOnce() {
  return output ??= initSync(Buffer.from(wasm, "base64"))
}

export async function initBundledOnce() {
  return output ??= await (init as any)(Buffer.from(wasm, "base64"))
}
