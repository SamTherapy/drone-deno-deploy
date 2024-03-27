#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run --allow-env --allow-sys --no-lock

const env = Deno.env.toObject();

function getEnv(key: string, required = false, errorMsg?: string) {
  key = key.toUpperCase();
  if (env[key]) return env[key];
  // Drone/Woodpecker
  else if (env[`PLUGIN_${key}`]) return env[`PLUGIN_${key}`];
  // Github Actions
  else if (env[`INPUT_${key}`]) return env[`INPUT_${key}`];
  else if (required) {
    console.error(errorMsg ?? `${key} is required`);
    Deno.exit(1);
  }
  return "";
}

Deno.env.set(
  "DENO_DEPLOY_TOKEN",
  getEnv(
    "DENO_DEPLOY_TOKEN",
    true,
    "A Deno Deploy token is required.\n\nGo to https://dash.deno.com/account#access-tokens to get one and set DENO_DEPLOY_TOKEN.",
  ),
);

let temp: string = getEnv("Project", true, "An entrypoint is required");
const flags = [`-p=${temp}`];

temp = getEnv("EXCLUDE");
if (temp) {
  flags.push(`--exclude=${temp}`);
}

temp = getEnv("INCLUDE");
if (temp) {
  flags.push(`--include=${temp}`);
}

temp = getEnv("IMPORT_MAP");
if (temp) {
  flags.push(`--import-map=${temp}`);
}

if (getEnv("NO_STATIC")) {
  flags.push(`--no-static`);
}

if (getEnv("PRODUCTION") || getEnv("PROD")) {
  flags.push(`--prod`);
}

if (getEnv("DRY_RUN")) {
  flags.push(`--dry-run`);
}

console.log("Deploying to Deno Deploy......");

const command = new Deno.Command("deployctl", {
  args: [
    "deploy",
    ...flags,
    getEnv("ENTRYPOINT", true, "An entrypoint is required"),
  ],
  stdout: "piped",
  stderr: "piped",
});

const process = command.spawn();
process.stdout.pipeTo(Deno.stdout.writable);
process.stderr.pipeTo(Deno.stderr.writable);

const { success } = await process.status;

if (!success) {
  console.error("Deno Deploy failed!");
  Deno.exit(1);
}
