#!/usr/bin/env bash
# Investigate zed shell support
# Investigate zed cspell support
# - https://zed.dev/docs/languages/sh
# missing binary availability:
# - jq
# - deno
# - rm
COVERAGE_REPORT() {
    rm -rf coverage;
    deno test --coverage --no-check ui/design-token.test.ts && (
        deno coverage --html;
    );
}

TSX_AST() {
    deno run --allow-read --allow-write --allow-env --allow-sys tools/tsx-ast.mjs
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

GENERATE_USER_DATABASE() {
    rm infra.db;
    deno run --allow-read=infra.db --allow-write=infra.db src/lib/sqlite.ts;
}
KEYCLOAK_API_STATS() {
    # keycloak open api is stored in this repository
    # if you need to update, simply remove `vendors/keycloak/openapi.yaml` file
    # below script will download the latest version
    if [ ! -f vendors/keycloak/openapi.yaml ]; then
        curl -fo vendors/keycloak/openapi.yaml https://www.keycloak.org/docs-api/latest/rest-api/openapi.yaml \
            || return "$?";
    fi

    deno run \
        --allow-read=vendors/keycloak/openapi.yaml \
        vendors/keycloak/apiStatistics.ts | \
        jq '.paths | length';
}
