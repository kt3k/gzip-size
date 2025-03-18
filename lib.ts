// Copyright 2021 - 2025 Yoshiya Hinosawa. MIT License.

import { gzip } from "@deno-library/compress";

/**
 * The options for gzipSize function
 */
export interface GzipSizeOptions {
  /** The compression level */
  level?: number;
}

const encoder = new TextEncoder();
/**
 * Returns the gzipped size of the given bytes.
 */
export function gzipSize(
  bytes: Uint8Array | string,
  options: GzipSizeOptions = {},
): number {
  const b = typeof bytes === "string" ? encoder.encode(bytes) : bytes;
  return gzip(b, options).byteLength;
}
