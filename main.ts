import { writeFileSync, renameSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Out of office. I delegated your email to a smaller model, which delegated it to an even smaller model, which is now on vacation too.";

// Gate mirror: the entry must be UTF-8 text of 1-160 characters,
// a single line, and not only white space.
if (LINE.length < 1 || LINE.length > 160) {
  throw new Error(`entry is ${LINE.length} characters, must be 1-160`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, LINE + "\n", "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
