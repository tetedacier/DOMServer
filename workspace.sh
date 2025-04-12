#!/usr/bin/env bash

COVERAGE_REPORT() {
    rm -rf coverage;
    deno test --coverage --no-check ui/design-token.test.ts && (
        deno coverage --html;
    );
}

WATCH_TEST() {
    rm -rf coverage;
    deno test --watch --no-check ui/design-token.test.ts;
}

SERVER() {
    deno run --allow-net --watch-hmr src/server.ts
}

FRONT_INTERFACES() {
    cd application/client || exit 1;
    deno task dev
    cd ../..
}
