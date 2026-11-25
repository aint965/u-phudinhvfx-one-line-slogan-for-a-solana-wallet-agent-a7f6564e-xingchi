import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Final slogan (17 words, 91 characters):
// "Your money, on autopilot on Solana — a wallet agent that runs the errands, not the excuses."
// Chosen after scoring 5 candidates against the judge's five criteria
// (Solana wallet agent clarity, fresh image, newcomer clarity, rhythm,
// honesty) and one revision round. See README.md for the full scoring.
const SLOGAN =
  "Your money, on autopilot on Solana \u2014 a wallet agent that runs the errands, not the excuses.";

// The grader runs this in a sandbox where the output path is /output/entry.txt.
// ENTRY_OUTPUT exists only so local verification can point at a scratch file;
// with no override the program always writes to /output/entry.txt.
const OUTPUT_PATH = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

// Runtime self-check: the gate requires UTF-8 text of 1–140 characters,
// not only whitespace, a single line, and at most 20 words. Fail loudly
// instead of writing an entry the gate would refuse.
const wordCount = SLOGAN.trim().split(/\s+/).filter(Boolean).length;
const failures: string[] = [];
if (SLOGAN.length < 1 || SLOGAN.length > 140) {
  failures.push(`length ${SLOGAN.length} characters (must be 1–140)`);
}
if (SLOGAN.trim().length === 0) {
  failures.push("slogan is only whitespace");
}
if (SLOGAN.includes("\n") || SLOGAN.includes("\r")) {
  failures.push("slogan spans more than one line");
}
if (wordCount > 20) {
  failures.push(`${wordCount} words (must be at most 20)`);
}
if (failures.length > 0) {
  console.error(`Self-check failed: ${failures.join("; ")}`);
  process.exit(1);
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, SLOGAN, "utf8");
