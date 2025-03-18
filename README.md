# gzip-size 0.4.2

[![ci](https://github.com/kt3k/gzip-size/actions/workflows/ci.yml/badge.svg)](https://github.com/kt3k/gzip-size/actions/workflows/ci.yml)

> Shows the gzipped size of the given file

# CLI usage

```shellsession
$ deno -R jsr:@kt3k/gzip-size tiger.svg
347 kiB
$ deno -R jsr:@kt3k/gzip-size tiger.svg --raw
355041
$ deno -R jsr:@kt3k/gzip-size tiger.svg --include-original
357 kiB → 347 kiB
$ deno -R jsr:@kt3k/gzip-size tiger.svg --include-original --decimal
365 kB → 355 kB
```

See `deno jsr:@kt3k/gzip-size -h` for more details.

# API usage

```ts
import { gzipSize } from "jsr:@kt3k/gzip-size/lib"

gzipSize(bytes)
// returns gzipped size of the bytes
```

# License

MIT
