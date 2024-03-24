#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run --allow-env --allow-sys --no-lock

import { copy } from "https://deno.land/std@0.104.0/io/util.ts";

const env = Deno.env.toObject();

if (!env["PLUGIN_DENO_DEPLOY_TOKEN"] && !env["DENO_DEPLOY_TOKEN"]) {
  console.error(
    "A Deno Deploy token is required.\n\nGo to https://dash.deno.com/account#access-tokens to get one and set DENO_DEPLOY_TOKEN.",
  );
  Deno.exit(1);
}

if (!env["PLUGIN_ENTRYPOINT"]) {
  console.error("An entrypoint is required");
  Deno.exit(1);
}

if (!env["PLUGIN_PROJECT"]) {
  console.error("An project is required");
  Deno.exit(1);
}

const flags = [`-p=${env["PLUGIN_PROJECT"]}`];

if (env["PLUGIN_DENO_DEPLOY_TOKEN"]) {
  flags.push(`--token=${env["PLUGIN_DENO_DEPLOY_TOKEN"]}`);
}

if (env["PLUGIN_EXCLUDE"]) {
  flags.push(`--exclude=${env["PLUGIN_EXCLUDE"]}`);
}

if (env["PLUGIN_INCLUDE"]) {
  flags.push(`--include=${env["PLUGIN_INCLUDE"]}`);
}

if (env["PLUGIN_IMPORT_MAP"]) {
  flags.push(`--import-map=${env["PLUGIN_IMPORT_MAP"]}`);
}

if (env["PLUGIN_NO_STATIC"]) {
  flags.push(`--no-static`);
}

if (env["PLUGIN_PROD"] || env["PLUGIN_PRODUCTION"]) {
  flags.push(`--prod`);
}

if (env["PLUGIN_DRY_RUN"]) {
  flags.push(`--dry-run`);
}

console.log("Deploying to Deno Deploy......");

const prog = Deno.run({
  cmd: [
    "deployctl",
    "deploy",
    ...flags,
    env["PLUGIN_ENTRYPOINT"],
  ],
  stdout: "piped",
  stderr: "piped",
});


copy(prog.stdout, Deno.stdout);
copy(prog.stderr, Deno.stderr);

const status = await prog.status()

prog.close();

if (!status.success) {
  console.error("Deno Deploy failed!");
  Deno.exit(1);
}
