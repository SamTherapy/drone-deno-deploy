FROM denoland/deno:debian-1.26.1


RUN deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/deploy/deployctl.ts

COPY run.ts /bin/
RUN chmod +x /bin/run.ts

USER deno
CMD ["/bin/run.ts"]