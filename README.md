# Drone Plugin to Deploy to Deno Deploy

[![Build Status](https://ci.git.froth.zone/api/badges/sam/drone-deno-deploy/status.svg)](https://ci.git.froth.zone/sam/drone-deno-deploy)

A [Drone](https://drone.io) and [Woodpecker](https://woodpecker-ci.org/) plugin
to deploy a JavaScript/TypeScript application to
[Deno Deploy](https://deno.com/deploy).

This is built on top of [deployctl](https://deno.com/deploy/docs/deployctl).

## Example Usage

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
