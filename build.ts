import * as Base64 from "https://deno.land/std@0.158.0/encoding/base64.ts";

const wasm = await Deno.readFile("./wasm/pkg/paimon_bg.wasm");

await Deno.writeTextFile(
  `./wasm/pkg/paimon.wasm.js`,
  `export const wasm = "${Base64.encode(wasm)}";`
);

await Deno.writeTextFile(
  `./wasm/pkg/paimon.wasm.d.ts`,
  `export const wasm: string;`
);