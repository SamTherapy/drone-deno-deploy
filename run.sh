#!/bin/sh

set -e
# Also broken
# if [ -z "$PLUGIN_DENO_DEPLOY_TOKEN" ] && [ -z "$DENO_DEPLOY_TOKEN" ]; then
if [ -z "$DENO_DEPLOY_TOKEN" ]; then
  printf "A Deno Deploy token is required.\n\nGo to https://dash.deno.com/account#access-tokens to get one and set DENO_DEPLOY_TOKEN.\n"
  exit 1
fi

if [ -z "$PLUGIN_ENTRYPOINT" ]; then
  echo "An entrypoint is required."
  exit 1
fi

if [ -z "$PLUGIN_PROJECT" ]; then
  echo "Please set an entrypoint to use (Settings Name: project)"
  exit 1
fi

FLAGS="--project=$PLUGIN_PROJECT"

# This is broken
# if [ -n "$PLUGIN_DENO_DEPLOY_TOKEN" ]; then
#   FLAGS="$FLAGS --token=$PLUGIN_DENO_DEPLOY_TOKEN"
# fi

if [ -n "$PLUGIN_EXCLUDE" ]; then
  FLAGS="$FLAGS --exclude=$PLUGIN_EXCLUDE"
fi

if [ -n "$PLUGIN_INCLUDE" ]; then
  FLAGS="$FLAGS --include=$PLUGIN_INCLUDE"
fi

if [ -n "$PLUGIN_IMPORT_MAP" ]; then
  FLAGS="$FLAGS --import-map=$PLUGIN_IMPORT_MAP"
fi

if [ -n "$PLUGIN_NO_STATIC" ]; then
  FLAGS="$FLAGS --no-static"
fi

if [ -n "$PLUGIN_PROD" ] || [ -n "$PLUGIN_PRODUCTION" ]; then
  FLAGS="$FLAGS --prod"
fi

deployctl deploy "$FLAGS" "$PLUGIN_ENTRYPOINT"