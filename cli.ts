// Copyright 2021 - 2025 Yoshiya Hinosawa. MIT License.

import { parseArgs } from "@std/cli/parse-args";
import { gzipSize } from "./lib.ts";
import { format } from "@std/fmt/bytes";

type Args = {
  decimal: boolean;
  help: boolean;
  level: string;
  "include-original": boolean;
  raw: boolean;
  _: string[];
};
const {
  decimal,
  help,
  level,
  "include-original": includeOriginal,
  raw,
  _: args,
} = parseArgs(Deno.args, {
  string: ["level"],
  boolean: ["decimal", "help", "raw", "include-original"],
  alias: {
    h: "help",
    d: "decimal",
  },
}) as Args;

if (help) {
  console.log(`Usage: deno -R jsr:@kt3k/gzip-size [options] <filename>

Options:
  --level             Compression level [0-9] (Default: 9)
  --raw               Display value in bytes
  --include-original  Include original size
  -d, --decimal       Uses decimal byte units (e.g. kilobyte, megabyte).
                      Default is false.

Note: The sizes are shown in binary byte units by default (e.g. kibibyte, mebibyte)

Examples
  $ deno -R jsr:@kt3k/gzip-size unicorn.png
  347 kiB
  $ deno -R jsr:@kt3k/gzip-size unicorn.png --raw
  355041
  $ deno -R jsr:@kt3k/gzip-size unicorn.png --include-original
  357 kiB → 347 kiB
  $ deno -R jsr:@kt3k/gzip-size unicorn.png --include-original -d
  365 kB → 355 kB`);
  Deno.exit(0);
}

if (args.length === 0) {
  console.log("Error: No file is given");
  console.log("Usage: deno -R jsr:@kt3k/gzip-size [options] <filename>");
  Deno.exit(1);
}

let bytes: Uint8Array;
try {
  bytes = await Deno.readFile(args[0]);
} catch {
  console.log(`Error: Cannot read file "${args[0]}"`);
  console.log("Usage: deno -R jsr:@kt3k/gzip-size [options] <filename>");
  Deno.exit(1);
}

const originalLength = bytes.byteLength;
const gzippedSize = gzipSize(bytes, { level: +level || 9 });

const binary = !decimal;

if (includeOriginal && raw) {
  console.log(originalLength + " → " + gzippedSize);
} else if (includeOriginal) {
  console.log(
    format(originalLength, { binary }),
    "→",
    format(gzippedSize, { binary }),
  );
} else if (raw) {
  console.log(String(gzippedSize));
} else {
  console.log(format(gzippedSize, { binary }));
}
