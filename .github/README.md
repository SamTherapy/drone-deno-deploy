# Drone Plugin to Deploy to Deno Deploy

[![Built with the Deno Standard Library](https://raw.githubusercontent.com/denoland/deno_std/main/badge.svg)](https://deno.land/std)

A [Drone](https://drone.io) and [Woodpecker](https://woodpecker-ci.org/) plugin
to deploy a JavaScript/TypeScript application to
[Deno Deploy](https://deno.com/deploy).

This is built on top of [deployctl](https://deno.com/deploy/docs/deployctl).

## Example Usage (Drone)

```yaml
- name: Deploy to Deno Deploy (prod)
  image: git.froth.zone/sam/drone-deno-deploy
  environment:
    DENO_DEPLOY_TOKEN:
      from_secret: DENO_DEPLOY_TOKEN
  settings:
    project: drone-deploy
    entrypoint: server/main.ts
    production: true
  when:
    branch:
    - master
    event:
    - push
```
