FROM denoland/deno:1.37.0 as base


RUN deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/deploy/deployctl.ts

COPY run.ts /bin/
RUN chmod +x /bin/run.ts && deno cache /bin/run.ts

USER deno
CMD ["/bin/run.ts"]
