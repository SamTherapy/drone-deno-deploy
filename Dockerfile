FROM denoland/deno:alpine-1.26.1


RUN deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/deploy/deployctl.ts

COPY run.sh /bin/
RUN chmod +x /bin/run.sh

USER deno
CMD ["/bin/run.sh"]