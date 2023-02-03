import { readFileSync, rmSync, writeFileSync } from "fs";

const wasm = readFileSync("./wasm/pkg/paimon_bg.wasm");
writeFileSync(`./wasm/pkg/paimon.wasm.js`, `export const wasm = "${wasm.toString("base64")}";`);
writeFileSync(`./wasm/pkg/paimon.wasm.d.ts`, `export const wasm: string;`);

const script = readFileSync(`./wasm/pkg/paimon.js`, "utf8")
  .replace("export { initSync }", "export { init, initSync }")
  .replace("input = new URL('paimon_bg.wasm', import.meta.url);", "throw new Error();")

const typing = readFileSync(`./wasm/pkg/paimon.d.ts`, "utf8")
  .replace("export default function init", "export function init")

writeFileSync(`./wasm/pkg/paimon.js`, script)
writeFileSync(`./wasm/pkg/paimon.d.ts`, typing)

rmSync(`./wasm/pkg/.gitignore`, { force: true });