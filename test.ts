// Copyright 2021 - 2025 Yoshiya Hinosawa. MIT License.

import { gzipSize } from "./lib.ts"
import { assert } from "@std/assert/assert"

Deno.test("gzipSize", () => {
  assert(gzipSize(fixture) < fixture.length)
  assert(gzipSize(fixtureBytes) < fixtureBytes.byteLength)
})

const fixture =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const fixtureBytes = new TextEncoder().encode(fixture)
