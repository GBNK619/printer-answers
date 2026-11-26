// The Printer Finally Answers — make.fun one-liner entry.
// Writes one line, in the office printer's own voice, to
// $MAKEFUN_OUTPUT_DIR/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
  const expected = LINE + "\n";
  writeFileSync(target, expected, "utf8");

  // Read-back validation: the file on disk must equal the line exactly,
  // byte for byte. Any mismatch is a hard failure, not a warning.
  const written = readFileSync(target, "utf8");
  if (written !== expected) {
    console.error(
      `validation failed: entry.txt content does not match the line exactly`,
    );
    process.exit(1);
  }
  console.log(`wrote ${target} (validated, ${written.length} chars)`);
}

main();
