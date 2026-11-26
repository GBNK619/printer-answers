// The Printer Finally Answers — make.fun one-liner entry.
// Writes one line, in the office printer's own voice, to
// $MAKEFUN_OUTPUT_DIR/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I have printed your 47-page email chain. Twice. The jam was me, thinking about it.";

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv && fromEnv.length > 0 ? fromEnv : "./output";
}

function main(): void {
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, LINE + "\n", "utf8");
  console.log(`wrote ${target} (${LINE.length} chars)`);
}

main();
