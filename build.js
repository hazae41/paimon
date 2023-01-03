import { readFile, rm, writeFile } from "fs/promises";

const wasm = await readFile("./wasm/pkg/paimon_bg.wasm");

await writeFile(
  `./wasm/pkg/paimon.wasm.js`,
  `export const wasm = "${wasm.toString("base64")}";`
);

await writeFile(
  `./wasm/pkg/paimon.wasm.d.ts`,
  `export const wasm: string;`
);

await rm(`./wasm/pkg/.gitignore`, { force: true });